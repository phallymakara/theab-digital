"""
Rate Limiter Configuration for Digital Theab API.
Provides in-memory IP-based rate limiting to protect against abuse and spam.
"""

from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request
from fastapi.responses import JSONResponse

# Create global Limiter keyed by client IP
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["120/minute"],
    headers_enabled=False,
)


def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    """
    User-friendly error response in Khmer & English when rate limits are exceeded.
    """
    return JSONResponse(
        status_code=429,
        content={
            "detail": "សំណើច្រើនពេក សូមព្យាយាមម្តងទៀតនៅពេលបន្តិចក្រោយ (Too many requests, please try again shortly)",
            "retry_after": str(exc.detail),
        },
    )
