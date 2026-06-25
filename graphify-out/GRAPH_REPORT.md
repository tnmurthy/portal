# Graph Report - .  (2026-06-25)

## Corpus Check
- Corpus is ~49,086 words - fits in a single context window. You may not need a graph.

## Summary
- 328 nodes · 403 edges · 80 communities (68 shown, 12 thin omitted)
- Extraction: 64% EXTRACTED · 36% INFERRED · 0% AMBIGUOUS · INFERRED: 144 edges (avg confidence: 0.51)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Execution Engine & Lead Agent Core|Execution Engine & Lead Agent Core]]
- [[_COMMUNITY_LangGraph Orchestration & Workflows|LangGraph Orchestration & Workflows]]
- [[_COMMUNITY_Base Mission & Database Operations|Base Mission & Database Operations]]
- [[_COMMUNITY_State Persistence & Logging Management|State Persistence & Logging Management]]
- [[_COMMUNITY_Base Ingestion & Platform Connectors|Base Ingestion & Platform Connectors]]
- [[_COMMUNITY_Sovereign Intelligence Report Generator|Sovereign Intelligence Report Generator]]
- [[_COMMUNITY_Search & Scraper Unit Tests|Search & Scraper Unit Tests]]
- [[_COMMUNITY_Sitemap Generators & Website Crawling|Sitemap Generators & Website Crawling]]
- [[_COMMUNITY_Ollama Cost Calculation Tests|Ollama Cost Calculation Tests]]
- [[_COMMUNITY_Vector KB Search & Sync Tools|Vector KB Search & Sync Tools]]
- [[_COMMUNITY_Websocket Connections Management|Websocket Connections Management]]
- [[_COMMUNITY_Architectural & Solution Blueprints|Architectural & Solution Blueprints]]
- [[_COMMUNITY_Conversation Sentiment & ROI Analysis|Conversation Sentiment & ROI Analysis]]
- [[_COMMUNITY_Execution Engine Unit Tests|Execution Engine Unit Tests]]
- [[_COMMUNITY_Lead Agent Squad Fallback Tests|Lead Agent Squad Fallback Tests]]
- [[_COMMUNITY_Dummy Vector Pipeline|Dummy Vector Pipeline]]
- [[_COMMUNITY_Knowledge Agent Dashboard Logic|Knowledge Agent Dashboard Logic]]
- [[_COMMUNITY_Review Board Dashboard UI Component|Review Board Dashboard UI Component]]
- [[_COMMUNITY_Email Signature Generator Utility|Email Signature Generator Utility]]
- [[_COMMUNITY_AgentFabric Blueprints|AgentFabric Blueprints]]
- [[_COMMUNITY_FedFina Modernization Specifications|FedFina Modernization Specifications]]
- [[_COMMUNITY_SVG Favicon Visual Icon|SVG Favicon Visual Icon]]
- [[_COMMUNITY_Ingestion Connection Fetch Protocol|Ingestion Connection Fetch Protocol]]
- [[_COMMUNITY_Ingestion Auth Verification Mechanism|Ingestion Auth Verification Mechanism]]
- [[_COMMUNITY_Lyft Consultant Workflow Dashboard|Lyft Consultant Workflow Dashboard]]
- [[_COMMUNITY_Sutherland Leadership Glass Dashboard|Sutherland Leadership Glass Dashboard]]
- [[_COMMUNITY_Chatwoot Ingestion Adapter|Chatwoot Ingestion Adapter]]

## God Nodes (most connected - your core abstractions)
1. `StateManager` - 30 edges
2. `LeadAgent` - 24 edges
3. `UsageTracker` - 23 edges
4. `FulfillmentTier` - 22 edges
5. `SquadManifest` - 21 edges
6. `ReportGenerator` - 19 edges
7. `ExecutionEngine` - 18 edges
8. `SpecialistAgent` - 14 edges
9. `ConnectionManager` - 12 edges
10. `MissionRequest` - 9 edges

