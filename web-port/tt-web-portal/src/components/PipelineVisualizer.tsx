import { useState, useEffect, useRef } from 'react';
import { Play, Square, CheckCircle2, Circle, Layers } from 'lucide-react';
import { steps } from '../data/pipelineSteps';

export default function PipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stopSim = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setSimulating(false);
  };

  const runSimulation = () => {
    setSimulating(true);
    setCompletedSteps([]);
    setActiveStep(0);

    // Clear any existing timeouts first
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    steps.forEach((_, i) => {
      const id = setTimeout(() => {
        setActiveStep(i);
        if (i > 0) setCompletedSteps((prev) => [...prev, i - 1]);
        if (i === steps.length - 1) {
          const finalId = setTimeout(() => {
            setCompletedSteps([0, 1, 2, 3, 4]);
            setSimulating(false);
          }, 800);
          timeoutsRef.current.push(finalId);
        }
      }, i * 900);
      timeoutsRef.current.push(id);
    });
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const active = steps[activeStep];
  const Icon = active.icon;

  return (
    <div className="bg-brand-card border border-white/10 rounded-2xl overflow-hidden">
      {/* Consultative Brief */}
      <div className="border-b border-white/10 bg-brand-bg/50 p-6 md:p-8 text-left">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={14} className="text-brand-emerald" />
          <span className="text-brand-emerald text-xs font-semibold uppercase tracking-wider">Architectural Blueprint & Lineage</span>
        </div>
        <h4 className="text-white font-semibold text-lg mb-2">Securing the Enterprise RAG Data Lifecycle</h4>
        <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-4xl">
          Modern enterprise systems require absolute transparency in how data is ingested, cleansed, and prepared for generative AI ingestion. Visualizing data lineage is not just for operational monitoring; it is a critical requirement for security auditing, compliance enforcement (GDPR, SOC2, HIPAA), and cross-team alignment. This interactive visualizer showcases the step-by-step lifecycle of ingestion, governance, and RAG synthesis running within the secure boundaries of Talia's AgentFabric.
        </p>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <h3 className="text-white font-semibold text-sm">Data Pipeline & RAG Architecture</h3>
          <p className="text-[#4B5563] text-xs mt-0.5">Click any stage to inspect details</p>
        </div>
        <button
          onClick={simulating ? stopSim : runSimulation}
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
            simulating
              ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
              : 'bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald hover:bg-brand-emerald/20'
          }`}
        >
          {simulating ? <><Square size={12} /> Stop</> : <><Play size={12} /> Simulate</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Step Sequence */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="space-y-2">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = step.id === activeStep;
              const isComplete = completedSteps.includes(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => { if (!simulating) setActiveStep(step.id); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-brand-emerald/10 border-brand-emerald/30'
                      : 'bg-brand-bg border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`relative flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isComplete
                      ? 'border-brand-emerald bg-brand-emerald/20'
                      : isActive
                      ? 'border-brand-emerald bg-brand-emerald/10'
                      : 'border-white/20 bg-white/5'
                  }`}>
                    {isComplete ? (
                      <CheckCircle2 size={16} className="text-brand-emerald" />
                    ) : isActive && simulating ? (
                      <span className="w-2.5 h-2.5 bg-brand-emerald rounded-full animate-pulse" />
                    ) : (
                      <StepIcon size={15} className={isActive ? 'text-brand-emerald' : 'text-[#4B5563]'} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-[#4B5563] truncate">{step.subtitle}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      isComplete ? 'bg-brand-emerald/10 text-brand-emerald' : isActive ? 'bg-white/5 text-[#9CA3AF]' : 'bg-white/5 text-[#4B5563]'
                    }`}>
                      {isComplete ? 'Done' : isActive ? 'Active' : `Step ${step.id + 1}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detail Workspace */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center">
              <Icon size={18} className="text-brand-emerald" />
            </div>
            <div>
              <h4 className="text-white font-semibold">{active.title}</h4>
              <p className="text-[#6B7280] text-xs">{active.subtitle}</p>
            </div>
          </div>

          <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">{active.details.description}</p>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#4B5563] uppercase tracking-wider font-medium mb-2">Active Tool Stack</p>
              <div className="flex flex-wrap gap-2">
                {active.details.tools.map((tool) => (
                  <span key={tool} className="text-xs bg-white/5 border border-white/10 text-[#9CA3AF] px-2.5 py-1 rounded-lg">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-[#4B5563] uppercase tracking-wider font-medium mb-2">Safety Rules</p>
              <ul className="space-y-1.5">
                {active.details.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-xs text-[#6B7280]">
                    <Circle size={4} className="mt-1.5 flex-shrink-0 fill-brand-emerald text-brand-emerald" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-[#4B5563] uppercase tracking-wider font-medium mb-2">Validation Checks</p>
              <ul className="space-y-1.5">
                {active.details.checks.map((check) => (
                  <li key={check} className="flex items-start gap-2 text-xs text-[#6B7280]">
                    <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0 text-brand-emerald" />
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
