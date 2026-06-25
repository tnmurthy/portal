# AgentFabric Technical Specification

## System Architecture

### High-Level Overview

```
┌──────────────────────────────────────────────┐
│         Frontend Layer (React + Vite)        │
│  ┌─────────────┬──────────────┬────────────┐ │
│  │   Web      │    Studio    │ Dashboard  │ │
│  │ (Landing)  │   (Builder)  │(Analytics) │ │
│  └─────────────┴──────────────┴────────────┘ │
└──────────────┬───────────────────────────────┘
               │ REST API / WebSocket
┌──────────────▼───────────────────────────────┐
│      API Layer (Express.js + TypeScript)     │
│  ┌──────────────────────────────────────┐    │
│  │      Route Handlers (v1/*)           │    │
│  │  - /agents      - /conversations     │    │
│  │  - /documents   - /integrations      │    │
│  │  - /auth        - /analytics         │    │
│  └──────────────────────────────────────┘    │
└──────────────┬───────────────────────────────┘
               │
       ┌───────┴──────────┐
       │                  │
┌──────▼──────┐    ┌──────▼──────┐
│AgentRuntime │    │Integration  │
│(Core Logic) │    │   Manager   │
└──────┬──────┘    └──────┬──────┘
       │                  │
   ┌───┴──────────┬───────┴────┐
   │              │            │
┌──▼──┐    ┌─────▼────┐  ┌────▼────┐
│ LLM │    │ Vector   │  │ Message │
│Calls│    │   DB     │  │ Queue   │
└─────┘    │(Weaviate)│  │(Bull)   │
           └──────────┘  └─────────┘
                │
         ┌──────┴──────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │PostgreSQL│      │  Redis  │
    │  (Main) │      │ (Cache) │
    └─────────┘      └─────────┘
```

## Core Type System

### Agent Types
```typescript
interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'llama';
  model: string;
  temperature: number;
  maxTokens: number;
  topP?: number;
}

interface KnowledgeBase {
  documents: DocumentRef[];
  vectorDb: 'weaviate' | 'pinecone';
  indexName: string;
}

interface FlowNode {
  id: string;
  type: 'input' | 'llm' | 'condition' | 'integration' | 'output';
  data: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface Agent {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  systemPrompt: string;
  llmConfig: LLMConfig;
  knowledgeBase: KnowledgeBase;
  flows: FlowNode[];
  integrations: IntegrationConfig[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Conversation Types
```typescript
interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  tokens: { input: number; output: number };
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface Conversation {
  id: string;
  agentId: string;
  channel: 'web' | 'slack' | 'telegram' | 'email' | 'api';
  userId: string;
  messages: Message[];
  metadata: Record<string, any>;
  startedAt: Date;
  endedAt?: Date;
  handedOffTo?: string;
}
```

## Database Schema

### Prisma Models

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String
  workspaces    Workspace[]
  apiKeys       ApiKey[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Workspace {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  owner         User      @relation(fields: [ownerId], references: [id])
  ownerId       String
  agents        Agent[]
  documents     Document[]
  integrations  Integration[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Agent {
  id            String    @id @default(cuid())
  workspace     Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId   String
  name          String
  description   String?
  systemPrompt  String
  llmConfig     Json
  knowledgeBase Json
  flows         Json?
  integrations  Integration[]
  conversations Conversation[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Document {
  id              String    @id @default(cuid())
  workspace       Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId     String
  name            String
  type            String    // pdf, docx, text, url
  url             String?
  content         String?
  embeddingsCount Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Conversation {
  id            String    @id @default(cuid())
  agent         Agent     @relation(fields: [agentId], references: [id])
  agentId       String
  channel       String    // web, slack, telegram, email, api
  userId        String
  messages      Message[]
  metadata      Json      @default("{}")
  handedOffTo   String?
  startedAt     DateTime  @default(now())
  endedAt       DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Message {
  id              String    @id @default(cuid())
  conversation    Conversation @relation(fields: [conversationId], references: [id])
  conversationId  String
  role            String    // user, assistant
  content         String
  tokens          Json      // { input: number; output: number }
  metadata        Json?
  createdAt       DateTime  @default(now())
}

model Integration {
  id            String    @id @default(cuid())
  workspace     Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId   String
  agent         Agent?    @relation(fields: [agentId], references: [id])
  agentId       String?
  type          String    // slack, zendesk, chatwoot, telegram, webhook
  enabled       Boolean   @default(true)
  config        Json      // Integration-specific config
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model ApiKey {
  id        String    @id @default(cuid())
  user      User      @relation(fields: [userId], references: [id])
  userId    String
  key       String    @unique
  name      String
  scopes    String[]  // ["agents:read", "agents:write"]
  lastUsedAt DateTime?
  createdAt DateTime  @default(now())
  expiresAt DateTime?
}
```

## API Endpoints (v1)

### Agents
```
GET    /api/v1/agents                    # List agents
POST   /api/v1/agents                    # Create agent
GET    /api/v1/agents/:id                # Get agent
PUT    /api/v1/agents/:id                # Update agent
DELETE /api/v1/agents/:id                # Delete agent
```

### Conversations
```
POST   /api/v1/conversations             # Start conversation
GET    /api/v1/conversations/:id         # Get conversation
POST   /api/v1/conversations/:id/messages # Send message
GET    /api/v1/conversations/:id/history # Get message history
```

### Documents
```
POST   /api/v1/documents                 # Upload document
GET    /api/v1/documents/:id             # Get document
DELETE /api/v1/documents/:id             # Delete document
POST   /api/v1/documents/:id/process     # Process & embed
```

### Integrations
```
GET    /api/v1/integrations              # List integrations
POST   /api/v1/integrations              # Create integration
PUT    /api/v1/integrations/:id          # Update integration
DELETE /api/v1/integrations/:id          # Delete integration
```

## Tech Stack

| Layer | Technology | Version |
|-------|---|---|
| **Frontend** | React | 18.3.1 |
| **Build** | Vite | 5.4.2 |
| **Styling** | Tailwind CSS | 3.4.1 |
| **UI Components** | Shadcn/ui | Latest |
| **Visual Editor** | ReactFlow | 11.10.0 |
| **State** | Zustand | 4.4.0 |
| **Data Fetching** | TanStack Query | 5.28.0 |
| **Backend** | Express.js | 4.18.0 |
| **Language** | TypeScript | 5.5.3 |
| **Database** | PostgreSQL | 16 |
| **ORM** | Prisma | 5.7.0 |
| **Vector DB** | Weaviate | Latest |
| **Cache** | Redis | 7 |
| **Job Queue** | Bull | 4.12.0 |
| **LLM SDK** | OpenAI + Anthropic | Latest |
| **Embeddings** | OpenAI API | Latest |
| **Build Tool** | Turbo | 1.10.0 |
| **Package Manager** | pnpm | 8+ |
| **Node** | Node.js | 20+ |

---

**Document Version**: 1.0 | **Last Updated**: June 2026 | **Status**: Public