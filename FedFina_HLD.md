# FedFina High-Level Design (HLD)

## 1. Overview
This HLD describes the proposed architecture for FedFina’s Data Analytics Platform Modernization initiative. It focuses on building a centralized datalake, standardizing upstream source data, improving data governance, and consolidating reporting into Altair.

## 2. Objectives
- Establish a true datalake architecture with defined raw, curated, and consumption zones.
- Eliminate manual source-system dump dependencies for analytics.
- Consolidate reporting and dashboards primarily through Altair.
- Enable reliable daily and monthly reporting delivery.
- Provide a foundation for advanced analytics and ML workloads.
- Introduce governance, lineage, and data quality controls.

## 3. Target Architecture
The solution is composed of the following logical layers:

1. Source Systems
2. Ingestion Layer
3. Landing/Raw Zone
4. Processing and Transformation Zone
5. Curated/Serving Zone
6. Analytics & Reporting Consumers
7. Governance, Security, and Observability

## 4. Logical Components

### 4.1 Source Systems
These are the origin systems that must feed the datalake:
- Finnone
- LCODE
- Vendor Management System
- Lead Management System
- Legal system
- ERM (internal enquiries platform)
- App/Website operational source
- Salesforce / CRM
- Bureau / credit information systems
- Budget files, HR uploads, and other business data files

### 4.2 Ingestion Layer
Purpose: ingest both batch and file-based data reliably into the datalake.

Responsibilities:
- Extract data from operational source systems on a daily schedule.
- Ingest supplier dumps and API feeds if direct database access is not available.
- Persist data into a raw landing zone with minimal transformation.
- Capture metadata including source, ingestion timestamp, and file provenance.

### 4.3 Landing / Raw Zone
Purpose: preserve source fidelity and enable lineage.

Design:
- Raw zone organized by source, environment, and date.
- Schema may remain as close to source as possible.
- Data stored in columnar format when appropriate (Parquet for large tables).

### 4.4 Processing and Transformation Zone
Purpose: standardize, enrich, clean, and index data for analytical usage.

Responsibilities:
- Standardize keys and references for Finnone / LCODE.
- Normalize naming conventions and column aliases.
- Create curated tables and views with business-friendly data models.
- Implement data quality validation and cleansing.
- Build incremental workflows for daily updates and historical retention.

### 4.5 Curated / Serving Zone
Purpose: provide analytics-ready datasets and views for Altair and downstream consumers.

Design:
- Curated datasets organized by business domain: risk, finance, sales, operations, bureau, customer, and digital analytics.
- Serving views abstract raw complexity from business users.
- Maintain separate read-optimized views for Altair.
- Index or partition datasets by date, product, or business unit where needed.

### 4.6 Analytics and Reporting Consumers
Primary destination:
- Altair as the single reporting engine for daily and monthly dashboards.

Secondary/transition destinations:
- Power BI / SSRS only during migration or for legacy fallback.
- ML/AI workloads built on curated datalake datasets.

### 4.7 Data Governance and Security
Purpose: ensure trust, access control, and compliance.

Functions:
- Data catalog and metadata management.
- Data quality monitoring and alerts.
- Role-based access control for sensitive data.
- Audit logs for ingestion, transformation, and consumption.
- Encryption at rest and in transit.

### 4.8 Observability and Operations
Include:
- Pipeline monitoring and failure alerting.
- Job duration and throughput metrics.
- Data freshness and SLA dashboards.
- Error tracking for Altair query failures and JDBC connector issues.

## 5. Data Flow

1. Source systems generate or export data.
2. Ingestion jobs pull or receive data and land it into the raw zone.
3. Raw data is registered in the catalog with lineage metadata.
4. Transformation workflows standardize schemas, resolve key mismatches, and enrich data.
5. Curated datasets are produced and exposed via governed views.
6. Altair consumes curated views and serves dashboards to business users.
7. Data governance continuously validates quality and access patterns.

## 6. Tech Stack
The recommended stack is centered on AWS-managed services and enterprise analytics best practices.

### Core platform
- AWS S3: raw, staging, curated storage for datalake data.
- AWS Glue Data Catalog: metadata, schema, and table management.
- AWS Lake Formation: access control, governance, and fine-grained permissions.
- AWS Glue jobs / Glue Spark: ETL, cleanup, schema normalization, and transformation.
- AWS Athena: ad hoc query engine / metadata-backed SQL access.
- AWS Lambda: lightweight orchestration tasks, hooks, and notifications.
- Amazon EventBridge: scheduling daily ingestion and workflow triggers.

### Data ingestion
- AWS Glue for batch ingestion from databases and files.
- AWS DMS / JDBC connectors for source databases without direct export pipelines.
- S3 ingestion for file uploads and vendor-supplied dumps.

### Data transformation
- AWS Glue ETL jobs written in Spark or Python.
- AWS Glue workflows to chain dependent jobs.
- Optional AWS EMR if large-scale Spark workloads are needed.

### Analytics and reporting
- Altair: primary BI/reporting destination.
- Amazon Athena / Redshift Spectrum: query layer for analytics-ready views.
- Optional Amazon Redshift or Amazon Athena federated queries if complex joins and performance required.

### Data quality and governance
- AWS Glue Data Catalog + Lake Formation for metadata and permissions.
- Great Expectations or AWS Deequ for data quality rules.
- AWS CloudTrail and CloudWatch Logs for audit and operational monitoring.

### Security
- AWS IAM and Lake Formation permissions.
- AWS KMS for encryption keys.
- VPC endpoints for secure service access.
- AWS Secrets Manager for storing credentials.

### Orchestration and operations
- AWS Step Functions / Glue Workflows: pipeline orchestration.
- Amazon EventBridge scheduler: daily process triggers.
- AWS CloudWatch alarms and dashboards.
- Optional Amazon Managed Workflows for Apache Airflow (MWAA) if more complex orchestration is needed.

## 7. Non-functional requirements
- Availability: data must be available for 8 AM IST report delivery.
- Scalability: support 30-40 lakh row datasets and growth beyond those volumes.
- Performance: analytic views should be optimized for Altair query patterns.
- Reliability: retries and alerting for ingestion failures and downstream connector issues.
- Security: enforce least privilege and data protection for sensitive customer and bureau records.
- Maintainability: use modular ETL pipelines and centralized metadata.

## 8. Deployment and operational model
- Deploy infrastructure with Infrastructure as Code (Terraform / CloudFormation).
- Separate environments for dev, test, and prod.
- Use version control for ETL scripts, schema definitions, and documentation.
- Implement automated validation for pipeline deployments.
- Define runbooks for job failures, data quality incidents, and Altair integration issues.

## 9. Key design decisions
- Use Altair as the primary reporting engine to reduce fragmentation.
- Keep the raw zone immutable to preserve source fidelity and lineage.
- Centralize data quality checks before serving datasets.
- Expose business-friendly views rather than raw tables directly.
- Introduce governance early to reduce rework and data trust issues.

## 10. Risks and mitigations
- Risk: source system access limitations delay integration.
  - Mitigation: support vendor-managed dumps and staged ingestion.
- Risk: inconsistent Finnone/LCODE keys cause mapping failures.
  - Mitigation: build a canonical key mapping layer and document relationships.
- Risk: Altair connector instability.
  - Mitigation: monitor connector health and provide fallbacks via Athena/queries.
- Risk: governance adoption takes time.
  - Mitigation: create a lean initial governance model and expand iteratively.

## 11. Diagram
See `FedFina_solution_diagram.md` for the architecture diagram in Mermaid format.
