# Deployment to Vercel

This repo contains a Next.js frontend (`frontend/`) and a FastAPI backend (`backend/`). Vercel can host the frontend directly. For the backend you have two options:

1. Deploy backend to a separate hosting (e.g., Fly, Render, Railway) and set `NEXT_PUBLIC_API_URL` to your backend URL in Vercel project settings.
2. Containerize the backend and host it on a platform that supports Python containers.

Quick steps for frontend on Vercel:

- Connect this GitHub repo to Vercel.
- Set the root path to `frontend/`.
- Add environment variables in Vercel:
  - `NEXT_PUBLIC_API_URL` pointing to your backend (for local testing use `http://localhost:8000`).

For Neon/Postgres:

- Set `DATABASE_URL` in the backend environment variables on your chosen host (use the Neon connection string you provided).

Rewrites:

A `vercel.json` is included for rewrites if you want to proxy `/api` to a backend host. Edit `vercel.json` to point at your deployed backend URL before deployment.
