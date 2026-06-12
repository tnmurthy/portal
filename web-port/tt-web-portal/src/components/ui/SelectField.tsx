import React, { useId } from 'react';

interface SelectFieldProps {
  icon: React.ElementType;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}

export default function SelectField({ icon: Icon, label, options, value, onChange, placeholder }: SelectFieldProps) {
  const fieldId = useId();
  return (
    <div>
      <label htmlFor={fieldId} className="flex items-center gap-2 text-sm text-gray-400 mb-1.5 cursor-pointer">
        <Icon size={13} className="text-brand-emerald" />
        {label}
      </label>
      <select
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-brand-bg border border-white/10 focus:border-brand-emerald/50 text-white text-sm px-4 py-3 rounded-xl focus:outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled className="text-gray-500">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-brand-card">{o}</option>
        ))}
      </select>
    </div>
  );
}
