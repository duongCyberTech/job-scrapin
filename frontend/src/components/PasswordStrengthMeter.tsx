import React from 'react';

interface Props {
  password: string;
}

export interface StrengthResult {
  score: number; // 0 to 4
  label: string;
  color: string;
}

export function calculatePasswordStrength(password: string): StrengthResult {
  if (!password) {
    return { score: 0, label: '', color: 'bg-slate-200' };
  }

  let score = 0;

  // Criteria checks
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 1:
      return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    case 2:
      return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    case 3:
      return { score: 3, label: 'Good', color: 'bg-blue-500' };
    case 4:
      return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
    default:
      return { score: 1, label: 'Very Weak', color: 'bg-rose-500' };
  }
}

export default function PasswordStrengthMeter({ password }: Props) {
  if (!password) return null;

  const { score, label, color } = calculatePasswordStrength(password);

  return (
    <div className="mt-2 space-y-1.5">
      {/* 4-segment progress bar */}
      <div className="flex gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              step <= score ? color : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Label feedback */}
      <div className="flex justify-between items-center text-[11px] text-slate-500">
        <span>Password strength</span>
        <span className="font-semibold text-slate-700">{label}</span>
      </div>
    </div>
  );
}