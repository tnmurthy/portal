# AI Data Sync Platform: Architecture & Agent Swarm Blueprint

This document serves as the master blueprint for developing an automated data synchronization platform for AI (similar to SourceSync.ai). It is structured to be consumed by an AI agent swarm, with clear architectural boundaries, technology choices, and explicit roles and responsibilities.

## 1. System Overview

The platform is an ETL pipeline optimized for unstructured text and vector embeddings. Its purpose is to connect to external data sources, extract content, transform it into AI-ready chunks and embeddings, and load it into a searchable vector database exposed via a REST API.

### Core Pillars
1.  **Ingestion Engine:** Manages connections, authentication (OAuth), and extracts data via webhooks or polling.
2.  **Processing Pipeline:** Parses, cleans, chunks, and embeds documents.
3.  **Storage Layer:** Manages relational metadata, raw document storage, and vector embeddings.
4.  **Retrieval API:** Exposes endpoints for semantic and hybrid search.
5.  **Control Plane (Dashboard):** UI for users to manage connections, keys, and view logs.

## 2. Technology Stack

*   **Frontend (Control Plane):** Next.js (React), Tailwind CSS, TypeScript.
*   **Backend (API & Ingestion):** Node.js (Express/Fastify) or Python (FastAPI).
*   **Workflow Orchestration:** Temporal.io (critical for reliable ETL pipelines).
*   **Processing Workers:** Python (leveraging Unstructured.io, LlamaIndex, or LangChain).
*   **Database:** PostgreSQL with `pgvector` extension.
*   **Message Broker/Queues:** Redis or RabbitMQ.

## 3. Agent Swarm: Roles & Responsibilities

To execute this build, the agent swarm is divided into specialized roles. Each agent should focus strictly on their designated domain to ensure modularity and clean interfaces.

---

### Agent 1: `Ingestion-Engineer`

**Domain:** The Extract Phase. Connecting to third-party APIs and managing data inflow.

**Responsibilities:**
*   Design and implement a generic `BaseConnector` interface (`fetch_incremental()`, `fetch_all()`, `verify_auth()`).
*   Implement the OAuth 2.0 flow manager for user authentication with third-party services.
*   Build the first two concrete connectors:
    1.  **Notion Connector:** Handle pagination, block parsing, and respect rate limits.
    2.  **Web Scraper Connector:** Handle crawling, sitemap parsing, and robots.txt.
*   Implement webhook receivers to listen for real-time updates from supported sources.
*   Implement a polling mechanism for sources that do not support webhooks.
*   Ensure all ingested raw data is pushed to a message queue for processing.

**Key Challenges:** Handling provider rate limits (429s), managing token rotation, and ensuring robust error handling for network requests.

---

### Agent 2: `Data-Pipeline-Engineer`

**Domain:** The Transform Phase. Turning messy data into clean, embedded vectors.

**Responsibilities:**
*   Set up Temporal.io (or equivalent workflow engine) to orchestrate the processing DAG.
*   Implement Document Parsing: Convert raw HTML, Markdown, and PDF inputs into clean, normalized text while preserving metadata (titles, headers, source URLs).
*   Implement Chunking Strategies: Build flexible text splitters (e.g., Recursive Character Text Splitting with overlap).
*   Integrate Embedding Models: Connect to OpenAI (`text-embedding-3-small`) or Cohere APIs to generate vector embeddings for chunks.
*   Implement retry logic with exponential backoff for embedding API calls.
*   Package processed chunks (text + metadata + vector) and prepare them for database insertion.

**Key Challenges:** Handling large or malformed documents (avoiding OOM errors), preserving semantic meaning during chunking, and managing embedding API costs/limits.

---

### Agent 3: `Database-Architect`

**Domain:** The Load Phase. Schema design, data integrity, and vector storage.

**Responsibilities:**
*   Design the PostgreSQL relational schema for: Users, Organizations, Connections, Sync Jobs, and Document Metadata.
*   Set up and configure the `pgvector` extension.
*   Design the Vector storage table schema (Chunk ID, Document ID, Vector, Text Content, JSONB Metadata).
*   Implement robust Upsert (Insert or Update) logic. When a document is updated, old chunks must be replaced or deleted, not duplicated.
*   Implement Soft vs. Hard delete synchronization logic based on upstream source changes.
*   Optimize database indexes (e.g., HNSW or IVFFlat for vectors, B-trees for metadata filtering).

**Key Challenges:** Maintaining consistency between the relational metadata and the vector store, ensuring idempotent operations, and optimizing vector search performance.

---

### Agent 4: `API-Developer`

