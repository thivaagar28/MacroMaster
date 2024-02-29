from typing import Optional
from uuid import UUID, uuid4
from beanie import Document, Indexed
from pydantic import Field, EmailStr
from datetime import datetime

class Users(Document):
    user_id: UUID = Field(default_factory=uuid4)
    username: Indexed(str, unique= True) # type: ignore # unique across all users
    email: Indexed(EmailStr, unique=True) # type: ignore #unique across all users
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    hashed_password :str
    disabled: Optional[bool] = None

    def __repr__(self) -> str:
        return f"<User {self.email}>"
    
    def __str__(self) -> str:
        return self.email
    
    def __hash__(self) -> int:
        return hash(self.email)
    
    def __eq__(self, other: object) -> bool:
        if isinstance(other, Users):
            return self.email == other.email
        return False
    
    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    @classmethod
    async def by_email(self, email:str) -> "Users":
        """Get a user instance by its email"""
        return await self.find_one(self.email == email)
    
    class Settings:
        name = "Users"