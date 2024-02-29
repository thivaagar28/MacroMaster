from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from datetime import datetime
from pydantic import ValidationError
#import application configuration
from app.core.config import settings
#import database models, service & schemas
from app.models.users_model import Users
from app.services.users_service import UsersService
from app.schemas.auth_schema import TokenPayload

reusable_oath = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login",
    scheme_name="JWT"
)

async def get_current_user(token : str = Depends(reusable_oath)) -> Users:
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
        #if token is expired
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
    
    return user