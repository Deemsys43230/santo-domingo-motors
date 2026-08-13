"""
sales_agent.py
--------------
Sales department agent (section 4 of the POC plan). Owns: Find Vehicle,
Compare Models, Price Information, Test Drive Booking, Create Sales Lead.
"""
from __future__ import annotations

from livekit.agents import RunContext, function_tool

from app.agents.base import DepartmentAgent
from app.tools import sales_tools, branch_tools
from app.utils.logger import get_logger

log = get_logger("agents.sales")

SALES_INSTRUCTIONS = """
You are the Sales specialist for Santo Domingo Motors, speaking with a customer
over a live voice call. You just received a handoff from the Supervisor agent,
so greet the customer briefly and continue the conversation naturally
(don't re-introduce the whole dealership).

Your job:
- Help the customer find a vehicle (search_vehicles) based on type, budget,
  passengers, fuel type, transmission, or features.
- Compare 2+ vehicles when asked (compare_vehicles), explaining differences
  conversationally, not just listing raw fields.
- Give vehicle prices ONLY from get_vehicle_price — never invent a price.
- Determine the customer's location (city or area). Once known, use find_branch
  to find the appropriate Santo Domingo Motors branch for sales and their brand.
- Recommend the appropriate branch naturally before booking a test drive. If multiple
  are found, ask the customer their preference.
- Help book a test drive: collect name, phone, email, vehicle, branch and a
  date/time, check availability with check_test_drive_availability, then call
  book_test_drive. Confirm the booking details back to the customer clearly.
- When the customer shows real purchase interest, create a sales lead with
  create_sales_lead, capturing their requirement, branch info, and contact details.
- If the customer asks for something outside Sales (Service or Finance related),
  or asks for a human, or you can't help, call human_handoff with a clear reason
  and a short summary of the conversation so far.

Keep responses short and conversational — this is a spoken conversation, not a
chat window. Ask one question at a time when collecting details. Do not read out
long branch addresses unless asked.
"""


class SalesAgent(DepartmentAgent):
    department = "sales"

    def __init__(self) -> None:
        super().__init__(instructions=SALES_INSTRUCTIONS)

    @function_tool()
    async def find_branch(
        self, context: RunContext, city: str | None = None, area: str | None = None, service: str | None = None, brand: str | None = None
    ):
        """Find the most appropriate Santo Domingo Motors branch.
        Args:
            city: The customer's city (e.g., "Santo Domingo", "Santiago").
            area: The customer's area, if known.
            service: "sales", "service", or "parts".
            brand: The vehicle brand (e.g., "Nissan").
        """
        return branch_tools.find_branch(city=city, area=area, service=service, brand=brand)

    @function_tool()
    async def get_branch_details(self, context: RunContext, branch_id: str):
        """Get details about a specific branch.
        Args:
            branch_id: The ID of the branch.
        """
        return branch_tools.get_branch_details(branch_id)

    @function_tool()
    async def search_vehicles(
        self,
        context: RunContext,
        vehicle_type: str | None = None,
        max_budget: float | None = None,
        min_budget: float | None = None,
        model: str | None = None,
        min_seating: int | None = None,
        fuel_type: str | None = None,
        transmission: str | None = None,
    ):
        """Search the vehicle catalog for matching in-stock vehicles."""
        results = sales_tools.search_vehicles(
            vehicle_type=vehicle_type,
            max_budget=max_budget,
            min_budget=min_budget,
            model=model,
            min_seating=min_seating,
            fuel_type=fuel_type,
            transmission=transmission,
        )
        return {"count": len(results), "vehicles": results}

    @function_tool()
    async def compare_vehicles(self, context: RunContext, identifiers: list[str]):
        """Compare two or more vehicles by ID or model name."""
        return sales_tools.compare_vehicles(identifiers)

    @function_tool()
    async def get_vehicle_price(self, context: RunContext, identifier: str):
        """Get the authoritative price for a vehicle by ID or model name."""
        result = sales_tools.get_vehicle_price(identifier)
        if not result:
            return {"found": False, "message": f"No vehicle found matching '{identifier}'."}
        return {"found": True, **result}

    @function_tool()
    async def check_test_drive_availability(
        self, context: RunContext, location_id: str, date: str
    ):
        """Check available test drive slots at a location/branch for a given date."""
        slots = sales_tools.check_test_drive_availability(location_id, date)
        return {"location_id": location_id, "date": date, "available_slots": slots}

    @function_tool()
    async def book_test_drive(
        self,
        context: RunContext,
        customer_name: str,
        phone: str,
        vehicle: str,
        location: str,
        date: str,
        time: str,
        email: str | None = None,
        branch_id: str | None = None,
        branch_name: str | None = None,
    ):
        """Book a test drive once the customer has chosen a slot.
        Args:
            customer_name: Customer's full name.
            phone: Customer's phone number.
            vehicle: Vehicle model or ID being test driven.
            location: (Legacy) Location string.
            date: Date in YYYY-MM-DD format.
            time: Time in HH:MM (24h) format, must be one of the available slots.
            email: Customer's email, if provided.
            branch_id: The branch ID.
            branch_name: The branch name.
        """
        return sales_tools.book_test_drive(
            customer_name=customer_name,
            phone=phone,
            email=email,
            vehicle=vehicle,
            location=location,
            date=date,
            time=time,
            branch_id=branch_id,
            branch_name=branch_name,
        )

    @function_tool()
    async def create_sales_lead(
        self,
        context: RunContext,
        customer_name: str,
        phone: str,
        interested_vehicle: str,
        customer_requirement: str,
        email: str | None = None,
        test_drive_interest: bool = False,
        preferred_location: str | None = None,
        preferred_datetime: str | None = None,
        preferred_branch_id: str | None = None,
        preferred_branch_name: str | None = None,
        customer_city: str | None = None,
    ):
        """Create a sales lead for the sales team to follow up on.
        Args:
            customer_name: Customer's full name.
            phone: Customer's phone number.
            interested_vehicle: The vehicle the customer is interested in.
            customer_requirement: Short free-text summary of what the customer needs.
            email: Customer's email, if provided.
            test_drive_interest: Whether the customer wants a test drive.
            preferred_location: (Legacy) Preferred dealership location, if mentioned.
            preferred_datetime: Preferred follow-up date/time, if mentioned.
            preferred_branch_id: The branch ID.
            preferred_branch_name: The branch name.
            customer_city: Customer's city.
        """
        return sales_tools.create_sales_lead(
            customer_name=customer_name,
            phone=phone,
            email=email,
            interested_vehicle=interested_vehicle,
            customer_requirement=customer_requirement,
            test_drive_interest=test_drive_interest,
            preferred_location=preferred_location,
            preferred_datetime=preferred_datetime,
            preferred_branch_id=preferred_branch_id,
            preferred_branch_name=preferred_branch_name,
            customer_city=customer_city,
        )
