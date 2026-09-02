// ==========================================
// Projects Data — Active & Archived
// Source of truth: C:\tt-ai-stack\03_documents\PORTFOLIO.md
// ==========================================

export type ProjectStatus = 'active' | 'archived';
export type ProjectCategory = 'Civic Tech' | 'AI / Agentic' | 'FinTech' | 'Enterprise' | 'SaaS' | 'Client' | 'Internal';

export interface Project {
  id: string;
  name: string;
  folder: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  url?: string;
  repo?: string;
}

// ==========================================
// ACTIVE PROJECTS
// ==========================================
export const activeProjects: Project[] = [
  {
    id: 'telangana-live',
    name: 'Telangana.live',
    folder: 'telangana-live',
    description: 'Real-time civic portal and content aggregator for Telangana and Hyderabad citizens.',
    stack: ['React', 'Vite', 'Python', 'Supabase'],
    category: 'Civic Tech',
    status: 'active',
    url: 'https://telangana-live.vercel.app',
  },
  {
    id: 'vizag-live',
    name: 'Vizag.live',
    folder: 'vizag-live',
    description: 'Civic information portal for Visakhapatnam citizens.',
    stack: ['Next.js', 'FastAPI'],
    category: 'Civic Tech',
    status: 'active',
  },
  {
    id: 'ib-2026',
    name: 'Innovat Bharat 2026',
    folder: 'ib-2026',
    description: 'Official web platform bridging education and industry in rural India.',
    stack: ['Angular', 'Express.js'],
    category: 'Enterprise',
    status: 'active',
  },
  {
    id: 'rotary-phone',
    name: 'Rotary Phone',
    folder: 'rotary-phone',
    description: 'Admin console with assessments, AI interviews, programming workspaces, and a package marketplace.',
    stack: ['Next.js', 'Hono'],
    category: 'SaaS',
    status: 'active',
  },
  {
    id: 'universal-tool-hub',
    name: 'Universal Tool Hub',
    folder: 'universal-tool-hub',
    description: 'Turborepo SaaS platform hosting a large registry of productivity, developer, AI, finance, and document tools.',
    stack: ['Next.js 15', 'React 19', 'Turborepo'],
    category: 'SaaS',
    status: 'active',
  },
  {
    id: 'redesigned-utsav',
    name: 'Redesigned Utsav',
    folder: 'redesigned-utsav',
    description: 'Modern mobile-first platform digitizing temple experiences — seva booking, donations, and temple ops.',
    stack: ['Next.js', 'Django', 'Supabase'],
    category: 'Enterprise',
    status: 'active',
  },
  {
    id: 'makeover-talent-agency',
    name: 'Campus to Corporate (c2c)',
    folder: 'makeover-talent-agency',
    description: 'AI-first unified recruitment and employer branding suite.',
    stack: ['AI', 'SaaS'],
    category: 'AI / Agentic',
    status: 'active',
  },
  {
    id: 'oxygeek',
    name: 'Oxygeek',
    folder: 'Oxygeek-Project',
    description: 'FinTech mutual fund analysis and portfolio tool.',
    stack: ['React', 'Python'],
    category: 'FinTech',
    status: 'active',
  },
  {
    id: 'bmsit-witness',
    name: 'The Witness',
    folder: 'BMSIT',
    description: 'Web app that scrapes and summarises weekly news to auto-generate newsletters.',
    stack: ['Scraper', 'LLM', 'Web'],
    category: 'AI / Agentic',
    status: 'active',
  },
  {
    id: 'slv',
    name: 'SLV Medical Agency',
    folder: 'slv',
    description: 'Shopping portal for a medical agency client — currently in build.',
    stack: ['Next.js', 'eCommerce'],
    category: 'Client',
    status: 'active',
  },
  {
    id: 'paperclip-tt',
    name: 'Paperclip TT AI Company',
    folder: 'paperclip-tt-company',
    description: 'Autonomous AI engineering team combining Paperclip multi-agent orchestration with tt-ai-stack skill library.',
    stack: ['Multi-agent', 'LangGraph'],
    category: 'AI / Agentic',
    status: 'active',
  },
  {
    id: 'my-aig',
    name: 'my AI Gateway',
    folder: 'my-AIG',
    description: 'Personal LLM gateway — planned as a new feature module inside AgentFabric.',
    stack: ['Gateway', 'LLM', 'TypeScript'],
    category: 'AI / Agentic',
    status: 'active',
  },
  {
    id: 'arunachala-dashboard',
    name: 'Arunachala Operations Center',
    folder: 'arunachala-dashboard',
    description: 'Local dashboard monitoring the tt-ai-stack workspace — Ollama, OpenClaw, Hermes, no cloud dependency.',
    stack: ['PowerShell', 'JS'],
    category: 'Internal',
    status: 'active',
  },
  {
    id: 'portal',
    name: 'Talia Web Portal',
    folder: 'portal',
    description: 'Talia Technologies marketing site and AgentFabric tool hub, now also housing Mission Control (multi-agent command center) and this Projects dashboard.',
    stack: ['React', 'Vite', 'Tailwind', 'Python', 'FastAPI'],
    category: 'Internal',
    status: 'active',
  },
  {
    id: 'collabcloud',
    name: 'CollabCloud',
    folder: 'CollabCloud',
    description: 'Collaborative cloud tooling experiment.',
    stack: ['React', 'Node.js'],
    category: 'SaaS',
    status: 'active',
  },
  {
    id: 'context-mode',
    name: 'Context Mode',
    folder: 'context-mode',
    description: 'AI context management prototype.',
    stack: ['TypeScript'],
    category: 'AI / Agentic',
    status: 'active',
  },
];

// ==========================================
// ARCHIVED PROJECTS
// ==========================================
export const archivedProjects: Project[] = [
  {
    id: 'agentic-workflow-optimizer',
    name: 'Agentic Workflow Optimizer',
    folder: 'agentic-workflow-optimizer',
    description: 'Experimental agentic workflow tooling and orchestration research.',
    stack: ['Python', 'LangGraph'],
    category: 'AI / Agentic',
    status: 'archived',
  },
  {
    id: 'graphify',
    name: 'Graphify',
    folder: 'graphify',
    description: 'Graph-based data visualization and knowledge mapping tool.',
    stack: ['Python', 'D3.js'],
    category: 'Internal',
    status: 'archived',
  },
  {
    id: 'gtm-profile',
    name: 'GTM Profile',
    folder: 'gtm-profile',
    description: 'Go-to-market profile generator for startups.',
    stack: ['React'],
    category: 'SaaS',
    status: 'archived',
  },
  {
    id: 'vibe-check',
    name: 'Vibe Check',
    folder: 'vibe-check',
    description: 'Sentiment and culture health-check tool.',
    stack: ['React', 'Python'],
    category: 'AI / Agentic',
    status: 'archived',
  },
  {
    id: 'cl-code',
    name: 'CL Code',
    folder: 'cl-code',
    description: 'Internal code generation and scaffolding experiment.',
    stack: ['TypeScript'],
    category: 'Internal',
    status: 'archived',
  },
];
