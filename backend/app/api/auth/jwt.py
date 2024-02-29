from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from jose import jwt
from datetime import datetime
from pydantic import ValidationError
#import database models, services & schemas
from app.models.users_model import Users 
from app.services.users_service import UsersService
from app.schemas.users_schema import UserOut
from app.schemas.auth_schema import TokenSchema, TokenPayload
#import security functions
from app.core.security import create_access_token, create_refresh_token
#import custom user dependency
from app.api.deps.user_deps import get_current_user
#import application configuration
from app.core.config import settings

auth_router = APIRouter()

@auth_router.post('/login', summary="Create access and refresh token for user", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends ()) -> Any:
    user = await UsersService.authenticate(email = form_data.username, password = form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail= "Invalid credentials"
        )
    #return create and refresh tokens
    return{
        "access_token" : create_access_token(user.user_id),
        "refresh_token" : create_refresh_token(user.user_id)
    }

@auth_router.post('/test-token', summary="Test token access", response_model=UserOut)
async def test_token(user: Users =  Depends(get_current_user)):
    return user

@auth_router.post('/refresh', summary="Refresh Token", response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(refresh_token, settings.JWT_REFRESH_SECRET_KEY, algorithms=[settings.ALGORITHM])
        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                    status_code = status.HTTP_401_UNAUTHORIZED,
                    detail="Token Expired",
                    headers={"WW-Authenticate": "Bearer"}
                )
    except(jwt.JWTError, ValidationError) :
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers= {"WW-Authenticate": "Bearer"},
        )
    
    user = await UsersService.get_user_by_id(token_data.sub)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id)
    }
