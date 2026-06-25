import { Code2, BarChart2, Cloud, Brain, Globe, LucideIcon } from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  color: string;
  description: string;
  capabilities: string[];
  caseStudy: string;
}

export const services: ServiceItem[] = [
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
    title: 'Data Analytics',
    color: '#10B981',
    description: 'Enterprise-grade data platforms that transform raw information into decision-ready intelligence at scale.',
    capabilities: [
      'Data Management & Warehousing',
      'Data Modernization',
      'Data Architecture',
      'Data Governance & Lineage',
      'Business Intelligence',
      'Data Science & Modeling',
    ],
    caseStudy: '"Built a real-time fintech audit system achieving 98% transaction prediction accuracy, eliminating manual spreadsheets entirely."',
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    color: '#F59E0B',
    description: 'Cloud-native architecture and migration expertise across AWS, GCP, and Azure, engineered for resilience and cost efficiency.',
    capabilities: [
      'Cloud Enablement Strategy',
      'Cloud Assessment & Readiness',
      'Cloud-Native Architecture',
      'Cloud Migration',
      'CloudOps & FinOps',
    ],
    caseStudy: '"Migrated a legacy 4GL system to cloud in under 12 weeks with zero service disruption and 100% data fidelity."',
  },
  {
    icon: Brain,
    title: 'AI & ML Automation',
    color: '#8B5CF6',
    description: 'Custom agentic AI systems and machine learning pipelines built for enterprise workflows with safety and auditability.',
    capabilities: [
      'AI as a Service (AIaaS)',
      'Machine Learning Engineering',
      'Natural Language Processing',
      'Chatbots & Intelligent Assistants',
      'Robotic Process Automation (RPA)',
      'Intelligent Process Automation (IPA)',
    ],
    caseStudy: '"Deployed a generative AI document processing pipeline achieving 98% extraction accuracy with 200x processing speedup."',
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
