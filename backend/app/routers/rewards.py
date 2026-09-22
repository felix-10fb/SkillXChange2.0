from fastapi import APIRouter, HTTPException
from ..db import database, rewards, users

router = APIRouter()

@router.post('/purchase')
async def purchase(user_id: int, reward_id: int):
    user = await database.fetch_one(users.select().where(users.c.id == user_id))
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    reward = await database.fetch_one(rewards.select().where(rewards.c.id == reward_id))
    if not reward:
        raise HTTPException(status_code=404, detail='Reward not found')
    if user['skillcoins'] < reward['cost']:
        raise HTTPException(status_code=400, detail='Insufficient Skillcoins')
    await database.execute(users.update().where(users.c.id == user_id).values(skillcoins=user['skillcoins'] - reward['cost']))
    return {'status': 'purchased', 'reward': reward['title']}

@router.get('/list')
async def list_rewards():
    return await database.fetch_all(rewards.select())
