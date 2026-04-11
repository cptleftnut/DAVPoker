import time

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class RequestLoggerMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, logger):
        super().__init__(app)
        self.logger = logger

    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time_ms = (time.time() - start_time) * 1000

        self.logger.info(
            "RID: %s %s - Status: %s - Time: %.2fms",
            request.method,
            request.url.path,
            response.status_code,
            process_time_ms,
        )
        return response
