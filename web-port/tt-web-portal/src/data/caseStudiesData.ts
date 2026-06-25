export type Tag = 'All' | 'BFSI' | 'Healthcare' | 'Logistics' | 'Technology';

export const tags: Tag[] = ['All', 'BFSI', 'Healthcare', 'Logistics', 'Technology'];

export interface CaseStudy {
  id: number;
  tag: Tag;
  service: string;
  serviceColor: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  outcomes: {
    metric: string;
    label: string;
  }[];
  duration: string;
  team: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    tag: 'Technology',
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
  },
  {
    id: 2,
    tag: 'BFSI',
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
  },
  {
    id: 3,
    tag: 'Logistics',
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
  },
  {
    id: 4,
    tag: 'BFSI',
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
  },
  {
    id: 5,
    tag: 'Healthcare',
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
  },
];
