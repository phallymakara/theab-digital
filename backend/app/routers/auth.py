from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.routers.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, UserResponse, Token
from app.core.security import hash_password, verify_password, create_access_token
from app.core.limiter import limiter

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def register_user(request: Request, data: UserRegister, db: Session = Depends(get_db)):
    """Register a new user account and return JWT access token."""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == data.email.lower().strip()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="អ៊ីមែលនេះមានក្នុងប្រព័ន្ធរួចរាល់ហើយ សូមចូលប្រើប្រាស់គណនី (Email already registered)"
        )

    # Hash password & create user
    new_user = User(
        email=data.email.lower().strip(),
        hashed_password=hash_password(data.password),
        full_name=data.full_name.strip(),
        phone=data.phone.strip() if data.phone else None,
        avatar_url=data.avatar_url,
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Issue JWT Token
    access_token = create_access_token(subject=new_user.id)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(new_user)
    )


@router.post("/login", response_model=Token)
@limiter.limit("10/minute")
def login_user(request: Request, data: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user with email and password, returning JWT access token."""
    user = db.query(User).filter(User.email == data.email.lower().strip()).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ (Incorrect email or password)",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="គណនីនេះត្រូវបានបិទដំណើរការជាបណ្ដោះអាសន្ន (Account is deactivated)"
        )

    access_token = create_access_token(subject=user.id)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.get("/me", response_model=UserResponse)
def get_authenticated_user_profile(current_user: User = Depends(get_current_user)):
    """Get currently logged-in user profile."""
    return current_user
