"""
service_agent.py
-----------------
Service department agent (section 5 of the POC plan). Owns: Service Inquiry,
Check Availability, Book Appointment, Confirm Appointment, Service Details.
"""
from __future__ import annotations

from livekit.agents import RunContext, function_tool

from app.agents.base import DepartmentAgent
from app.tools import service_tools
from app.utils.logger import get_logger

log = get_logger("agents.service")

SERVICE_INSTRUCTIONS = """
You are the Service specialist for Santo Domingo Motors, speaking with a
customer over a live voice call after a handoff from the Supervisor agent.
Greet briefly and continue naturally.

Your job:
- Understand the customer's service need in plain language (e.g. "oil change",
  "my car is making a noise", "I need a service").
- Use get_service_details to explain what a service type involves if asked.
- Collect: vehicle, service type, preferred location, and preferred date.
- Use check_service_availability to find open slots, then present a couple of
  options to the customer.
- Once the customer picks a slot, call book_service_appointment.
- Always confirm the final appointment out loud: vehicle, service type,
  location, date, time, and the appointment ID.
- If asked something outside Service, or the customer wants a human, or a
  complex mechanical issue needs an expert, call human_handoff with reason
  and a short context summary.

Keep responses short and conversational — this is a spoken conversation.
Ask one question at a time when collecting details.
"""


class ServiceAgent(DepartmentAgent):
    department = "service"

    def __init__(self) -> None:
        super().__init__(instructions=SERVICE_INSTRUCTIONS)

    @function_tool()
    async def get_service_details(self, context: RunContext, service_type: str | None = None):
        """Get details about a service type (duration, average cost), or list all types.

        Args:
            service_type: Name of the service, e.g. "Oil Change". Omit to list all.
        """
        return {"service_types": service_tools.get_service_details(service_type)}

    @function_tool()
    async def get_service_locations(self, context: RunContext):
        """List available service center locations."""
        return {"locations": service_tools.get_service_locations()}

    @function_tool()
    async def check_service_availability(
        self, context: RunContext, location_id: str, date: str
    ):
        """Check available service appointment slots at a location for a date.

        Args:
            location_id: Location ID, e.g. "L1".
            date: Date in YYYY-MM-DD format.
        """
        slots = service_tools.check_service_availability(location_id, date)
        return {"location_id": location_id, "date": date, "available_slots": slots}

    @function_tool()
    async def book_service_appointment(
        self,
        context: RunContext,
        customer_name: str,
        phone: str,
        vehicle: str,
        service_type: str,
        location: str,
        date: str,
        time: str,
    ):
        """Book a service appointment once the customer has chosen a slot.

        Args:
            customer_name: Customer's full name.
            phone: Customer's phone number.
            vehicle: Vehicle make/model or plate mentioned by the customer.
            service_type: Type of service requested, e.g. "Oil Change".
            location: Location ID, e.g. "L1".
            date: Date in YYYY-MM-DD format.
            time: Time in HH:MM (24h) format, must be one of the available slots.
        """
        return service_tools.book_service_appointment(
            customer_name=customer_name,
            phone=phone,
            vehicle=vehicle,
            service_type=service_type,
            location=location,
            date=date,
            time=time,
        )

    @function_tool()
    async def get_appointment_details(self, context: RunContext, appointment_id: str):
        """Look up an existing appointment by its ID.

        Args:
            appointment_id: The appointment ID given at booking time.
        """
        result = service_tools.get_appointment_details(appointment_id)
        if not result:
            return {"found": False, "message": f"No appointment found with ID {appointment_id}."}
        return {"found": True, "appointment": result}
