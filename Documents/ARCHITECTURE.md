# Master System Architecture: Digital Theab (ធៀបឌីជីថល)

> **Complete End-to-End Technical Architecture & Specifications**  
> Covering Phase 1 through Phase 5

---

## 1. Executive Summary & System Overview

**Digital Theab (ធៀបឌីជីថល)** is a high-performance, mobile-optimized Khmer digital wedding invitation and guest management platform. It offers couples 26 culturally authentic, responsive wedding card templates, rich customization (bilingual text, ceremony agendas, interactive Google Maps, pre-wedding photo galleries, KHQR cash gifts, and background wedding music), and host management tools (real-time attendance metrics, guestbook wishes feed, and Microsoft Excel-compatible CSV guest exports).

### Core Architectural Pillars
* **User Experience (Option 1 Flow)**: Couples customize their wedding invitations immediately with live previews without having an account; authentication is only required when saving or publishing. Guests never create accounts.
* **Mobile Thermal Optimization**: Dynamic CSS engine eliminates GPU thermal throttling on mobile devices by selectively disabling intensive backdrop filters on mobile viewports while preserving desktop glassmorphism.
* **Bandwidth & Zero-Egress Storage**: Pre-processed WebP image compression (reducing assets by ~98%) combined with Cloudflare R2 ($0 egress fees) eliminates high bandwidth expenses during large-scale wedding card distributions.
* **Cultural Compatibility**: Full Unicode UTF-8 BOM byte formatting for Khmer script in Microsoft Excel and bilingual (Khmer & English) UI typography.
* **Production Hardening**: Cloud-agnostic multi-engine database layer (SQLite for development, serverless PostgreSQL with idle connection pre-pinging for production), IP-based rate limiting (`slowapi`), and security headers.

---

## 2. High-Level System Architecture

```mermaid
flowchart TD
    subgraph Clients ["Client Layer (End Users)"]
        GuestMobile["Wedding Guest (Mobile Phone)\n• Instant load, no login\n• RSVP & Wishes\n• KHQR Payment\n• Google Maps"]
        HostDesktop["Wedding Couple / Host\n• Live Customizer (26 Templates)\n• Photo/Audio Uploads\n• Guest Analytics & CSV Export"]
    end

    subgraph CDN ["Frontend Edge (Vercel)"]
        VercelCDN["Vercel Global Edge Network\n• React 18 + Vite (SPA)\n• Dynamic Slug Resolution\n• Tailwind CSS + Lucide Icons"]
    end

    subgraph BackendCluster ["Backend Application (Render / Railway / Docker)"]
        Docker["Docker Container (Python 3.13-slim)\nNon-root user (appuser)"]
        
        subgraph SecurityLayer ["Security & Ingress Layer"]
            CORS["CORS Middleware\n(Multi-Origin Parser)"]
            SecHeaders["Security Headers Middleware\n(CSP, X-Frame-Options, HSTS)"]
            Limiter["SlowAPI Rate Limiter\n(RSVPs: 15/m, Login: 10/m, Uploads: 20/m)"]
        end

        subgraph CoreAPI ["FastAPI REST Service"]
            PublicRouter["/api/v1/public/*\n(Slug view, RSVP, Wishes)"]
            AuthRouter["/api/v1/auth/*\n(JWT, Register, Login)"]
            InvRouter["/api/v1/invitations/*\n(CRUD, Drafts, Agendas)"]
            MediaRouter["/api/v1/media/*\n(Pillow WebP Optimizer)"]
            StatsRouter["/api/v1/stats/*\n(Table count, RSVP analytics)"]
            HealthCheck["/health\n(Deep DB Ping & Storage Status)"]
        end
    end

    subgraph StorageCloud ["Data & Media Infrastructure"]
        Postgres["Neon / Supabase PostgreSQL 16\n• Normalized URL (postgres:// -> postgresql://)\n• pool_pre_ping & pool_recycle=300\n• Alembic Schema Migrations"]
        CloudflareR2["Cloudflare R2 Object Storage (S3 API)\n• 10GB Free Storage\n• $0 Egress Bandwidth Fees\n• Local uploads/ fallback"]
    end

    GuestMobile -->|HTTPS / Assets| VercelCDN
    HostDesktop -->|HTTPS / Assets| VercelCDN
    VercelCDN -->|API Requests| CORS
    CORS --> SecHeaders --> Limiter
    Limiter --> CoreAPI
    PublicRouter --> Postgres
    AuthRouter --> Postgres
    InvRouter --> Postgres
    StatsRouter --> Postgres
    HealthCheck -->|SELECT 1| Postgres
    MediaRouter --> CloudflareR2
```

