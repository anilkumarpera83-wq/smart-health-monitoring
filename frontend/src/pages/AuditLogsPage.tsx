import React, { useEffect, useState } from 'react';
import { DataTable } from '../components/UI/DataTable';
import { ShieldCheck, Lock, Activity, Eye, UserCheck, AlertTriangle } from 'lucide-react';

interface AuditLog {
  id: number;
  timestamp: string;
  userEmail: string;
  role: string;
  action: string;
  ipAddress: string;
  status: string;
}

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Seeded audit log trail
    setLogs([
      { id: 101, timestamp: '2026-08-09 20:14:10', userEmail: 'admin@example.com', role: 'ADMIN', action: 'SYSTEM_CONFIG_UPDATE', ipAddress: '192.168.1.45', status: 'SUCCESS' },
      { id: 102, timestamp: '2026-08-09 19:42:05', userEmail: 'health@example.com', role: 'HEALTH_OFFICER', action: 'ALERT_DISPATCHED', ipAddress: '182.74.12.11', status: 'SUCCESS' },
      { id: 103, timestamp: '2026-08-09 18:30:19', userEmail: 'doctor@example.com', role: 'DOCTOR', action: 'CASE_DIAGNOSIS_LOG', ipAddress: '115.240.8.92', status: 'SUCCESS' },
      { id: 104, timestamp: '2026-08-09 17:15:44', userEmail: 'asha@example.com', role: 'ASHA_WORKER', action: 'WATER_SAMPLE_SUBMITTED', ipAddress: '10.42.0.18', status: 'SUCCESS' },
      { id: 105, timestamp: '2026-08-09 16:02:11', userEmail: 'volunteer@example.com', role: 'COMMUNITY_VOLUNTEER', action: 'COMMUNITY_REPORT_FILED', ipAddress: '49.207.2.14', status: 'SUCCESS' },
    ]);
  }, []);

  const columns = [
    {
      header: 'Timestamp',
      accessor: (row: AuditLog) => <span className="font-mono text-xs text-slate-600">{row.timestamp}</span>,
    },
    {
      header: 'User Email',
      accessor: (row: AuditLog) => <span className="font-bold text-slate-900 text-xs">{row.userEmail}</span>,
    },
    {
      header: 'Role',
      accessor: (row: AuditLog) => (
        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase border border-blue-200">
          {row.role}
        </span>
      ),
    },
    {
      header: 'System Action',
      accessor: (row: AuditLog) => <span className="font-bold text-slate-800 text-xs">{row.action}</span>,
    },
    {
      header: 'IP Address',
      accessor: (row: AuditLog) => <span className="font-mono text-xs text-slate-500">{row.ipAddress}</span>,
    },
    {
      header: 'Status',
      accessor: (row: AuditLog) => (
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase border border-emerald-300">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="h-9 w-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[#002244]">System Audit Trail & Security Logs</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Immutable system event history, user access logs, data mutations, and security compliance audit.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <DataTable data={logs} columns={columns} isLoading={loading} emptyMessage="No audit logs recorded." />
      </div>
    </div>
  );
};
