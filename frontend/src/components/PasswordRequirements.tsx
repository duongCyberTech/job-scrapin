import React from 'react';

interface Props {
  password: string;
}

interface Requirement {
  label: string;
  met: boolean;
}

export default function PasswordRequirements({ password }: Props) {
  // Define criteria
  const requirements: Requirement[] = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { label: 'At least one number (0-9)', met: /[0-9]/.test(password) },
    { label: 'At least one special character (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = requirements.filter((r) => r.met).length;

  // Determine meter styling based on criteria met
  const getMeterColor = () => {
    if (metCount <= 1) return 'bg-rose-500';
    if (metCount <= 3) return 'bg-amber-500';
    if (metCount === 4) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const getMeterLabel = () => {
    if (metCount === 0) return '';
    if (metCount <= 1) return 'Very Weak';
    if (metCount <= 3) return 'Fair';
    if (metCount === 4) return 'Good';
    return 'Strong';
  };

  // Keep hidden until user starts typing
  if (!password) return null;

  return (
    <div className="mt-3 space-y-2.5 rounded-lg border border-slate-200 bg-slate-50/60 p-3">
      {/* 5-Segment Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex h-1.5 w-full gap-1">
          {requirements.map((_, index) => (
            <div
              key={index}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                index < metCount ? getMeterColor() : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Password strength</span>
          <span className="font-semibold text-slate-700">{getMeterLabel()}</span>
        </div>
      </div>

      {/* Interactive Criteria Checklist */}
      <ul className="grid grid-cols-1 gap-1.5 pt-1 text-xs">
        {requirements.map((req, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 transition-colors duration-200 ${
              req.met ? 'text-emerald-700 font-medium' : 'text-slate-400'
            }`}
          >
            {/* Dynamic Status Icon */}
            {req.met ? (
              <svg
                className="h-4 w-4 shrink-0 text-emerald-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </span>
            )}
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}