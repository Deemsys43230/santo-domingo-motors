"""Simple, dependency-free ID generators for mock records."""
import random
import string
import time


def _suffix(n: int = 5) -> str:
    return "".join(random.choices(string.digits, k=n))


def new_id(prefix: str) -> str:
    """e.g. new_id('LEAD') -> 'LEAD-174000-83921'"""
    return f"{prefix}-{int(time.time())}-{_suffix()}"


def new_lead_id() -> str:
    return new_id("LEAD")


def new_booking_id() -> str:
    return new_id("TDB")


def new_appointment_id() -> str:
    return new_id("APT")


def new_finance_lead_id() -> str:
    return new_id("FIN")
