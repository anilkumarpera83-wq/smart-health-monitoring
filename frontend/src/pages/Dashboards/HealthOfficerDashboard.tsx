import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import { alertService } from '../../services/alertService';
import { DashboardSummary, AlertItem } from '../../types';
import { DashboardCard } from '../../components/UI/DashboardCard';
import { RiskBadge } from '../../components/UI/RiskBadge';
import { AlertBadge } from '../../components/UI/AlertBadge';
import { DisclaimerBanner } from '../../components/UI/DisclaimerBanner';
import { SkeletonLoader } from '../../components/UI/SkeletonLoader';
import { Activity, Droplet, Bell, MapPin, CheckCircle } from 'lucide-react';

export const HealthOfficerDashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dashboardService.getSummary(),
      alertService.getAllAlerts(0, 5)
    ]).then(([sum, altData]) => {
      setSummary(sum);
      setAlerts(altData.content);
    }).finally(() => setLoading(false));
  }, []);

  const handleAcknowledge = async (id: number) => {
    await alertService.updateStatus(id, 'ACKNOWLEDGED');
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status: 'ACKNOWLEDGED' } : a));
  };

  if (loading) return <SkeletonLoader rows={6} />;
  if (!summary) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          District Health Officer Control Panel
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Disease cluster surveillance, containment response team management, and active alerts.
        </p>
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Active Disease Clusters"
          value={summary.activeCases}
          subtitle="Monitored in district"
          icon={<Activity className="h-5 w-5" />}
          colorTheme="blue"
        />
        <DashboardCard
          title="Contaminated Water Sites"
          value={summary.waterQualityAlertsCount}
          subtitle="Critical readings logged"
          icon={<Droplet className="h-5 w-5" />}
          colorTheme="teal"
        />
        <DashboardCard
          title="Unresolved Outbreak Alerts"
          value={summary.activeOutbreakAlertsCount}
          subtitle="Pending action"
          icon={<Bell className="h-5 w-5" />}
          colorTheme="red"
        />
        <DashboardCard
          title="Mean AI Risk Index"
          value={`${summary.averageRiskScore} / 100`}
          subtitle="Calculated by ML Engine"
          icon={<MapPin className="h-5 w-5" />}
          colorTheme="amber"
        />
      </div>

      {/* Actionable Alerts Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-rose-600" />
          Urgent District Outbreak & Water Quality Alerts
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b">
              <tr>
                <th className="p-3">Alert Code</th>
                <th className="p-3">Village / Location</th>
                <th className="p-3">Type</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alerts.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{a.alertCode}</td>
                  <td className="p-3 font-medium text-slate-800">{a.villageName}, {a.mandalName}</td>
                  <td className="p-3 text-slate-600">{a.alertType}</td>
                  <td className="p-3"><RiskBadge level={a.riskLevel} size="sm" /></td>
                  <td className="p-3"><AlertBadge status={a.status} /></td>
                  <td className="p-3">
                    {a.status === 'NEW' && (
                      <button
                        onClick={() => handleAcknowledge(a.id)}
                        className="inline-flex items-center gap-1 rounded bg-health-blue-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-health-blue-800"
                      >
                        <CheckCircle className="h-3 w-3" /> Acknowledge
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
