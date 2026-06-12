import { useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { View } from '../App';
import SEO from '../components/SEO';
import RoiCalculator from '../components/RoiCalculator';
import FAQSection from '../components/FAQSection';
import { trustLogos, stats } from '../data/homeData';

interface HomeProps {
  onNavigate: (view: View) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const roiRef = useRef<HTMLDivElement>(null);

  const scrollToRoi = () => {
    roiRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pt-16">
      <SEO 
        title="Enterprise Software Engineering & Architecture Consulting"
        description="Elite B2B software engineering, data analytics platforms, resilient cloud systems, and secure enterprise agentic AI architectures."
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 35%, rgba(16,185,129,0.07) 0%, transparent 50%),
                             radial-gradient(circle at 75% 65%, rgba(16,185,129,0.05) 0%, transparent 50%)`,
          }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-pulse" />
              Elite B2B Technology & AI Solutions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              We Engineer High-Integrity{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-emerald-accent">
                Autonomous Systems
              </span>{' '}
              for the Enterprise Elite
            </h1>

            <p className="text-[#9CA3AF] text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
              Talia Technologies designs and deploys high-integrity product engineering, secure cloud migrations, and autonomous agentic workflows. Under strict guardrails, we bridge legacy enterprise mainframes with self-correcting multi-agent loops to eliminate operational friction at scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToRoi}
                className="inline-flex items-center justify-center gap-2 bg-brand-emerald hover:bg-brand-emerald-hover text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 hover:-translate-y-0.5"
              >
                Calculate Project ROI
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                Explore Services
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="relative border-t border-white/5 bg-brand-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-[#4B5563] text-xs font-semibold uppercase tracking-widest mb-6">
              Trusted by engineering teams at
            </p>
            <div className="flex items-center justify-center flex-wrap gap-10">
              {trustLogos.map(({ name, path }) => (
                <div key={name} className="flex items-center gap-2 opacity-30 hover:opacity-50 transition-opacity duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                  <span className="text-white font-semibold text-sm tracking-wide">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-brand-card border border-white/5 rounded-xl p-6 text-center hover:border-brand-emerald/20 transition-colors duration-200">
                <div className="w-10 h-10 bg-brand-emerald/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-brand-emerald" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-[#6B7280] text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rigor Banner */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-brand-card to-[#0B1209] border border-brand-emerald/15 rounded-2xl p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-emerald/5 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="relative">
                <span className="inline-block text-brand-emerald text-xs font-bold uppercase tracking-widest mb-3">
                  High-Integrity Systems Engineering
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  The <span className="text-brand-emerald">10-Project</span> Sovereign Constraint: Absolute Focus, Zero Compromise
                </h2>
                <p className="text-[#9CA3AF] text-base leading-relaxed max-w-3xl">
                  To guarantee mathematical precision and architectural integrity, Talia enforces a strict operational cap of exactly ten concurrent client engagements. We reject the generic, high-volume outsourcing model. By pairing your stakeholders directly with elite systems architects, we ensure that your mission-critical pipelines receive our undivided cognitive focus, rigorous peer review, and SOC2-compliant engineering standards.
                </p>
                <div className="mt-8 flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-emerald">10</div>
                    <div className="text-[#6B7280] text-xs mt-1">Max Projects</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-emerald">Sr.</div>
                    <div className="text-xs text-[#6B7280] mt-1">Engineers Only</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-emerald">∞</div>
                    <div className="text-xs text-[#6B7280] mt-1">Partnership</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section ref={roiRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">Task Automation ROI</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">
              Calculate Your Automation Savings
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-sm leading-relaxed">
              Model your projected savings in real-time based on your current operational workload, resource costs, and error rates.
            </p>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
