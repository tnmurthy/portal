-- AI Data Sync Platform Initial Schema
-- Acting as Database-Architect

CREATE EXTENSION IF NOT EXISTS vector;

-- Organizations / Users
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Third-party Connections
CREATE TABLE IF NOT EXISTS connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    source_type TEXT NOT NULL, -- 'notion', 'google_drive', 'web_scraper'
    auth_config JSONB NOT NULL, -- Encrypted tokens and IDs
    status TEXT DEFAULT 'active',
    last_synced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documents Metadata
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id UUID REFERENCES connections(id),
    external_id TEXT NOT NULL, -- ID from the source system (e.g. Notion Page ID)
    title TEXT,
    source_url TEXT,
    metadata JSONB,
    last_updated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(connection_id, external_id)
);

-- Document Chunks and Vectors
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    embedding vector(1536), -- 1536 for OpenAI embeddings
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ... (existing tables) ...

-- Mission Control Specific Tables
CREATE TABLE IF NOT EXISTS mc_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    name TEXT NOT NULL,
    brief TEXT,
    tier TEXT DEFAULT 'basic',
    manifest JSONB, -- The SquadManifest artifact
    status TEXT DEFAULT 'proposed', -- 'proposed', 'active', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mc_agent_activity (
    id BIGSERIAL PRIMARY KEY,
    mission_id UUID REFERENCES mc_missions(id) ON DELETE CASCADE,
    agent_name TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- 'thought', 'action', 'result', 'error'
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ... (existing tables) ...

CREATE TABLE IF NOT EXISTS mc_usage_logs (
    id BIGSERIAL PRIMARY KEY,
    mission_id UUID REFERENCES mc_missions(id) ON DELETE CASCADE,
    agent_name TEXT NOT NULL,
    model_name TEXT NOT NULL,
    prompt_tokens INTEGER DEFAULT 0,
    completion_tokens INTEGER DEFAULT 0,
    estimated_cost FLOAT DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
