import os
import shutil
import sys
import tempfile

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import data_store  # noqa: E402


@pytest.fixture()
def temp_data_dir(monkeypatch):
    src = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
    tmp = tempfile.mkdtemp()
    for fname in os.listdir(src):
        shutil.copy(os.path.join(src, fname), tmp)
    monkeypatch.setattr(data_store, "DATA_DIR", tmp)
    yield tmp
    shutil.rmtree(tmp, ignore_errors=True)


def test_payment_estimate_is_positive(temp_data_dir):
    from app.tools import finance_tools

    estimate = finance_tools.calculate_payment_estimate(
        vehicle_price=35000, down_payment=5000, term_months=60
    )
    assert estimate["estimated_monthly_payment"] > 0
    assert estimate["financed_amount"] == 30000
    assert "estimate" in estimate["disclaimer"].lower()


def test_eligibility_needs_review_for_low_income(temp_data_dir):
    from app.tools import finance_tools

    result = finance_tools.check_finance_eligibility(
        annual_income=10000,
        employment_type="Full-Time",
        vehicle_price=35000,
        down_payment=3500,
    )
    assert result["preliminary_result"] == "Needs Review"
    assert result["reasons"]


def test_eligibility_passes_with_good_inputs(temp_data_dir):
    from app.tools import finance_tools

    result = finance_tools.check_finance_eligibility(
        annual_income=60000,
        employment_type="Full-Time",
        vehicle_price=35000,
        down_payment=5000,
    )
    assert result["preliminary_result"] == "Likely Eligible"


def test_create_finance_lead_persists(temp_data_dir):
    from app.tools import finance_tools

    lead = finance_tools.create_finance_lead(
        customer_name="Maria Lopez",
        phone="809-555-0177",
        email="maria@example.com",
        vehicle="Elantra",
        vehicle_price=24500,
        down_payment=3000,
        preferred_term=48,
        finance_requirement="Standard auto loan",
    )
    stored = data_store.read_table("finance_leads")
    assert any(rec["lead_id"] == lead["lead_id"] for rec in stored)
