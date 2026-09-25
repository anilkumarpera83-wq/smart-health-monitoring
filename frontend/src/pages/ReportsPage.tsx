import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import { SkeletonLoader } from '../components/UI/SkeletonLoader';
import { FileText, Download, Printer, Activity, Droplet } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [healthReport, setHealthReport] = useState<any>(null);
  const [waterReport, setWaterReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      reportService.getHealthReport(),
      reportService.getWaterReport()
    ]).then(([h, w]) => {
      setHealthReport(h);
      setWaterReport(w);
    }).finally(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <SkeletonLoader rows={6} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Surveillance Reports & CSV Exports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official executive disease surveillance reports and raw dataset downloads.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
        >
          <Printer className="h-4 w-4" /> Print Document
        </button>
      </div>

      <DisclaimerBanner />

      {/* CSV Export Action Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-health-blue-50 text-health-blue-700 flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Health Cases CSV Dataset</h4>
              <p className="text-[11px] text-slate-500">Includes age, gender, location, disease & severity</p>
            </div>
          </div>
          <button
            onClick={() => reportService.downloadHealthCSV()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-health-blue-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-health-blue-800 shadow-xs"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-health-teal-50 text-health-teal-700 flex items-center justify-center">
              <Droplet className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Water Quality CSV Dataset</h4>
              <p className="text-[11px] text-slate-500">Includes pH, turbidity, E. coli & risk assessments</p>
            </div>
          </div>
          <button
            onClick={() => reportService.downloadWaterCSV()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-health-teal-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-health-teal-700 shadow-xs"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
        </div>
      </div>

      {/* Health Executive Summary Report */}
      {healthReport && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-4 flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold text-health-blue-700 uppercase tracking-widest block">
                Official Health Surveillance Report
              </span>
              <h3 className="text-lg font-bold text-slate-900">{healthReport.reportTitle}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Generated: {healthReport.generatedDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center bg-slate-50 p-4 rounded-xl mb-6">
            <div>
              <span className="text-[11px] text-slate-500 block">Total Surveillance Cases</span>
              <span className="text-xl font-black text-slate-900">{healthReport.totalCasesCount}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">High Severity Cases</span>
              <span className="text-xl font-black text-rose-600">{healthReport.totalHighSeverityCases}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Primary Disease</span>
              <span className="text-xl font-black text-health-blue-700">{healthReport.topDisease}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase border-b">
                <tr>
                  <th className="p-2.5">Case Code</th>
                  <th className="p-2.5">Location</th>
                  <th className="p-2.5">Disease</th>
                  <th className="p-2.5">Severity</th>
                  <th className="p-2.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {healthReport.cases?.map((c: any) => (
                  <tr key={c.id}>
                    <td className="p-2.5 font-mono font-bold">{c.caseNumber}</td>
                    <td className="p-2.5">{c.villageName}, {c.districtName}</td>
                    <td className="p-2.5 font-semibold">{c.suspectedDiseaseName}</td>
                    <td className="p-2.5 font-bold text-rose-600">{c.severity}</td>
                    <td className="p-2.5 text-slate-500">{c.reportingDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
