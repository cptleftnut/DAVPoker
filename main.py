
from fastapi import FastAPI, BackgroundTasks, HTTPException, Request
from pydantic import BaseModel
import logging
from logging.handlers import RotatingFileHandler
import random
import os
import json
import time
from starlette.middleware.base import BaseHTTPMiddleware

# Logging setup
LOG_FILENAME = "davpoker_api.log"
logger = logging.getLogger("DAVPoker-API")
logger.setLevel(logging.INFO)

if logger.handlers:
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)

handler = RotatingFileHandler(LOG_FILENAME, maxBytes=5*1024*1024, backupCount=5)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

class RequestLoggerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        path = request.url.path
        method = request.method

        response = await call_next(request)

        process_time = (time.time() - start_time) * 1000
        formatted_process_time = f"{process_time:.2f}ms"

        logger.info(f"RID: {method} {path} - Status: {response.status_code} - Time: {formatted_process_time}")
        return response

def calculate_opponent_call_ev(pot_before_bet: float, bet_amount: float, opponent_win_probability: float):
    total_pot_to_win = pot_before_bet + bet_amount
    loss_probability = 1 - opponent_win_probability
    ev = (opponent_win_probability * total_pot_to_win) - (loss_probability * bet_amount)
    return round(ev, 2)

class OpponentProfile:
    def __init__(self, player_id):
        self.player_id = player_id
        self.calls = 0
        self.folds = 0
        self.total_bluffs_faced = 0

    @property
    def call_frequency(self):
        if self.total_bluffs_faced == 0: return 0.5
        return self.calls / self.total_bluffs_faced

class PokerAIEngine:
    def __init__(self):
        self.opponents = {}
        self.history = []
        self.history_limit = 20

    def get_profile(self, player_id):
        if player_id not in self.opponents:
            self.opponents[player_id] = OpponentProfile(player_id)
        return self.opponents[player_id]

    def record_outcome(self, player_id: str, reaction: str):
        profile = self.get_profile(player_id)
        for event in reversed(self.history):
            if event.get("is_bluff") and event.get("player_target") == player_id and not event.get("outcome_recorded"):
                profile.total_bluffs_faced += 1
                if reaction == "CALL":
                    profile.calls += 1
                elif reaction == "FOLD":
                    profile.folds += 1
                event["outcome_recorded"] = True
                break

    async def calculate_optimal_move(self, state: dict, player_id: str = "default_player"):
        hand = state.get("current_hand", [])
        pot = float(state.get("pot_size", 0.0))
        profile = self.get_profile(player_id)

        adaptive_bluff_prob = 0.25
        if profile.call_frequency > 0.6: adaptive_bluff_prob = 0.05
        elif profile.call_frequency < 0.3: adaptive_bluff_prob = 0.40

        decision = {"action": "FOLD", "raise_amount": 0.0, "is_bluff": False, "player_target": player_id, "latency_ms": 2}

        has_high_pair = len(hand) == 2 and hand[0][0] == hand[1][0] and hand[0][0] in ["A", "K", "Q"]
        if has_high_pair:
            decision = {"action": "RAISE", "raise_amount": round(pot * 0.5, 2), "is_bluff": False, "player_target": player_id, "latency_ms": 5}
        elif random.random() < adaptive_bluff_prob:
            decision = {"action": "RAISE", "raise_amount": round(pot * 0.3, 2), "is_bluff": True, "player_target": player_id, "latency_ms": 8}

        self.history.append(decision)
        if len(self.history) > self.history_limit: self.history.pop(0)
        return decision

app = FastAPI(title="DAVPoker API")
ai_engine = PokerAIEngine()
app.add_middleware(RequestLoggerMiddleware)

class ScraperPayload(BaseModel):
    player_id: str = "unknown"
    parsed_state: dict = {}

@app.post("/api/v1/scraper/ingest")
async def ingest(payload: ScraperPayload):
    return await ai_engine.calculate_optimal_move(payload.parsed_state, payload.player_id)
