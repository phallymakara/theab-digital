from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "Digital Theab API (ប្រព័ន្ធធៀបឌីជីថល)"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./digital_theab.db"
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*",
    ]

    class Config:
        case_sensitive = True


settings = Settings()
