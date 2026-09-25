import React from 'react';
import { AlertStatus } from '../../types';

interface AlertBadgeProps {
  status: AlertStatus | string;
}

export const AlertBadge: React.FC<AlertBadgeProps> = ({ status }) => {
  const upper = status ? status.toUpperCase() : 'NEW';

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-300';
  if (upper === 'NEW') {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (upper === 'ACKNOWLEDGED') {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (upper === 'INVESTIGATING') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (upper === 'RESOLVED') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (upper === 'DISMISSED') {
    colorClasses = 'bg-slate-100 text-slate-600 border-slate-200';
  }

  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${colorClasses}`}>
      {upper}
    </span>
  );
};
