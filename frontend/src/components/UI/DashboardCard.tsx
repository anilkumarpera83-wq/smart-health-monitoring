import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  colorTheme?: 'blue' | 'teal' | 'amber' | 'red' | 'slate';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorTheme = 'blue',
}) => {
  let iconBg = 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
  let borderTop = 'border-t-4 border-t-blue-500';

  if (colorTheme === 'teal') {
    iconBg = 'bg-teal-500/10 text-teal-400 border border-teal-500/20';
    borderTop = 'border-t-4 border-t-teal-500';
  } else if (colorTheme === 'amber') {
    iconBg = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    borderTop = 'border-t-4 border-t-amber-500';
  } else if (colorTheme === 'red') {
    iconBg = 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
    borderTop = 'border-t-4 border-t-rose-500';
  } else if (colorTheme === 'slate') {
    iconBg = 'bg-slate-800 text-slate-300 border border-slate-700';
    borderTop = 'border-t-4 border-t-slate-500';
  }

  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl transition-all hover:border-slate-700 hover:shadow-2xl ${borderTop}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`rounded-xl p-2.5 ${iconBg}`}>{icon}</div>
      </div>
      <div className="mt-3">
        <div className="text-3xl font-black text-white tracking-tight font-sans">{value}</div>
        {subtitle && <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>}
        {trend && (
          <div className="mt-2 flex items-center text-xs font-semibold text-slate-300">
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};
