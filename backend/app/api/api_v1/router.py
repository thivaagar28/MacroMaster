from fastapi import APIRouter

# import handlers for 
from app.api.api_v1.handlers import users
from app.api.auth.jwt import auth_router

router = APIRouter()

router.include_router(users.user_router, prefix='/users', tags=["Users"])
router.include_router(auth_router, prefix='/auth', tags=["Authentication"])