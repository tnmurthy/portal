import { Shield, GitBranch, Users, Target, LucideIcon } from 'lucide-react';

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface MethodStep {
  phase: string;
  title: string;
  desc: string;
}

export interface TechArea {
  label: string;
  items: string[];
}

export const values: ValueItem[] = [
  { icon: Target, title: 'Precision Over Volume', desc: 'We take on exactly 10 projects at any time. Focused attention produces better software.' },
  { icon: Users, title: 'Senior Architects Only', desc: 'No junior engineers on client work. Every team member has 8+ years of production experience.' },
  { icon: Shield, title: 'Security by Design', desc: 'Security is embedded at every layer — architecture, code review, deployment, and runtime monitoring.' },
  { icon: GitBranch, title: 'Transparent Process', desc: 'You see everything: sprint commits, architecture decisions, and test coverage — all open to your team.' },
];

export const methodSteps: MethodStep[] = [
  {
    phase: '01',
    title: 'Discovery & Architecture',
    desc: 'We begin with a 2-week technical discovery sprint. We map your existing systems, identify constraints, and produce an architecture decision record (ADR) before writing a single line of production code.',
  },
  {
    phase: '02',
    title: 'AI-Assisted Development',
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
    desc: 'Production systems ship with full distributed tracing (OpenTelemetry), structured logging, and SLO dashboards. We don\'t hand off and walk away — we stay as your engineering partner.',
  },
];

export const techAreas: TechArea[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Python', 'Go', 'Rust'] },
  { label: 'Data', items: ['Spark', 'dbt', 'Kafka', 'Pinecone'] },
  { label: 'Cloud', items: ['AWS', 'GCP', 'Azure', 'Terraform'] },
  { label: 'AI / ML', items: ['LangGraph', 'LlamaIndex', 'Claude', 'OpenAI'] },
  { label: 'Security', items: ['OPA', 'AWS Macie', 'Vault', 'Snyk'] },
];
