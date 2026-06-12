# AgentFabric: AI Agent Builder Platform

A full-stack, open-source platform for building and deploying AI customer support agents without code.

## 📦 Project Structure

This is a monorepo using **Turbo** and **pnpm** workspaces.

```
agentfabric-monorepo/
├── packages/
│   ├── core/              # AI runtime engine (LLM inference, memory)
│   ├── studio/            # React UI for visual agent builder
│   ├── dashboard/         # Analytics & admin dashboard
│   ├── api/               # Express REST API server
│   ├── integrations/      # Slack, Zendesk, Telegram, etc.
│   ├── ingestion/         # Document processing & embedding pipeline
│   └── ui/                # Shared Shadcn/ui components
├── apps/
│   └── web/               # Landing page & auth portal
├── docker-compose.yml     # Local dev infrastructure
└── docs/                  # Technical documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 20.0.0
- pnpm ≥ 8.0.0
- Docker & Docker Compose (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/tnmurthy8181/tt-web-portal.git
cd tt-web-portal

# Install dependencies
pnpm install

# Start local infrastructure
docker-compose up -d

# Setup environment
cp .env.example .env.local

# Start development servers
pnpm dev
```

Access at:
- **Web Portal**: http://localhost:3000
- **Agent Studio**: http://localhost:3000/studio
- **API Server**: http://localhost:3001
- **Weaviate**: http://localhost:8080

## 📚 Development

```bash
pnpm build      # Build all packages
pnpm test       # Run tests
pnpm lint       # Lint code
pnpm type-check # Type checking
pnpm format     # Auto-format code
```

## 📊 Market & Competitive Position

- **TAM (2026)**: $11.45–$15.12 billion
- **CAGR**: 23–25.8% annually
- **Adoption**: 80%+ of companies by end of 2026
- **Your Advantage**: Open-source, developer-first, 8-week MVP timeline

## 🔌 Free/Open-Source Integrations

- **Chatwoot** (MIT) - Primary omnichannel platform
- **Slack Bot** (Apache 2.0) - Native integration
- **Telegram** (Apache 2.0) - Messaging
- **Zendesk** (REST API) - Enterprise support
- **n8n** (Fair Code) - 400+ workflow integrations
- **CrewAI** (Apache 2.0) - Multi-agent orchestration

## 🎯 8-Week MVP Roadmap

**Sprint 1 (Weeks 1-2):** Foundation
- Monorepo setup, CI/CD, Docker
- Database schema, API scaffolding
- Auth endpoints

**Sprint 2 (Weeks 3-4):** AI Core
- AgentRuntime implementation
- LLM provider integration
- Memory system

**Sprint 3 (Weeks 5-6):** Builder UI
- ReactFlow visual editor
- Document ingestion
- Real-time preview

**Sprint 4 (Weeks 7-8):** Integrations & Deploy
- Slack bot implementation
- Analytics dashboard
- Production deployment

## 📄 License

MIT License

---

**Built with ❤️ by the Talia team**