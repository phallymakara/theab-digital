# Digital Theab (ធៀបឌីជីថល) - Khmer Traditional Digital Invitation Platform

A full-stack, luxury digital invitation platform for Cambodian ceremonies (Weddings, Engagements, Housewarmings) featuring responsive live mobile mockup, guest RSVP tracking, seating table calculations, and QR code sharing.

---

## 🏗️ Architecture Overview

### 1. Frontend: Pure ES6 MVC Architecture
Located in [`frontend/`](file:///Users/macbook/Documents/02_Personal/01_Project/theab-digital/frontend) powered by Vite.

```
frontend/
├── index.html                     # Entry HTML with authentic Khmer fonts (Moul, Kantumruy Pro, Battambang)
├── vite.config.js                 # Dev server config & API proxy to FastAPI
└── src/
    ├── main.js                    # Application bootstrap
    ├── styles/
    │   └── main.css               # Luxury Khmer aesthetics, gold/crimson palettes, glassmorphism
    ├── services/
    │   └── apiService.js          # REST client communicating with FastAPI backend
    ├── models/                    # [M]ODELS: State & Business data (Observable Pub/Sub)
    │   ├── BaseModel.js           # Generic Observable/Event emitter
    │   ├── AppModel.js            # Global view state, step navigation, theme & modals
    │   ├── InvitationModel.js     # Invitation fields, ceremony presets, API sync
    │   ├── RsvpModel.js           # Guest list, status filters, search & RSVP submissions
    │   └── DashboardModel.js      # Analytics, guest counts, estimated tables (10 guests/table)
    ├── views/                     # [V]IEWS: Render DOM & UI components
    │   ├── BaseView.js            # Base view class
    │   ├── HeaderView.js          # Top navigation bar, step tabs, quick actions
    │   ├── Step1CeremonyView.js   # Ceremony selection (Wedding, Engagement, Housewarming)
    │   ├── Step2EditorView.js     # Invitation customization & Live Phone Mockup preview
    │   ├── Step3GuestView.js      # Public guest invitation page, countdown timer, & RSVP form
    │   ├── Step4DashboardView.js  # Host dashboard: guest management table, tables counter & wishes wall
    │   ├── QrModalView.js         # QR code display & download modal
    │   └── ToastView.js           # Toast notification feedback
    └── controllers/               # [C]ONTROLLERS: Orchestration & Event handling
        ├── AppController.js       # Main application coordinator
        ├── InvitationController.js# Ceremony selection & editor input handler
        ├── RsvpController.js      # RSVP submission & celebratory confetti
        └── DashboardController.js # Guest filtering, search, add, & deletion
```

---

### 2. Backend: Clean Layered FastAPI Architecture
Located in [`backend/`](file:///Users/macbook/Documents/02_Personal/01_Project/theab-digital/backend) powered by Python & `uv`.

```
backend/
├── pyproject.toml                 # Dependencies managed with uv
├── app/
│   ├── main.py                    # FastAPI application, CORS, database lifecycle & auto-seeding
│   ├── core/
│   │   └── config.py              # Application settings via Pydantic Settings
│   ├── db/
│   │   └── database.py            # SQLite database engine, Base model & session management
│   ├── models/                    # SQLAlchemy database models
│   │   ├── invitation.py          # Invitations table schema & relations
│   │   └── rsvp.py                # Guest RSVPs table schema
│   ├── schemas/                   # Pydantic v2 schemas for request validation & serialization
│   │   ├── invitation.py
│   │   ├── rsvp.py
│   │   └── stats.py
│   ├── services/                  # Business logic layer
│   │   ├── invitation_service.py  # Invitation operations & seed logic
│   │   ├── rsvp_service.py        # Guest RSVP operations
│   │   └── stats_service.py       # Metrics & banquet tables calculation
│   └── routers/                   # REST API routes
│       ├── invitations.py         # /api/v1/invitations, /seed, and /{id}/qr (QR code image generator)
│       ├── rsvps.py               # /api/v1/invitations/{id}/rsvps
│       └── stats.py               # /api/v1/invitations/{id}/stats
```

---

## 🚀 Running the Project

### Start Backend (FastAPI with uv)
```bash
cd backend

# 1. Sync & install dependencies using uv
uv sync

# 2. Run the development server
uv run dev
# or alternatively:
# uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
```

#### Managing Libraries with `uv`
- **Add a library**: `uv add <package-name>` (e.g. `uv add httpx`)
- **Add a dev tool**: `uv add --dev pytest ruff`
- **Remove a library**: `uv remove <package-name>`
- **Lock & Sync all dependencies**: `uv sync`
- **Run any Python command in venv**: `uv run python script.py`
- **Export requirements.txt**: `uv export --no-hashes -o requirements.txt`
- API Docs (Swagger UI): `http://127.0.0.1:8001/api/v1/docs`
- Health check: `http://127.0.0.1:8001/health`

### Start Frontend (Vite)
```bash
cd frontend
npm run dev
```
- Web Application: `http://localhost:5174`
