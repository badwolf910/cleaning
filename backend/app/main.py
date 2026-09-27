"""FastAPI application entry point for the house cleaning service API."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import bookings, cleaners, customers, services

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cleaning Service API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customers.router)
app.include_router(cleaners.router)
app.include_router(services.router)
app.include_router(bookings.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
