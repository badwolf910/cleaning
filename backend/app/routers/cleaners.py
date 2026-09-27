"""Cleaner (staff) endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/cleaners", tags=["cleaners"])


@router.get("/", response_model=list[schemas.Cleaner])
def list_cleaners(db: Session = Depends(get_db)):
    return crud.get_cleaners(db)


@router.post("/", response_model=schemas.Cleaner, status_code=201)
def create_cleaner(cleaner: schemas.CleanerCreate, db: Session = Depends(get_db)):
    return crud.create_cleaner(db, cleaner)
