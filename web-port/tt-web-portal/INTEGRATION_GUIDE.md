# AgentFabric Integration Guide

## Free/Open-Source Integration Stack (Cost: $0)

### 1. Chatwoot (Primary Platform)
**License**: MIT | **Stars**: 30K+ | **Deployment**: Self-hosted + SaaS

```bash
# Docker deployment
docker run -d \
  -e RAILS_ENV=production \
  -e SECRET_KEY_BASE=$(rake secret) \
  -p 3000:3000 \
  chatwoot/chatwoot
```

**Features**:
- Live chat, email, WhatsApp, Telegram, Facebook, Line
- Native Slack integration
- Webhook + REST API support
- Advanced RBAC
- Unlimited agents (free tier)

**AgentFabric Integration**:
```typescript
// packages/integrations/src/adapters/chatwoot.ts
import axios from 'axios';

export class ChatwootAdapter {
  private baseURL: string;
  private apiKey: string;

  async sendMessage(conversationId: string, message: string) {
    return axios.post(`${this.baseURL}/conversations/${conversationId}/messages`, 
      { content: message },
      { headers: { 'api_access_token': this.apiKey } }
    );
  }

  async getConversation(conversationId: string) {
    return axios.get(`${this.baseURL}/conversations/${conversationId}`,
      { headers: { 'api_access_token': this.apiKey } }
    );
  }
}
```

---

### 2. Slack Bot Integration
**License**: Apache 2.0 | **Package**: @slack/bolt

```bash
npm install @slack/bolt
```

**Setup**:
```typescript
// packages/integrations/src/adapters/slack.ts
import { App } from '@slack/bolt';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message('hello', async ({ message, say }) => {
  await say(`Hey <@${message.user}>!`);
});

app.start(process.env.PORT || 3000);
```

**Features**:
- Real-time messaging
- Slash commands
- Interactive buttons & modals
- Webhook support

---

### 3. Telegram Bot
**License**: Apache 2.0 | **Package**: telegraf

```bash
npm install telegraf
```

**Setup**:
```typescript
// packages/integrations/src/adapters/telegram.ts
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.launch();
```

---

### 4. Zendesk Integration
**License**: Proprietary REST API | **Package**: node-zendesk

```bash
npm install node-zendesk
```

**Setup**:
```typescript
// packages/integrations/src/adapters/zendesk.ts
import { createClient } from 'node-zendesk';

const client = createClient({
  username: process.env.ZENDESK_EMAIL,
  token: process.env.ZENDESK_API_TOKEN,
  remoteUri: `https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2`
});

await client.tickets.create({
  ticket: {
    subject: 'New ticket from agent',
    description: 'Ticket description',
  }
});
```

---

### 5. n8n Workflow Integration
**License**: Fair Code | **Deployment**: Self-hosted

**Setup**: Via REST API for triggering workflows

```typescript
// Trigger n8n workflow
await axios.post('http://n8n:5678/webhook/my-workflow', {
  messageId: 'msg_123',
  content: 'User message',
  conversationId: 'conv_456'
});
```

---

### 6. CrewAI Integration
**License**: Apache 2.0 | **Package**: crewai

```bash
pip install crewai
```

**Setup**:
```python
# packages/integrations/src/adapters/crewai.py
from crewai import Agent, Task, Crew

support_agent = Agent(
    role='Customer Support Agent',
    goal='Resolve customer issues efficiently',
    backstory='Experienced support specialist'
)

task = Task(
    description='Help customer with issue',
    agent=support_agent
)

crew = Crew(agents=[support_agent], tasks=[task])
result = crew.kickoff()
```

---

## Integration Architecture

```
┌─────────────────────────────────────┐
│   AgentFabric Core Runtime          │
│  (LLM inference, memory, context)   │
└────────────┬────────────────────────┘
             │
    ┌────────┴──────────────┐
    │                       │
┌───▼────┐  ┌─────────┐  ┌─▼────────┐
│ Webhook │  │Integr. │  │  Message │
│ Handler │  │  Mgr   │  │  Router  │
└────┬────┘  └────┬────┘  └────┬─────┘
     │            │            │
     └────────────┼────────────┘
                  │
      ┌───────────┴─────────────┐
      │                         │
   ┌──▼──┐  ┌────┐  ┌──────┐  ┌▼────┐
   │Chat │  │Slack│  │Tele  │  │Zend │
   │woot │  │ Bot │  │gram  │  │esk  │
   └─────┘  └────┘  └──────┘  └─────┘
```

---

## Deployment Options

### Option 1: Docker Compose (Development)
```bash
docker-compose up -d
```

### Option 2: Kubernetes (Production)
```bash
kubectl apply -f k8s/
```

### Option 3: Managed Hosting
- Vercel (frontend)
- Fly.io or Railway (backend)
- AWS RDS (database)
- AWS S3 (documents)

---

## Webhook Setup

**Example: Slack to AgentFabric**

```typescript
// packages/integrations/src/webhooks/slack.ts
export async function handleSlackWebhook(req: Request) {
  const { text, user_id, channel_id } = req.body;
  
  // Route to AgentRuntime
  const response = await agentRuntime.chat(
    conversationId: channel_id,
    userMessage: text,
    userId: user_id
  );
  
  // Send response back to Slack
  await slackApp.client.chat.postMessage({
    channel: channel_id,
    text: response.text
  });
}
```

---

## Cost Breakdown

| Component | Cost | Notes |
|-----------|------|-------|
| **AgentFabric Core** | $0 | Open-source MIT |
| **Chatwoot** | $0 | Self-hosted |
| **Slack Bot** | $0 | Free tier |
| **Telegram** | $0 | Free |
| **Zendesk** | $0–500/mo | API access via existing Zendesk account |
| **LLM** | $0–50+/mo | OpenAI, Anthropic, or self-hosted Llama |
| **Infrastructure** | $20–200/mo | Heroku, Railway, Fly.io |
| **Total** | **$20–250/mo** | vs $500–2000 for competitors |

---

**Document Version**: 1.0 | **Last Updated**: June 2026 | **Status**: Public