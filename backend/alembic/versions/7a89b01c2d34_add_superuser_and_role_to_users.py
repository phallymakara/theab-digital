"""add superuser and role to users

Revision ID: 7a89b01c2d34
Revises: 62510c6bf146
Create Date: 2026-11-06 13:22:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7a89b01c2d34'
down_revision: Union[str, None] = '62510c6bf146'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Use execute with IF NOT EXISTS to guarantee idempotent migration on PostgreSQL
    op.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_superuser BOOLEAN DEFAULT FALSE")
    op.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'")


def downgrade() -> None:
    op.drop_column('users', 'role')
    op.drop_column('users', 'is_superuser')

