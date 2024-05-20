from fastapi import FastAPI
from app.core.config import settings
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

#import database models
from app.models.users_model import Users
from app.models.usa_model import USA

#import application router
from app.api.api_v1.router import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
        initialize crucial components/ applications services
    """
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).MacroMaster

    await init_beanie(
        database=db_client,
        document_models=[
            Users,
            USA
        ],  # add your models here
    )
    #above are executed during initialization of the application
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# include the router for the application version
app.include_router(router, prefix=settings.API_V1_STR) 

# Adding cors middleware for global api access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)