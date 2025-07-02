from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config_model import Config
from typing import Optional
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_DB_URL = os.getenv("SUPABASE_DB_URL")
if not SUPABASE_DB_URL:
    raise RuntimeError("SUPABASE_DB_URL is not set in the .env file")

app = FastAPI()

db_pool: Optional[asyncpg.Pool] = None

@app.on_event("startup")
async def startup():
    global db_pool
    try:
        db_pool = await asyncpg.create_pool(dsn=SUPABASE_DB_URL, min_size=1, max_size=5)
    except Exception as e:
        raise RuntimeError(f"Failed to connect to DB: {e}")

@app.on_event("shutdown")
async def shutdown():
    global db_pool
    if db_pool:
        await db_pool.close()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/config", response_model=Config)
async def get_config():
    try:
        async with db_pool.acquire() as conn:
            row = await conn.fetchrow("SELECT face_check_enabled, lighting_check_enabled FROM camera_config LIMIT 1")
            if not row:
                raise HTTPException(status_code=404, detail="Configuration not found")
            return Config(face_check_enabled=row["face_check_enabled"], lighting_check_enabled=row["lighting_check_enabled"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching config: {e}")

@app.post("/config")
async def update_config(cfg: Config):
    try:
        async with db_pool.acquire() as conn:
            await conn.execute("""
                UPDATE camera_config
                SET face_check_enabled = $1,
                    lighting_check_enabled = $2
            """, cfg.face_check_enabled, cfg.lighting_check_enabled)
            return {"status": "updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating config: {e}")

@app.get("/health")
async def health_check():
    try:
        async with db_pool.acquire() as conn:
            await conn.execute("SELECT 1")
        return {"status": "ok"}
    except Exception:
        raise HTTPException(status_code=503, detail="Database unavailable")
