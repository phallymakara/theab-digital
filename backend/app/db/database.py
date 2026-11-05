from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

# Configure engine with pooling and resilience
engine_kwargs = {"echo": False}

# Normalize URL for SQLAlchemy compatibility (handle postgres:// -> postgresql://)
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if "sqlite" in db_url:
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    # PostgreSQL / Cloud DB connection resiliency
    engine_kwargs.update({
        "pool_pre_ping": True,
        "pool_recycle": 300,
        "pool_size": 10,
        "max_overflow": 20,
    })

engine = create_engine(db_url, **engine_kwargs)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
