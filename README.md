# cleaning

A house cleaning service booking app: FastAPI backend (MySQL) + React (Vite) frontend.

## Structure

- `backend/` — FastAPI REST API backed by MySQL (customers, cleaners, services, bookings)
- `frontend/` — React (Vite) app for browsing services and requesting a booking

## Backend setup

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env   # then edit with your MySQL credentials
```

Create the database in MySQL first: `CREATE DATABASE cleaning_service;`

Run the API:

```
uvicorn app.main:app --reload
```

API docs available at http://localhost:8000/docs

## Frontend setup

```
cd frontend
npm install
copy .env.example .env
npm run dev
```

App runs at http://localhost:5173 and talks to the API at http://localhost:8000.
