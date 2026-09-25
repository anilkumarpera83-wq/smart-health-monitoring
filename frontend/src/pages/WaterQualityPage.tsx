import React, { useState, useEffect } from 'react';
import { waterService } from '../services/waterService';
import { WaterQualityRecord } from '../types';
import { DataTable, Column } from '../components/UI/DataTable';
import { RiskBadge } from '../components/UI/RiskBadge';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import { Droplet } from 'lucide-react';

export const WaterQualityPage: React.FC = () => {
  const [records, setRecords] = useState<WaterQualityRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadRecords = (p: number) => {
    setLoading(true);
    waterService.getAllRecords(p, 10)
      .then((res) => {
        setRecords(res.content);
        setTotal(res.totalElements);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRecords(page);
  }, [page]);

  const columns: Column<WaterQualityRecord>[] = [
    { header: 'Sample Code', accessor: (r) => <span className="font-mono font-bold text-slate-900">{r.sampleCode}</span> },
    { header: 'Water Body / Source', accessor: (r) => r.waterSource },
    { header: 'Village', accessor: (r) => r.villageName || '-' },
    { header: 'District', accessor: (r) => r.districtName || '-' },
    { header: 'pH', accessor: (r) => <span className={r.ph < 6.5 || r.ph > 8.5 ? 'font-bold text-rose-600' : ''}>{r.ph}</span> },
    { header: 'Turbidity (NTU)', accessor: (r) => <span className={r.turbidity > 5.0 ? 'font-bold text-rose-600' : ''}>{r.turbidity}</span> },
    { header: 'E. Coli', accessor: (r) => <span className={r.eColiStatus === 'PRESENT' || r.eColiStatus === 'HIGH' ? 'font-bold text-rose-600' : 'text-emerald-700'}>{r.eColiStatus}</span> },
    { header: 'Risk Assessment', accessor: (r) => <RiskBadge level={r.riskLevel} size="sm" /> },
    { header: 'Collection Date', accessor: (r) => r.collectionDate },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950 via-sky-900 to-teal-900 text-white p-5 rounded-2xl shadow-lg border border-sky-600/30">
        <div className="flex items-center gap-4">
          <img
            src="/mission_bhagiratha_logo.png"
            alt="Mission Bhagiratha - Safe & Clean Drinking Water To Every Household"
            className="h-16 w-auto object-contain bg-white rounded-lg p-1 shadow-md border border-amber-400 flex-shrink-0"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-1 border border-amber-400/40">
              <Droplet className="h-3 w-3 text-amber-400 fill-amber-400" />
              Mission Bhagiratha Piped Water Telemetry
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Mission Bhagiratha Water Quality & Contamination Registry
            </h1>
            <p className="text-xs text-sky-200 mt-0.5">
              Safe & Clean Drinking Water To Every Household — Tap water, reservoir, & borewell surveillance across 33 Telangana districts.
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBanner />

      <DataTable
        columns={columns}
        data={records}
        isLoading={loading}
        totalItems={total}
        currentPage={page}
        onPageChange={setPage}
        searchPlaceholder="Search sample code, water source, village..."
      />
    </div>
  );
};
