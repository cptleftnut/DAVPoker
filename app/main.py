from fastapi import FastAPI, HTTPException

from .engine import PokerAIEngine
from .logging_config import configure_logger
from .middleware import RequestLoggerMiddleware
from .models import OutcomePayload, ScraperPayload

logger = configure_logger()
app = FastAPI(title="DAVPoker API")
ai_engine = PokerAIEngine()
app.add_middleware(RequestLoggerMiddleware, logger=logger)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/api/v1/scraper/ingest")
async def ingest(payload: ScraperPayload) -> dict:
    return await ai_engine.calculate_optimal_move(payload.parsed_state, payload.player_id)


@app.post("/api/v1/scraper/outcome")
async def outcome(payload: OutcomePayload) -> dict:
    reaction = payload.reaction.upper().strip()
    if reaction not in {"CALL", "FOLD"}:
        raise HTTPException(status_code=400, detail="reaction must be CALL or FOLD")

    updated = ai_engine.record_outcome(payload.player_id, reaction)
    if not updated:
        raise HTTPException(status_code=404, detail="No unresolved bluff found for player_id")

    profile = ai_engine.get_profile(payload.player_id)
    return {
        "player_id": payload.player_id,
        "calls": profile.calls,
        "folds": profile.folds,
        "total_bluffs_faced": profile.total_bluffs_faced,
        "call_frequency": round(profile.call_frequency, 4),
    }
