from uuid import UUID
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ValidationError

class UserCreate(BaseModel):
    first_name: Optional[str] 
    last_name: Optional[str] 
    username : str = Field(..., min_length=5, max_length=15, description="User username")
    email : EmailStr = Field(..., description="User email")
    password : str = Field(..., min_length=5, max_length=24, description="User password")

class UserOut(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    disabled: Optional[bool]

class UserUpdate(BaseModel):
    first_name: Optional[str] 
    last_name: Optional[str] 
    username : str = Field(..., min_length=5, max_length=15, description="User username")

class UserChangePassword(BaseModel):
    user_id: UUID
    hashed_password :str