from fastapi import APIRouter

# import handlers for 
from app.api.api_v1.handlers import users
from app.api.auth.jwt import auth_router
from app.api.api_v1.handlers import usa

router = APIRouter()

router.include_router(users.user_router, prefix='/users', tags=["Users"])
router.include_router(auth_router, prefix='/auth', tags=["Authentication"])
router.include_router(usa.usa_router, prefix='/usa', tags=["USA data"])