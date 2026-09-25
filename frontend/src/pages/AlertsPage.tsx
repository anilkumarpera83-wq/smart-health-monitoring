import React, { useState, useEffect } from 'react';
import { alertService } from '../services/alertService';
import { AlertItem } from '../types';
import { DataTable, Column } from '../components/UI/DataTable';
import { RiskBadge } from '../components/UI/RiskBadge';
import { AlertBadge } from '../components/UI/AlertBadge';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import { Bell } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadAlerts = (p: number) => {
    setLoading(true);
    alertService.getAllAlerts(p, 10)
      .then((res) => {
        setAlerts(res.content);
        setTotal(res.totalElements);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAlerts(page);
  }, [page]);

  const handleUpdateStatus = async (id: number, status: any) => {
    await alertService.updateStatus(id, status);
    loadAlerts(page);
  };

  const columns: Column<AlertItem>[] = [
    { header: 'Alert Code', accessor: (r) => <span className="font-mono font-bold text-slate-900">{r.alertCode}</span> },
    { header: 'Alert Type', accessor: (r) => <span className="font-semibold text-slate-800">{r.alertType}</span> },
    { header: 'Village', accessor: (r) => r.villageName || '-' },
    { header: 'District', accessor: (r) => r.districtName || '-' },
    { header: 'Risk Level', accessor: (r) => <RiskBadge level={r.riskLevel} size="sm" /> },
    { header: 'Risk Score', accessor: (r) => <span className="font-extrabold text-amber-600">{r.riskScore}</span> },
    { header: 'Status', accessor: (r) => <AlertBadge status={r.status} /> },
    {
      header: 'Actions',
      accessor: (r) => (
        <select
          value={r.status}
          onChange={(e) => handleUpdateStatus(r.id, e.target.value)}
          className="rounded border border-slate-300 p-1 text-[11px] font-semibold text-slate-800"
        >
          <option value="NEW">NEW</option>
          <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
          <option value="INVESTIGATING">INVESTIGATING</option>
          <option value="RESOLVED">RESOLVED</option>
          <option value="DISMISSED">DISMISSED</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Early Warning Alerts & Outbreak Notifications
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated outbreak and water contamination alert lifecycle manager.
        </p>
      </div>

      <DisclaimerBanner />

      <DataTable
        columns={columns}
        data={alerts}
        isLoading={loading}
        totalItems={total}
        currentPage={page}
        onPageChange={setPage}
        searchPlaceholder="Search alert code, village, type..."
      />
    </div>
  );
};
