import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import { DashboardSummary } from '../../types';
import { DashboardCard } from '../../components/UI/DashboardCard';
import { DisclaimerBanner } from '../../components/UI/DisclaimerBanner';
import { SkeletonLoader } from '../../components/UI/SkeletonLoader';
import { ErrorState } from '../../components/UI/ErrorState';
import { Activity, Droplet, Bell, MapPin, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = () => {
    setLoading(true);
    setError('');
    dashboardService.getSummary()
      .then(setSummary)
      .catch((err) => setError('Failed to load dashboard metrics.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <SkeletonLoader rows={6} />;
  if (error) return <ErrorState message={error} onRetry={loadDashboard} />;
  if (!summary) return null;

  const COLORS = ['#3b82f6', '#14b8a6', '#f59e0b', '#ef4444', '#64748b'];

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
          System Administrator Command Center
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Statewide surveillance metrics, database status, and public health warning alerts across Telangana.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Surveillance Cases"
          value={summary.totalCases}
          subtitle={`${summary.activeCases} active, ${summary.confirmedCases} confirmed`}
          icon={<Activity className="h-5 w-5" />}
          colorTheme="blue"
        />
        <DashboardCard
          title="Water Quality Alerts"
          value={summary.waterQualityAlertsCount}
          subtitle="Contaminated samples flagged"
          icon={<Droplet className="h-5 w-5" />}
          colorTheme="teal"
        />
        <DashboardCard
          title="Active Outbreak Alerts"
          value={summary.activeOutbreakAlertsCount}
          subtitle="Requires immediate response"
          icon={<Bell className="h-5 w-5" />}
          colorTheme="red"
        />
        <DashboardCard
          title="High Risk Villages"
          value={summary.highRiskVillagesCount}
          subtitle="Elevated AI outbreak risk"
          icon={<MapPin className="h-5 w-5" />}
          colorTheme="amber"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Disease Distribution Chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
          <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-sky-400" />
            Disease Breakdown Across Reported Cases
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.diseaseDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Quality Risk Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
          <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
            <Droplet className="h-4 w-4 text-teal-400" />
            Water Sample Safety Quality Assessment
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary.waterQualityBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {summary.waterQualityBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