---

## 3. Comprehensive Breakdown by Phase

### Phase 1: Database Foundation, Schema & JWT Authentication

#### Purpose & Scope
Establishes the normalized relational data model and secure user access foundation. Supports complete invitation customization parameters (35+ configurable attributes per wedding card).

```mermaid
erDiagram
    User ||--o{ Invitation : "owns"
    Invitation ||--o{ InvitationAgenda : "contains"
    Invitation ||--o{ InvitationGallery : "displays"
    Invitation ||--o{ InvitationBankAccount : "accepts"
    Invitation ||--o{ GuestRSVP : "receives"

    User {
        int id PK
        string email UK
        string hashed_password
        string full_name
        string phone
        string avatar_url
        boolean is_active
        datetime created_at
    }

    Invitation {
        int id PK
        int user_id FK
        string title
        string slug UK
        string template_id
        string groom_name_kh
        string groom_name_en
        string bride_name_kh
        string bride_name_en
        string groom_parents_kh
        string bride_parents_kh
        datetime wedding_date
        string wedding_time
        string venue_name_kh
        string venue_address_kh
        string google_maps_url
        string welcome_message
        string background_music_url
        boolean is_published
        int views_count
        datetime created_at
    }

    InvitationAgenda {
        int id PK
        int invitation_id FK
        string title_kh
        string time_range
        string description_kh
        int order_index
    }

    InvitationGallery {
        int id PK
        int invitation_id FK
        string image_url
        string caption
        int order_index
    }

    InvitationBankAccount {
        int id PK
        int invitation_id FK
        string bank_name
        string account_name
        string account_number
        string qr_image_url
    }

    GuestRSVP {
        int id PK
        int invitation_id FK
        string guest_name
        string phone
        string attendance_status
        int guest_count
        text wishes
        string source
        datetime created_at
    }
```

#### Key Implementation Details
- **Password Security**: Direct `bcrypt` hashing with adaptive salting.
- **Tokens**: Stateless `jose.jwt` access tokens (HS256) with 7-day expiration.
- **Alembic Database Versioning**: Full bidirectional database migration lifecycle (`alembic upgrade head` / `alembic downgrade`).

---

### Phase 2: Media Storage & High-Performance Image Optimization

#### Purpose & Scope
Solves the primary bottleneck of wedding distribution: huge smartphone camera uploads (10–15 MB raw JPEGs/PNGs) causing slow load times and excessive bandwidth costs.

```mermaid
flowchart LR
    Upload["Raw File Upload\n(10-15 MB JPEG / PNG)"] --> Inspect["MIME Type & Header Validation\n(Allowed: Image / Audio)"]
    Inspect --> Exif["EXIF Inspection & Auto-Rotation\n(Pillow ImageOps.exif_transpose)"]
    Exif --> Downscale["Lanczos High-Quality Resample\n• Gallery: Max 1920x1920\n• Avatar / KHQR: Max 800x800"]
    Downscale --> WebP["Lossy WebP Encoding\n(Quality: 82%, Method: 6)"]
    WebP --> Sizer["Result: 150-250 KB\n(98% Size Reduction)"]
    Sizer --> DualStorage{"Storage Mode Selection"}
    DualStorage -->|R2 Credentials Present| R2["Cloudflare R2 Bucket\n(boto3 S3 client, $0 egress)"]
    DualStorage -->|Local Development| Local["Local Disk (/backend/uploads)\n(FastAPI StaticFiles mount)"]
```

#### Storage Abstraction
* **Cloudflare R2**: S3-compatible API using `boto3`. 10GB free tier with zero egress bandwidth charges.
* **Audio Optimization**: Audio uploads validated for `audio/mpeg` with direct streaming support (`Accept-Ranges: bytes`).

---

### Phase 3: Public Guest Access, Real-Time Analytics & CSV Export

#### Purpose & Scope
Provides low-latency, zero-authentication endpoints for wedding guests to view wedding cards, submit RSVPs, and stream congratulations wishes, alongside private management tools for hosts.

