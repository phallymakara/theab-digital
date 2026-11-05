from pathlib import Path
from typing import List, Optional, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
DEFAULT_DB_PATH = BACKEND_DIR / "digital_theab.db"
DEFAULT_DB_URL = f"sqlite:///{DEFAULT_DB_PATH.as_posix()}"
DEFAULT_UPLOAD_DIR = BACKEND_DIR / "uploads"


class Settings(BaseSettings):
    PROJECT_NAME: str = "Digital Theab API (ប្រព័ន្ធធៀបឌីជីថល)"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = DEFAULT_DB_URL
    ENVIRONMENT: str = "development"  # "development", "staging", "production"
    
    # JWT Security
    SECRET_KEY: str = "digital-theab-khmer-invitation-super-secret-key-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Cloudflare R2 Storage (S3 Compatible)
    R2_ACCOUNT_ID: Optional[str] = None
    R2_ACCESS_KEY_ID: Optional[str] = None
    R2_SECRET_ACCESS_KEY: Optional[str] = None
    R2_BUCKET_NAME: str = "theab-digital-media"
    R2_PUBLIC_URL: Optional[str] = None  # e.g., https://media.theabdigital.com or https://pub-xxx.r2.dev

    # Local Storage Fallback
    UPLOAD_DIR: Path = DEFAULT_UPLOAD_DIR
    MAX_IMAGE_SIZE_BYTES: int = 15 * 1024 * 1024  # 15 MB
    MAX_AUDIO_SIZE_BYTES: int = 15 * 1024 * 1024  # 15 MB

    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://theab-digital.vercel.app",
        "*",
    ]

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def normalize_db_url(cls, v: str) -> str:
        """Normalize legacy postgres:// to modern postgresql:// required by SQLAlchemy."""
        if isinstance(v, str) and v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql://", 1)
        return v

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        """Support comma-separated CORS origins string from environment variables."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    model_config = SettingsConfigDict(
        env_file=BACKEND_DIR / ".env",
        extra="ignore",
        case_sensitive=True
    )


settings = Settings()
