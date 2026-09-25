import React from 'react';
import { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel | string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md' }) => {
  const upper = level ? level.toUpperCase() : 'LOW';

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-300';
  if (upper === 'LOW') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (upper === 'MEDIUM') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (upper === 'HIGH') {
    colorClasses = 'bg-orange-50 text-orange-800 border-orange-200';
  } else if (upper === 'CRITICAL') {
    colorClasses = 'bg-rose-100 text-rose-800 border-rose-300 font-bold animate-pulse';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center rounded-full border font-semibold tracking-wide ${colorClasses} ${sizeClasses}`}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current"></span>
      {upper}
    </span>
  );
};