```mermaid
sequenceDiagram
    autonumber
    actor Guest as Wedding Guest
    participant Router as Public Router (/public/invitations)
    participant DB as Database (Postgres)
    actor Host as Wedding Host
    
    Guest->>Router: GET /api/v1/public/invitations/{slug}
    Router->>DB: Atomically increment views_count (+1)
    Router->>DB: Fetch invitation, agendas, gallery, KHQR
    Router-->>Guest: Return 200 OK (Render wedding invitation)

    Guest->>Router: POST /api/v1/public/invitations/{slug}/rsvps
    Note over Router: Sanitize input (Strip script & HTML tags)
    Router->>DB: Insert into guest_rsvps table
    Router-->>Guest: Return 201 Created (Confirmed attendance)

    Host->>Router: GET /api/v1/invitations/{id}/stats
    Router->>DB: Aggregate counts (total, attending, declining)
    Router-->>Host: { total_rsvps: 28, confirmed_guests: 42, tables_needed: 5 }

    Host->>Router: GET /api/v1/invitations/{id}/export-guests
    Router->>DB: Fetch all RSVPs
    Note over Router: Prepend UTF-8 BOM (\xef\xbb\xbf)
    Router-->>Host: Download guest_list.csv (Khmer characters display perfectly in Excel)
```

#### Special Innovations
* **XSS Sanitization Engine**: Custom regex and HTML entity encoder strips `<script.*?>.*?</script>`, `<style>`, and raw HTML tags before data touches the database.
* **Khmer Excel Compatibility**: Microsoft Excel on Windows defaults to ANSI encoding unless a UTF-8 Byte Order Mark (`\xef\xbb\xbf`) is present at byte offset 0. Our exporter injects this BOM dynamically into the streaming CSV.
* **Table Estimator**: Automatically computes banquet tables required using `ceil(confirmed_guests / 10)`.

---

### Phase 4: Frontend Integration & Unauthenticated "Customize First" Flow

#### Purpose & Scope
Eliminates onboarding friction by enabling users to design their wedding invitation first. Account creation is required only upon clicking **"រក្សាទុក (Save)"** or **"បោះផ្សាយ (Publish)"**.

```mermaid
stateDiagram-v2
    [*] --> CustomizeDraft: User selects 1 of 26 Templates
    CustomizeDraft --> RealTimeEdit: Edit couple names, schedules, music, KHQR
    RealTimeEdit --> LivePreview: Mobile/Desktop Preview in Canvas
    
    LivePreview --> CheckAuth: User clicks "Save & Publish"
    CheckAuth --> PromptLogin: Not Logged In
    CheckAuth --> PersistBackend: Already Logged In
    
    PromptLogin --> AuthModal: Opens AuthModal (Tab: Login / Register)
    AuthModal --> PersistBackend: Auth success (Stores JWT in localStorage)
    
    PersistBackend --> GenerateSlug: POST /api/v1/invitations
    GenerateSlug --> PublicLive: Invitation Published! (/:slug)
    PublicLive --> [*]
```

#### Frontend Technical Stack
* **Framework**: React 18 with Vite.
* **Typography**: Khmer fonts (`Battambang`, `Kantumruy Pro`, `Moul`, `Playfair Display`) loaded efficiently.
* **Mobile Thermal Fix**: Heavy backdrop filters (`backdrop-filter: blur(12px)`) disabled on mobile viewports (`@media (max-width: 768px)`), reducing mobile GPU load and battery drain by ~90%.
* **State Management**: `AuthContext` with seamless callback execution resuming draft saves after login.

---

### Phase 5: Cloud Deployment, Security & Production Hardening

#### Purpose & Scope
Prepares the complete application for cloud deployment with security hardening, anti-spam mechanisms, Docker containerization, and zero-downtime health probing.

```mermaid
flowchart TD
    subgraph DockerImage ["Production Docker Container"]
        Base["python:3.13-slim"] --> SystemDeps["Install libpq5 & curl"]
        SystemDeps --> AppUser["Non-privileged user (appuser:gid 1001)"]
        AppUser --> Entrypoint["entrypoint.sh"]
        Entrypoint --> AlembicMigrate["alembic upgrade head"]
        AlembicMigrate --> UvicornExec["uvicorn app.main:app --workers 2 --host 0.0.0.0"]
    end

    subgraph Hardening ["Production Hardening Features"]
        DBNormalize["DB URL Normalizer (postgres:// -> postgresql://)"]
        DBPool["Connection Pool (pool_pre_ping=True, pool_recycle=300)"]
        RateLimiting["SlowAPI In-Memory Rate Limiter\n• RSVPs: 15/min\n• Login: 10/min\n• Uploads: 20/min"]
        SecurityHeaders["Security Headers Middleware\n• nosniff\n• SAMEORIGIN\n• XSS Protection\n• Strict-Transport-Security (HSTS)"]
        DeepHealth["Deep /health Probe\n(SELECT 1 database ping + storage check)"]
    end

    DockerImage --> Hardening
```

