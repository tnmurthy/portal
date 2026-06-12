import { ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import PipelineVisualizer from '../components/PipelineVisualizer';
import { services } from '../data/servicesData';

export default function Services() {
  return (
    <div className="pt-16">
      <SEO 
        title="Enterprise Technology Services"
        description="Bespoke product engineering, robust data platforms, resilient cloud services, and custom agentic AI systems for modern enterprises."
      />
      
      {/* Header */}
      <section className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(16,185,129,0.06) 0%, transparent 55%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">What We Do</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
            Enterprise Technology Services
          </h1>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto text-lg leading-relaxed">
            Five core disciplines. One integrated engineering team. Delivering the technology architecture that modern enterprises are built on.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`bg-brand-card border border-white/5 hover:border-white/10 rounded-2xl p-7 group transition-all duration-200 hover:-translate-y-0.5 ${
                    i === services.length - 1 && services.length % 2 !== 0 ? 'lg:col-span-2 max-w-2xl lg:mx-auto' : ''
                  }`}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
                    >
                      <Icon size={20} style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{service.title}</h3>
                      <p className="text-[#6B7280] text-sm mt-0.5 leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                        <ChevronRight size={12} style={{ color: service.color }} className="flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="rounded-xl p-4 border text-sm text-[#9CA3AF] italic leading-relaxed"
                    style={{ background: `${service.color}08`, borderColor: `${service.color}15` }}
                  >
                    {service.caseStudy}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pipeline Visualizer */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Live Architecture Demo</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Interactive Data Pipeline</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-sm leading-relaxed">
              Explore each stage of our enterprise RAG data pipeline — from raw ingestion to AI-synthesized output with full governance controls.
            </p>
          </div>
          <PipelineVisualizer />
        </div>
      </section>

      {/* Talia AgentFabric Platform HLD Section */}
      <section className="py-20 border-t border-white/5 bg-brand-footer/50 relative overflow-hidden">
        {/* Background gradient flare */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 90%, rgba(16,185,129,0.04) 0%, transparent 60%)',
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Architectural Blueprint</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Talia AgentFabric Platform HLD</h2>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto text-sm leading-relaxed">
              High-level design and engineering specifications of the orchestration platform powering self-correcting enterprise agent networks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* System Boundary Diagram Card */}
            <div className="lg:col-span-8 bg-brand-card border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-white font-semibold text-base">System Topology & Integration Boundaries</h3>
                  <p className="text-[#6B7280] text-xs mt-0.5">Interactive topology mapping key sub-systems and microservices</p>
                </div>
                <span className="text-xs bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20 px-2 py-0.5 rounded font-mono">v2.4-PROD</span>
              </div>

              {/* Responsive SVG System Topology */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-[700px] py-4">
                  <svg viewBox="0 0 800 380" className="w-full h-auto text-white font-sans">
                    <defs>
                      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 2 L 8 5 L 0 8 z" fill="#4B5563" />
                      </marker>
                      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 2 L 8 5 L 0 8 z" fill="#10B981" />
                      </marker>
                    </defs>

                    {/* CLIENT/INGESTION BOUNDARY */}
                    <g transform="translate(10, 10)">
                      <rect x="0" y="0" width="160" height="340" rx="12" fill="#0B0F19" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      <rect x="0" y="0" width="160" height="40" rx="12" fill="rgba(255,255,255,0.02)" />
                      <text x="80" y="25" fill="#9CA3AF" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">INGESTION / CLIENT</text>

                      {/* Ingest Nodes */}
                      <g transform="translate(15, 60)">
                        <rect x="0" y="0" width="130" height="60" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="65" y="26" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">API Gateway</text>
                        <text x="65" y="42" fill="#6B7280" fontSize="10" textAnchor="middle">gRPC & REST / TLS 1.3</text>
                      </g>

                      <g transform="translate(15, 140)">
                        <rect x="0" y="0" width="130" height="60" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="65" y="26" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">Connectors</text>
                        <text x="65" y="42" fill="#6B7280" fontSize="10" textAnchor="middle">Salesforce, S3, SQL</text>
                      </g>

                      <g transform="translate(15, 220)">
                        <rect x="0" y="0" width="130" height="60" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="65" y="26" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">Admin Console</text>
                        <text x="65" y="42" fill="#6B7280" fontSize="10" textAnchor="middle">NextJS Portal UI</text>
                      </g>
                    </g>

                    {/* ORCHESTRATION ENGINE BOUNDARY */}
                    <g transform="translate(240, 10)">
                      <rect x="0" y="0" width="280" height="340" rx="12" fill="#0B0F19" stroke="rgba(16,185,129,0.15)" strokeWidth="1.5" />
                      <rect x="0" y="0" width="280" height="40" rx="12" fill="rgba(16,185,129,0.03)" />
                      <text x="140" y="25" fill="#10B981" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">TALIA AGENTFABRIC ORCHESTRATOR</text>

                      {/* Router & Guardrails */}
                      <g transform="translate(20, 60)">
                        <rect x="0" y="0" width="240" height="70" rx="8" fill="url(#glowGrad)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
                        <text x="120" y="28" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle">Agent Router & Dispatcher</text>
                        <text x="120" y="46" fill="#9CA3AF" fontSize="10" textAnchor="middle">Dynamic LLM Routing & Prompt Engineering</text>
                        <text x="120" y="60" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">LLAMAINDEX / LANGGRAPH</text>
                      </g>

                      {/* Security & Validation */}
                      <g transform="translate(20, 150)">
                        <rect x="0" y="0" width="240" height="70" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="120" y="28" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle">Guardrails & Evaluator</text>
                        <text x="120" y="46" fill="#9CA3AF" fontSize="10" textAnchor="middle">PII Sanitization & Citation Verification</text>
                        <text x="120" y="60" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle">NEVER leakage SLA</text>
                      </g>

                      {/* Workflow Execution */}
                      <g transform="translate(20, 240)">
                        <rect x="0" y="0" width="240" height="70" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="120" y="28" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle">Self-Correcting Loop</text>
                        <text x="120" y="46" fill="#9CA3AF" fontSize="10" textAnchor="middle">Automated Retry on Agent Failure</text>
                        <text x="120" y="60" fill="#F59E0B" fontSize="9" fontWeight="bold" textAnchor="middle">RE-EVALUATION STATE MACHINE</text>
                      </g>
                    </g>

                    {/* DATA & STORAGE BOUNDARY */}
                    <g transform="translate(590, 10)">
                      <rect x="0" y="0" width="200" height="340" rx="12" fill="#0B0F19" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      <rect x="0" y="0" width="200" height="40" rx="12" fill="rgba(255,255,255,0.02)" />
                      <text x="100" y="25" fill="#9CA3AF" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">STORAGE & SECURE CORE</text>

                      {/* Vector DB */}
                      <g transform="translate(15, 60)">
                        <rect x="0" y="0" width="170" height="70" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="85" y="28" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">Weaviate Vector DB</text>
                        <text x="85" y="46" fill="#6B7280" fontSize="10" textAnchor="middle">Namespace Partitioning</text>
                        <text x="85" y="60" fill="#10B981" fontSize="9" textAnchor="middle">Tenant Isolation Enforced</text>
                      </g>

                      {/* Relational Metadata */}
                      <g transform="translate(15, 150)">
                        <rect x="0" y="0" width="170" height="70" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="85" y="28" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">PostgreSQL Core</text>
                        <text x="85" y="46" fill="#6B7280" fontSize="10" textAnchor="middle">System State & Config</text>
                        <text x="85" y="60" fill="#9CA3AF" fontSize="9" textAnchor="middle">AES-256 Encrypted</text>
                      </g>

                      {/* Cache Layer */}
                      <g transform="translate(15, 240)">
                        <rect x="0" y="0" width="170" height="70" rx="8" fill="#0D1220" stroke="rgba(255,255,255,0.08)" />
                        <text x="85" y="28" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">Redis Cache & Queue</text>
                        <text x="85" y="46" fill="#6B7280" fontSize="10" textAnchor="middle">Session State & Task Queue</text>
                        <text x="85" y="60" fill="#9CA3AF" fontSize="9" textAnchor="middle">In-Memory / Instant Sync</text>
                      </g>
                    </g>

                    {/* CONNECTIONS (ARROWS) */}
                    <path d="M 180 100 L 232 100" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-green)" fill="none" />
                    <path d="M 180 185 L 232 185" stroke="#4B5563" strokeWidth="1.2" markerEnd="url(#arrow)" fill="none" />
                    <path d="M 180 270 L 232 270" stroke="#4B5563" strokeWidth="1.2" markerEnd="url(#arrow)" fill="none" />

                    <path d="M 530 100 L 582 100" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-green)" fill="none" />
                    <path d="M 530 185 L 582 185" stroke="#4B5563" strokeWidth="1.2" markerEnd="url(#arrow)" fill="none" />
                    <path d="M 530 270 L 582 270" stroke="#4B5563" strokeWidth="1.2" markerEnd="url(#arrow)" fill="none" />

                    <path d="M 380 130 L 380 144" stroke="#10B981" strokeWidth="1.2" markerEnd="url(#arrow-green)" fill="none" />
                    <path d="M 380 220 L 380 234" stroke="#10B981" strokeWidth="1.2" markerEnd="url(#arrow-green)" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* SLA Specs & Security Controls Card */}
            <div className="lg:col-span-4 space-y-6">
              {/* Target SLAs Table */}
              <div className="bg-brand-card border border-white/10 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-white font-semibold text-xs mb-4 pb-2 border-b border-white/5 uppercase tracking-wider">Subsystem SLA Targets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[#6B7280] border-b border-white/5">
                        <th className="pb-2 font-medium">Subsystem</th>
                        <th className="pb-2 font-medium">Metric Target</th>
                        <th className="pb-2 font-medium text-right">SLA P95</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[#9CA3AF]">
                      <tr>
                        <td className="py-2.5 font-medium text-white">Ingestion Gateway</td>
                        <td className="py-2.5">Throughput SLA</td>
                        <td className="py-2.5 text-right font-mono text-brand-emerald">&lt; 200ms</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Guardrails Checker</td>
                        <td className="py-2.5">Latency overhead</td>
                        <td className="py-2.5 text-right font-mono text-brand-emerald">&lt; 150ms</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Agent Router</td>
                        <td className="py-2.5">Availability target</td>
                        <td className="py-2.5 text-right font-mono text-brand-emerald">99.95%</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">RAG Synthesis</td>
                        <td className="py-2.5">End-to-end lookup</td>
                        <td className="py-2.5 text-right font-mono text-brand-emerald">&lt; 2.4s</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Vector Search</td>
                        <td className="py-2.5">Index Recall Rate</td>
                        <td className="py-2.5 text-right font-mono text-brand-emerald">&ge; 98.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security & Isolation Controls */}
              <div className="bg-brand-card border border-white/10 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-white font-semibold text-xs mb-4 pb-2 border-b border-white/5 uppercase tracking-wider">Security & Data Isolation</h3>
                <ul className="space-y-3.5 text-xs text-[#9CA3AF]">
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white block mb-0.5">AES-256 Storage Encryption</strong>
                      All database instances, configurations, and document chunk vectors are encrypted at rest using envelope encryption.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white block mb-0.5">TLS 1.3 Transmission Security</strong>
                      All in-transit data lines between client boundary, API gateway, LLM providers, and core DB instances enforce TLS 1.3 protocol.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white block mb-0.5">Tenant Namespace Partitioning</strong>
                      Strict logical routing isolates vector storage queries at the namespace layer, making cross-tenant leakage mathematically impossible.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
