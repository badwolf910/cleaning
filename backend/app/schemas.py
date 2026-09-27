"""Pydantic schemas for request/response validation."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models import BookingStatus


class CustomerBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    address: str


class CustomerCreate(CustomerBase):
    pass


class Customer(CustomerBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class CleanerBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    is_active: bool = True


class CleanerCreate(CleanerBase):
    pass


class Cleaner(CleanerBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    base_price: float
    duration_minutes: int


class ServiceCreate(ServiceBase):
    pass


class Service(ServiceBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class BookingBase(BaseModel):
    customer_id: int
    cleaner_id: Optional[int] = None
    service_id: int
    scheduled_at: datetime
    notes: Optional[str] = None


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    cleaner_id: Optional[int] = None
    scheduled_at: Optional[datetime] = None
    status: Optional[BookingStatus] = None
    notes: Optional[str] = None


class Booking(BookingBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    status: BookingStatus
    created_at: datetime
