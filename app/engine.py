import random
from dataclasses import dataclass


@dataclass
class OpponentProfile:
    player_id: str
    calls: int = 0
    folds: int = 0
    total_bluffs_faced: int = 0

    @property
    def call_frequency(self) -> float:
        if self.total_bluffs_faced == 0:
            return 0.5
        return self.calls / self.total_bluffs_faced


def calculate_opponent_call_ev(
    pot_before_bet: float,
    bet_amount: float,
    opponent_win_probability: float,
) -> float:
    total_pot_to_win = pot_before_bet + bet_amount
    loss_probability = 1 - opponent_win_probability
    ev = (opponent_win_probability * total_pot_to_win) - (loss_probability * bet_amount)
    return round(ev, 2)


class PokerAIEngine:
    def __init__(self, history_limit: int = 20):
        self.opponents: dict[str, OpponentProfile] = {}
        self.history: list[dict] = []
        self.history_limit = history_limit

    def get_profile(self, player_id: str) -> OpponentProfile:
        if player_id not in self.opponents:
            self.opponents[player_id] = OpponentProfile(player_id=player_id)
        return self.opponents[player_id]

    def record_outcome(self, player_id: str, reaction: str) -> bool:
        if reaction not in {"CALL", "FOLD"}:
            return False

        profile = self.get_profile(player_id)
        for event in reversed(self.history):
            if (
                event.get("is_bluff")
                and event.get("player_target") == player_id
                and not event.get("outcome_recorded")
            ):
                profile.total_bluffs_faced += 1
                if reaction == "CALL":
                    profile.calls += 1
                else:
                    profile.folds += 1
                event["outcome_recorded"] = True
                return True

        return False

    async def calculate_optimal_move(self, state: dict, player_id: str = "default_player") -> dict:
        hand = state.get("current_hand", [])

        try:
            pot = float(state.get("pot_size", 0.0))
        except (TypeError, ValueError):
            pot = 0.0

        profile = self.get_profile(player_id)

        adaptive_bluff_prob = 0.25
        if profile.call_frequency > 0.6:
            adaptive_bluff_prob = 0.05
        elif profile.call_frequency < 0.3:
            adaptive_bluff_prob = 0.40

        decision = {
            "action": "FOLD",
            "raise_amount": 0.0,
            "is_bluff": False,
            "player_target": player_id,
            "latency_ms": 2,
        }

        has_high_pair = (
            len(hand) == 2
            and isinstance(hand[0], (list, tuple))
            and isinstance(hand[1], (list, tuple))
            and len(hand[0]) > 0
            and len(hand[1]) > 0
            and hand[0][0] == hand[1][0]
            and hand[0][0] in ["A", "K", "Q"]
        )

        if has_high_pair:
            decision = {
                "action": "RAISE",
                "raise_amount": round(pot * 0.5, 2),
                "is_bluff": False,
                "player_target": player_id,
                "latency_ms": 5,
            }
        elif random.random() < adaptive_bluff_prob:
            call_ev = calculate_opponent_call_ev(
                pot_before_bet=pot,
                bet_amount=round(pot * 0.3, 2),
                opponent_win_probability=0.5,
            )
            if call_ev < 0:
                decision = {
                    "action": "RAISE",
                    "raise_amount": round(pot * 0.3, 2),
                    "is_bluff": True,
                    "player_target": player_id,
                    "latency_ms": 8,
                }

        self.history.append(decision)
        if len(self.history) > self.history_limit:
            self.history.pop(0)

        return decision
