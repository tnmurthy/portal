# Talia Web Portal

Vite + React marketing site and AgentFabric tool hub.

## Quick Start

```bash
cd web-port/tt-web-portal
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

For GitHub Pages (`/portal/` base path):

```bash
VITE_BASE_PATH=/portal/ npm run build
```

## Deployment

GitHub Actions deploys the site to GitHub Pages on pushes to `main`:

- Workflow: `.github/workflows/deploy-web-portal.yml`
- Build output: `web-port/tt-web-portal/dist`

Enable GitHub Pages in repo settings with source **GitHub Actions**.

For a custom domain (e.g. taliatech.com), set `VITE_BASE_PATH=/` in the deploy workflow.

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