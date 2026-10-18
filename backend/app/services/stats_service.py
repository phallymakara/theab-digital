import math
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.rsvp import GuestRSVP
from app.schemas.stats import DashboardStatsResponse


class StatsService:
    @staticmethod
    def get_dashboard_stats(db: Session, invitation_id: int) -> DashboardStatsResponse:
        rsvps = db.query(GuestRSVP).filter(GuestRSVP.invitation_id == invitation_id).all()

        total_responses = len(rsvps)
        attending_parties = sum(1 for r in rsvps if r.attendance_status == "attending")
        declined_parties = sum(1 for r in rsvps if r.attendance_status == "declined")
        tentative_parties = sum(1 for r in rsvps if r.attendance_status == "tentative")
        total_attending_guests = sum(r.guest_count for r in rsvps if r.attendance_status == "attending")

        # 10 guests per table is standard for Cambodian wedding feasts
        estimated_tables = math.ceil(total_attending_guests / 10.0) if total_attending_guests > 0 else 0
        recent_wishes_count = sum(1 for r in rsvps if r.wishes and r.wishes.strip())

        return DashboardStatsResponse(
            invitation_id=invitation_id,
            total_responses=total_responses,
            total_attending_guests=total_attending_guests,
            attending_parties=attending_parties,
            declined_parties=declined_parties,
            tentative_parties=tentative_parties,
            estimated_tables=estimated_tables,
            recent_wishes_count=recent_wishes_count,
        )
