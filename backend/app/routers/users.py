from fastapi import APIRouter, Depends, HTTPException
from ..db import database, users
from pydantic import BaseModel
from datetime import datetime, timedelta

router = APIRouter()

class UserPublic(BaseModel):
    id: int
    email: str
    full_name: str | None = None
    skillcoins: int
    streak: int

@router.get("/me", response_model=UserPublic)
async def read_me(user_id: int = 1):
    # Placeholder: in real app use token dependency to get user_id
    query = users.select().where(users.c.id == user_id)
    user = await database.fetch_one(query)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/activity")
async def record_activity(user_id: int = 1):
    query = users.select().where(users.c.id == user_id)
    user = await database.fetch_one(query)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    last = user.get("last_active")
    now = datetime.utcnow()
    new_streak = user["streak"]
    if last is None or (now - last) > timedelta(days=2):
        new_streak = 1
    elif (now - last) <= timedelta(days=1):
        new_streak = user["streak"] + 1
    # reward skillcoins for activity
    gain = 10 + new_streak
    update = users.update().where(users.c.id == user_id).values(streak=new_streak, last_active=now, skillcoins=user["skillcoins"] + gain)
    await database.execute(update)
    return {"streak": new_streak, "skillcoins_gained": gain}