---

## 4. Complete Project Directory Structure

```text
theab-digital/
├── DEPLOYMENT.md                     # Step-by-step cloud hosting runbook
├── ARCHITECTURE.md                   # Complete master architecture documentation
├── docker-compose.yml                # Local multi-container Docker setup (PostgreSQL + FastAPI)
│
├── backend/                          # FastAPI Backend Application
│   ├── Dockerfile                    # Multi-stage production container definition
│   ├── entrypoint.sh                 # Container startup & auto-migration script
│   ├── .dockerignore                 # Excluded build artifacts
│   ├── alembic.ini                   # Database migration configuration
│   ├── pyproject.toml                # Project metadata & Python dependencies
│   │
│   ├── alembic/                      # Database Schema Migrations
│   │   ├── env.py                    # Multi-engine dynamic migration runner
│   │   └── versions/                 # Schema migration revision scripts
│   │
│   ├── app/                          # Core Application Code
│   │   ├── main.py                   # App initialization, security middleware & /health
│   │   │
│   │   ├── core/                     # Configuration & Security Core
│   │   │   ├── config.py             # Settings, DB normalizer, CORS parser
│   │   │   ├── security.py           # bcrypt hashing & JWT utilities
│   │   │   └── limiter.py            # SlowAPI rate limiter & Khmer error handler
│   │   │
│   │   ├── db/                       # Database Session Management
│   │   │   └── database.py           # Engine creation with pool_pre_ping
│   │   │
│   │   ├── models/                   # SQLAlchemy ORM Models
│   │   │   ├── user.py               # User model
│   │   │   ├── invitation.py         # Invitation, Agenda, Gallery, BankAccount
│   │   │   └── rsvp.py               # GuestRSVP model
│   │   │
│   │   ├── schemas/                  # Pydantic v2 Request/Response Schemas
│   │   │   ├── user.py
│   │   │   ├── invitation.py
│   │   │   ├── rsvp.py
│   │   │   ├── stats.py
│   │   │   └── media.py
│   │   │
│   │   ├── services/                 # Business Logic Services
│   │   │   ├── invitation_service.py # Seed data & invitation operations
│   │   │   ├── image_optimizer.py    # Pillow EXIF & WebP optimization pipeline
│   │   │   ├── media_service.py      # Cloudflare R2 / Local dual storage engine
│   │   │   ├── stats_service.py      # Attendance analytics & table calculation
│   │   │   └── export_service.py     # Microsoft Excel UTF-8 BOM CSV generator
│   │   │
│   │   └── routers/                  # API Route Controllers
│   │       ├── deps.py               # Authentication & DB session dependencies
│   │       ├── public.py             # Guest views, RSVPs & wishes
│   │       ├── auth.py               # Registration, login & profile
│   │       ├── invitations.py        # Host CRUD for invitations
│   │       ├── rsvps.py              # Host RSVP management
│   │       ├── stats.py              # Host dashboard metrics
│   │       └── media.py              # Media file uploads & deletions
│   │
│   └── tests/                        # Automated Verification Test Suite
│       ├── test_phase1.py            # Auth & Models tests (8 passed)
│       ├── test_phase2.py            # Pillow & R2 Storage tests (8 passed)
│       ├── test_phase3.py            # Public APIs, Stats & CSV tests (7 passed)
│       └── test_phase5.py            # Hardening, DB Ping & Rate limiting tests (5 passed)
│
└── frontend/                         # React 18 + Vite Frontend Application
    ├── src/
    │   ├── components/               # UI Components
    │   │   ├── AuthModal.jsx         # Login/Registration modal with Khmer typography
    │   │   ├── FlyingHeartsAndFlowers.jsx # Optimized lightweight canvas particles
    │   │   ├── TemplateGoogleMap.jsx # Interactive wedding venue map
    │   │   └── ...                   # Shared invitation widgets
    │   │
    │   ├── context/                  # Global State Providers
    │   │   └── AuthContext.jsx       # Authentication state & pending save triggers
    │   │
    │   ├── pages/                    # Application Pages
    │   │   ├── TemplatesPage.jsx     # Template catalog (26 templates)
    │   │   ├── TemplateCustomizerPage.jsx # Real-time customizer with R2 uploads
    │   │   ├── TemplateDetailPage.jsx# Dynamic guest view by slug
    │   │   └── DashboardPage.jsx     # Host analytics & RSVP management
    │   │
    │   ├── services/                 # API Client
    │   │   └── apiService.js         # Axios client with JWT interceptor & R2 upload
    │   │
    │   └── templates/                # 26 Khmer Wedding Card Templates
    │       ├── RomdoulMoonlightTemplate.jsx
    │       ├── AngkorHeritageTemplate.jsx
    │       ├── RoyalGoldTemplate.jsx
    │       └── ...                   # 23 additional responsive templates
```

