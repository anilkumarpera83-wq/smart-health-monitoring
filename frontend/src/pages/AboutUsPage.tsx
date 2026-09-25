import React from 'react';
import { Link } from 'react-router-dom';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import {
  Shield,
  Activity,
  Droplet,
  Bell,
  Cpu,
  Users,
  Award,
  CheckCircle,
  ArrowLeft,
  Building2,
  FileText,
  Target,
  Eye,
  Globe,
  HeartPulse,
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="bg-[#002244] text-white px-4 py-2 text-xs font-medium border-b border-blue-900/40">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Government of Telangana</span>
            <span className="text-slate-400">|</span>
            <span>Department of Health, Medical & Family Welfare</span>
          </div>
          <Link to="/" className="text-sky-300 hover:text-white flex items-center gap-1 font-semibold">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-[#003366] text-white py-10 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-800/80 px-3 py-1 text-xs font-bold text-sky-200 mb-3 border border-sky-400/30">
              <Building2 className="h-3.5 w-3.5" /> Official Public Health Surveillance Initiative
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              About The System
            </h1>
            <p className="mt-2 text-sm text-sky-100 max-w-2xl font-medium">
              Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases in Telangana State.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-emerald-700 p-1 flex items-center justify-center text-white font-black shadow-md border-2 border-emerald-400">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M 30 65 L 50 30 L 70 65 Z" fill="currentColor" />
                <circle cx="50" cy="45" r="6" fill="#fbbf24" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <DisclaimerBanner />

        {/* 1. VISION & MISSION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#002244] mb-2">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              To safeguard all rural and urban communities across Telangana from preventable water-borne disease outbreaks (Cholera, Typhoid, Diarrhea, Hepatitis A, Gastroenteritis) by integrating ground-level ASHA health reporting, continuous water quality surveillance, and AI predictive risk modeling.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#002244] mb-2">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              A state-wide public health ecosystem with zero preventable deaths from water-borne epidemics. Achieving rapid containment within hours of risk detection through automated alerts to District Health Officers, Medical Officers, and PHC teams in all 33 Telangana districts.
            </p>
          </div>
        </div>

        {/* 2. SYSTEM OVERVIEW & WHY IT MATTERS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-extrabold text-[#002244] mb-4 flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-rose-600" />
            <span>Why Smart Health Surveillance Matters</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
            Water-borne diseases remain a primary public health threat in rural and peri-urban habitations during monsoon seasons and post-flood scenarios. Traditional surveillance relies on lagging hospital admission logs, often delaying emergency interventions by 7 to 14 days. This platform bridges the gap by linking <strong>real-time water quality metrics</strong> (pH, Turbidity, TDS, Bacterial contamination) directly with <strong>symptomatic case reports</strong> logged by frontline ASHA workers.
          </p>

          {/* 4 CORE PILLARS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">ASHA Frontline Reporting</h3>
              <p className="text-[11px] text-slate-600">Mobile-first offline draft logging for household symptom screening and case tracking.</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="h-10 w-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Droplet className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Water Quality Labs</h3>
              <p className="text-[11px] text-slate-600">Continuous sampling from borewells, overhead tanks, and handpumps for coliform & turbidity.</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">AI Early Warning Engine</h3>
              <p className="text-[11px] text-slate-600">Scikit-Learn ML classification calculating village-level outbreak probability (0-100 risk score).</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Bell className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Automated Action Alerts</h3>
              <p className="text-[11px] text-slate-600">Direct notifications to District Health Officers & Medical Doctors for rapid containment.</p>
            </div>
          </div>
        </section>

        {/* 3. COVERAGE STATISTICS */}
        <section className="rounded-2xl bg-[#002244] text-white p-6 sm:p-8 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-black tracking-tight text-white uppercase">State-Wide Operational Reach</h2>
            <p className="text-xs text-sky-200 mt-1 font-medium">Covering all 33 Districts, Mandals, and Habitations across Telangana State</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-blue-800/60 last:border-0 p-2">
              <div className="text-3xl sm:text-4xl font-black text-sky-300">33</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Districts Monitored</div>
            </div>
            <div className="border-r border-blue-800/60 last:border-0 p-2">
              <div className="text-3xl sm:text-4xl font-black text-emerald-300">1,200+</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Mandals & Villages</div>
            </div>
            <div className="border-r border-blue-800/60 last:border-0 p-2">
              <div className="text-3xl sm:text-4xl font-black text-amber-300">24/7</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Real-time Surveillance</div>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-black text-purple-300">99.4%</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Early Warning Accuracy</div>
            </div>
          </div>
        </section>

        {/* 4. INSTITUTIONAL STAKEHOLDERS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-extrabold text-[#002244] mb-6 text-center">
            Collaborating Departments & Key Stakeholders
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 p-5 text-center bg-slate-50/50">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-3 font-black text-sm">
                HMFW
              </div>
              <h3 className="text-sm font-bold text-slate-900">Health, Medical & Family Welfare</h3>
              <p className="text-xs text-slate-500 mt-1">Overseeing state-wide epidemiological surveillance, PHC medical camps, and health advisories.</p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 text-center bg-slate-50/50">
              <div className="h-12 w-12 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center mx-auto mb-3 font-black text-sm">
                NHM
              </div>
              <h3 className="text-sm font-bold text-slate-900">National Health Mission</h3>
              <p className="text-xs text-slate-500 mt-1">Empowering ASHA workers and community health volunteers with mobile health tools.</p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 text-center bg-slate-50/50">
              <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-3 font-black text-sm">
                RWS
              </div>
              <h3 className="text-sm font-bold text-slate-900">Mission Bhagiratha & Rural Water Supply</h3>
              <p className="text-xs text-slate-500 mt-1">Conducting water quality testing and pipeline chlorination across rural habitations.</p>
            </div>
          </div>
        </section>
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
