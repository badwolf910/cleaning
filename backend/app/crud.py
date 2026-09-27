"""Database CRUD operations."""
from sqlalchemy.orm import Session

from app import models, schemas


def get_customers(db: Session):
    return db.query(models.Customer).all()


def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()


def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(**customer.model_dump())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


def get_cleaners(db: Session):
    return db.query(models.Cleaner).all()


def create_cleaner(db: Session, cleaner: schemas.CleanerCreate):
    db_cleaner = models.Cleaner(**cleaner.model_dump())
    db.add(db_cleaner)
    db.commit()
    db.refresh(db_cleaner)
    return db_cleaner


def get_services(db: Session):
    return db.query(models.Service).all()


def get_service(db: Session, service_id: int):
    return db.query(models.Service).filter(models.Service.id == service_id).first()


def create_service(db: Session, service: schemas.ServiceCreate):
    db_service = models.Service(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


def get_bookings(db: Session):
    return db.query(models.Booking).all()


def get_booking(db: Session, booking_id: int):
    return db.query(models.Booking).filter(models.Booking.id == booking_id).first()


def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(**booking.model_dump())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


def update_booking(db: Session, booking_id: int, booking: schemas.BookingUpdate):
    db_booking = get_booking(db, booking_id)
    if not db_booking:
        return None
    for field, value in booking.model_dump(exclude_unset=True).items():
        setattr(db_booking, field, value)
    db.commit()
    db.refresh(db_booking)
    return db_booking


def delete_booking(db: Session, booking_id: int):
    db_booking = get_booking(db, booking_id)
    if not db_booking:
        return None
    db.delete(db_booking)
    db.commit()
    return db_booking
