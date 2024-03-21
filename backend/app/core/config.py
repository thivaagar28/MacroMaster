from pydantic_settings import BaseSettings
from decouple import config

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY : str = config("JWT_SECRET_KEY", cast=str)
    JWT_REFRESH_SECRET_KEY : str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    ALGORITHM  : str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 5 #5 minutes
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 2 * 60 #120 minutes
    PROJECT_NAME: str = "MacroMaster"

    #Database
    MONGO_CONNECTION_STRING: str = config("MONGO_CONNECTION_STRING", cast=str)

    class Config:
        case_sensitive = True

settings = Settings()