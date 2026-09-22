from fastapi import FastAPI
from .routers import auth, users, rewards

app = FastAPI(title="SkillXChange API")

app.include_router(auth.router, prefix="/auth")
app.include_router(users.router, prefix="/users")
app.include_router(rewards.router, prefix="/rewards")

@app.get("/")
async def root():
    return {"message": "SkillXChange API is running"}
