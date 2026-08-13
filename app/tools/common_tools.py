"""
common_tools.py
----------------
Shared logic for Human Handoff (section 7 of the POC plan). In the real
system this would ring a queue in the CRM / call center platform. For the
POC it just logs the structured handoff payload — this is the seam where a
real integration (e.g. transferring the LiveKit room / SIP call, or opening
a ticket in the CRM) would be plugged in.
"""
from __future__ import annotations

from app.utils.logger import get_logger

log = get_logger("tools.handoff")

VALID_TEAMS = {"sales", "service", "finance"}


def human_handoff(team: str, reason: str, context_summary: str) -> dict:
    team_key = team.strip().lower()
    if team_key not in VALID_TEAMS:
        team_key = "sales"  # sensible default routing

    payload = {
        "handoff_team": team_key,
        "reason": reason,
        "context_summary": context_summary,
        "status": "queued_for_human",
    }
    log.info("Human handoff requested -> team=%s reason=%s", team_key, reason)
    # TODO(production): trigger real transfer here, e.g.
    #   - SIP transfer for phone calls
    #   - notify CRM / call center queue
    #   - push `context_summary` into the CRM ticket
    return payload
