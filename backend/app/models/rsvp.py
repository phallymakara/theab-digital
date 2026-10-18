from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base


class GuestRSVP(Base):
    __tablename__ = "guest_rsvps"

    id = Column(Integer, primary_key=True, index=True)
    invitation_id = Column(Integer, ForeignKey("invitations.id"), nullable=False, index=True)
    guest_name = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=True)
    attendance_status = Column(String(30), nullable=False, default="attending")  # attending, declined, tentative
    guest_count = Column(Integer, default=1)
    wishes = Column(Text, nullable=True)
    source = Column(String(50), default="direct")  # direct, telegram, qr_code
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    invitation = relationship("Invitation", back_populates="rsvps")
