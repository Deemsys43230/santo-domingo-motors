"""
supervisor.py
--------------
The Supervisor Agent — the entry point of the whole system and the heart of
the "Supervisor pattern" used in this POC.

Pattern summary
----------------
- The Supervisor is the FIRST agent the caller talks to. It greets the
  customer, listens, and classifies intent into Sales / Service / Finance.
- It does NOT execute domain tools itself (no vehicle search, no booking,
  no finance math). Its only job is: understand -> route -> hand off.
- Routing is implemented via LiveKit Agents' agent-handoff mechanism: a
  `function_tool` returns a NEW `Agent` instance (SalesAgent / ServiceAgent /
  FinanceAgent). The AgentSession swaps the active agent to that instance,
  carrying the conversation (chat history) forward automatically.
- Each department agent can hand the conversation BACK to the Supervisor
  (e.g. "actually I also want to ask about financing") via `return_to_supervisor`,
  or escalate straight to a human via `human_handoff` (defined on the shared
  DepartmentAgent base class).

This mirrors a real-world dealership call center: a receptionist/supervisor
triages the call and transfers it to the right specialist, and specialists
can transfer back to the supervisor or to a human when needed.
"""
from __future__ import annotations

from livekit.agents import Agent, RunContext, function_tool

from app.config import settings
from app.utils.logger import get_logger

log = get_logger("agents.supervisor")

SUPERVISOR_INSTRUCTIONS = f"""
You are the virtual receptionist for {settings.DEALERSHIP_NAME}, answering an
inbound voice call on the website. Be warm, brief, and natural — this is a
spoken conversation, not a chat window.

Your ONLY job is to:
1. Greet the customer once, briefly.
2. Understand what they need.
3. Route them to the right specialist using the transfer tools:
   - transfer_to_sales: buying, browsing, comparing, pricing, or test-driving a vehicle.
   - transfer_to_service: maintenance, repairs, oil changes, appointments for an
     existing vehicle.
   - transfer_to_finance: financing, loans, monthly payments, eligibility.
4. If the request is clearly outside Sales/Service/Finance (e.g. insurance,
   parts, general company questions you can't answer), or the customer asks
   for a human directly, call human_handoff.

Do NOT attempt to answer detailed vehicle, service, or finance questions
yourself — always route to the right specialist so they can use their tools.
If it's unclear which department the customer needs, ask ONE short
clarifying question before routing.
"""


class SupervisorAgent(Agent):
    def __init__(self) -> None:
        super().__init__(instructions=SUPERVISOR_INSTRUCTIONS)

    async def on_enter(self) -> None:
        # generate_reply is not supported by Gemini 3.1 Live; 
        # initial greeting is handled via audio_trigger in main.py
        pass

    @function_tool()
    async def transfer_to_sales(self, context: RunContext):
        """Transfer the customer to the Sales specialist.

        Use for: finding a vehicle, comparing models, pricing, test drives,
        or general purchase interest.
        """
        from app.agents.sales_agent import SalesAgent

        log.info("Routing: Supervisor -> Sales")
        return SalesAgent(), "Connecting you with our Sales specialist now."

    @function_tool()
    async def transfer_to_service(self, context: RunContext):
        """Transfer the customer to the Service specialist.

        Use for: maintenance, repairs, oil changes, or booking a service
        appointment for a vehicle they already own.
        """
        from app.agents.service_agent import ServiceAgent

        log.info("Routing: Supervisor -> Service")
        return ServiceAgent(), "Connecting you with our Service team now."

    @function_tool()
    async def transfer_to_finance(self, context: RunContext):
        """Transfer the customer to the Finance specialist.

        Use for: financing options, loan eligibility, or payment estimates.
        """
        from app.agents.finance_agent import FinanceAgent

        log.info("Routing: Supervisor -> Finance")
        return FinanceAgent(), "Connecting you with our Finance team now."

    @function_tool()
    async def human_handoff(self, context: RunContext, reason: str, context_summary: str):
        """Escalate directly to a human when the request is outside Sales,
        Service, and Finance, or the customer explicitly asks for a person.

        Args:
            reason: Short reason for the handoff.
            context_summary: Summary of the conversation so far.
        """
        from app.tools import common_tools

        result = common_tools.human_handoff(
            team="sales", reason=reason, context_summary=context_summary
        )
        log.info("Supervisor human_handoff result: %s", result)
        return (
            "Let me connect you with a member of our team who can help with that. "
            "Tell the customer a human representative will join shortly."
        )
