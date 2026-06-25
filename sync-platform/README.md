# AI Data Sync Platform

Automated synchronization of third-party data into vector embeddings for AI applications.

## Current Progress

- [x] **Phase 1.1: Core Data Models**
    - [x] Directory structure initialized.
    - [x] Docker Compose with `pgvector` and Redis.
    - [x] PostgreSQL schema defined.
- [ ] **Phase 1.2: Dummy Pipeline** (Next)
    - [ ] Script for chunking and embedding.
    - [ ] DB insertion logic.
- [ ] **Phase 1.3: First Connector (Web Scraper)**
- [ ] **Phase 1.4: Search API**
- [ ] **Phase 1.5: Control Plane (Dashboard)**

## Getting Started

1.  Start the infrastructure: `docker-compose up -d`
2.  Initialize the database with `database/schema.sql`.
