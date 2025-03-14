import redis.asyncio as redis
from fastapi import FastAPI, Depends, HTTPException, Request
import asyncio

RATE_LIMITS = {
    "create_user": {"limit": 5, "window": 600},  # 10 dakikada 5 istek
    "login_for_access_token": {"limit": 7, "window": 600},     # 10 dakikada 7 istek
    "default": {"limit": 10, "window": 60}    # Varsayılan: 1 dakikada 10 istek
}

class RateLimiter:
    def __init__(self, redis_url: str):
        self.redis_url = redis_url
        self.redis = None

    async def init_redis(self):
        """ Redis bağlantısını başlatır. """
        if self.redis is None:
            self.redis = redis.Redis.from_url(self.redis_url, decode_responses=True)

    async def check_limit(self, request: Request):
        print("check_limit")
        print(request.scope["route"].name)
        for k, v in RATE_LIMITS.get(request.scope["route"].name, RATE_LIMITS.get('default')).items():
            setattr(self, k, v)
        await self.init_redis()
        client_ip = request.client.host
        key = f"rate_limit:{client_ip}"

        current_count = await self.redis.get(key)
        if current_count is None:
            await self.redis.setex(key, self.window, 1)
        else:
            current_count = int(current_count)
            if current_count >= self.limit:
                raise HTTPException(status_code=429, detail="Rate limit exceeded")
            await self.redis.incr(key)
            
            
rate_limiter = RateLimiter(redis_url="redis://redis")