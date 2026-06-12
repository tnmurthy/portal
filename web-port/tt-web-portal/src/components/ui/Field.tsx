import React, { useId } from 'react';

interface FieldProps {
  icon: React.ElementType;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

export default function Field({ icon: Icon, label, type = 'text', placeholder, value, onChange }: FieldProps) {
  const fieldId = useId();
  return (
    <div>
      <label htmlFor={fieldId} className="flex items-center gap-2 text-sm text-gray-400 mb-1.5 cursor-pointer">
        <Icon size={13} className="text-brand-emerald" />
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-brand-bg border border-white/10 focus:border-brand-emerald/50 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl focus:outline-none transition-colors"
      />
    </div>
  );
}
