import { CheckCircle2, Cpu } from 'lucide-react';
import SEO from '../components/SEO';
import { values, methodSteps, techAreas } from '../data/aboutData';
import ObfuscatedName from '../components/ui/ObfuscatedName';

export default function About() {
  return (
    <div className="pt-16">
      <SEO 
        title="About Our Engineering Excellence"
        description="Learn about Talia Technologies' conviction in architectural rigor, our AI-augmented methodology, and our leadership in enterprise digital transformation."
      />
      
      {/* Hero */}
      <section className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(16,185,129,0.06) 0%, transparent 55%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Our Story</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-5 leading-tight">
              Built by Engineers,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-emerald-accent">
                For Engineering Excellence
              </span>
            </h1>
            <p className="text-[#9CA3AF] text-lg leading-relaxed">
              Talia Technologies was founded on a single conviction: that modern enterprise systems deserve absolute architectural rigor. We design and deliver custom, high-integrity software pipelines that compound in value, replacing the fragile, high-maintenance templates that generic consulting firms deploy.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Section 01</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-5 leading-tight">
                Why We Reject Generic Solutions
              </h2>
              <div className="space-y-4 text-[#9CA3AF] leading-relaxed">
                <p>
                  Generic platforms represent a toxic B2B debt loop. Off-the-shelf SaaS and generic low-code abstractions trade immediate speed for systemic, long-term fragility—imposing crippling licensing overhead, proprietary vendor lock-in, and structural failure under enterprise load.
                </p>
                <p>
                  Talia builds high-integrity, sovereign code bases engineered to your exact operational logic. A well-architected system from year one costs less to maintain, less to extend, and less to scale than retrofitting a generic platform that was never designed for your workflows.
                </p>
                <p>
                  Our philosophy is absolute: <strong className="text-white">analyze the legacy system constraints, architect the minimal correct solution, enforce automated guardrails, and sustain operational excellence as your dedicated engineering partner.</strong>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-brand-card border border-white/5 rounded-xl p-5 hover:border-brand-emerald/15 transition-colors duration-200">
                  <div className="w-9 h-9 bg-brand-emerald/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={16} className="text-brand-emerald" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1.5">{title}</h4>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Section 02</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">Our AI-Augmented Methodology</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-sm leading-relaxed">
              How we apply AI tools across the development lifecycle without compromising review standards or software security.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-emerald/30 via-brand-emerald/10 to-transparent hidden lg:block" />
            <div className="space-y-4">
              {methodSteps.map((step) => (
                <div key={step.phase} className="relative flex gap-8 items-start">
                  <div className="hidden lg:flex flex-col items-center flex-shrink-0 w-16">
                    <div className="w-8 h-8 bg-brand-emerald/10 border border-brand-emerald/30 rounded-full flex items-center justify-center text-brand-emerald font-bold text-xs z-10">
                      {step.phase}
                    </div>
                  </div>
                  <div className="flex-1 bg-brand-card border border-white/5 hover:border-white/10 rounded-xl p-6 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="lg:hidden text-brand-emerald font-bold text-xs">{step.phase}</span>
                      <h3 className="text-white font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 border-b border-white/5 bg-brand-bg/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl font-bold text-white mt-2">Forward Deployment Executive</h2>
            <p className="text-[#6B7280] text-sm mt-3 leading-relaxed">
              Directing our high-impact client engineering engagements, bridging cutting-edge RAG & Agentic architectures with real-world B2B and B2C deployments.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-brand-card border border-white/10 hover:border-brand-emerald/25 rounded-2xl p-8 md:p-10 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-emerald to-brand-emerald-hover flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-emerald-950/40">
                NT
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      <ObfuscatedName className="text-white font-bold text-xl" />
                    </h3>
                    <p className="text-brand-emerald text-sm font-semibold mt-0.5">Forward Deployment Executive & AI Solutions Architect</p>
                  </div>
                  <span className="inline-block px-3 py-1 bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 rounded-full text-xs font-bold self-center md:self-start">
                    Agentic & Gen AI Expert
                  </span>
                </div>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">
                  <ObfuscatedName className="text-[#9CA3AF]" /> brings over 23 years of elite systems engineering, data analytics, and digital transformation leadership to Talia's enterprise partners. As our strategic Forward Deployment Executive, he bridges legacy operational structures with state-of-the-art AI orchestration. His extensive track record includes directing critical analytics governance and compliance frameworks for Tier-1 financial institutions including HDFC Bank, Axis Bank, Bandhan Bank, and Federal Bank. Specializing in self-correcting multi-agent loops (LangGraph, LlamaIndex) and Policy-as-Code data ledger security, <ObfuscatedName name="Narayanamurthy" className="text-[#9CA3AF]" /> leads our engineering squads in translating complex business processes into scalable, high-integrity production realities.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-brand-bg border border-white/5 rounded-xl p-3">
                    <div className="text-brand-emerald font-bold text-lg">15+</div>
                    <div className="text-[#6B7280] text-[10px] uppercase tracking-wider font-semibold mt-1">AI Deployments</div>
                  </div>
                  <div className="bg-brand-bg border border-white/5 rounded-xl p-3">
                    <div className="text-brand-emerald font-bold text-lg">Multi-Agent</div>
                    <div className="text-[#6B7280] text-[10px] uppercase tracking-wider font-semibold mt-1">Core Focus</div>
                  </div>
                  <div className="bg-brand-bg border border-white/5 rounded-xl p-3">
                    <div className="text-brand-emerald font-bold text-lg">7+</div>
                    <div className="text-[#6B7280] text-[10px] uppercase tracking-wider font-semibold mt-1">Sectors Led</div>
                  </div>
                  <div className="bg-brand-bg border border-white/5 rounded-xl p-3">
                    <div className="text-brand-emerald font-bold text-lg">Enterprise</div>
                    <div className="text-[#6B7280] text-[10px] uppercase tracking-wider font-semibold mt-1">Grade SLAs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Cpu size={16} className="text-brand-emerald" />
              <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Technology Stack</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Our Primary Technology Stack</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techAreas.map(({ label, items }) => (
              <div key={label} className="bg-brand-card border border-white/5 rounded-xl p-4">
                <p className="text-brand-emerald text-xs font-semibold uppercase tracking-wider mb-3">{label}</p>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <CheckCircle2 size={10} className="text-brand-emerald flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
