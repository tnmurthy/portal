import { useState, useId } from 'react';
import { TrendingUp, Clock, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';
import { useCountUp } from '../hooks/useCountUp';
import SliderInput from './ui/SliderInput';

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export default function RoiCalculator() {
  const emailInputId = useId();
  const [hours, setHours] = useState(500);
  const [rate, setRate] = useState(65);
  const [errorRate, setErrorRate] = useState(8);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const baselineMonthlyCost = hours * rate;
  const monthlyErrorCost = baselineMonthlyCost * (errorRate / 100);
  const projectedMonthlySavings = (baselineMonthlyCost + monthlyErrorCost) * 0.82;
  const projectedAnnualSavings = projectedMonthlySavings * 12;
  const implementationCost = (hours * 15) + 8500;
  const paybackMonths = projectedMonthlySavings > 0 ? implementationCost / projectedMonthlySavings : 0;

  const animatedAnnual = useCountUp(Math.round(projectedAnnualSavings));
  const animatedMonthly = useCountUp(Math.round(projectedMonthlySavings));
  const animatedPayback = useCountUp(Math.round(paybackMonths * 10));

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const existing = JSON.parse(safeStorage.getItem('talia_leads') || '[]');
    safeStorage.setItem('talia_leads', JSON.stringify([
      ...existing,
      { email, hours, rate, errorRate, annualSavings: projectedAnnualSavings, ts: Date.now() }
    ]));
    setSubmitted(true);
  };

  const paybackPct = Math.min((paybackMonths / 24) * 100, 100);

  return (
    <div className="bg-brand-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Consultative Brief */}
      <div className="border-b border-white/10 bg-brand-bg/50 p-6 md:p-8 text-left">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={14} className="text-brand-emerald" />
          <span className="text-brand-emerald text-xs font-semibold uppercase tracking-wider">Strategic Value of ROI Modeling</span>
        </div>
        <h4 className="text-white font-semibold text-lg mb-2">Quantifying the Impact of Enterprise Automation</h4>
        <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-4xl">
          Enterprise process automation is not merely about cost reduction; it represents a strategic shift toward operational excellence. By automating manual workflows with Talia's AgentFabric, organizations eliminate human data entry errors, reclaim valuable resource capacity, and establish predictable operational throughput. This simulator calculates your potential savings and break-even timeline, helping you build an evidence-based roadmap for deploying self-correcting agentic systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Inputs */}
        <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="mb-6">
            <h3 className="text-white font-semibold text-lg mb-1">Configure Your Operation</h3>
            <p className="text-[#6B7280] text-sm">Adjust the parameters to reflect your current workload.</p>
          </div>
          <div className="space-y-8">
            <SliderInput
              label="Monthly Manual Workload"
              value={hours}
              min={50}
              max={10000}
              step={50}
              onChange={setHours}
              suffix=" hrs"
            />
            <SliderInput
              label="Hourly Resource Rate"
              value={rate}
              min={15}
              max={250}
              step={5}
              onChange={setRate}
              prefix="$"
            />
            <SliderInput
              label="Operational Process Error Rate"
              value={errorRate}
              min={1}
              max={30}
              step={0.5}
              onChange={setErrorRate}
              suffix="%"
            />
          </div>

          <div className="mt-8 p-4 bg-brand-bg border border-white/5 rounded-xl">
            <p className="text-xs text-[#4B5563] uppercase tracking-wider font-medium mb-3">Cost Breakdown</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Baseline Monthly Cost</span>
                <span className="text-white font-medium">{formatCurrency(baselineMonthlyCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Monthly Error Cost</span>
                <span className="text-red-400 font-medium">+{formatCurrency(monthlyErrorCost)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/5 pt-2 mt-2">
                <span className="text-[#6B7280]">Est. Implementation</span>
                <span className="text-[#9CA3AF] font-medium">{formatCurrency(implementationCost)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Outputs */}
        <div className="p-8 flex flex-col">
          <div className="mb-6">
            <h3 className="text-white font-semibold text-lg mb-1">Projected Impact</h3>
            <p className="text-[#6B7280] text-sm">Based on 82% automation efficiency recovery.</p>
          </div>

          {/* Annual Savings Hero */}
          <div className="relative bg-gradient-to-br from-brand-bg to-[#0B1A14] border border-brand-emerald/20 rounded-xl p-6 mb-5 overflow-hidden">
            <div className="absolute inset-0 bg-brand-emerald/5 rounded-xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-brand-emerald" />
                <span className="text-brand-emerald text-xs font-semibold uppercase tracking-wider">Projected Annual Savings</span>
              </div>
              <div className="text-4xl font-bold text-white tabular-nums" style={{ textShadow: '0 0 30px rgba(16,185,129,0.4)' }}>
                {formatCurrency(animatedAnnual)}
              </div>
              <p className="text-[#6B7280] text-sm mt-1">{formatCurrency(animatedMonthly)} per month</p>
            </div>
          </div>

          {/* Payback Period */}
          <div className="bg-brand-bg border border-white/5 rounded-xl p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#F59E0B]" />
                <span className="text-[#9CA3AF] text-sm font-medium">Payback Period</span>
              </div>
              <span className="text-white font-bold">{(animatedPayback / 10).toFixed(1)} months</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F59E0B] to-brand-emerald rounded-full transition-all duration-700"
                style={{ width: `${paybackPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-[#4B5563]">Break-even</span>
              <span className="text-xs text-[#4B5563]">Month {Math.ceil(paybackMonths)}</span>
            </div>
          </div>

          {/* Lead Capture */}
          <div className="mt-auto">
            {!submitted ? (
              <div className="bg-brand-bg border border-brand-emerald/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Lock size={13} className="text-brand-emerald" />
                  <span className="text-white text-sm font-semibold">Unlock Full Integration Report</span>
                </div>
                <p className="text-[#6B7280] text-xs mb-4">
                  Enter your work email to receive a detailed integration plan with ROI breakdown and implementation timeline.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <label htmlFor={emailInputId} className="sr-only">Work Email</label>
                  <input
                    id={emailInputId}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-brand-emerald/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-brand-emerald hover:bg-brand-emerald-hover text-white p-2.5 rounded-lg transition-all duration-200 flex-shrink-0"
                  >
                    <ChevronRight size={18} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-brand-emerald/10 border border-brand-emerald/30 rounded-xl p-5 flex items-center gap-3">
                <CheckCircle size={20} className="text-brand-emerald flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">Report on its way!</p>
                  <p className="text-[#6B7280] text-xs mt-0.5">Our team will reach out within 24 hours.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
