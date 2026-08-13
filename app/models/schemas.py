"""
schemas.py
----------
Lightweight dataclass-style shape references for the mock "tables".
These are NOT enforced ORM models (there is no DB) — they exist purely
as documentation + light validation helpers for the tool layer so the
JSON shapes stay consistent across sales/service/finance tools.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class SalesLead:
    lead_id: str
    customer_name: str
    phone: str
    email: Optional[str]
    interested_vehicle: str
    customer_requirement: str
    test_drive_interest: bool
    preferred_location: Optional[str]
    preferred_branch_id: Optional[str] = None
    preferred_branch_name: Optional[str] = None
    customer_city: Optional[str] = None
    preferred_datetime: Optional[str] = None
    lead_source: str = "AI Voice Agent"
    lead_status: str = "New"


@dataclass
class TestDriveBooking:
    booking_id: str
    customer_name: str
    phone: str
    email: Optional[str]
    vehicle: str
    location: str
    date: str
    time: str
    branch_id: Optional[str] = None
    branch_name: Optional[str] = None
    status: str = "Confirmed"


@dataclass
class ServiceAppointment:
    appointment_id: str
    customer_name: str
    phone: str
    vehicle: str
    service_type: str
    location: str
    date: str
    time: str
    branch_id: Optional[str] = None
    branch_name: Optional[str] = None
    status: str = "Confirmed"


@dataclass
class FinanceLead:
    lead_id: str
    customer_name: str
    phone: str
    email: Optional[str]
    vehicle: str
    vehicle_price: float
    down_payment: float
    preferred_term: int
    finance_requirement: str
    preferred_branch_id: Optional[str] = None
    preferred_branch_name: Optional[str] = None
    customer_city: Optional[str] = None
    lead_source: str = "AI Voice Agent"
    lead_status: str = "New"
