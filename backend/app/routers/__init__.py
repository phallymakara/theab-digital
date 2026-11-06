from app.routers.auth import router as auth_router
from app.routers.invitations import router as invitations_router
from app.routers.rsvps import router as rsvps_router
from app.routers.stats import router as stats_router
from app.routers.media import router as media_router
from app.routers.public import router as public_router
from app.routers.admin import router as admin_router

__all__ = [
    "auth_router",
    "invitations_router",
    "rsvps_router",
    "stats_router",
    "media_router",
    "public_router",
    "admin_router",
]
