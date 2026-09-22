from fastapi import APIRouter, Header, HTTPException
import os
from ..db import database, rewards

router = APIRouter()

ADMIN_SECRET = os.getenv("ADMIN_SECRET", "dev_admin_secret")


@router.post("/seed_rewards")
async def seed_rewards(x_admin_token: str | None = Header(None)):
    if x_admin_token != ADMIN_SECRET:
        raise HTTPException(status_code=403, detail="Forbidden")
    sample = [
        {"title": "50% Course Discount", "cost": 100},
        {"title": "Mentorship Session", "cost": 250},
        {"title": "Exclusive Badge", "cost": 40},
    ]
    inserted = []
    for r in sample:
        existing = await database.fetch_one(rewards.select().where(rewards.c.title == r["title"]))
        if not existing:
            await database.execute(rewards.insert().values(title=r["title"], cost=r["cost"]))
            inserted.append(r["title"])
    return {"seeded": inserted}
