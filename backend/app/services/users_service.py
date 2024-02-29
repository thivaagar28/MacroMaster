from typing import Optional
from uuid import UUID
import pymongo
#import database models, schemes
from app.schemas.users_schema import UserCreate, UserUpdate, UserChangePassword
from app.models.users_model import Users
#import password hashing security function
from app.core.security import get_hash_password, verify_password

class UsersService:
    @staticmethod
    async def create_user(user: UserCreate):
        user_in = Users(
            first_name= user.first_name,
            last_name= user.last_name,
            username= user.username,
            email= user.email,
            hashed_password= get_hash_password(user.password) 
        )
        await user_in.insert()
        return user_in
    
    @staticmethod
    async def get_user_by_email(email: str) -> Optional[Users]:
        user = await Users.find_one(Users.email == email)
        return user
    
    @staticmethod
    async def get_user_by_id(id: UUID) -> Optional[Users]:
        user = await Users.find_one(Users.user_id == id)
        return user

    @staticmethod
    async def authenticate(email : str, password : str) -> Optional[Users]:
        user = await UsersService.get_user_by_email(email)
        if not user:
            return None
        if not verify_password(password=password, hashed_pass=user.hashed_password):
            return None
        
        return user
    
    @staticmethod
    async def update_user(user_id:UUID, data:UserUpdate) -> Users:
        user = await UsersService.get_user_by_id(user_id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
        
        await user.update({"$set": data.model_dump(exclude_unset=True)})
        return user

    @staticmethod
    async def change_password(user_id: UUID, old_password: str, new_password: str) -> Users:
        user = await UsersService.get_user_by_id(user_id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
        
        if not verify_password(password=old_password, hashed_pass=user.hashed_password):
            return None
        
        user_pass_instance = UserChangePassword(
            user_id= user.user_id,
            hashed_password= get_hash_password(new_password)
        )

        await user.update({"$set": user_pass_instance.model_dump(exclude_unset=True)})
        return user
        