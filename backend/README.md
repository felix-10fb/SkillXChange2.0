# SkillXChange Backend

FastAPI backend for SkillXChange.

Environment:
- Copy `.env.example` to `.env` and set `DATABASE_URL` and `SECRET_KEY`.

Run locally:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Create tables:

```bash
python create_tables.py
```

Note: For Neon, set `DATABASE_URL` in your `.env` or environment variables to the provided Neon connection string.

Migrations & Seeding
--------------------

Basic SQL migration files are in `backend/migrations/`. To apply the simple SQL migration locally you can run the SQL directly against your database, or use the `create_tables.py` helper which uses SQLAlchemy metadata:

```bash
# create tables using SQLAlchemy metadata
python create_tables.py

# or run the migration SQL file using psql (adjust connection string accordingly)
pSQL_COMMAND_HERE
psql "$DATABASE_URL" -f backend/migrations/0001_create_tables.sql
```

Seeding sample rewards (admin)
-----------------------------

An admin endpoint exists to seed a few sample rewards. To call it locally (backend running on port 8000):

```bash
curl -X POST http://localhost:8000/admin/seed_rewards -H "X-Admin-Token: dev_admin_secret"
```

Replace `dev_admin_secret` with the value of the `ADMIN_SECRET` environment variable in production. When deployed, set `ADMIN_SECRET` and `DATABASE_URL` securely in your host's environment settings.
