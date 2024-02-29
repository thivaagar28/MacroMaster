from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str

#each token schema properties has one token payload
class TokenPayload(BaseModel):
    sub: Optional[UUID] = None #due to having username as the login credentil and username will be stored in the jwt token
    exp: Optional[int] = None #due to having expiration time 