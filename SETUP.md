# SkillXChange Setup Guide

A full-stack platform with Next.js frontend, FastAPI backend, and Neon PostgreSQL database.

## Prerequisites

- Python 3.10+ (for backend)
- Node.js 18+ (for frontend)
- Git
- A Neon PostgreSQL account (free tier available at [neon.tech](https://neon.tech))

## Quick Start (Local Development)

### 1. Clone and Install

```bash
git clone https://github.com/felix-10fb/SkillXChange2.0.git
cd SkillXChange2.0

# Backend setup
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your DATABASE_URL (Neon connection string provided)

# Frontend setup (in a new terminal)
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Create Database Tables

```bash
cd backend
python create_tables.py
```

### 3. Seed Sample Rewards (Admin)

```bash
curl -X POST http://localhost:8000/admin/seed_rewards \
  -H "X-Admin-Token: dev_admin_secret"
```

Or set `ADMIN_SECRET` environment variable for custom token.

### 4. Run Locally

**Backend** (in `backend/` directory):
```bash
uvicorn app.main:app --reload --port 8000
```

**Frontend** (in `frontend/` directory):
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup with Neon

1. Sign up at [neon.tech](https://neon.tech) (free tier)
2. Create a new project and database
3. Copy the connection string from Neon (looks like: `postgresql://user:password@...`)
4. Paste into `backend/.env` as `DATABASE_URL`

To manually run the migration SQL:
```bash
psql "your_neon_connection_string" -f backend/migrations/0001_create_tables.sql
```

## API Endpoints Reference

**Auth:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

**Users** (require Bearer token):
- `GET /users/me` - Get current user profile
- `POST /users/activity` - Record activity, update streak and skillcoins

**Rewards** (public):
- `GET /rewards/list` - List all available rewards
- `POST /rewards/purchase` - Purchase a reward (requires token)

**Admin:**
- `POST /admin/seed_rewards` - Seed sample rewards (requires `X-Admin-Token` header)

## Deployment to Vercel

### Frontend

1. Connect your GitHub repo to Vercel
2. Set the root path to `frontend/`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` → your deployed backend URL
4. Deploy

### Backend

You have options:

**Option A: Deploy to Fly.io (recommended for FastAPI)**

```bash
cd backend

# Install Fly CLI (https://fly.io/docs/hands-on/install-flyctl/)
fly auth login
fly launch  # Create new app
fly deploy

# Set environment variables
fly secrets set DATABASE_URL="your_neon_connection_string"
fly secrets set SECRET_KEY="your_random_secret_key"
fly secrets set ADMIN_SECRET="your_admin_secret"
```

Then update frontend's `NEXT_PUBLIC_API_URL` to your Fly app URL.

**Option B: Deploy to Render**

1. Push code to GitHub
2. On Render.com, create new "Web Service"
3. Connect your GitHub repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (same as above)

## File Structure

```
SkillXChange-2.0/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app
│   │   ├── db.py             # Database tables
│   │   └── routers/
│   │       ├── auth.py       # Authentication
│   │       ├── users.py      # User profile & activity
│   │       ├── rewards.py    # Rewards
│   │       └── admin.py      # Admin operations
│   ├── migrations/
│   │   └── 0001_create_tables.sql
│   ├── create_tables.py      # Helper to create tables
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Home
│   │   ├── login/page.tsx    # Login
│   │   ├── signup/page.tsx   # Sign up
│   │   ├── profile/page.tsx  # User profile
│   │   └── rewards/page.tsx  # Rewards marketplace
│   ├── components/
│   │   ├── Header.tsx
│   │   └── RewardCard.tsx
│   ├── styles/globals.css
│   ├── package.json
│   └── README.md
├── DEPLOYMENT.md
├── SETUP.md (this file)
├── vercel.json
└── README.md
```

## Features Implemented

- ✅ User authentication (JWT)
- ✅ Skill coins system
- ✅ Streak tracking
- ✅ Rewards marketplace
- ✅ Protected routes
- ✅ Admin seed endpoint
- ✅ Neon PostgreSQL integration
- ✅ Vercel-ready frontend

## Troubleshooting

**"ModuleNotFoundError" when running Python**
- Activate your venv: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)

**"Cannot reach backend" from frontend**
- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`

**Database connection failed**
- Verify `DATABASE_URL` in backend `.env`
- Check Neon connection string is correct (includes password and query params)

**Token invalid on protected routes**
- Ensure you're passing the token in the `Authorization: Bearer <token>` header
- Check token hasn't expired (default: 60 minutes)

## Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Push and create PR
5. After merge, Vercel auto-deploys

## Support

For issues or questions, check the README files in `backend/` and `frontend/` directories.
