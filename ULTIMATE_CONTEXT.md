# ULTIMATE_CONTEXT: Portal (Mission Control) Migration Bridge
*Generated: June 13, 2026 | Session: Finalization Pass | Destination: Antigravity CLI*

## 1. Project Identity & Vision
**Mission Control Clone** is a multi-agent command center for asynchronous, long-running workflows.
- **Primary Ingress:** Telegram Bot / Slack App.
- **Control Plane:** Next.js Web Dashboard for human-in-the-loop oversight.

## 2. Architecture: Event-Driven State
- **Orchestration:** LangGraph (Python) for stateful multi-agent graphs.
- **Real-Time Layer:** Convex or Supabase for <100ms state synchronization.
- **Worker Isolation:** Ephemeral runtimes using Firecracker microVMs or sandboxed Docker.

## 3. Security & Safety
- **BYOK Vault:** Encrypted credential management via Doppler or AWS KMS.
- **Token Tracking:** Langfuse/Helicone middleware for granular ROI and cost analysis.

