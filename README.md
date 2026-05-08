# Bot bod pot

Lekker computeren

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at `http://localhost:8000` — e.g. `GET /rider/tadej-pogacar`
