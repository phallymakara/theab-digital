import sys
from pathlib import Path
import pytest
from fastapi.testclient import TestClient

# Ensure backend root is on sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.main import app
from app.core.config import Settings


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as test_client:
        yield test_client


def test_health_check_deep_probe(client):
    """Verify deep health check endpoint pings DB and returns readiness info."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"
    assert data["storage"] in ("local", "r2")
    assert "environment" in data


def test_security_headers_middleware(client):
    """Verify custom security headers are injected into all HTTP responses."""
    response = client.get("/")
    assert response.status_code == 200
    headers = response.headers
    assert headers.get("x-content-type-options") == "nosniff"
    assert headers.get("x-frame-options") == "SAMEORIGIN"
    assert headers.get("x-xss-protection") == "1; mode=block"
    assert headers.get("referrer-policy") == "strict-origin-when-cross-origin"


def test_database_url_normalization():
    """Verify legacy postgres:// URLs are converted to modern postgresql://."""
    legacy_url = "postgres://user:password123@ep-cool-db.neon.tech/theab_prod?sslmode=require"
    normalized = Settings.normalize_db_url(legacy_url)
    assert normalized.startswith("postgresql://")
    assert "user:password123@ep-cool-db.neon.tech/theab_prod" in normalized

    # SQLite URLs should remain unchanged
    sqlite_url = "sqlite:///local_test.db"
    assert Settings.normalize_db_url(sqlite_url) == sqlite_url


def test_cors_origins_flexible_parser():
    """Verify comma-separated string of CORS domains is parsed into a list."""
    raw_env_cors = "https://theab-digital.vercel.app, https://theabdigital.com, http://localhost:3000"
    parsed = Settings.parse_cors_origins(raw_env_cors)
    assert parsed == [
        "https://theab-digital.vercel.app",
        "https://theabdigital.com",
        "http://localhost:3000",
    ]


def test_rate_limiting_abuse_prevention(client):
    """
    Verify rate limiter blocks burst requests exceeding thresholds with HTTP 429
    and returns a user-friendly Khmer error message.
    """
    # The login endpoint limit is 10 requests per minute
    # Send 12 rapid login attempts
    rate_limited = False
    for i in range(13):
        res = client.post(
            "/api/v1/auth/login",
            json={"email": f"bot_attacker_{i}@example.com", "password": "wrongpassword"}
        )
        if res.status_code == 429:
            rate_limited = True
            body = res.json()
            assert "សំណើច្រើនពេក" in body["detail"]
            break

    assert rate_limited is True, "Rate limiter should have triggered HTTP 429 for rapid burst requests"
