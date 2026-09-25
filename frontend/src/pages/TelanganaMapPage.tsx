import React from 'react';
import { TelanganaRiskMap } from '../components/UI/TelanganaRiskMap';
import { TelanganaLogo } from '../components/UI/TelanganaLogo';
import { TelanganaRisingLogo } from '../components/UI/TelanganaRisingLogo';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import { MapPin, Shield, Layers, Activity } from 'lucide-react';

export const TelanganaMapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 space-y-6 font-sans">
      {/* Top Banner */}
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-4">
          <TelanganaLogo size={56} className="h-14 w-14" />
          <TelanganaRisingLogo size={48} className="h-12 w-auto" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              Telangana State Health Risk Surveillance Map
            </h1>
            <p className="text-xs text-sky-400 font-semibold">
              Real-time Epidemiological Mapping & Water Quality Risk Tiers across 33 Districts
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <DisclaimerBanner />
      </div>

      {/* Main Interactive 33 District Map Component */}
      <div className="mx-auto max-w-7xl">
        <TelanganaRiskMap />
      </div>
    </div>
  );
};