## Surprising Connections (you probably didn't know these)
- `FDE System Health Check.      Verifies Database, Cloud LLM, and Local Sovereign` --rationale_for--> `health_check()`  [EXTRACTED]
  mission-control/main.py → web-port/agentfabric-api/main.py
- `Generates a 'Sovereign Intelligence Report' for finished missions.     Provides` --uses--> `StateManager`  [INFERRED]
  mission-control/brain/report_generator.py → mission-control/brain/state_manager.py
- `Test cost calculation for GPT-4o.     Rates: $5.00/1M prompt, $15.00/1M complet` --uses--> `UsageTracker`  [INFERRED]
  mission-control/tests/test_usage_tracker.py → mission-control/brain/usage_tracker.py
- `Test that local models have zero cost.` --uses--> `UsageTracker`  [INFERRED]
  mission-control/tests/test_usage_tracker.py → mission-control/brain/usage_tracker.py
- `Test retrieval of total cost.` --uses--> `UsageTracker`  [INFERRED]
  mission-control/tests/test_usage_tracker.py → mission-control/brain/usage_tracker.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Mission Control System Documentation** — ultimate_context_mission_control_clone, mission_control_architecture_hld, mission_control_project_overlord_handover_architectural_core [INFERRED 0.85]

## Communities (80 total, 12 thin omitted)

### Community 0 - "Execution Engine & Lead Agent Core"
Cohesion: 0.14
Nodes (27): ExecutionEngine, Enum, LeadAgent, Takes a mission brief and generates a structured SquadManifest., The Lead Agent acts as the FDE Architect.     It interviews the user and genera, Fallback logic to query a local Ollama instance., Creates the specialized 5-judge Review Board manifest., Initializes the Gen AI Architecture Review Board mission. (+19 more)

### Community 1 - "LangGraph Orchestration & Workflows"
Cohesion: 0.07
Nodes (23): Builds the graph dynamically and starts execution., Takes a SquadManifest and dynamically builds/runs the LangGraph.     Implements, AgentState, create_mission_graph(), Initializes the LangGraph for a Mission., The state of the agent squad.     Includes the cumulative messages and the curr, A generic Specialist Agent that can be configured by the SquadManifest.     Sup, Local LLM fallback for specialist reasoning. (+15 more)

### Community 2 - "Base Mission & Database Operations"
Cohesion: 0.12
Nodes (20): BaseModel, approve_mission(), execute_mission(), get_assets(), get_db_connection(), get_report(), get_usage(), health_check() (+12 more)

### Community 3 - "State Persistence & Logging Management"
Cohesion: 0.11
Nodes (13): Manages the persistence of Mission States and Agent Activity.     Acts as the s, Logs agent 'thoughts' or 'actions' to the DB.         Triggers a pg_notify for, StateManager, Test mission insertion., Test activity logging., Test retrieval of mission state., Test asset insertion., Test retrieval of mission assets. (+5 more)

### Community 4 - "Base Ingestion & Platform Connectors"
Cohesion: 0.15
Nodes (8): ABC, BaseConnector, Abstract Base Class for all Ingestion Connectors.     Acting as Ingestion-Engin, BaseConnector, Orchestrates the flow: Ingest -> Process -> Store, run_sync(), Implementation of a basic Web Scraper Connector., WebScraperConnector

### Community 5 - "Sovereign Intelligence Report Generator"
Cohesion: 0.18
Nodes (6): Generates a 'Sovereign Intelligence Report' for finished missions.     Provides, ReportGenerator, Test markdown generation for a successful mission., Test report generation when mission ID doesn't exist., test_generate_markdown_not_found(), test_generate_markdown_success()

### Community 6 - "Search & Scraper Unit Tests"
Cohesion: 0.18
Nodes (10): Test web_scraper when the request fails., Test google_search with a valid API key and response., Test google_search when API key is missing., Test google_search when the API request fails., Test web_scraper with a successful HTML response., test_google_search_failure(), test_google_search_no_api_key(), test_google_search_success() (+2 more)

