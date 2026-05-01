# 🃏 DAVPoker AI Engine

DAVPoker er en avanceret FastAPI-baseret Poker AI Engine designet til real-tids beslutningstagning i Texas Hold'em. Motoren kombinerer statistiske modeller med dynamisk modstander-profilering for at maksimere Expected Value (EV).

## 🚀 Kernefunktioner

*   **Adaptiv Bluff-Logik:** Justerer automatisk bluff-frekvensen baseret på tidligere succesrater og modstanderens tendenser.
*   **Modstander-Profilering:** Tracker specifikke `player_id`'er for at identificere "Calling Stations" (bluffer mindre) og "Tight Players" (bluffer mere).
*   **EV-Kontrol:** Beregner modstanderens pot-odds og aflyser bluffs, hvis det er matematisk fordelagtigt for modstanderen at kalde.
*   **FastAPI Backend:** Hurtig og asynkron API-struktur til integration med scrapere eller spil-klienter.

## 🛠 Teknisk Stack

*   **Sprog:** Python 3.12
*   **Framework:** FastAPI / Uvicorn
*   **Sikkerhed:** Passlib (bcrypt 3.2.0)
*   **Analyse:** Matplotlib & HTTPX (til test og visualisering)

## 📋 Installation

1.  **Klon projektet:**
    ```bash
    git clone https://github.com/cptleftnut/DAVPoker.git
    cd DAVPoker
    ```

2.  **Opsæt virtuelt miljø:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```

3.  **Installer afhængigheder:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Konfigurer miljø:**
    Kopier `.env.example` til `.env` og tilpas dine indstillinger.

## 🚦 Kørsel

Start serveren med Uvicorn:
```bash
uvicorn main:app --reload --port 8000
```
Besøg derefter `http://127.0.0.1:8000/docs` for at se API-dokumentationen (Swagger UI).

## 📡 API Endpoints

*   `POST /api/v1/scraper/ingest`: Modtag game-state og få AI-beslutning.
*   `POST /api/v1/scraper/outcome`: Rapporter runderesultat for at opdatere modstanderprofiler.
