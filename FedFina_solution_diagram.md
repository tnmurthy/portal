# FedFina Solution Diagram

```mermaid
flowchart TB
  subgraph Source Systems
    A1[Finnone]
    A2[LCODE]
    A3[Vendor Management]
    A4[Lead Management]
    A5[Legal]
    A6[ERM]
    A7[App / Website]
    A8[Salesforce / CRM]
    A9[Bureau / Credit Data]
    A10[Budget / HR Files]
  end

  subgraph Ingestion
    B1[Batch Glue Jobs]
    B2[S3 Landing Zone]
    B3[DMS / JDBC / API]
    B4[EventBridge Scheduler]
  end

  subgraph Datalake
    C1[Raw Zone (S3)]
    C2[Catalog & Metadata]
    C3[Transformation Layer]
    C4[Curated Zone (S3)]
    C5[Governed Views]
  end

  subgraph Analytics
    D1[Altair Reports]
    D2[Power BI / SSRS (Legacy)]
    D3[ML / AI Workloads]
  end

  subgraph Governance
    E1[Lake Formation]
    E2[Data Quality Rules]
    E3[CloudWatch / Monitoring]
    E4[Audit & Lineage]
  end

  A1 -->|Daily extracts| B1
  A2 -->|Daily extracts| B1
  A3 -->|Batch files| B2
  A4 -->|Batch files| B2
  A5 -->|Batch files| B2
  A6 -->|Batch files| B2
  A7 -->|Event/API| B3
  A8 -->|API / Extracts| B3
  A9 -->|File / API| B2
  A10 -->|Upload| B2

  B1 --> C1
  B2 --> C1
  B3 --> C1
  B4 --> B1
  B4 --> B3

  C1 --> C3
  C3 --> C4
  C2 --> C3
  C2 --> C4
  C1 --> C2

  C4 --> C5
  C5 --> D1
  C5 --> D2
  C4 --> D3
  E1 --> C4
  E2 --> C3
  E2 --> C4
  E3 --> B1
  E3 --> C3
  E3 --> D1
  E4 --> C2
  E4 --> C5
```
