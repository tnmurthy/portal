import React, { useId } from 'react';

// ==========================================
// 1. Text Field Component
// ==========================================
export interface FieldProps {
  icon: React.ElementType;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

export function Field({ icon: Icon, label, type = 'text', placeholder, value, onChange }: FieldProps) {
  const fieldId = useId();
  return (
    <div>
      <label htmlFor={fieldId} className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-1.5 cursor-pointer">
        <Icon size={13} className="text-[#10B981]" />
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0B0F19] border border-white/10 focus:border-[#10B981]/50 text-white placeholder-[#4B5563] text-sm px-4 py-3 rounded-xl focus:outline-none transition-colors"
      />
    </div>
  );
}

// ==========================================
// 2. Select Dropdown Component
// ==========================================
export interface SelectFieldProps {
  icon: React.ElementType;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}

export function SelectField({ icon: Icon, label, options, value, onChange, placeholder }: SelectFieldProps) {
  const fieldId = useId();
  return (
    <div>
      <label htmlFor={fieldId} className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-1.5 cursor-pointer">
        <Icon size={13} className="text-[#10B981]" />
        {label}
      </label>
      <select
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0B0F19] border border-white/10 focus:border-[#10B981]/50 text-white text-sm px-4 py-3 rounded-xl focus:outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled className="text-[#4B5563]">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0D1220]">{o}</option>
        ))}
      </select>
    </div>
  );
}

// ==========================================
// 3. Range Slider Input Component
// ==========================================
export interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}

export function SliderInput({ label, value, min, max, step, onChange, prefix = '', suffix = '' }: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = useId();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm text-[#9CA3AF] cursor-pointer">{label}</label>
        <div className="flex items-center gap-1 bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-1">
          <span className="text-[#10B981] font-semibold text-sm">{prefix}{value.toLocaleString()}{suffix}</span>
        </div>
      </div>
      <div className="relative">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full transition-all duration-100"
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
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white shadow-lg shadow-emerald-900/50 pointer-events-none transition-all duration-100"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#4B5563]">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}
