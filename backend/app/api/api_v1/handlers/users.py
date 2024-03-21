from fastapi import APIRouter, HTTPException, status, Depends
import pymongo

#import database models, service and schema, 
from app.models.users_model import Users
from app.schemas.users_schema import UserCreate, UserOut, UserUpdate, UserPassword
from app.services.users_service import UsersService
# import custom user dependency
from app.api.deps.user_deps import get_current_user

user_router = APIRouter()

@user_router.post('/create', summary="Create new user", response_model=UserOut)
async def create(data: UserCreate):
    try:
        return await UsersService.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=  status.HTTP_400_BAD_REQUEST,
            detail= "User with  this email or username already exists"
        )

@user_router.get('/me', summary="Get current authenticated user data", response_model=UserOut)
async def get_me(user: Users = Depends(get_current_user)):
    return user

@user_router.post('/update', summary="Update user", response_model=UserOut)
async def update_user(data: UserUpdate, user: Users = Depends(get_current_user)):
    try:
        return await UsersService.update_user(user.user_id, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            message= "User does not exist"
        )
    
@user_router.post('/change-password', summary="Change Password", response_model=UserOut)
async def change_password(data: UserPassword, user: Users = Depends(get_current_user)):
    if data.old_password == data.new_password:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail= "The new password can't be the same as the old password"
        )
    
    try:
        response = await UsersService.change_password(user.user_id, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            message= "User does not exist"
        )
    
    if not response:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail= "Incorrect old password"
        )
    return response