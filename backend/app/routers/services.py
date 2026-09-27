"""Cleaning service catalog endpoints."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/services", tags=["services"])


@router.get("/", response_model=list[schemas.Service])
def list_services(db: Session = Depends(get_db)):
    return crud.get_services(db)


@router.post("/", response_model=schemas.Service, status_code=201)
def create_service(service: schemas.ServiceCreate, db: Session = Depends(get_db)):
    return crud.create_service(db, service)


@router.get("/{service_id}", response_model=schemas.Service)
def get_service(service_id: int, db: Session = Depends(get_db)):
    service = crud.get_service(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service
