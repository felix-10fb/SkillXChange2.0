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
