# SkillXChange Backend

FastAPI backend for SkillXChange.

Environment:
- Copy `.env.example` to `.env` and set `DATABASE_URL` and `SECRET_KEY`.

Run locally:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
