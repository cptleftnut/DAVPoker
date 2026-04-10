# Brug en letvægts Python base image
FROM python:3.12-slim

# Sæt arbejdsmappe
WORKDIR /app

# Kopier requirements og installer afhængigheder
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopier resten af koden
COPY . .

# Eksponer porten FastAPI kører på
EXPOSE 8000

# Start kommando
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