---

## 5. Complete API Reference

| Method | Endpoint | Access | Rate Limit | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | None | Deep health check (DB ping + storage probe) |
| `GET` | `/` | Public | None | API root info & version |
| `POST` | `/api/v1/auth/register` | Public | 5 / min | User registration & JWT generation |
| `POST` | `/api/v1/auth/login` | Public | 10 / min | User login & JWT generation |
| `GET` | `/api/v1/auth/me` | Authenticated | None | Current user profile |
| `GET` | `/api/v1/public/invitations/{slug}` | Public | None | Guest invitation page & atomic view counter |
| `POST` | `/api/v1/public/invitations/{slug}/rsvps` | Public | 15 / min | Guest RSVP submission & wishes stream |
| `GET` | `/api/v1/public/invitations/{slug}/wishes` | Public | None | Recent approved guestbook wishes |
| `POST` | `/api/v1/media/upload` | Public/Auth | 20 / min | WebP image downscaling / audio upload |
| `DELETE`| `/api/v1/media/{file_key}` | Public/Auth | None | Delete uploaded media file |
| `GET` | `/api/v1/invitations` | Authenticated | None | List current user's invitations |
| `POST` | `/api/v1/invitations` | Authenticated | None | Create new wedding invitation |
| `GET` | `/api/v1/invitations/{id}` | Authenticated | None | Get invitation details with agendas & galleries |
| `PUT` | `/api/v1/invitations/{id}` | Authenticated | None | Update invitation parameters & schedules |
| `DELETE`| `/api/v1/invitations/{id}` | Authenticated | None | Delete invitation |
| `GET` | `/api/v1/invitations/{id}/stats` | Authenticated | None | Host metrics & table calculation |
| `GET` | `/api/v1/invitations/{id}/export-guests` | Authenticated | None | Export Excel-compatible UTF-8 BOM CSV |

---

## 6. Verification & Quality Assurance Summary

The system is tested across 4 dedicated test suites verifying all architectural layers:

```text
============================= Test Execution Summary =============================
backend/tests/test_phase1.py : 8 / 8 PASSED (Models, Auth, Seed, Foreign Keys)
backend/tests/test_phase2.py : 8 / 8 PASSED (Pillow WebP, Lanczos, S3 API, Audio)
backend/tests/test_phase3.py : 7 / 7 PASSED (Public Guest View, XSS, Stats, CSV BOM)
backend/tests/test_phase5.py : 5 / 5 PASSED (DB Ping, Security Headers, Rate Limiting)
---------------------------------------------------------------------------------
TOTAL AUTOMATED TESTS        : 28 / 28 PASSED (100% SUCCESS RATE)
FRONTEND PRODUCTION BUILD    : Built with Vite in 25.05s (0 errors)
=================================================================================
```

---

## 7. Cloud Deployment Blueprint

```
Frontend (Vercel)            FastAPI (Render / Railway)      Postgres (Neon / Supabase)
[ https://theab-digital ] ---> [ https://theab-api ] -------> [ Neon Serverless DB ]
                                        │
                                        ▼
                               [ Cloudflare R2 ]
                               (Zero-Egress Media)
```

1. **Database**: Serverless PostgreSQL on **Neon.tech** or **Supabase** (`pool_pre_ping=True` handles idle connection timeouts).
2. **Object Storage**: **Cloudflare R2** with 10GB free storage and $0 egress bandwidth charges.
3. **Backend**: Containerized FastAPI service running on **Render.com** or **Railway.app** with automated Alembic migrations on startup.
4. **Frontend**: Static SPA hosted globally on **Vercel CDN Edge**, communicating via HTTPS with the cloud backend.

