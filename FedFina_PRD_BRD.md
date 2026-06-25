# FedFina

## Product Requirements Document (PRD)

### Purpose
Support FedFina’s Data Analytics Platform Modernization by delivering a centralized, governed, scalable analytics architecture that removes reporting dependency on source systems and enables Altair as the single reporting platform.

### Background
FedFina currently uses a partially integrated datalake, source-system dumps, Lampstack DB, SSRS, Power BI, and Altair in parallel. This creates data quality issues, manual report assembly, vendor dependency, and slow turnaround for ad-hoc audit and management reports.

### Objectives
- Centralize analytics data in a true datalake architecture.
- Consolidate reporting into Altair as the primary analytics system.
- Remove manual Lampstack DB processing and reduce Altair data ingestion failures.
- Enable advanced analytics, automation, and ML-ready data pipelines.
- Establish data governance and consistent data definitions.

### Scope
#### In scope
- Integrate missing source systems into the datalake, including Vendor Management, Lead Management, Legal, ERM, app/website systems, and bureau data.
- Standardize key/reference relationships across Finnone and LCODE datasets.
- Build indexed, optimized datalake views for reporting.
- Consolidate Altair reporting and retire ad hoc SSRS/Power BI pipelines where possible.
- Implement data quality controls and governance processes.
- Improve connectivity to Altair and eliminate JDBC connector issues.

#### Out of scope
- Rebuilding source systems.
- Replacing Altair as the primary BI engine.
- Operational support for unrelated non-analytics applications.

### User personas
- Analytics team: require reliable access to integrated reporting data without building manual dumps.
- Business stakeholders: need timely, accurate management and risk reports.
- IT/Infra teams: need stable datalake ingestion and governance processes.
- External vendors: should have reduced dependency for query creation and data access.

### Requirements
#### Functional
- All relevant operational databases must ingest into the datalake daily.
- Reporting datasets should be served through governed views, not source dumps.
- Data from Finnone and LCODE should have consistent keys, naming conventions, and lineage metadata.
- Altair reports should run from datalake-backed views and support scheduled daily and monthly deliveries.
- Automated pipeline orchestration should handle daily Glue jobs, extract/transform/load processing, and report delivery schedules.

#### Non-functional
- Reporting data must be available for daily 8 AM IST delivery.
- Data pipelines should support 30-40 lakh row volume for risk reports and scale beyond that.
- The system must maintain auditability, traceability, and governance compliance.
- The solution must provide high availability for reporting during business hours.

### Success metrics
- Reduction in source-system dump dependency for analytics.
- Fewer manual merges and Lampstack DB interventions.
- Number of reports migrated from SSRS/Power BI to Altair.
- Faster delivery of ad hoc reports and audit responses.
- Measurable improvement in data quality and governance adoption.

### Assumptions
- Altair remains the chosen analytics platform.
- Finnone and LCODE data sources continue to be available.
- Existing Glue jobs can be extended and optimized rather than fully replaced.

### Timeline and phases
- Requirement gathering
- Design
- Implementation
- UAT
- Go-live
- Training and post-go-live support

## Business Requirements Document (BRD)

### Business need
FedFina needs a modern analytics platform to unify reporting, eliminate fragmented data workflows, reduce vendor dependency, and support future advanced analytics and ML models.

### Current state
- The datalake does not include all data sources.
- Analytics teams still rely on source-system dumps and Lampstack DB.
- Multiple reporting engines are used in parallel.
- Data relationships in Finnone are hard to infer due to inconsistent keys.
- Altair ingestion is unstable due to connector and data-quality issues.

### Key challenges
- Missing source system integration.
- Inconsistent key naming across Finnone tables.
- High dependency on source systems for dumps.
- Manual data processing in Lampstack DB.
- Fragmented reporting across S3, datalake views, Altair, Power BI, and SSRS.
- No centralized data governance.

### Desired future state
- A centralized, governed datalake that serves Altair directly.
- All analytics data integrated and indexed for performance.
- Self-service reporting for business users with minimal IT handoffs.
- Consistent data definitions, lineage, and governance controls.

### Business requirements
- Consolidate reporting to Altair as the single analytics delivery channel.
- Automate report generation and delivery for daily and monthly reports.
- Establish a data governance framework covering data quality, lineage, and access.
- Enable advanced analytics and ML use cases by preparing clean, integrated datasets.
- Reduce report preparation time for management and risk dashboards.

### Business benefits
- Faster time-to-insight for management and audit reports.
- Reduced operational overhead from manual data merges and Lampstack maintenance.
- Improved data accuracy and trust in analytics outputs.
- Lower vendor dependency for LCODE query creation.
- Better ability to scale reporting and advanced analytics.

### Stakeholders
- Analytics team
- IT/Infra team
- Business users (risk, finance, operations)
- Data governance/steering committee
- External reporting vendors

### Constraints
- Existing Glue job window is 1-7 AM IST.
- Up to 40-50 dumps from Finnone and 40-50 from LCODE are used daily.
- Some source systems are not currently accessible directly by FedFina.

### Proposed solution summary
- Build a true datalake architecture with integrated source ingestion.
- Standardize and document Finnone/LCODE data models.
- Consolidate reporting around Altair and automate scheduled deliveries.
- Introduce governance, data quality checks, and performance tuning.

### Commercial summary
- Recommended contract model: Time & Materials (T&M).
- Query complexity: Medium.
- Data volume: Up to 30-40 lakh rows for risk reports.
- Reporting scope: 4-5 Power BI reports migrated to Altair, 60-70 monthly management reports via Altair.
- Glue ingestion frequency: daily jobs between 1-7 AM IST.

### Risks
- Continued reliance on source system dumps if integration is delayed.
- Governance adoption may lag without clear ownership.
- Connector issues could still impact Altair if not addressed.

### Additional opportunities
- Automate ETouch and bureau dashboards via Altair.
- Migrate Salesforce-derived dashboards into the datalake.
- Move SSRS/Power BI reporting into Altair.
- Prepare data for future AL/ML model development.
