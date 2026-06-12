import { useId } from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}

export default function SliderInput({ label, value, min, max, step, onChange, prefix = '', suffix = '' }: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = useId();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm text-gray-400 cursor-pointer">{label}</label>
        <div className="flex items-center gap-1 bg-brand-bg border border-white/10 rounded-lg px-3 py-1">
          <span className="text-brand-emerald font-semibold text-sm">{prefix}{value.toLocaleString()}{suffix}</span>
        </div>
      </div>
      <div className="relative">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-emerald-hover to-brand-emerald rounded-full transition-all duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-emerald rounded-full border-2 border-white shadow-lg shadow-emerald-900/50 pointer-events-none transition-all duration-100"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}
