from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session

from app.routers.deps import get_db, get_current_superadmin
from app.models.user import User
from app.services.admin_service import AdminService

router = APIRouter(prefix="/admin", tags=["Super Admin"])


@router.get("/metrics")
@router.get("/metrics/", include_in_schema=False)
def get_admin_metrics(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_superadmin)
) -> Dict[str, Any]:
    """Retrieve platform-wide usage metrics, registration count, and service stats."""
    return AdminService.get_platform_metrics(db)


@router.get("/users")
@router.get("/users/", include_in_schema=False)
def list_registered_users(
    search: Optional[str] = Query(None, description="Search by name, email, or phone"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_superadmin)
) -> List[Dict[str, Any]]:
    """List all registered users on the platform with invitation statistics."""
    return AdminService.list_users(db, search=search, skip=skip, limit=limit)


@router.get("/invitations")
@router.get("/invitations/", include_in_schema=False)
def list_all_invitations(
    search: Optional[str] = Query(None, description="Search by slug or couple names"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_superadmin)
) -> List[Dict[str, Any]]:
    """List all digital theabs served across the platform."""
    return AdminService.list_invitations(db, search=search, skip=skip, limit=limit)

