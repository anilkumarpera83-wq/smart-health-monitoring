import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TelanganaRiskMap } from '../components/UI/TelanganaRiskMap';
import { TelanganaLogo } from '../components/UI/TelanganaLogo';
import { TelanganaRisingLogo } from '../components/UI/TelanganaRisingLogo';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Shield,
  Activity,
  Droplet,
  Bell,
  Cpu,
  MapPin,
  Users,
  BarChart2,
  TrendingUp,
  ArrowRight,
  User,
  Info,
  FileText,
  Home,
  CheckCircle,
  AlertTriangle,
  ClipboardList,
  Target,
  Eye,
  HeartPulse,
  Building2,
  Globe,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const LandingPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const getDashboardPath = () => {
    if (!isAuthenticated) return '/login';
    switch (userRole) {
      case 'ROLE_ADMIN': return '/admin/dashboard';
      case 'ROLE_HEALTH_OFFICER': return '/health-officer/dashboard';
      case 'ROLE_DOCTOR': return '/doctor/dashboard';
      case 'ROLE_ASHA_WORKER': return '/asha/dashboard';
      case 'ROLE_COMMUNITY_VOLUNTEER': return '/community/dashboard';
      default: return '/login';
    }
  };

  // Multi-line disease trend data
  const trendData = [
    { month: 'Dec 2024', Diarrheal: 700, Dengue: 450, Typhoid: 220, Malaria: 60 },
    { month: 'Jan 2025', Diarrheal: 800, Dengue: 510, Typhoid: 280, Malaria: 80 },
    { month: 'Feb 2025', Diarrheal: 740, Dengue: 430, Typhoid: 160, Malaria: 50 },
    { month: 'Mar 2025', Diarrheal: 850, Dengue: 570, Typhoid: 240, Malaria: 60 },
    { month: 'Apr 2025', Diarrheal: 820, Dengue: 500, Typhoid: 280, Malaria: 80 },
    { month: 'May 2025', Diarrheal: 855, Dengue: 530, Typhoid: 260, Malaria: 75 },
  ];

  const navTabs = [
    { name: t('navHome'), icon: Home, path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navDashboard'), path: getDashboardPath() },
    { name: 'Telangana Map', path: '/telangana-map' },
    { name: t('navReports'), path: '/reports' },
    { name: t('navAlerts'), path: '/alerts' },
    { name: t('navDiseaseInfo'), path: '/disease-info' },
    { name: t('navWaterQuality'), path: '/water-quality' },
    { name: t('navResources'), path: '/resources' },
    { name: t('navContact'), path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* 1. TOP HEADER BAR */}
      <div className="bg-[#002244] text-white px-4 py-1.5 text-xs font-medium border-b border-blue-900/40">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-200">
            <span className="font-bold text-white">{t('govName')}</span>
            <span className="text-slate-400">|</span>
            <span>{t('deptName')}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <a href="#main" className="hover:text-white transition-colors">Skip to Main Content</a>
            <span>|</span>
            <div className="flex items-center gap-1 font-mono font-semibold">
              <button className="hover:text-white px-1">A+</button>
              <button className="hover:text-white px-1">A</button>
              <button className="hover:text-white px-1">A-</button>
            </div>
            <span>|</span>

            {/* BILINGUAL LANGUAGE TOGGLE BUTTON */}
            <div className="flex items-center gap-1 bg-blue-900/60 rounded p-0.5 border border-blue-700/60">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === 'en' ? 'bg-white text-[#002244] shadow-xs' : 'text-slate-200 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === 'te' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-200 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER SECTION */}
      <header className="bg-white border-b border-slate-200 shadow-xs py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          {/* Dual Logos Section: Telangana Govt Seal & Telangana Rising Campaign Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* 1. Official Government of Telangana Emblem Seal */}
            <TelanganaLogo size={68} className="h-16 w-16" />

            {/* 2. Official Telangana Rising Campaign Badge */}
            <div className="hidden sm:block border-l border-slate-200 pl-4 sm:pl-6">
              <TelanganaRisingLogo size={58} className="h-14 w-auto" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#002244] tracking-tight leading-none uppercase">
                {t('appTitle')}
              </h1>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#003366] tracking-tight leading-snug uppercase">
                {t('appSubtitle')}
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {t('motto')}
              </p>
            </div>
          </div>

          {/* Right Partner Badges (Official NHM Logo & Mission Bhagiratha Logo) & Login Button */}
          <div className="flex items-center gap-4">
            {/* Official Mission Bhagiratha Logo Image */}
            <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-4">
              <img
                src="/mission_bhagiratha_logo.png"
                alt="Mission Bhagiratha - Safe & Clean Drinking Water To Every Household"
                className="h-14 w-auto object-contain drop-shadow-sm rounded bg-white p-0.5 border border-slate-200"
                title="Mission Bhagiratha - Safe & Clean Drinking Water To Every Household"
              />
            </div>

            {/* Official National Health Mission Logo Image */}
            <div className="hidden lg:flex items-center gap-2 border-l border-slate-200 pl-4">
              <img src="/nhm_logo.png" alt="National Health Mission - राष्ट्रीय स्वास्थ्य मिशन" className="h-12 w-auto object-contain drop-shadow-xs" />
            </div>

            {/* Digital India Badge */}
            <div className="hidden xl:flex items-center gap-2 border-l border-slate-200 pl-4">
              <div className="h-9 w-12 bg-sky-100 rounded border border-sky-300 flex items-center justify-center font-black text-sky-800 text-xs">
                Digital
              </div>
              <div className="text-left text-[10px]">
                <div className="font-extrabold text-slate-800">Digital India</div>
                <div className="text-slate-500">Power To Empower</div>
              </div>
            </div>

            {/* Main Login Button */}
            <Link
              to={getDashboardPath()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#003366] hover:bg-[#002244] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
            >
              <User className="h-4 w-4" />
              <span>{isAuthenticated ? t('navDashboard') : t('loginBtn')}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. NAVIGATION MENU TABS BAR */}
      <nav className="bg-[#003366] text-white shadow-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center">
          {navTabs.map((tab) => {
            const isActive = activeNav === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveNav(tab.name);
                  navigate(tab.path);
                }}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold transition-all border-b-4 ${
                  isActive
                    ? 'bg-white text-[#003366] border-[#003366] shadow-inner'
                    : 'text-slate-100 hover:bg-blue-800/80 hover:text-white border-transparent'
                }`}
              >
                {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main id="main" className="flex-1 space-y-6 pb-12">
        {/* 4. HERO BANNER SECTION (FEATURING REAL AERIAL HYDERABAD & CHARMINAR IMAGE) */}
        <section className="bg-gradient-to-r from-sky-100 via-blue-50 to-sky-100 border-b border-sky-200 py-10 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-black text-[#002244] tracking-tight leading-tight">
                  {t('heroTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl font-medium">
                  {t('heroSubtitle')}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/telangana-map"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#003366] hover:bg-[#002244] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-102"
                  >
                    <span>Open Telangana Map</span>
                    <MapPin className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#003366] text-[#003366] bg-white/80 hover:bg-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs"
                  >
                    <span>{t('learnMore')}</span>
                    <Info className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* REAL AERIAL HYDERABAD CHARMINAR PHOTO CARD WITH INTEGRATED TELANGANA RISK MAP */}
              <div className="lg:col-span-6 flex items-center justify-center relative">
                <div className="relative w-full max-w-xl h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                  <img
                    src="/hyderabad_charminar.jpg"
                    alt="Aerial view of Hyderabad and Charminar, Telangana"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/90 via-[#002244]/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-[#002244]/80 text-white px-3 py-1 rounded-full text-[10px] font-extrabold backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    <span>HYDERABAD & TELANGANA SURVEILLANCE ZONE</span>
                  </div>

                  <div className="absolute bottom-3 right-3 left-3 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-white/60 shadow-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-700" />
                      <div>
                        <div className="text-xs font-black text-[#002244] uppercase tracking-wide">
                          State Risk Surveillance Map
                        </div>
                        <div className="text-[11px] font-semibold text-slate-600">
                          33 Telangana Districts Interactive Level
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/telangana-map"
                      className="px-3 py-1.5 rounded-lg bg-[#003366] hover:bg-[#002244] text-white text-[10px] font-bold shadow-xs whitespace-nowrap"
                    >
                      Open Full Map →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANDATORY MEDICAL DISCLAIMER BANNER */}
        <div className="mx-auto max-w-7xl px-4">
          <DisclaimerBanner />
        </div>

        {/* 5. FULL 33 DISTRICT TELANGANA STATE RISK MAP SECTION */}
        <section className="mx-auto max-w-7xl px-4">
          <TelanganaRiskMap />
        </section>

        {/* 6. METRICS OVERVIEW CARDS ROW */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">{t('totalCases')}</span>
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600"><Users className="h-5 w-5" /></div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">12,458</div>
              <div className="mt-1 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> ↑ 8.4% {t('fromLastMonth')}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">{t('waterAlerts')}</span>
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><Droplet className="h-5 w-5" /></div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">342</div>
              <div className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> ↑ 12.7% {t('fromLastMonth')}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">{t('activeAlerts')}</span>
                <div className="rounded-lg bg-amber-50 p-2 text-amber-500"><AlertTriangle className="h-5 w-5" /></div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">78</div>
              <div className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> ↑ 15.3% {t('fromLastMonth')}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">{t('aiRiskScore')}</span>
                <div className="rounded-lg bg-purple-50 p-2 text-purple-600"><Cpu className="h-5 w-5" /></div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">76 <span className="text-xs font-bold text-slate-400">/100</span></div>
              <div className="mt-1 text-[11px] font-bold text-rose-600">High Risk Tiers</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Average Risk Score</span>
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><CheckCircle className="h-5 w-5" /></div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">38.5</div>
              <div className="mt-1 text-[11px] font-semibold text-emerald-600">
                Safe State Risk Benchmark
              </div>
            </div>
          </div>
        </section>

        {/* 7. MISSION BHAGIRATHA WATER SURVEILLANCE BANNER */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-sky-900 to-teal-900 text-white p-6 sm:p-8 shadow-xl border border-sky-500/30 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
              <img src="/mission_bhagiratha_logo.png" alt="Mission Bhagiratha Background" className="h-96 w-auto object-contain" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src="/mission_bhagiratha_logo.png"
                  alt="Mission Bhagiratha - Safe & Clean Drinking Water To Every Household"
                  className="h-24 sm:h-28 w-auto object-contain bg-white rounded-xl p-2 shadow-2xl border-2 border-amber-400 flex-shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 border border-amber-400/40">
                    <Droplet className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    Mission Bhagiratha Telemetry Integration
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    MISSION BHAGIRATHA
                  </h3>
                  <p className="text-sm font-bold text-sky-200 mt-0.5">
                    Safe & Clean Drinking Water To Every Household — Government of Telangana
                  </p>
                  <p className="text-xs text-slate-300 max-w-2xl mt-2 leading-relaxed">
                    Real-time pipeline purity monitoring, overhead reservoir water testing, and bacterial contamination early warning alerts integrated directly with SmartHealth Telangana surveillance network across 33 districts.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
                <Link
                  to="/water-quality"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <Droplet className="h-4 w-4" />
                  <span>Monitor Bhagiratha Water Quality →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. MIDDLE CONTENT ROW */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center justify-between">
                  <span>{t('diseaseTrend')}</span>
                </h3>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Line type="monotone" dataKey="Diarrheal" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Dengue" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Typhoid" stroke="#ea580c" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Malaria" stroke="#9333ea" strokeWidth={2.5} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3 text-right">
                <Link to="/reports" className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
                  {t('viewDetailedReport')} →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-slate-900">{t('recentAlerts')}</h3>
                  <Link to="/alerts" className="text-xs font-bold text-blue-700 hover:underline">{t('viewAllAlerts')}</Link>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white uppercase">
                        HIGH RISK
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">10:30 AM Today</span>
                    </div>
                    <p className="font-bold text-slate-900">Water contamination detected</p>
                    <p className="text-[11px] text-slate-600">Madharam Village, Siddipet District</p>
                  </div>

                  <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-white uppercase">
                        MEDIUM RISK
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">09:15 AM Today</span>
                    </div>
                    <p className="font-bold text-slate-900">Increase in fever cases reported</p>
                    <p className="text-[11px] text-slate-600">Laxmidevipally Village, Warangal</p>
                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-emerald-600 text-white uppercase">
                        LOW RISK
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Yesterday 04:45 PM</span>
                    </div>
                    <p className="font-bold text-slate-900">Water quality parameters warning</p>
                    <p className="text-[11px] text-slate-600">Nandigama Village, Nalgonda</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3 text-right">
                <Link to="/alerts" className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
                  {t('viewAllAlerts')} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. BOTTOM ACTION CARDS GRID */}
        <section className="mx-auto max-w-7xl px-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <Link
              to="/health-cases"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all hover:border-blue-300 group"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('actionHealthCases')}</h4>
                <p className="text-[10px] text-slate-500">{t('subReportTrack')}</p>
              </div>
            </Link>

            <Link
              to="/water-quality"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all hover:border-teal-300 group"
            >
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Droplet className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('actionWaterQuality')}</h4>
                <p className="text-[10px] text-slate-500">{t('subMonitorAnalyze')}</p>
              </div>
            </Link>

            <Link
              to="/alerts"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all hover:border-purple-300 group"
            >
              <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('actionAlerts')}</h4>
                <p className="text-[10px] text-slate-500">{t('subViewManage')}</p>
              </div>
            </Link>

            <Link
              to="/ai-predictions"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 group"
            >
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('actionAIPredictions')}</h4>
                <p className="text-[10px] text-slate-500">{t('subRiskAssessment')}</p>
              </div>
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all hover:border-amber-300 group"
            >
              <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('actionReports')}</h4>
                <p className="text-[10px] text-slate-500">{t('subAnalyticsInsights')}</p>
              </div>
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all hover:border-rose-300 group"
            >
              <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('actionCommunity')}</h4>
                <p className="text-[10px] text-slate-500">{t('subAwarenessSupport')}</p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#002244] text-slate-300 py-8 text-xs border-t-4 border-[#003366]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <TelanganaLogo size={40} className="h-10 w-10" />
            <div>
              <p className="font-extrabold text-white">{t('govName')}</p>
              <p className="text-[11px] text-slate-400">{t('deptName')}</p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} {t('govName')}. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