**Domain:** The Retrieval Phase. Building the customer-facing developer API.

**Responsibilities:**
*   Design and implement the RESTful API endpoints (e.g., `POST /v1/search`, `GET /v1/documents`).
*   Implement API Key generation, validation, and middleware.
*   Implement Rate Limiting logic (e.g., Token Bucket algorithm using Redis).
*   Build the Search Logic: Take a user query, generate its embedding, perform the vector similarity search in `pgvector`, and apply metadata filters.
*   (Optional but recommended) Implement Hybrid Search combining vector similarity with text search (BM25).

**Key Challenges:** Ensuring low latency for search requests, secure API key management, and flexible metadata filtering syntax.

---

### Agent 5: `Frontend-Engineer`

**Domain:** The Control Plane. The user dashboard.

**Responsibilities:**
*   Initialize the Next.js project.
*   Build the Authentication flow for platform users (e.g., using NextAuth or Clerk).
*   Develop the Dashboard UI:
    *   Connections Page: UI to initiate OAuth flows and add new data sources.
    *   Data Sources Table: List of connected sources, sync status, and document counts.
    *   API Keys Management: UI to generate and revoke API keys.
    *   Sync Logs/History: View success/failure logs for recent sync jobs.
*   Integrate with the backend APIs to manage state.

**Key Challenges:** Handling OAuth callback redirects cleanly in the UI, providing real-time status updates for long-running sync jobs.

---

## 4. Execution Plan (Phase 1: MVP)

To avoid integration hell, the swarm should execute in the following sequence:

1.  **Phase 1.1: Core Data Models:** `Database-Architect` establishes the Postgres schema and `pgvector` setup.
2.  **Phase 1.2: Dummy Pipeline:** `Data-Pipeline-Engineer` builds a script that takes a raw string, chunks it, embeds it, and `Database-Architect` ensures it saves correctly.
3.  **Phase 1.3: First Connector:** `Ingestion-Engineer` builds the Web Scraper connector and pipes the output into the pipeline.
4.  **Phase 1.4: Search API:** `API-Developer` builds the `/v1/search` endpoint to query the data ingested in 1.3.
5.  **Phase 1.5: Control Plane:** `Frontend-Engineer` builds the basic UI to manage the scraper and view the synced documents.

## 6. Agent Harness & Operational Guidelines

To maximize execution quality and minimize token waste, all agents in this swarm must adhere to the following harness constraints:

### A. Observation & Reporting Protocol
Every tool call and task completion must be accompanied by a structured observation:
*   **Status:** `success` | `warning` | `error`
*   **Summary:** A one-line summary of what was achieved.
*   **Artifacts:** Paths to created files or IDs of generated resources.
*   **Next Action:** The immediate next step to maintain momentum.

### B. Error Recovery Contract
When an agent encounters a failure (e.g., API timeout, test failure, linter error):
1.  **Diagnose:** State the root cause clearly (e.g., "OpenAI API rate limit exceeded").
2.  **Safety First:** Revert any partial, broken state before retrying.
3.  **Retry Strategy:** Use exponential backoff or a modified approach (e.g., "Reducing chunk size to 256 to avoid OOM").
4.  **Stop Condition:** If a fix fails 3 times, stop and request human intervention or a strategy pivot.

### C. Context Budgeting
*   **Reference, Don't Inline:** Use file paths and line numbers instead of dumping large code blocks into the chat history.
*   **Surgical Edits:** Use `replace` for targeted changes instead of `write_file` for large existing files to keep the context window lean.
*   **Phase Compaction:** Provide a high-level summary at the end of each Phase (e.g., Phase 1.1 completion) and discard transient logs.

### D. Action Granularity
*   **Micro-tasks:** Use for high-risk changes like database migrations or deleting cloud resources.
*   **Medium-tasks:** Standard implementation of functions, classes, and tests.
*   **Validation:** Every "Act" turn must be followed by a "Validate" turn (running tests/linters).

## 7. Coding Standards & Instructions for Agents

*   **Language:** Python is strongly preferred for Agents 1, 2, and 3 due to the maturity of AI/Data ecosystem (Temporal, LangChain, Unstructured). TypeScript/Node.js is acceptable for Agent 4. Agent 5 uses TypeScript/React.
*   **Idempotency:** Every operation in the pipeline must be idempotent. Re-running a sync job for a document should result in the exact same database state.
*   **Error Handling:** Never swallow exceptions. Log errors with context (Document ID, Source) so sync failures can be surfaced to the user in the Control Plane.
*   **Security:** Never log API keys, OAuth tokens, or the raw text content of user documents. Use environment variables for all secrets.
