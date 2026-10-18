from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import engine, Base, SessionLocal
from app.models import Invitation, GuestRSVP  # Ensure models are loaded
from app.services.invitation_service import InvitationService
from app.routers import invitations_router, rsvps_router, stats_router


@asynccontextmanager
async def lifespan(app: FastAPI):
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

# Set CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(invitations_router, prefix=settings.API_V1_STR)
app.include_router(rsvps_router, prefix=settings.API_V1_STR)
app.include_router(stats_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "message": "សូមស្វាគមន៍មកកាន់ Digital Theab API (ប្រព័ន្ធធៀបឌីជីថល)",
        "version": "1.0.0",
        "docs": f"{settings.API_V1_STR}/docs",
    }


@app.get("/health")
def health():
    return {"status": "ok", "service": "Digital Theab Backend"}


def run():
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8001, reload=True)


if __name__ == "__main__":
    run()
