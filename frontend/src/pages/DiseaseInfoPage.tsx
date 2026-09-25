import React from 'react';
import { Link } from 'react-router-dom';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import {
  ShieldAlert,
  ArrowLeft,
  Activity,
  Droplet,
  CheckCircle2,
  AlertTriangle,
  Info,
  BookOpen,
  PhoneCall,
  HeartPulse,
} from 'lucide-react';

export const DiseaseInfoPage: React.FC = () => {
  const diseases = [
    {
      id: 'cholera',
      name: 'Cholera',
      causativeAgent: 'Vibrio cholerae (Bacterium)',
      severity: 'CRITICAL',
      transmission: 'Ingestion of food or water contaminated with Vibrio cholerae bacteria from human fecal waste.',
      incubation: '2 hours to 5 days',
      symptoms: ['Profuse watery diarrhea ("rice-water" stools)', 'Severe vomiting & emesis', 'Rapid dehydration & electrolyte loss', 'Muscle cramps & low blood pressure'],
      prevention: ['Boil drinking water or use certified chlorination', 'Ensure sanitary disposal of human waste', 'Maintain strict hand hygiene with soap', 'Administer Oral Rehydration Salts (ORS) immediately'],
      medicalProtocol: 'Immediate oral/IV rehydration with ORS and Ringer\'s Lactate. Antibiotic treatment (Doxycycline/Azithromycin) for severe cases under medical supervision.',
    },
    {
      id: 'typhoid',
      name: 'Typhoid Fever',
      causativeAgent: 'Salmonella enterica serovar Typhi (Bacterium)',
      severity: 'HIGH',
      transmission: 'Consuming contaminated drinking water, unwashed raw produce, or food prepared by an asymptomatic carrier.',
      incubation: '6 to 30 days',
      symptoms: ['Sustained high fever (up to 104°F)', 'Severe headache & malaise', 'Abdominal pain & rose-colored spot rash', 'Constipation or diarrhea, intestinal inflammation'],
      prevention: ['Use safe, disinfected drinking water', 'Ensure Typhoid Conjugate Vaccine (TCV) immunization', 'Thorough cooking of food and boiling of milk', 'Regular hand washing before meals'],
      medicalProtocol: 'Empiric antibiotic therapy (Ceftriaxone or Azithromycin) following blood culture confirmation. Continuous hydration and temperature monitoring.',
    },
    {
      id: 'hepatitis-a',
      name: 'Hepatitis A',
      causativeAgent: 'Hepatitis A Virus (HAV)',
      severity: 'MEDIUM',
      transmission: 'Fecal-oral route via ingestion of contaminated water supplies, shellfish from infected waters, or close contact with infected individuals.',
      incubation: '14 to 28 days',
      symptoms: ['Jaundice (yellowing of skin and sclera)', 'Dark tea-colored urine & pale stools', 'Fatigue, nausea, & loss of appetite', 'Right upper quadrant abdominal pain'],
      prevention: ['Hepatitis A vaccination', 'Sanitation of municipal and rural water sources', 'Avoid untreated surface water consumption', 'Proper personal hygiene practices'],
      medicalProtocol: 'Supportive care focusing on adequate nutrition, hydration, and avoidance of hepatotoxic medications. Hospitalization for acute liver injury signs.',
    },
    {
      id: 'diarrheal-disease',
      name: 'Acute Diarrheal Disease',
      causativeAgent: 'Rotavirus, E. coli, Giardia, or Cryptosporidium',
      severity: 'HIGH',
      transmission: 'Waterborne transmission of pathogenic strains through untreated well water, sewage contamination, or poor food hygiene.',
      incubation: '12 hours to 4 days',
      symptoms: ['Frequent loose or liquid stools (>3 times/day)', 'Abdominal cramping & bloating', 'Nausea, fever, and lethargy', 'Dry mouth & sunken eyes (Dehydration)'],
      prevention: ['Boil drinking water for at least 1 minute', 'Promote exclusive breastfeeding for infants under 6 months', 'Use clean ORS packets mixed in safe water', 'Community water pipeline testing'],
      medicalProtocol: 'Prompt ORS therapy and Zinc supplementation for children. Target anti-microbial treatment if bacterial/protozoal origin confirmed.',
    },
    {
      id: 'gastroenteritis',
      name: 'Acute Gastroenteritis',
      causativeAgent: 'Norovirus, Adenovirus, or bacterial pathogens',
      severity: 'MEDIUM',
      transmission: 'Contaminated surface water runoff into open borewells or unchlorinated overhead storage tanks.',
      incubation: '24 to 48 hours',
      symptoms: ['Nausea & projectile vomiting', 'Watery non-bloody diarrhea', 'Low-grade fever & chills', 'Abdominal spasms'],
      prevention: ['Super-chlorination of community borewells', 'Protect open water sources from animal access', 'Boil all household drinking water', 'Proper food storage'],
      medicalProtocol: 'Fluid replacement, anti-emetics if indicated, and clinical monitoring for vulnerable pediatric and elderly demographics.',
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
            <span>Public Health & Disease Control Directory</span>
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
            <BookOpen className="h-3.5 w-3.5" /> Epidemiological Knowledge Base
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            Water-Borne Disease Information Guidelines
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-sky-100 max-w-3xl font-medium">
            Official clinical descriptions, transmission routes, preventive protocols, and medical management guidelines for water-borne pathogens monitored in Telangana State.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <DisclaimerBanner />

        {/* Emergency Helpline Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 text-white p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase">Telangana Public Health Emergency Helplines</h3>
              <p className="text-xs text-rose-100 font-medium">24/7 Toll-Free Medical Assistance & Outbreak Reporting</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold font-mono">
            <span className="bg-white text-rose-800 px-3 py-1.5 rounded-lg shadow-xs">🚑 108 Emergency</span>
            <span className="bg-white text-rose-800 px-3 py-1.5 rounded-lg shadow-xs">🩺 104 Health Helpline</span>
          </div>
        </div>

        {/* Disease Cards Grid */}
        <div className="space-y-6">
          {diseases.map((d) => (
            <div key={d.id} id={d.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-[#002244]">{d.name}</h2>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      d.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-300' :
                      d.severity === 'HIGH' ? 'bg-orange-100 text-orange-700 border border-orange-300' :
                      'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    }`}>
                      {d.severity} SEVERITY
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Agent: {d.causativeAgent}</p>
                </div>
                <div className="text-right text-xs text-slate-500 font-medium">
                  Incubation Period: <strong className="text-slate-800">{d.incubation}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5 text-xs">
                      <Droplet className="h-4 w-4 text-blue-600" /> Mode of Transmission
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{d.transmission}</p>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5 text-xs">
                      <Activity className="h-4 w-4 text-rose-600" /> Clinical Symptoms
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium">
                      {d.symptoms.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Prevention & Sanitation Protocols
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium">
                      {d.prevention.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-3">
                    <h3 className="font-extrabold text-blue-900 mb-1 flex items-center gap-1.5 text-xs">
                      <HeartPulse className="h-4 w-4 text-blue-700" /> Standard Medical Protocol
                    </h3>
                    <p className="text-blue-800 leading-relaxed text-[11px] font-medium">{d.medicalProtocol}</p>
                  </div>
                </div>
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
