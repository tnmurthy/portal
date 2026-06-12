import React from 'react';

export default function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="flex-shrink-0" aria-labelledby="logoTitle">
      <title id="logoTitle">Talia Technologies Logo</title>
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#nodeGlow)" />
      <circle cx="18" cy="8" r="3" fill="#10B981" />
      <circle cx="28" cy="24" r="3" fill="#10B981" />
      <circle cx="8" cy="24" r="3" fill="#10B981" />
      <line x1="18" y1="8" x2="28" y2="24" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="18" y1="8" x2="8" y2="24" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="28" y1="24" x2="8" y2="24" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="18" cy="18" r="2.5" fill="#10B981" fillOpacity="0.8" />
      <line x1="18" y1="18" x2="18" y2="8" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
      <line x1="18" y1="18" x2="28" y2="24" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
      <line x1="18" y1="18" x2="8" y2="24" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
    </svg>
  );
}
