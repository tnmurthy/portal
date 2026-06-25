import { 
  Award, Users, Clock, Zap,
  Code2, BarChart2, Cloud, Brain, Globe,
  Target, Shield, GitBranch,
  Database, Cpu, ShieldCheck, Layers, Sparkles
} from 'lucide-react';

// ==========================================
// 1. Home Page Trust Strip & Stats
// ==========================================
export const trustLogos = [
  { name: 'Stripe', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' },
  { name: 'Salesforce', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  { name: 'Oracle', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name: 'SAP', path: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' },
  { name: 'IBM', path: 'M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z' },
  { name: 'Microsoft', path: 'M11 11H3V3h8v8zm10 0h-8V3h8v8zM11 21H3v-8h8v8zm10 0h-8v-8h8v8z' },
];

export const stats = [
  { icon: Award, value: '10+', label: 'Years of Excellence' },
  { icon: Users, value: '150+', label: 'Enterprise Clients' },
  { icon: Clock, value: '10', label: 'Active Projects Max' },
  { icon: Zap, value: '98%', label: 'Client Retention' },
];

// ==========================================
// 2. About Page Values, Methodology & Tech Stack
// ==========================================
export const values = [
  { icon: Target, title: 'The Sovereign Constraint', desc: 'To maintain mathematical precision and zero-defect delivery, we enforce a strict cap of 10 concurrent client engagements.' },
  { icon: Users, title: 'Senior Architects Only', desc: 'No junior engineers on client work. Every team member has 8+ years of production engineering and systems design experience.' },
  { icon: Shield, title: 'Security-First Guardrails', desc: 'PII de-identification, tenant isolation, and strict compliance boundaries (SOC2 & HIPAA) are built into our design layers.' },
  { icon: GitBranch, title: 'Transparent Lineage', desc: 'Full architectural transparency: you see all sprint commits, data governance maps, and vector index parameters.' },
];

export const methodSteps = [
  {
    phase: '01',
    title: 'Discovery & Architecture',
    desc: 'We begin with a 2-week technical discovery sprint. We map your existing systems, identify constraints, and produce an architecture decision record (ADR) before writing a single line of production code.',
  },
  {
    phase: '02',
    title: 'AI-Augmented Development',
    desc: 'Our engineers use AI coding assistants as force multipliers, not replacements. Every AI-generated code block is reviewed against our internal security checklist and passes automated SAST/DAST pipelines.',
  },
  {
    phase: '03',
    title: 'Continuous Code Review',
    desc: 'All PRs require two senior engineer approvals. We enforce test coverage minimums (80% unit, 60% integration) and automated dependency vulnerability scanning on every merge.',
  },
  {
    phase: '04',
    title: 'Security Validation',
    desc: 'Before any production deployment, we run a full OWASP Top 10 scan, secrets detection, container image CVE analysis, and a manual penetration test on critical paths.',
  },
  {
    phase: '05',
    title: 'Production & Observability',
    desc: "Production systems ship with full distributed tracing (OpenTelemetry), structured logging, and SLO dashboards. We don't hand off and walk away — we stay as your engineering partner.",
  },
];

export const techAreas = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Python', 'Go', 'Rust'] },
  { label: 'Data', items: ['Spark', 'dbt', 'Kafka', 'Pinecone'] },
  { label: 'Cloud', items: ['AWS', 'GCP', 'Azure', 'Terraform'] },
  { label: 'AI / ML', items: ['LangGraph', 'LlamaIndex', 'Claude', 'OpenAI'] },
  { label: 'Security', items: ['OPA', 'AWS Macie', 'Vault', 'Snyk'] },
];

// ==========================================
// 3. Services Definitions
// ==========================================
export const services = [
  {
    icon: Code2,
    title: 'Product Engineering',
    color: '#3B82F6',
    description: 'End-to-end software delivery from discovery to production, with a focus on maintainability and engineering excellence.',
    capabilities: [
      'User Experience & Design Systems',
      'Application Development',
      'Mobile App Development',
      'Legacy Modernization',
      'DevOps & CI/CD',
      'API Economy & Integration',
      'Quality Assurance',
      'Maintenance & Support',
    ],
    caseStudy: '"Modernized a 12-year-old HRMS system, delivering 40% higher user satisfaction and 30% reduction in customization overhead."',
  },
  {
    icon: BarChart2,
    title: 'Enterprise Data Platforms',
    color: '#10B981',
    description: 'High-throughput, real-time distributed data platforms and ledgers featuring policy-driven governance, metadata trace schemas, and sub-second latency.',
    capabilities: [
      'Real-Time Streaming Pipelines (Kafka, Spark)',
      'Policy-as-Code Data Governance Ledgers',
      'Sub-second Anomaly Detection & ML Auditing',
      'Automated Lineage Mapping & Compliance Logs',
      'Enterprise Metadata Warehousing (dbt, Snowflake)',
      'Fintech Data Sanitization (SOC2 & HIPAA Compliant)',
    ],
    caseStudy: '"Designed a real-time Fintech audit pipeline processing 1M+ daily transactions at <1s latency with 100% regulatory compliance."',
  },
  {
    icon: Cloud,
    title: 'Cloud-Native & Modernization',
    color: '#F59E0B',
    description: 'High-velocity migration and containerized re-platforming of legacy systems onto secure, sovereign distributed cloud architectures on AWS, GCP, and Azure.',
    capabilities: [
      'Legacy 4GL & Mainframe Modernization',
      'Zero-Downtime Database Cutover Strategies',
      'Automated Infrastructure-as-Code (Terraform)',
      'Resilient Container Orchestration (EKS, GKE)',
      'Enterprise FinOps & Resource Optimization',
      'SOC2 & ISO 27001 Cloud Infrastructure Audits',
    ],
    caseStudy: '"Modernized and containerized a legacy 4GL warehouse system to AWS in under 12 weeks, achieving 60% operational savings with zero downtime."',
  },
  {
    icon: Brain,
    title: 'Autonomous Agentic Workflows',
    color: '#8B5CF6',
    description: 'High-integrity, self-correcting multi-agent networks engineered with trust-first security guardrails, LangGraph orchestration, and active citation validation.',
    capabilities: [
      'LangGraph & LlamaIndex Agentic Architectures',
      'Autonomous Multi-Step Operational Loops',
      'Hallucination Safeguards & PII De-identification',
      'Human-in-the-Loop Orchestration',
      'Fine-Tuned Domain Classifiers & Vector Indexing',
      'Legacy System Modernization & AI Integration',
    ],
    caseStudy: '"Deployed an autonomous document processing pipeline with 98% extraction accuracy, 200x velocity, and zero PII context leakage."',
  },
  {
    icon: Globe,
    title: 'Digital Services',
    color: '#EC4899',
    description: 'Digital transformation programs that reimagine customer experience, operations, and integrations across the enterprise.',
    capabilities: [
      'Digital Transformation Strategy',
      'Digital Experience Design',
      'Digital Operations',
      'Digital Integrations',
      'Open Source Transformation',
    ],
    caseStudy: '"Unified a multi-clinic practice management CRM, automating schedules and eliminating patient communication leakages."',
  },
];

// ==========================================
// 4. Case Studies Portfolio (Inc. Forward Deployment Executive Narratives)
// ==========================================
export type Tag = 'All' | 'BFSI' | 'Healthcare' | 'Logistics' | 'Technology' | 'Travel' | 'Retail';

export const tags: Tag[] = ['All', 'BFSI', 'Healthcare', 'Logistics', 'Technology', 'Travel', 'Retail'];

export interface BlueprintLayer {
  name: string;
  icon: string;
  components: string[];
}

export interface BlueprintStep {
  name: string;
  desc: string;
}

export interface CaseStudyBlueprint {
  title: string;
  layers: BlueprintLayer[];
  steps: BlueprintStep[];
}

export interface CaseStudyHld {
  components: string[];
  dataFlow: string[];
  security: string[];
  legacyModernization: string;
}

export interface CaseStudy {
  id: number;
  tag: Tag;
  service: string;
  serviceColor: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  outcomes: { metric: string; label: string }[];
  duration: string;
  team: string;
  blueprint: CaseStudyBlueprint;
  hld: CaseStudyHld;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    tag: 'Technology' as Tag,
    service: 'Product Engineering',
    serviceColor: '#3B82F6',
    title: 'Legacy HRMS Modernization',
    client: 'Global HR Software Provider',
    challenge: 'A 12-year-old HRMS platform was suffering from technical debt, poor UX, and inability to customize for enterprise clients at scale, leading to high churn.',
    solution: 'Full application re-architecture using React, GraphQL, and a microservices backend — with a new component-driven design system and location-aware map features.',
    outcomes: [
      { metric: '40%', label: 'Increase in user satisfaction scores' },
      { metric: '30%', label: 'Reduction in customization effort' },
      { metric: '50%', label: 'Faster map feature load times' },
    ],
    duration: '9 months',
    team: '8 engineers',
    blueprint: {
      title: 'Federated Micro-Frontend Architecture with GraphQL Gateway',
      layers: [
        { name: 'Presentation Layer', icon: 'Globe', components: ['React 18 Micro-SPA', 'Tailwind CSS Tokens', 'Mapbox SDK Integrations'] },
        { name: 'Gateway Orchestration', icon: 'GitBranch', components: ['Apollo GraphQL Gateway', 'Federated Schema Resolver', 'Redis hot Cache'] },
        { name: 'Enterprise Services', icon: 'Cpu', components: ['Payroll Microservice', 'Employee profile Service', 'Location GIS Node'] },
        { name: 'Persistence Layer', icon: 'Database', components: ['PostgreSQL DB Cluster', 'Read-Replica Replica Sync', 'MinIO Document Vault'] },
      ],
      steps: [
        { name: '1. Request Ingestion', desc: 'Secure React client sends authenticated federated GraphQL query to the Gateway.' },
        { name: '2. Schema Resolution', desc: 'Gateway parses queries and routes requests to location-aware payroll or profile services.' },
        { name: '3. Data Retrieval', desc: 'Microservices fetch data from hot Redis caches or scale-partitioned PostgreSQL.' },
        { name: '4. Response Assembler', desc: 'Gateway aggregates distributed responses into a unified, lightweight JSON payload.' },
      ]
    },
    hld: {
      components: ['React Federated Micro-Frontends', 'Apollo GraphQL Federation Gateway', 'Dockerized Node.js Microservices', 'PostgreSQL DB Scale Cluster', 'Redis Enterprise Cache Server'],
      dataFlow: [
        'Secure Client Query -> Apollo GraphQL Gateway',
        'Federated Schema Query Parsing -> Microservice Sub-Nodes',
        'Hot Cache Verification -> Redis Memory Cache',
        'Database Replica Fetch -> Scaled PostgreSQL Instance',
        'Unified Response Pipeline -> Enforced JWT Client Scope'
      ],
      security: [
        'OAuth2 + PKCE client identity validation',
        'Column-level envelope encryption for employee PII fields',
        'Strict TLS 1.3 encryption for all inter-microservice handshakes'
      ],
      legacyModernization: 'Replaced a fragile monolith with modular Micro-Frontends, eliminating regression risks and reducing maintenance overhead by 30%.'
    }
  },
  {
    id: 2,
    tag: 'BFSI' as Tag,
    service: 'Data Analytics',
    serviceColor: '#10B981',
    title: 'Real-Time Fintech Auditing',
    client: 'Series B Payments Platform',
    challenge: 'Manual spreadsheet-based audit reconciliation was causing reporting delays of 3-5 days and missing fraudulent transaction patterns in real-time flows.',
    solution: 'Built a streaming data pipeline on Apache Kafka + Spark with an ML-powered anomaly detection layer integrated directly into the compliance dashboard.',
    outcomes: [
      { metric: '98%', label: 'Transaction prediction accuracy' },
      { metric: '100%', label: 'Elimination of manual spreadsheets' },
      { metric: '< 1s', label: 'Real-time audit latency' },
    ],
    duration: '6 months',
    team: '5 engineers',
    blueprint: {
      title: 'Event-Driven ML-Powered Anomaly Stream Solver',
      layers: [
        { name: 'Stream Ingestion', icon: 'Globe', components: ['Payments Gateway Webhooks', 'Apache Kafka Cluster', 'Schema Registry'] },
        { name: 'Real-Time Processing', icon: 'Cpu', components: ['Spark Streaming Nodes', 'Scala Anomaly Detector', 'Feature Store'] },
        { name: 'Governance Vault', icon: 'Shield', components: ['OPA Policy Agent', 'Apache Atlas Lineage', 'Metadata Logger'] },
        { name: 'Persistence Tier', icon: 'Database', components: ['Cassandra Realtime DB', 'S3 Cold Archive', 'Elasticsearch Node'] },
      ],
      steps: [
        { name: '1. Event Ingest', desc: 'Fintech transaction triggers high-throughput Kafka topic event stream.' },
        { name: '2. Spark ML Parse', desc: 'Spark processes stream, mapping fields against Scala feature store models.' },
        { name: '3. Compliance Audit', desc: 'Ingestion pipeline writes encrypted state audits to Cassandra DB.' },
        { name: '4. Immediate Alert', desc: 'Auditor web consoles receive WebSockets anomaly triggers in under 1 second.' },
      ]
    },
    hld: {
      components: ['High-throughput Apache Kafka cluster', 'Apache Spark Real-time Stream clusters', 'Scala Anomaly detection models', 'Cassandra Ledger base', 'Amazon S3 archival object tiers'],
      dataFlow: [
        'Secure Transaction Webhook -> Kafka Event Queue Topic',
        'Kafka Stream Event Fetch -> Spark Anomaly Solver Nodes',
        'High-dimensional Similarity Score Check -> Scalar Feature Store',
        'Encrypted Event Write -> Cassandra Ledger Node',
        'Real-time Alert Dispatch -> Active WebSockets Dashboard Link'
      ],
      security: [
        'End-to-end envelope data encryption',
        'Ingestion-boundary field masking and hashing',
        'Immutable SOC2 compliance trace log trails'
      ],
      legacyModernization: 'Automated high-risk audit workflows, collapsing validation delays from 5 days to sub-second real-time telemetry.'
    }
  },
  {
    id: 3,
    tag: 'Logistics' as Tag,
    service: 'Cloud Services',
    serviceColor: '#F59E0B',
    title: 'Legacy 4GL Cloud Migration',
    client: 'Fortune 500 Logistics Provider',
    challenge: 'A 20-year-old 4GL-based warehouse management system was blocking digital transformation, costing $2M+ annually in maintenance and limiting scalability.',
    solution: 'Executed a lift-and-modernize migration to AWS using containerized microservices, with a zero-downtime cutover strategy and automated regression testing.',
    outcomes: [
      { metric: '100%', label: 'Cloud migration in < 12 weeks' },
      { metric: '0', label: 'Service disruption incidents' },
      { metric: '60%', label: 'Reduction in infrastructure costs' },
    ],
    duration: '12 weeks',
    team: '10 engineers',
    blueprint: {
      title: 'Serverless Containerized Re-Platforming Pipeline',
      layers: [
        { name: 'Legacy Systems', icon: 'Globe', components: ['Mainframe 4GL core', 'Terminal Emulation', 'DB2 Database'] },
        { name: 'Sync & Migration', icon: 'GitBranch', components: ['AWS DMS Sync Agent', 'Schema Conversion Tool', 'IAM Gateway'] },
        { name: 'Modernized Compute', icon: 'Cpu', components: ['AWS EKS Container Nodes', 'Go Microservices', 'Envoy Gateway'] },
        { name: 'Cloud Storage', icon: 'Database', components: ['Amazon Aurora Postgres', 'Amazon S3 Document Vault', 'Redis Cluster'] },
      ],
      steps: [
        { name: '1. Continuous Sync', desc: 'AWS DMS replicates legacy DB2 transactions to Amazon Aurora in real-time.' },
        { name: '2. Container Run', desc: 'Kubernetes (EKS) deploys modernized Go-based microservices.' },
        { name: '3. Cache Scaling', desc: 'Redis handles inventory reads to absorb peak operational warehouse requests.' },
        { name: '4. Infrastructure IAC', desc: 'HashiCorp Terraform automatically provisions all isolated target resources.' },
      ]
    },
    hld: {
      components: ['Legacy DB2 Replication targets', 'AWS Database Migration Service (DMS)', 'Amazon EKS Kubernetes nodes', 'Amazon Aurora PostgreSQL', 'HashiCorp Terraform IaC templates'],
      dataFlow: [
        'Mainframe Transaction -> AWS DMS Continuous Sync Engine',
        'AWS Aurora DB Update -> Redis Cluster Notification trigger',
        'EKS Container Scheduler -> Active Go API Endpoint routes',
        'Envoy API Gateway -> IAM Role Validation checkpoints',
        'Warehouse Terminal -> Modernized Web UI interface'
      ],
      security: [
        'VPC private subnet clustering for EKS nodes',
        'Automated IAM role permission parameters',
        'Container image CVE checks integrated in CI/CD'
      ],
      legacyModernization: 'Migrated 20-year-old mainframe systems into scalable, microservice-driven containers on AWS in under 12 weeks.'
    }
  },
  {
    id: 4,
    tag: 'BFSI' as Tag,
    service: 'AI & ML Automation',
    serviceColor: '#8B5CF6',
    title: 'Generative AI Document Processing',
    client: 'Top 10 Insurance Carrier',
    challenge: 'Claims processing required manual extraction from thousands of unstructured PDFs, medical records, and handwritten forms — causing week-long backlogs.',
    solution: 'Deployed a multi-modal RAG pipeline with fine-tuned document classifiers, automated extraction agents, and a human-in-the-loop review system for edge cases.',
    outcomes: [
      { metric: '98%', label: 'Unstructured document extraction accuracy' },
      { metric: '200x', label: 'Operational processing speedup' },
      { metric: '4 hrs', label: 'Average claims processing time (down from 5 days)' },
    ],
    duration: '8 months',
    team: '6 engineers',
    blueprint: {
      title: 'Multi-Modal RAG Orchestration with Hallucination Guards',
      layers: [
        { name: 'Document Ingestion', icon: 'Globe', components: ['Multi-format OCR parser', 'Text chunking engine', 'PII Hashing Gateway'] },
        { name: 'Vectorization Core', icon: 'Cpu', components: ['Embedding Generator', 'Pinecone Isolated Index', 'Metadata Mapper'] },
        { name: 'Agent Orchestrator', icon: 'GitBranch', components: ['LangGraph State Loops', 'Claude 3.5 Agent Node', 'Active Citation Validator'] },
        { name: 'Audit & Guardrails', icon: 'Shield', components: ['Guardrails AI Scanner', 'Confidence Threshold Evaluator', 'Human-in-Loop UI'] },
      ],
      steps: [
        { name: '1. Text Extract', desc: 'OCR systems convert unstructured PDF pages into structured text tokens.' },
        { name: '2. Vector Partition', desc: 'Transformer models output embeddings indexed inside isolated Pinecone tenant spaces.' },
        { name: '3. LangGraph Loop', desc: 'Multi-agent loops search vector context, evaluating output scores dynamically.' },
        { name: '4. Output Shielding', desc: 'Guardrails AI blocks any PII leaks or hallucinations, passing edge cases to humans.' },
      ]
    },
    hld: {
      components: ['Tesseract OCR & Unstructured.io parsing libraries', 'text-embedding-3-large embedding algorithms', 'Pinecone multi-tenant vector databases', 'LangGraph Multi-agent controllers', 'Guardrails AI check suites'],
      dataFlow: [
        'PDF Claim Upload -> Ingestion OCR Parser',
        'Text Tokenization -> High-density Vector Embedding Generator',
        'Tenant Index Search -> Isolated Pinecone Vector database',
        'Multi-agent Query Loop -> StateGraph LangGraph Controller',
        'Audited Answer Dispatch -> Human-in-the-loop QA interface'
      ],
      security: [
        'Isolated vector database namespaces per tenant',
        'Ingestion-phase PII data masking protocols',
        'Strict context verification filters to prevent data leakage'
      ],
      legacyModernization: 'Automated manual indexing workflows, lowering average document processing timelines from 5 days to 4 hours.'
    }
  },
  {
    id: 5,
    tag: 'Healthcare' as Tag,
    service: 'Digital Services',
    serviceColor: '#EC4899',
    title: 'Unified Practice Management CRM',
    client: 'Multi-Location Healthcare Group',
    challenge: 'Siloed clinic management software across 14 locations led to double-bookings, patient communication gaps, and zero visibility into cross-location capacity.',
    solution: 'Built a unified practice management platform with real-time scheduling, automated patient journey workflows, and a central analytics dashboard.',
    outcomes: [
      { metric: '100%', label: 'Automated clinic schedule management' },
      { metric: '0', label: 'Patient communication leakages' },
      { metric: '35%', label: 'Increase in appointment fill rate' },
    ],
    duration: '7 months',
    team: '7 engineers',
    blueprint: {
      title: 'High-Availability Multi-Tenant Medical CRM',
      layers: [
        { name: 'Patient Portals', icon: 'Globe', components: ['Next.js patient dashboard', 'Doctor console', 'Scheduler calendar UI'] },
        { name: 'Integration Hub', icon: 'GitBranch', components: ['HL7 FHIR API Gateway', 'Realtime Lock Manager', 'Notification engine'] },
        { name: 'Core Computing', icon: 'Cpu', components: ['Clinic Core APIs', 'Capacity Analyzer', 'Audit Ledger Service'] },
        { name: 'Encrypted Storage', icon: 'Database', components: ['PostgreSQL DB with Row Security', 'Redis PubSub state store', 'S3 Clinical Vault'] },
      ],
      steps: [
        { name: '1. Event Trigger', desc: 'Patient updates appointment status in their unified Next.js dashboard.' },
        { name: '2. FHIR API Check', desc: 'Secure API passes check, validating transaction data against FHIR healthcare schemas.' },
        { name: '3. DB Transaction', desc: 'PostgreSQL executes RLS-isolated slot lock, preventing capacity overlaps.' },
        { name: '4. Push Notification', desc: 'Realtime Redis PubSub dispatches booking sync alerts to doctor consoles.' },
      ]
    },
    hld: {
      components: ['Next.js customer/internal web apps', 'Node.js FHIR integrated API endpoints', 'PostgreSQL DB with Row-Level Security (RLS)', 'Redis PubSub transactional sync nodes', 'Amazon S3 encrypted file repositories'],
      dataFlow: [
        'Patient Portal booking -> HL7 FHIR Compliant API Gateways',
        'Capacity Validation check -> Postgres Row-Level Security (RLS)',
        'Slot Lock Acquisition -> Transaction lock in PostgreSQL DB',
        'Doctor Sync Alert dispatch -> Redis PubSub WebSocket event',
        'State Metadata Ingest -> Secure Clinical HIPAA S3 repositories'
      ],
      security: [
        'Strict end-to-end HIPAA compliant data encryption',
        'Row-Level Security (RLS) policies blocking cross-tenant reads',
        'Detailed immutable audit trail logging on patient records'
      ],
      legacyModernization: 'Merged 14 separate local database systems into a single cloud-native clinic management pipeline with 100% schedule consistency.'
    }
  },
  {
    id: 6,
    tag: 'Travel' as Tag,
    service: 'AI & ML Automation',
    serviceColor: '#8B5CF6',
    title: 'Autonomous Travel Itinerary Orchestration',
    client: 'Global Travel Network & Expedia Partner',
    challenge: 'Customers faced systemic checkout drops and high latency when trying to bundle airline flights, hotel reservations, and custom B2C leisure activities across legacy partner APIs.',
    solution: 'Engineered a self-correcting multi-agent LangGraph network led by our Principal Solutions Architect, {{LEAD_NAME}}. The architecture coordinates concurrent partner API handshakes, utilizing automated retry states and real-time transaction reconciliation algorithms to resolve reservation conflicts dynamically.',
    outcomes: [
      { metric: '99.4%', label: 'Booking itinerary task resolution' },
      { metric: '45%', label: 'Increase in checkout conversion' },
      { metric: '< 12s', label: 'Dynamic package response SLA' },
    ],
    duration: '5 months',
    team: '4 engineers',
    blueprint: {
      title: 'LangGraph Self-Correcting Concurrent Reservation Broker',
      layers: [
        { name: 'Orchestrator Tier', icon: 'Globe', components: ['LangGraph State Coordinator', 'Session State Manager', 'Fallback Resolver'] },
        { name: 'Partner Gateway', icon: 'GitBranch', components: ['Expedia B2C Connector', 'Airline NDC API Link', 'Hotel XML Connector'] },
        { name: 'Conflict Manager', icon: 'Cpu', components: ['Linear Itinerary Solver', 'Reconciliation Solver', 'Audit Trace Engine'] },
        { name: 'Secure Database', icon: 'Database', components: ['PostgreSQL Session database', 'Redis Queue server', 'Vault Credential store'] },
      ],
      steps: [
        { name: '1. Package Request', desc: 'Customer requests a combined travel bundle in the checkout wizard.' },
        { name: '2. Parallel Fetch', desc: 'LangGraph spawns concurrent agent workers to query airline and hotel APIs.' },
        { name: '3. Conflict Solving', desc: 'Conflict Solver identifies overlapping bookings, triggering self-correcting agent retries.' },
        { name: '4. Atomic Commit', desc: 'Reconciliation system executes simultaneous checkout payments across legacy APIs.' },
      ]
    },
    hld: {
      components: ['LangGraph StateGraph multi-agent runtimes', 'Partner API integration gateways (Expedia, NDC)', 'Itinerary optimization conflict solvers', 'Redis transaction session caching', 'Vault credential security stores'],
      dataFlow: [
        'Bundle Checkout Request -> LangGraph StateGraph Coordinator',
        'Parallel Queries dispatch -> Partner API Endpoint connectors',
        'Validation check -> Optimization Itinerary Conflict solver',
        'Error State trigger -> Self-correcting Agent retry loop',
        'Synchronized Checkout write -> Immutable Postgres Transaction Ledger'
      ],
      security: [
        'Secure Vault token storage for partner API integrations',
        'Isolated ephemeral workspaces per customer transaction',
        'API rate limit compliance filters to prevent system bans'
      ],
      legacyModernization: 'Orchestrated complex concurrent checkout structures across legacy partner APIs, boosting booking completion rates by 45%.'
    }
  },
  {
    id: 7,
    tag: 'Retail' as Tag,
    service: 'AI & ML Automation',
    serviceColor: '#8B5CF6',
    title: 'Autonomous CPG Supply Chain Matching',
    client: 'Fortune 500 Retail & CPG Brands group',
    challenge: 'A Fortune 500 CPG brand struggled with catalog duplication and product synchronization across 12,000+ active retail vendors, leading to inventory gaps and chronic center stockouts.',
    solution: 'Deployed an autonomous replenishment engine directed by our Forward Deployment Executive, {{LEAD_NAME}}. Utilizing isolated pgvector database namespaces, high-dimensional vector embeddings, and an automated supply-chain solver, the system matches catalogs and models restocking demand in real-time.',
    outcomes: [
      { metric: '99.8%', label: 'Vendor catalog matching accuracy' },
      { metric: '30%', label: 'Reduction in out-of-stock periods' },
      { metric: '$4.2M', label: 'Annual operational overhead savings' },
    ],
    duration: '6 months',
    team: '5 engineers',
    blueprint: {
      title: 'High-Dimensional Vector Supply Matching Engine',
      layers: [
        { name: 'Data Pipeline', icon: 'Globe', components: ['Vendor Catalog Ingest', 'Schema Normalizer', 'Object Image Parser'] },
        { name: 'Similarity Vector', icon: 'Cpu', components: ['Deep learning Embeddings', 'pgvector database Index', 'Catalog Matcher'] },
        { name: 'Matching Engine', icon: 'GitBranch', components: ['Linear Replenish Solver', 'Out-Of-Stock Predictor', 'Order Dispatcher'] },
        { name: 'Storage Vault', icon: 'Database', components: ['PostgreSQL DB Engine', 'pgvector Catalog Index', 'Redis cache Server'] },
      ],
      steps: [
        { name: '1. Catalog Ingest', desc: 'CPG vendor uploads raw product spreadsheet to the retail ingress portal.' },
        { name: '2. Vector Generation', desc: 'System parses text descriptors, extracting deep learning embeddings.' },
        { name: '3. pgvector Search', desc: 'pgvector query identifies product matches inside isolated database spaces.' },
        { name: '4. Replenish Alert', desc: 'Demand models auto-calculate restock orders, dispatching supply directives.' },
      ]
    },
    hld: {
      components: ['High-throughput ingest spreadsheet processors', 'Deep learning text embedding converters', 'PostgreSQL database with pgvector indexing', 'Linear programming supply solvers', 'Kafka distributor alert channels'],
      dataFlow: [
        'Vendor Catalog Update -> Ingestion Ingress Pipeline',
        'Text Parsing -> High-density Vector Embedding generator',
        'Similarity Search -> pgvector catalog Index query',
        'Inventory Optimization -> Mathematical Supply solver models',
        'Restock Directives dispatch -> Distributor Kafka Event queues'
      ],
      security: [
        'Database-level schema isolation per client vendor',
        'Zero model fine-tuning on proprietary catalog data',
        'Encrypted file transfer systems for bulk uploads'
      ],
      legacyModernization: 'Automated product catalog matching across 12,000+ vendors, cutting center out-of-stock periods by 30%.'
    }
  },
  {
    id: 8,
    tag: 'BFSI' as Tag,
    service: 'Data Analytics',
    serviceColor: '#10B981',
    title: 'Data Governance Ledger & CCM Auditing',
    client: 'Elite Fintech and Payments Platform',
    challenge: 'An elite payments firm faced high regulatory compliance risks due to tracing gaps across legacy Customer Communication Management (CCM) channels, risking major central bank audits.',
    solution: 'Directed by our Lead Systems Architect, {{LEAD_NAME}}, designed an immutable data governance ledger and real-time auditing pipeline. Enforcing policy-as-code at the ingestion boundary, the system index-maps all metadata with distributed tracing and auto-generates SOC2 audit lines.',
    outcomes: [
      { metric: '100%', label: 'Regulatory audit compliance achieved' },
      { metric: '95%', label: 'Reduction in data governance verification cycles' },
      { metric: '0', label: 'Compliance tracing errors' },
    ],
    duration: '7 months',
    team: '6 engineers',
    blueprint: {
      title: 'Immutable Auditable Ledger with Distributed Tracing',
      layers: [
        { name: 'Ingress Filter', icon: 'Globe', components: ['CCM Channel Ingress', 'OPA Policy Engine', 'OpenTelemetry Agent'] },
        { name: 'Cryptography Node', icon: 'Shield', components: ['AES-256 Hasher', 'Digital Signature Signer', 'Hash Chainer'] },
        { name: 'Trace Mapping', icon: 'GitBranch', components: ['OpenTelemetry Collector', 'Jaeger Trace Mapper', 'Lineage Analyzer'] },
        { name: 'Ledger Storage', icon: 'Database', components: ['QLDB Audit Ledger', 'ClickHouse Analytics store', 'Amazon S3 cold Glacier'] },
      ],
      steps: [
        { name: '1. Message Ingress', desc: 'Legacy payments core dispatches a transaction message via Kafka.' },
        { name: '2. Policy Check', desc: 'Open Policy Agent (OPA) scans message, verifying compliance boundaries.' },
        { name: '3. Ledger Signature', desc: 'Crypto engine hashes context, writing immutable ledger entries.' },
        { name: '4. Trace Collector', desc: 'OpenTelemetry correlates events, creating beautiful trace lineages.' },
      ]
    },
    hld: {
      components: ['Open Policy Agent (OPA) validation engines', 'High-throughput crypto hashing libraries', 'OpenTelemetry trace collectors', 'QLDB cryptographic append ledgers', 'ClickHouse analytical databases'],
      dataFlow: [
        'Payments System Transaction -> OPA Policy-as-Code filter',
        'Compliance Check validation -> Ingress crypto hashing engine',
        'Immutable Record write -> QLDB Cryptographic Append-only ledger',
        'Lineage Event link -> OpenTelemetry Distributed Tracer Collector',
        'Compliance Overview visualization -> Analytics Dashboard UI'
      ],
      security: [
        'Cryptographic hash chains preventing ledger tampering',
        'Multi-factor token security for compliance auditors',
        'Strict data masking before analytics processing'
      ],
      legacyModernization: 'Enforced policy-as-code auditing across legacy CCM message streams, delivering 100% compliance with zero tracing failures.'
    }
  },
  {
    id: 9,
    tag: 'BFSI' as Tag,
    service: 'Enterprise Data Platforms',
    serviceColor: '#10B981',
    title: 'Data Analytics Platform Modernization',
    client: 'Fedbank Financial Services Limited (FedFina)',
    challenge: 'FedFina utilized a fragmented analytics stack consisting of a partially integrated datalake, source-system dumps, manual Lampstack databases, SSRS, Power BI, and Altair. This fragmentation caused severe data quality issues, delayed report delivery, high vendor dependency, and long turnarounds for critical audit responses.',
    solution: 'Designed and deployed a centralized, governed AWS-managed datalake architecture to unify all operational databases (including Vendor Management, Lead Management, Legal, ERM, app/website, and bureau data). The solution standardizes key/reference relationships across Finnone and LCODE datasets, enforces policy-as-code data governance via AWS Lake Formation, and establishes Altair as the single reporting engine with automated daily/monthly workflows.',
    outcomes: [
      { metric: '0', label: 'Manual Lampstack DB interventions' },
      { metric: '100%', label: 'Reporting consolidated in Altair' },
      { metric: '< 5 min', label: 'Ad-hoc audit report turnaround' },
    ],
    duration: '6 months',
    team: '6 engineers',
    blueprint: {
      title: 'Governed AWS-Managed Datalake with Altair BI Delivery',
      layers: [
        { name: 'Ingestion Layer', icon: 'Globe', components: ['AWS Glue Batch Ingest', 'AWS DMS Sync Agent', 'S3 Raw Landing Zone'] },
        { name: 'Transformation Layer', icon: 'Cpu', components: ['Glue Spark ETL', 'dbt Schema Compiler', 'AWS Deequ Quality Rules'] },
        { name: 'Governance Layer', icon: 'Shield', components: ['Lake Formation policies', 'AWS Secrets Manager', 'AWS Macie PII Hashing'] },
        { name: 'Curated Serving', icon: 'Database', components: ['S3 Curated buckets', 'Athena Governed Views', 'Altair Analytics Feeds'] },
      ],
      steps: [
        { name: '1. Ingestion schedule', desc: 'AWS EventBridge schedules daily Glue jobs between 1-7 AM IST to fetch Finnone & LCODE datasets.' },
        { name: '2. Raw Landing', desc: 'Raw transactional datasets land in partitioned S3 buckets with ingestion metadata.' },
        { name: '3. Spark key normalization', desc: 'Glue Spark ETL processes standardize keys and execute schema quality assertions.' },
        { name: '4. Curated views generation', desc: 'Aggregated datasets are registered in Lake Formation and exposed to Altair for 8 AM IST delivery.' },
      ]
    },
    hld: {
      components: ['AWS Glue ETL & Spark jobs', 'Amazon S3 storage buckets', 'AWS Lake Formation security rules', 'Amazon Athena query engine', 'Altair BI reporting platform'],
      dataFlow: [
        'Source databases -> Daily Glue Batch Ingress (1-7 AM IST)',
        'Raw S3 land -> Event-driven Spark Key Standardization',
        'Schema Validation -> AWS Deequ Data Quality check',
        'Curated tables creation -> Athena Governed SQL views',
        'Altair Ingestion -> 8 AM IST Dashboard Delivery'
      ],
      security: [
        'Lake Formation row-level and column-level access control policies',
        'AWS Secrets Manager for secure upstream API credential storage',
        'Macie automated PII discovery and ingestion-boundary hashing'
      ],
      legacyModernization: 'Replaced a fragmented array of manual database updates, spreadsheet merges, and conflicting SSRS/Power BI dashboards with a single governed AWS datalake source of truth feeding Altair directly.'
    }
  },
];


// ==========================================
// 5. RAG / Ingestion Architecture Visualizer Steps
// ==========================================
export const pipelineSteps = [
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

// ==========================================
// 6. Talia AgentFabric Sandbox Repository Files
// ==========================================
export interface SandboxFile {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  children?: SandboxFile[];
}

export const sandboxRepoFiles: SandboxFile[] = [
  {
    name: 'README.md',
    path: 'README.md',
    type: 'file',
    content: `# 🖥️ Windows 95 Style Portfolio Showcase

Welcome to the retro-styled showcase engine for mytestbed.tech. This project implements a fully interactive Win95 desktop experience in the browser.

## 🚀 Live Deployment
- **URL:** https://portfolio.mytestbed.tech/
- **Hosting:** Vercel Cloud Edge

## ✨ Key Features
- **Classic Start Menu:** Fully operational navigation system.
- **Desktop Grid:** Iconic program triggers (My Computer, Terminal, Projects).
- **Responsive Windows:** Movable, stackable, and resizable window UI.
- **Classic Colorway:** Complete with the iconic solid teal (#008080) desktop.
- **Micro-interactions:** Custom retro audio triggers and drag states.

## 🛠️ Stack
- Vanilla HTML5 / ES6 JavaScript
- Clean legacy MS CSS themes
- Custom client-side window layout manager`
  },
  {
    name: 'vercel.json',
    path: 'vercel.json',
    type: 'file',
    content: `{
  "version": 2,
  "cleanUrls": true,
  "trailingSlash": false,
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/homepage/$1"
    }
  ]
}`
  },
  {
    name: '.gitignore',
    path: '.gitignore',
    type: 'file',
    content: `node_modules/
.DS_Store
dist/
.vercel/
*.log
.env`
  },
  {
    name: 'homepage',
    path: 'homepage',
    type: 'folder',
    children: [
      {
        name: 'index.html',
        path: 'homepage/index.html',
        type: 'file',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Windows 95 Portfolio | mytestbed.tech</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
  <!-- Retro Desktop Container -->
  <div id="desktop" class="desktop-teal">
    
    <!-- System Icons -->
    <div class="shortcut" data-app="my-computer">
      <img src="assets/computer.png" alt="My Computer">
      <span>My Computer</span>
    </div>
    
    <div class="shortcut" data-app="portfolio-brief">
      <img src="assets/briefcase.png" alt="Portfolio Brief">
      <span>Portfolio.txt</span>
    </div>

    <!-- Retro Windows -->
    <div class="window active" id="win-welcome">
      <div class="title-bar">
        <div class="title-bar-text">Welcome to Talia AgentFabric Sandbox</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" onclick="closeWin('win-welcome')"></button>
        </div>
      </div>
      <div class="window-body">
        <p>This is a sandboxed environment of your portfolio repository assets.</p>
        <p>Explore the file explorer and terminal modules to inspect components.</p>
      </div>
    </div>

  </div>

  <!-- Bottom Taskbar -->
  <div class="taskbar">
    <button class="start-btn">
      <img src="assets/start-logo.png" alt="Start">
      <span>Start</span>
    </button>
    <div class="taskbar-divider"></div>
    <div class="clock" id="taskbar-clock">10:00 AM</div>
  </div>

  <script src="js/main.js"></script>
</body>
</html>`
      },
      {
        name: 'css',
        path: 'homepage/css',
        type: 'folder',
        children: [
          {
            name: 'style.css',
            path: 'homepage/css/style.css',
            type: 'file',
            content: `/* Classic Windows 95 Style Sheet */
:root {
  --win-teal: #008080;
  --win-gray: #c0c0c0;
  --win-border-light: #ffffff;
  --win-border-dark: #808080;
  --win-border-double-dark: #0a0a0a;
}

.desktop-teal {
  background-color: var(--win-teal);
  position: absolute;
  inset: 0;
  overflow: hidden;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  user-select: none;
}

.window {
  background-color: var(--win-gray);
  border: 2px solid;
  border-color: var(--win-border-light) var(--win-border-double-dark) var(--win-border-double-dark) var(--win-border-light);
  box-shadow: 1px 1px 0 0 #000;
  padding: 3px;
  position: absolute;
  width: 400px;
}

.title-bar {
  background: linear-gradient(90deg, #000080, #1084d0);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 6px;
  font-weight: bold;
  font-size: 12px;
}

.window-body {
  margin: 8px;
  font-size: 13px;
  color: #000;
}`
          }
        ]
      },
      {
        name: 'js',
        path: 'homepage/js',
        type: 'folder',
        children: [
          {
            name: 'main.js',
            path: 'homepage/js/main.js',
            type: 'file',
            content: `/* Windows 95 Desktop Behavior & Taskbar Orchestrator */
console.log("[mytestbed.tech Sandbox OS Initialized]");

let activeWindow = document.getElementById("win-welcome");

function focusWin(winElement) {
  if (activeWindow) {
    activeWindow.classList.remove("active");
  }
  activeWindow = winElement;
  activeWindow.classList.add("active");
}

function closeWin(id) {
  const win = document.getElementById(id);
  if (win) win.style.display = "none";
}

// Clock updates
function updateClock() {
  const el = document.getElementById("taskbar-clock");
  if (!el) return;
  const now = new Date();
  let hrs = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12 || 12;
  el.textContent = \`\${hrs}:\${mins} \${ampm}\`;
}

setInterval(updateClock, 1000);
updateClock();`
          }
        ]
      }
    ]
  }
];

// ==========================================
// 7. Simulated AgentFabric Sandbox Telemetry Metrics
// ==========================================
export const sandboxAgents = [
  {
    id: 'agent-exec',
    name: 'Enterprise Lead Architect',
    role: '{{LEAD_NAME}} (Lead Controller)',
    status: 'OPTIMAL (MONITOR)',
    cpu: '1.2%',
    memory: '256MB / 32GB',
    task: 'Directing virtual subagent workspace pipelines',
    color: '#10B981'
  },
  {
    id: 'agent-arch',
    name: 'Frontend Architect',
    role: 'Autonomous Subagent Node',
    status: 'HIBERNATING',
    cpu: '0.0%',
    memory: '42MB / 8GB',
    task: 'React codebase refactored. Conforming to standards.',
    color: '#3B82F6'
  },
  {
    id: 'agent-qa',
    name: 'Product QA Specialist',
    role: 'Autonomous Subagent Node',
    status: 'HIBERNATING',
    cpu: '0.0%',
    memory: '38MB / 8GB',
    task: 'Zero errors detected. Linter standing by.',
    color: '#8B5CF6'
  }
];

