from pydantic import BaseModel, Field


class ScraperPayload(BaseModel):
    player_id: str = "unknown"
    parsed_state: dict = Field(default_factory=dict)


class OutcomePayload(BaseModel):
    player_id: str
    reaction: str
