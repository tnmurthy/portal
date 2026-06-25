import { Cpu, Database, ShieldCheck, Layers, Sparkles, LucideIcon } from 'lucide-react';

export interface PipelineStep {
  id: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  details: {
    description: string;
    tools: string[];
    rules: string[];
    checks: string[];
  };
}

export const steps: PipelineStep[] = [
  {
    id: 0,
    icon: Database,
    title: 'Ingestion',
    subtitle: 'Normalizing PDFs, Forms & Databases',
    details: {
      description: 'Unified data intake layer supporting 40+ source connectors including structured (SQL/NoSQL), semi-structured (JSON, XML), and unstructured (PDF, DOCX, image OCR) formats.',
      tools: ['Apache Kafka', 'AWS Glue', 'Tesseract OCR', 'Unstructured.io'],
      rules: ['Schema versioning enforced on all ingestion events', 'PII flagging at ingest boundary', 'Source checksum validation'],
      checks: ['Throughput SLA: <200ms p95', 'Duplicate detection via content hash', 'Source connectivity heartbeat'],
    },
  },
  {
    id: 1,
    icon: Cpu,
    title: 'Cleansing',
    subtitle: 'Automated Parsing, De-duplication & Schema Mapping',
    details: {
      description: 'Automated data quality pipeline applying deterministic and ML-based de-duplication, null handling, type coercion, and schema alignment to a canonical data model.',
      tools: ['Great Expectations', 'dbt', 'Dedupe.io', 'Pandas Profiling'],
      rules: ['Null tolerance per column defined in config', 'Fuzzy match threshold: 0.85 Jaccard similarity', 'Schema diff alerts on breaking changes'],
      checks: ['Completeness score ≥ 98%', 'Uniqueness score ≥ 99.5%', 'Type conformance 100%'],
    },
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Governance',
    subtitle: 'Compliance Check, Access Control & Metadata Logging',
    details: {
      description: 'Policy-as-code governance layer enforcing GDPR, HIPAA, SOC2, and ISO 27001 data handling requirements with full audit trail and role-based access control.',
      tools: ['Apache Atlas', 'OPA (Open Policy Agent)', 'AWS Macie', 'Collibra'],
      rules: ['RBAC enforced at column level', 'PII fields encrypted AES-256 at rest', 'Retention policies auto-enforced by tag'],
      checks: ['Compliance score tracked per pipeline run', 'Full lineage audit trail', 'RBAC policy violations trigger alerts'],
    },
  },
  {
    id: 3,
    icon: Layers,
    title: 'Embedding',
    subtitle: 'Vector Database Partitioning & Isolation',
    details: {
      description: 'High-throughput embedding generation pipeline using domain-fine-tuned transformer models with namespace-level tenant isolation in the vector store.',
      tools: ['OpenAI text-embedding-3-large', 'Pinecone', 'Weaviate', 'pgvector'],
      rules: ['Tenant namespace isolation enforced at write time', 'Embedding dimension consistency validation', 'Cosine similarity threshold: ≥ 0.72'],
      checks: ['Embedding drift detection via anchor vectors', 'Index freshness SLA: <5 min lag', 'Namespace query isolation verified'],
    },
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'RAG Synthesis',
    subtitle: 'Multi-Agent Query Validation & Citation Enforcement',
    details: {
      description: 'Production-grade Retrieval-Augmented Generation system using a multi-agent orchestration layer with hallucination guards, citation enforcement, and output confidence scoring.',
      tools: ['LangGraph', 'LlamaIndex', 'Claude 3.5', 'Guardrails AI'],
      rules: ['Every output must cite source chunk IDs', 'Confidence threshold < 0.65 triggers human review', 'No cross-tenant context leakage'],
      checks: ['Citation coverage ≥ 95%', 'Hallucination rate < 0.5% on eval set', 'P95 response latency < 2.4s'],
    },
  },
];
