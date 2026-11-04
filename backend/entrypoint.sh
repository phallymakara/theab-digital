#!/bin/sh
set -e

echo "==> Running database migrations with Alembic..."
alembic upgrade head || {
    echo "Warning: Alembic migration failed or was not required, proceeding to app launch..."
}

echo "==> Starting Digital Theab FastAPI server on port ${PORT:-8000}..."
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}" --workers 2

