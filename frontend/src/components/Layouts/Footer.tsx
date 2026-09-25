import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 py-10 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <Shield className="h-5 w-5 text-health-teal-400" />
              Smart Health Monitoring System (Telangana)
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              A modern public-health decision support system for water-borne disease surveillance, environmental contamination tracking, and AI-driven outbreak risk prediction across rural communities.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-white transition-colors">Public Portal Home</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Official Portal Login</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Register Account</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Emergency Contact</h5>
            <div className="text-xs space-y-1 text-slate-400">
              <p>State Health Helpline: <span className="font-semibold text-white">104</span></p>
              <p>Disaster Response: <span className="font-semibold text-white">112</span></p>
              <p>Support: <span className="font-semibold text-white">support@health.telangana.gov.in</span></p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Government of Telangana - Department of Public Health & Family Welfare. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
