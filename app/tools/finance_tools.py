"""
finance_tools.py
-----------------
Plain Python functions backing the Finance journey (section 6 of the POC plan).

IMPORTANT: every result here is explicitly a preliminary estimate / initial
assessment, never a final approval or offer — final approval always requires
human_handoff() to the Finance team.
"""
from __future__ import annotations

from app import data_store
from app.utils.ids import new_finance_lead_id
from app.utils.logger import get_logger

log = get_logger("tools.finance")


def get_financing_information() -> dict:
    rules = data_store.read_table("finance_rules")
    return {
        "financing_process_steps": rules["financing_process_steps"],
        "required_documents": rules["required_documents"],
        "min_down_payment_percent": rules["min_down_payment_percent"],
        "available_terms_months": list(rules["interest_rate_by_term"].keys()),
        "note": "Final financing terms are subject to formal credit approval by the Finance Team.",
    }


def check_finance_eligibility(
    annual_income: float,
    employment_type: str,
    vehicle_price: float,
    down_payment: float,
) -> dict:
    """A basic, non-binding preliminary eligibility check only."""
    rules = data_store.read_table("finance_rules")["eligibility_rules"]
    reasons = []

    income_ok = annual_income >= rules["min_income_annual"]
    if not income_ok:
        reasons.append(
            f"Annual income below minimum threshold of ${rules['min_income_annual']:,}"
        )

    employment_ok = employment_type in rules["employment_types_allowed"]
    if not employment_ok:
        reasons.append(f"Employment type '{employment_type}' not recognized for pre-check")

    min_down = vehicle_price * (data_store.read_table("finance_rules")["min_down_payment_percent"] / 100)
    down_payment_ok = down_payment >= min_down
    if not down_payment_ok:
        reasons.append(f"Down payment below minimum required (${min_down:,.2f})")

    preliminary_pass = income_ok and employment_ok and down_payment_ok

    return {
        "preliminary_result": "Likely Eligible" if preliminary_pass else "Needs Review",
        "reasons": reasons,
        "disclaimer": "This is a preliminary assessment only, not a final financing approval. "
                       "Final approval requires a formal credit check by the Finance Team.",
    }


def calculate_payment_estimate(
    vehicle_price: float,
    down_payment: float,
    term_months: int,
) -> dict:
    rules = data_store.read_table("finance_rules")
    rate_table = rules["interest_rate_by_term"]
    annual_rate = rate_table.get(str(term_months), rules["base_interest_rate"])

    financed_amount = max(vehicle_price - down_payment, 0)
    monthly_rate = (annual_rate / 100) / 12

    if monthly_rate == 0:
        monthly_payment = financed_amount / term_months
    else:
        monthly_payment = (
            financed_amount
            * (monthly_rate * (1 + monthly_rate) ** term_months)
            / ((1 + monthly_rate) ** term_months - 1)
        )

    return {
        "vehicle_price": vehicle_price,
        "down_payment": down_payment,
        "financed_amount": round(financed_amount, 2),
        "annual_interest_rate": annual_rate,
        "term_months": term_months,
        "estimated_monthly_payment": round(monthly_payment, 2),
        "disclaimer": "This is an ESTIMATE only, not a final financing offer or approval.",
    }


def create_finance_lead(
    customer_name: str,
    phone: str,
    email: str | None,
    vehicle: str,
    vehicle_price: float,
    down_payment: float,
    preferred_term: int,
    finance_requirement: str,
) -> dict:
    lead = {
        "lead_id": new_finance_lead_id(),
        "customer_name": customer_name,
        "phone": phone,
        "email": email,
        "vehicle": vehicle,
        "vehicle_price": vehicle_price,
        "down_payment": down_payment,
        "preferred_term": preferred_term,
        "finance_requirement": finance_requirement,
        "lead_source": "AI Voice Agent",
        "lead_status": "New",
    }
    data_store.append_record("finance_leads", lead)
    log.info("Finance lead created: %s", lead["lead_id"])
    return lead
