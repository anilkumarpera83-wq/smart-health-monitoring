import React, { useState, useEffect } from 'react';
import { healthService } from '../services/healthService';
import { HealthCase } from '../types';
import { DataTable, Column } from '../components/UI/DataTable';
import { RiskBadge } from '../components/UI/RiskBadge';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import { SkeletonLoader } from '../components/UI/SkeletonLoader';
import { Activity } from 'lucide-react';

export const HealthCasesPage: React.FC = () => {
  const [cases, setCases] = useState<HealthCase[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCases = (p: number) => {
    setLoading(true);
    healthService.getAllCases(p, 10)
      .then((res) => {
        setCases(res.content);
        setTotal(res.totalElements);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCases(page);
  }, [page]);

  const columns: Column<HealthCase>[] = [
    { header: 'Case Number', accessor: (r) => <span className="font-mono font-bold text-slate-900">{r.caseNumber}</span> },
    { header: 'Age / Gender', accessor: (r) => `${r.age} yrs (${r.gender})` },
    { header: 'Village', accessor: (r) => r.villageName || '-' },
    { header: 'Mandal', accessor: (r) => r.mandalName || '-' },
    { header: 'District', accessor: (r) => r.districtName || '-' },
    { header: 'Suspected Disease', accessor: (r) => <span className="font-semibold text-slate-900">{r.suspectedDiseaseName}</span> },
    { header: 'Severity', accessor: (r) => <RiskBadge level={r.severity} size="sm" /> },
    { header: 'Reporting Date', accessor: (r) => r.reportingDate },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Disease Case Surveillance Registry
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Statewide health cases recorded across rural Telangana.
        </p>
      </div>

      <DisclaimerBanner />

      <DataTable
        columns={columns}
        data={cases}
        isLoading={loading}
        totalItems={total}
        currentPage={page}
        onPageChange={setPage}
        searchPlaceholder="Search case code, disease, village..."
      />
    </div>
  );
};