### Community 7 - "Sitemap Generators & Website Crawling"
Cohesion: 0.18
Nodes (10): extract_urls_from_sitemap(), extract_urls_from_website(), find_sitemap(), generate_sitemap(), 5. Website URL Extractor: Crawl a website to extract internal links, 2. Sitemap Validator: Validate if a sitemap is well-formed XML and accessible, 1. Sitemap Finder & Checker: Find sitemap URLs from a given base URL or robots.t, 3. XML Sitemap Generator: Generate an XML sitemap string from a list of URLs (+2 more)

### Community 8 - "Ollama Cost Calculation Tests"
Cohesion: 0.25
Nodes (6): Test cost calculation for GPT-4o.     Rates: $5.00/1M prompt, $15.00/1M complet, Test that local models have zero cost., Test retrieval of total cost., test_cost_calculation_gpt4o(), test_cost_calculation_local_model(), test_get_mission_total_cost()

### Community 10 - "Vector KB Search & Sync Tools"
Cohesion: 0.29
Nodes (6): format_context_for_llm(), Trigger a sync job in the Sync Platform for a given URL.     This can call the, Search the knowledge base for relevant snippets., Formats vector search results into a context string for an LLM prompt., search_kb(), sync_url()

### Community 12 - "Architectural & Solution Blueprints"
Cohesion: 0.33
Nodes (6): BYOK Key Vault, Mission Control High-Level Design, Real-Time State Layer Concept, Project Overlord Architectural Core, Mission Control Clone Concept, Portal Migration Bridge Context

### Community 13 - "Conversation Sentiment & ROI Analysis"
Cohesion: 0.40
Nodes (4): analyze_conversation(), calculate_chatbot_roi(), Calculates the ROI of implementing a chatbot based on support volume and costs., Analyzes a chat transcript to determine sentiment, intent, and resolution status

### Community 15 - "Lead Agent Squad Fallback Tests"
Cohesion: 0.40
Nodes (3): test_architect_squad_openai_failure_ollama_fallback(), test_architect_squad_success(), test_architect_squad_total_failure_survival_mode()

### Community 16 - "Dummy Vector Pipeline"
Cohesion: 0.67
Nodes (3): get_db_connection(), process_and_store(), Dummy pipeline: Chunk -> Embed -> Store

### Community 18 - "Knowledge Agent Dashboard Logic"
Cohesion: 0.83
Nodes (3): addLog(), handleSearch(), handleSync()

## Knowledge Gaps
- **12 isolated node(s):** `Favicon SVG`, `Graph and Node Representation`, `Portal Migration Bridge Context`, `Real-Time State Layer Concept`, `AI Data Sync Master Blueprint` (+7 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StateManager` connect `State Persistence & Logging Management` to `Execution Engine & Lead Agent Core`, `LangGraph Orchestration & Workflows`, `Base Mission & Database Operations`, `Sovereign Intelligence Report Generator`, `Websocket Connections Management`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `SpecialistAgent` connect `LangGraph Orchestration & Workflows` to `Execution Engine & Lead Agent Core`, `State Persistence & Logging Management`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `UsageTracker` connect `Execution Engine & Lead Agent Core` to `Ollama Cost Calculation Tests`, `LangGraph Orchestration & Workflows`, `Base Mission & Database Operations`, `Websocket Connections Management`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 22 inferred relationships involving `StateManager` (e.g. with `ConnectionManager` and `MissionRequest`) actually correct?**
  _`StateManager` has 22 INFERRED edges - model-reasoned connections that need verification._
- **Are the 18 inferred relationships involving `LeadAgent` (e.g. with `AgentRole` and `FulfillmentTier`) actually correct?**
  _`LeadAgent` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 18 inferred relationships involving `UsageTracker` (e.g. with `ConnectionManager` and `MissionRequest`) actually correct?**
  _`UsageTracker` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 19 inferred relationships involving `FulfillmentTier` (e.g. with `LeadAgent` and `Takes a mission brief and generates a structured SquadManifest.`) actually correct?**
  _`FulfillmentTier` has 19 INFERRED edges - model-reasoned connections that need verification._