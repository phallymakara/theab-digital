# Digital Theab (ធៀបឌីជីថល) - Production Cloud Deployment Guide

This guide details how to deploy Digital Theab to production using free and cost-effective cloud services with zero egress charges.

```
                  ┌───────────────────────────────┐
                  │        Vercel (Frontend)      │
                  │  https://theab-digital.vercel.app  │
                  └───────────────┬───────────────┘
                                  │ HTTPS
                                  ▼
                  ┌───────────────────────────────┐
                  │    Render / Railway (FastAPI) │
                  │  https://theab-api.onrender.com│
                  └───┬───────────────────────┬───┘
                      │                       │
                      ▼                       ▼
       ┌────────────────────────┐   ┌────────────────────────┐
       │   PostgreSQL (Neon)    │   │  Cloudflare R2 Media   │
       │ Serverless Free 0.5GB  │   │ 10GB Free, \$0 Egress   │
       └────────────────────────┘   └────────────────────────┘
```

---

## 1. Cloud Database: Neon (or Supabase)

### Step 1.1: Create Neon Project
1. Go to [Neon.tech](https://neon.tech) and sign up / log in with GitHub.
2. Click **Create Project** -> Name it `theab-digital` -> Select Region (e.g. `Singapore (ap-southeast-1)`).
3. Under **Connection Details**, select **SQLAlchemy** or **Connection String**.
4. Copy the connection string (it looks like: `postgresql://user:password@ep-xyz.ap-southeast-1.neon.tech/theab-digital?sslmode=require`).

> [!NOTE]
> Our backend automatically normalizes `postgres://` to `postgresql://` and includes connection pooling with `pool_pre_ping=True` to handle Neon's serverless idle timeouts.

---

## 2. Media Storage: Cloudflare R2

Cloudflare R2 provides 10GB free storage and **zero egress fees**, ensuring high wedding card traffic never incurs bandwidth charges.

### Step 2.1: Create R2 Bucket
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) -> Navigate to **R2**.
2. Click **Create bucket** -> Name: `theab-digital-media` -> Location: `Automatic` (or APAC).
3. Go to bucket **Settings** -> **Public access**:
   - Either click **Allow Access** under *R2.dev subdomain* (e.g., `https://pub-abc123.r2.dev`),
   - Or connect your custom domain (e.g., `https://media.theabdigital.com`).

### Step 2.2: Create API Tokens
1. In the R2 Overview page, click **Manage R2 API Tokens** -> **Create API token**.
2. Permissions: **Admin Read & Write**.
3. Copy:
   - **Account ID** (found on the right sidebar of R2 overview)
   - **Access Key ID**
   - **Secret Access Key**

---

## 3. Backend Deployment: Render (or Railway)

### Option A: Render.com (Recommended - Free Web Service)
1. Log in to [Render.com](https://render.com) and click **New +** -> **Web Service**.
2. Connect your GitHub repository: `theab-digital`.
3. Set configuration:
   - **Name**: `theab-digital-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker` (Render will automatically detect `backend/Dockerfile`), or `Python 3`
   - **Plan**: `Free`
4. In **Environment Variables**, add:
   ```env
   DATABASE_URL=postgresql://user:password@ep-xyz.ap-southeast-1.neon.tech/theab-digital?sslmode=require
   SECRET_KEY=generate-with-openssl-rand-hex-32
   ENVIRONMENT=production
   CORS_ORIGINS=https://theab-digital.vercel.app,http://localhost:5173
   R2_ACCOUNT_ID=your_cloudflare_account_id
   R2_ACCESS_KEY_ID=your_r2_access_key_id
   R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
   R2_BUCKET_NAME=theab-digital-media
   R2_PUBLIC_URL=https://pub-abc123.r2.dev
   ```
5. Click **Create Web Service**.
6. Render builds the Docker container, runs Alembic migrations automatically via `entrypoint.sh`, and starts Uvicorn.
7. Once deployed, verify by opening `https://theab-digital-api.onrender.com/health`. You will see:
   ```json
   {
     "status": "ok",
     "database": "connected",
     "storage": "r2",
     "environment": "production"
   }
   ```

---

## 4. Frontend Deployment: Vercel

1. Log in to [Vercel](https://vercel.com) -> **Add New...** -> **Project**.
2. Import the `theab-digital` repository.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   ```env
   VITE_API_BASE_URL=https://theab-digital-api.onrender.com
   ```
5. Click **Deploy**.

---

## 5. Local Docker Execution (Optional)

To test the entire stack locally with PostgreSQL:

```bash
# Build and run Postgres + FastAPI backend
docker-compose up --build

# In a separate terminal, test the health check:
curl http://localhost:8000/health
```

---

## 6. Security & Hardening Features Included

- **Automatic Rate Limiting**: In-memory IP protection against spam bots (15 RSVPs/min, 10 logins/min, 20 media uploads/min).
- **Security Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Strict-Transport-Security`.
- **XSS Sanitization**: Strips `<script>`, `<style>`, and raw HTML from all guest wishes and RSVPs.
- **Khmer Excel Compatibility**: Automatic UTF-8 BOM byte injection (`\xef\xbb\xbf`) on CSV downloads for Microsoft Excel.

