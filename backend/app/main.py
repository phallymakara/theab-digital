import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from slowapi.errors import RateLimitExceeded
from sqlalchemy import text

from app.core.config import settings
from app.core.limiter import limiter, rate_limit_exceeded_handler
from app.db.database import engine, Base, SessionLocal
from app.models import User, Invitation, GuestRSVP  # Ensure models are loaded
from app.services.invitation_service import InvitationService
from app.routers import (
    auth_router,
    invitations_router,
    rsvps_router,
    stats_router,
    media_router,
    public_router
)

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure upload directory exists for local fallback
    settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    # Create tables if not present
    Base.metadata.create_all(bind=engine)
    # Seed default invitation for immediate testing
    db = SessionLocal()
    try:
        InvitationService.seed_default_if_empty(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan,
)

# Register SlowAPI Limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)


# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    
    # Enforce HSTS in production environments
    if settings.ENVIRONMENT.lower() == "production":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
    return response


# Set CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(public_router, prefix=settings.API_V1_STR)
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(invitations_router, prefix=settings.API_V1_STR)
app.include_router(rsvps_router, prefix=settings.API_V1_STR)
app.include_router(stats_router, prefix=settings.API_V1_STR)
app.include_router(media_router, prefix=settings.API_V1_STR)

# Mount local uploads directory for development fallback
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(settings.UPLOAD_DIR)), name="uploads")


@app.get("/")
@app.head("/")
def root():
    return {
        "message": "សូមស្វាគមន៍មកកាន់ Digital Theab API (ប្រព័ន្ធធៀបឌីជីថល)",
        "version": "1.0.0",
        "docs": f"{settings.API_V1_STR}/docs",
    }


@app.get("/docs", include_in_schema=False)
def redirect_to_docs():
    return RedirectResponse(url=f"{settings.API_V1_STR}/docs")


@app.get("/swagger", include_in_schema=False)
def redirect_to_swagger():
    return RedirectResponse(url=f"{settings.API_V1_STR}/docs")


@app.get("/redoc", include_in_schema=False)
def redirect_to_redoc():
    return RedirectResponse(url=f"{settings.API_V1_STR}/redoc")


@app.get("/health")
def health():
    """
    Deep readiness probe for cloud monitoring & zero-downtime deployments.
    Verifies database connectivity and storage readiness.
    """
    db_status = "connected"
    storage_type = "r2" if (settings.R2_ACCOUNT_ID and settings.R2_ACCESS_KEY_ID) else "local"

    # Ping database
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
    except Exception as e:
        logger.error(f"Health check DB ping failed: {e}")
        db_status = "unreachable"
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "degraded",
                "database": db_status,
                "storage": storage_type,
                "environment": settings.ENVIRONMENT,
                "error": "Database ping failed",
            }
        )

    return {
        "status": "ok",
        "database": db_status,
        "storage": storage_type,
        "environment": settings.ENVIRONMENT,
    }


def run():
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8001, reload=True)


if __name__ == "__main__":
    run()
