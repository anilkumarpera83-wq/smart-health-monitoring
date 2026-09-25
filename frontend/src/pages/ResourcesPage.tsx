import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Download,
  BookOpen,
  ArrowLeft,
  Shield,
  CheckCircle,
  FileCheck,
  Building,
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const resources = [
    {
      title: 'Water Quality Testing & Sampling SOP Manual (2025 Edition)',
      category: 'Standard Operating Procedures',
      description: 'Comprehensive guidelines for field collection, pH testing, turbidity measurement (NTU), TDS calibration, and bacterial culture transportation.',
      format: 'PDF',
      size: '2.4 MB',
    },
    {
      title: 'ASHA Worker Ground Health Surveillance Field Handbook',
      category: 'Field Training Manual',
      description: 'Step-by-step instructions for house-to-house screening, registering suspected diarrhea/typhoid cases, and submitting offline drafts.',
      format: 'PDF',
      size: '4.1 MB',
    },
    {
      title: 'Mission Bhagiratha Water Chlorination & Super-Chlorination Protocol',
      category: 'Technical Protocol',
      description: 'Recommended bleaching powder ratios, residual chlorine testing procedures, and emergency well disinfection protocols for flood seasons.',
      format: 'PDF',
      size: '1.8 MB',
    },
    {
      title: 'Epidemiological Outbreak Containment Standard Operating Procedure',
      category: 'Public Health Policy',
      description: 'Official protocol for District Health Officers and PHC Medical Officers regarding rapid response team deployment and medical camp setup.',
      format: 'PDF',
      size: '3.2 MB',
    },
    {
      title: 'Public Health Community Awareness Leaflet (English & Telugu)',
      category: 'IEC Material',
      description: 'Printable posters and brochures explaining safe boiling practices, ORS preparation, and reporting water contamination.',
      format: 'ZIP',
      size: '8.5 MB',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Header Bar */}
      <div className="bg-[#002244] text-white px-4 py-2 text-xs font-medium border-b border-blue-900/40">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Government of Telangana</span>
            <span className="text-slate-400">|</span>
            <span>Public Health Technical Resources</span>
          </div>
          <Link to="/" className="text-sky-300 hover:text-white flex items-center gap-1 font-semibold">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Main Banner */}
      <header className="bg-[#003366] text-white py-8 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-800/80 px-3 py-1 text-xs font-bold text-sky-200 mb-2 border border-sky-400/30">
            <BookOpen className="h-3.5 w-3.5" /> Public Health Library
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            Resources & Downloads Directory
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-sky-100 max-w-3xl font-medium">
            Download official SOPs, water quality protocols, ASHA training field handbooks, and public health advisories issued by the Department of Health, Medical & Family Welfare.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase border border-blue-200">
                    {r.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{r.format} • {r.size}</span>
                </div>

                <h3 className="text-sm font-extrabold text-[#002244] leading-snug">{r.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{r.description}</p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-3">
                <button
                  onClick={() => alert(`Downloading official resource: ${r.title}`)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#003366] hover:bg-[#002244] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-xs"
                >
                  <Download className="h-4 w-4" /> Download Document
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#002244] text-slate-300 py-6 text-xs border-t-4 border-[#003366]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-extrabold text-white">Government of Telangana</p>
            <p className="text-[11px] text-slate-400">Department of Health, Medical & Family Welfare</p>
          </div>
          <p className="text-[11px] text-slate-400">© {new Date().getFullYear()} Government of Telangana. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
