import { useState } from 'react';
import { 
  TrendingUp, ArrowRight, X, Globe, Cpu, 
  GitBranch, Shield, Database, Download, 
  MessageSquare, Check, ArrowLeft, Terminal,
  LucideIcon
} from 'lucide-react';
import SEO from '../components/SEO';
import { Tag, tags, caseStudies, CaseStudy } from '../data/data';
import ObfuscatedName from '../components/ui/ObfuscatedName';

const IconMap: Record<string, LucideIcon> = {
  Globe,
  Cpu,
  GitBranch,
  Shield,
  Database,
};


export default function CaseStudies() {
  const [activeTag, setActiveTag] = useState<Tag>('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const filtered = activeTag === 'All' ? caseStudies : caseStudies.filter((c) => c.tag === activeTag);

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3500);
    }, 1500);
  };

  return (
    <div className="pt-16">
      <SEO 
        title="Engineering Impact & Case Studies"
        description="Explore Talia Technologies' case studies to see how we've solved complex engineering challenges and delivered measurable outcomes for enterprise clients."
      />
      {/* Header */}
      <section className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 40% 60%, rgba(16,185,129,0.05) 0%, transparent 55%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Client Impact</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Case Studies</h1>
          <p className="text-[#9CA3AF] max-w-xl mx-auto text-lg leading-relaxed">
            Deep dives into the engineering challenges we've solved and the measurable outcomes we've delivered.
          </p>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="sticky top-16 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-brand-emerald text-white shadow-lg shadow-emerald-900/30'
                    : 'bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {filtered.map((cs) => (
              <div
                key={cs.id}
                className="bg-brand-card border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-200 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Left */}
                  <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: `${cs.serviceColor}15`, color: cs.serviceColor, border: `1px solid ${cs.serviceColor}20` }}
                      >
                        {cs.service}
                      </span>
                      <span className="text-xs text-[#4B5563] font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                        {cs.tag}
                      </span>
                    </div>

                    <h2 className="text-white font-bold text-xl mb-1 group-hover:text-brand-emerald transition-colors duration-200">
                      {cs.title}
                    </h2>
                    <p className="text-[#6B7280] text-sm mb-5">{cs.client}</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-[#4B5563] uppercase tracking-wider font-semibold mb-1.5">Challenge</p>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4B5563] uppercase tracking-wider font-semibold mb-1.5">Solution</p>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">
                          {cs.solution.includes('{{LEAD_NAME}}') ? (
                            <>
                              {cs.solution.split('{{LEAD_NAME}}')[0]}
                              <ObfuscatedName />
                              {cs.solution.split('{{LEAD_NAME}}')[1]}
                            </>
                          ) : (
                            cs.solution
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
                      <span className="text-xs text-[#4B5563]">Duration: <span className="text-[#9CA3AF]">{cs.duration}</span></span>
                      <span className="text-xs text-[#4B5563]">Team: <span className="text-[#9CA3AF]">{cs.team}</span></span>
                    </div>
                  </div>

                  {/* Right: Outcomes */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <TrendingUp size={14} className="text-brand-emerald" />
                        <span className="text-brand-emerald text-xs font-semibold uppercase tracking-wider">Key Outcomes</span>
                      </div>
                      <div className="space-y-5">
                        {cs.outcomes.map((o, j) => (
                          <div key={j}>
                            <div className="text-2xl font-bold text-white mb-0.5">{o.metric}</div>
                            <div className="text-[#6B7280] text-xs leading-relaxed">{o.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedCase(cs)}
                      className="mt-6 flex items-center gap-2 text-brand-emerald text-sm font-medium hover:gap-3 transition-all duration-200 self-start"
                    >
                      Read Full Case Study
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMMERSIVE BLUEPRINT & HLD MODAL OVERLAY */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
          <div className="bg-brand-bg border border-white/10 w-full max-w-6xl h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-200 text-[#F3F4F6]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-gradient-to-r from-brand-card to-brand-bg">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-brand-emerald bg-brand-emerald/15 border border-brand-emerald/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedCase.tag} Blueprint
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    ID: CS-00{selectedCase.id}-HLD
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white truncate">
                  {selectedCase.title} — Reference Architecture
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedCase(null);
                  setShowSuccessToast(false);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex-shrink-0"
                title="Close Blueprint"
              >
                <X size={18} />
              </button>
            </div>

            {/* Success Download Toast Banner */}
            {showSuccessToast && (
              <div className="bg-emerald-950/90 border-b border-emerald-500/30 px-6 py-2.5 text-xs text-[#A7F3D0] flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
                <Check size={14} className="text-brand-emerald" />
                <span>Reference High-Level Design (HLD) package successfully exported as standard B2B PDF to system logs.</span>
              </div>
            )}

            {/* Modal Body (Scrollable Grid) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-8 select-text">
              
              {/* LEFT COLUMN: System Architecture Blueprint (Span 6) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-brand-emerald rounded-full" />
                    System Architecture Blueprint
                  </h3>
                  <p className="text-xs text-gray-500">
                    High-integrity dynamic multi-tiered pipeline components and connections.
                  </p>
                </div>

                {/* Architecture Layers Tree */}
                <div className="space-y-4 relative pl-2">
                  {/* Vertical Connection pipe */}
                  <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-brand-emerald/40 via-brand-emerald/15 to-transparent z-0" />

                  {selectedCase.blueprint.layers.map((layer, lIdx) => {
                    const LayerIcon = IconMap[layer.icon] || Cpu;
                    return (
                      <div 
                        key={lIdx} 
                        className="relative flex gap-4 items-start bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-brand-emerald/25 p-4 rounded-xl transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 border border-brand-emerald/25 flex items-center justify-center text-brand-emerald flex-shrink-0 z-10 group-hover:scale-105 transition-transform">
                          <LayerIcon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-xs mb-1.5 tracking-wider uppercase">
                            {layer.name}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {layer.components.map((comp, cIdx) => (
                              <span 
                                key={cIdx} 
                                className="text-[10px] font-mono bg-white/5 border border-white/5 text-[#9CA3AF] px-2 py-0.5 rounded-md hover:text-white hover:bg-white/10 transition-colors"
                              >
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sequential Data flow steps */}
                <div className="bg-black/35 border border-white/5 rounded-xl p-5">
                  <h4 className="text-brand-emerald font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-pulse" />
                    Operational Workflow
                  </h4>
                  <div className="space-y-3 font-mono text-[11px] leading-relaxed">
                    {selectedCase.blueprint.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex gap-2 items-start">
                        <span className="text-brand-emerald font-semibold flex-shrink-0">{step.name}:</span>
                        <span className="text-[#9CA3AF]">{step.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: HLD Technical Specifications & CTAs (Span 6) */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-6">
                  {/* Title & Core HLD Components */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-3 bg-[#3B82F6] rounded-full" />
                      HLD Specification
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {selectedCase.hld.components.map((c, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-brand-emerald/5 border border-brand-emerald/25 text-brand-emerald px-2.5 py-0.5 rounded-full">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic E2E Lineage Flow (Terminal Style) */}
                  <div className="space-y-2">
                    <h4 className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal size={12} className="text-brand-emerald" />
                      End-to-End Tracing Flow
                    </h4>
                    <div className="bg-[#030712] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-[#A7F3D0] space-y-2.5 select-text overflow-x-auto custom-scrollbar">
                      {selectedCase.hld.dataFlow.map((flow, i) => (
                        <div key={i} className="flex gap-2 items-start whitespace-nowrap">
                          <span className="text-emerald-950 font-bold select-none">{`L0${i + 1}`}</span>
                          <span className="text-[#9CA3AF]">&gt;&gt;</span>
                          <span className="text-white">{flow}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Boundaries */}
                  <div className="space-y-2">
                    <h4 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Security Guardrails & Boundaries
                    </h4>
                    <ul className="space-y-2">
                      {selectedCase.hld.security.map((sec, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#9CA3AF] leading-relaxed">
                          <Shield size={12} className="text-red-400 mt-1 flex-shrink-0" />
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Legacy Modernization */}
                  <div className="space-y-2">
                    <h4 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Legacy Transformation Strategy
                    </h4>
                    <p className="text-xs text-[#9CA3AF] bg-white/[0.02] border border-white/5 rounded-xl p-4 leading-relaxed italic border-l-2 border-brand-emerald/50">
                      "{selectedCase.hld.legacyModernization}"
                    </p>
                  </div>
                </div>

                {/* B2B Action Center Call-to-Actions (CTAs) */}
                <div className="bg-brand-card border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-xl mt-6">
                  <div className="text-center pb-2 border-b border-white/5">
                    <p className="text-xs font-semibold text-white">Require a custom enterprise systems review?</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Partner directly with <ObfuscatedName className="text-gray-500 font-semibold" />'s deployment squad.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCase(null);
                      window.location.hash = '#/contact';
                    }}
                    className="w-full bg-brand-emerald hover:bg-brand-emerald-hover text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/30 group hover:shadow-emerald-950/50 hover:-translate-y-0.5"
                  >
                    <MessageSquare size={13} className="group-hover:scale-110 transition-transform" />
                    Request Architecture Customization
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleDownload(selectedCase.id)}
                      disabled={downloadingId !== null}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-3 rounded-xl text-[10px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {downloadingId === selectedCase.id ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin flex-shrink-0" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download size={11} className="text-brand-emerald flex-shrink-0" />
                          Export Ref Blueprint
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCase(null);
                        window.location.hash = '#/contact';
                      }}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-3 rounded-xl text-[10px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Cpu size={11} className="text-[#3B82F6] flex-shrink-0" />
                      Schedule HLD Consult
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 border-t border-white/5 bg-brand-card/50 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCase(null);
                  setShowSuccessToast(false);
                }}
                className="flex items-center gap-2 text-xs text-[#9CA3AF] hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Case Studies Grid
              </button>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <Shield size={12} className="text-brand-emerald" />
                <span>SOC2 Type-II Compliance Assured</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

