from fastapi import APIRouter, Depends, HTTPException
from ..db import database, users
from pydantic import BaseModel
from datetime import datetime, timedelta
from .auth import get_current_user

router = APIRouter()

class UserPublic(BaseModel):
    id: int
    email: str
    full_name: str | None = None
    skillcoins: int
    streak: int


@router.get("/me", response_model=UserPublic)
async def read_me(current=Depends(get_current_user)):
    return current


@router.post("/activity")
async def record_activity(current=Depends(get_current_user)):
    user_id = current["id"]
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
    gain = 10 + new_streak
    update = users.update().where(users.c.id == user_id).values(streak=new_streak, last_active=now, skillcoins=user["skillcoins"] + gain)
    await database.execute(update)
    return {"streak": new_streak, "skillcoins_gained": gain}
