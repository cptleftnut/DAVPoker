# 🃏 DAVPoker AI Engine

DAVPoker is a FastAPI-based Poker AI engine for real-time decision support in Texas Hold'em.

## Project structure

- `main.py`: compatibility entrypoint for `uvicorn main:app`.
- `app/main.py`: FastAPI app, route registration, and dependency wiring.
- `app/engine.py`: poker decision logic, opponent profiling, and EV utility.
- `app/models.py`: request models and input validation schemas.
- `app/middleware.py`: request timing + structured request logging middleware.
- `app/logging_config.py`: logger and rotating file handler configuration.

## API Endpoints

- `GET /health`
- `POST /api/v1/scraper/ingest`
- `POST /api/v1/scraper/outcome`

## Run locally

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```


## Testing

```bash
python -m unittest discover -s tests -v
```
