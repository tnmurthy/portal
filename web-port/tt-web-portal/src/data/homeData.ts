import { Award, Users, Clock, Zap, LucideIcon } from 'lucide-react';

export interface TrustLogo {
  name: string;
  path: string;
}

export interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export const trustLogos: TrustLogo[] = [
  { name: 'Stripe', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' },
  { name: 'Salesforce', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  { name: 'Oracle', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name: 'SAP', path: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' },
  { name: 'IBM', path: 'M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z' },
  { name: 'Microsoft', path: 'M11 11H3V3h8v8zm10 0h-8V3h8v8zM11 21H3v-8h8v8zm10 0h-8v-8h8v8z' },
];

export const stats: StatItem[] = [
  { icon: Award, value: '10+', label: 'Years of Excellence' },
  { icon: Users, value: '150+', label: 'Enterprise Clients' },
  { icon: Clock, value: '10', label: 'Active Projects Max' },
  { icon: Zap, value: '98%', label: 'Client Retention' },
];
