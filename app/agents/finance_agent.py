"""
finance_agent.py
-----------------
Finance department agent (section 6 of the POC plan). Owns: Financing
Information, Basic Eligibility, Payment Estimate, Create Finance Lead.
"""
from __future__ import annotations

from livekit.agents import RunContext, function_tool

from app.agents.base import DepartmentAgent
from app.tools import finance_tools
from app.utils.logger import get_logger

log = get_logger("agents.finance")

FINANCE_INSTRUCTIONS = """
You are the Finance specialist for Santo Domingo Motors, speaking with a
customer over a live voice call after a handoff from the Supervisor agent.
Greet briefly and continue naturally.

Your job:
- Explain financing options, required documents, and the process using
  get_financing_information — do not invent numbers.
- If the customer wants a preliminary eligibility check, collect annual
  income, employment type, vehicle price, and down payment, then call
  check_finance_eligibility. ALWAYS state clearly that this is a
  preliminary, non-binding check, not a final approval.
- If the customer wants a monthly payment estimate, collect vehicle price,
  down payment, and desired loan term (months), then call
  calculate_payment_estimate. ALWAYS state clearly that this is an estimate,
  not a final offer.
- If the customer wants to proceed, create a finance lead with
  create_finance_lead and tell them the Finance team will follow up for
  final approval.
- Final approval, credit checks, or anything requiring a human decision must
  go through human_handoff — never claim to approve financing yourself.
- If asked something outside Finance, or the customer wants a human, call
  human_handoff with a reason and short context summary.

Keep responses short and conversational — this is a spoken conversation.
Ask one question at a time when collecting details.
"""


class FinanceAgent(DepartmentAgent):
    department = "finance"

    def __init__(self) -> None:
        super().__init__(instructions=FINANCE_INSTRUCTIONS)

    @function_tool()
    async def get_financing_information(self, context: RunContext):
        """Get general financing information: process, documents, terms available."""
        return finance_tools.get_financing_information()

    @function_tool()
    async def check_finance_eligibility(
        self,
        context: RunContext,
        annual_income: float,
        employment_type: str,
        vehicle_price: float,
        down_payment: float,
    ):
        """Run a preliminary, non-binding financing eligibility check.

        Args:
            annual_income: Customer's stated annual income.
            employment_type: e.g. "Full-Time", "Self-Employed", "Part-Time".
            vehicle_price: Price of the vehicle being financed.
            down_payment: Amount the customer plans to pay upfront.
        """
        return finance_tools.check_finance_eligibility(
            annual_income=annual_income,
            employment_type=employment_type,
            vehicle_price=vehicle_price,
            down_payment=down_payment,
        )

    @function_tool()
    async def calculate_payment_estimate(
        self,
        context: RunContext,
        vehicle_price: float,
        down_payment: float,
        term_months: int,
    ):
        """Calculate an estimated monthly payment. Not a final offer.

        Args:
            vehicle_price: Price of the vehicle.
            down_payment: Amount paid upfront.
            term_months: Loan term in months, e.g. 36, 48, 60.
        """
        return finance_tools.calculate_payment_estimate(
            vehicle_price=vehicle_price, down_payment=down_payment, term_months=term_months
        )

    @function_tool()
    async def create_finance_lead(
        self,
        context: RunContext,
        customer_name: str,
        phone: str,
        vehicle: str,
        vehicle_price: float,
        down_payment: float,
        preferred_term: int,
        finance_requirement: str,
        email: str | None = None,
    ):
        """Create a finance lead for the finance team to process for final approval.

        Args:
            customer_name: Customer's full name.
            phone: Customer's phone number.
            vehicle: Vehicle the customer wants to finance.
            vehicle_price: Price of the vehicle.
            down_payment: Planned down payment.
            preferred_term: Preferred loan term in months.
            finance_requirement: Short free-text summary of the customer's financing need.
            email: Customer's email, if provided.
        """
        return finance_tools.create_finance_lead(
            customer_name=customer_name,
            phone=phone,
            email=email,
            vehicle=vehicle,
            vehicle_price=vehicle_price,
            down_payment=down_payment,
            preferred_term=preferred_term,
            finance_requirement=finance_requirement,
        )
