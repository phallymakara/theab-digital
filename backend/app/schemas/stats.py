from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    invitation_id: int
    views_count: int = 0
    total_responses: int = 0
    total_attending_guests: int = 0
    attending_parties: int = 0
    declined_parties: int = 0
    tentative_parties: int = 0
    estimated_tables: int = 0  # computed at 10 seats per table
    recent_wishes_count: int = 0

    class Config:
        from_attributes = True
