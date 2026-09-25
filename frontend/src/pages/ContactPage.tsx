import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Mail,
  MapPin,
  Building,
  ArrowLeft,
  Send,
  CheckCircle2,
  Clock,
  Globe,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', district: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Header Bar */}
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

      {/* Main Banner */}
      <header className="bg-[#003366] text-white py-8 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-800/80 px-3 py-1 text-xs font-bold text-sky-200 mb-2 border border-sky-400/30">
            <Building className="h-3.5 w-3.5" /> Public Contact & Directory
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            Contact Us & Department Directory
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-sky-100 max-w-3xl font-medium">
            Reach the Public Health Directorate, District Health Officers (DHO), or submit public queries regarding water quality and disease monitoring in your area.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Directory Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-[#002244] border-b border-slate-100 pb-3">
                Directorate of Public Health
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block font-bold text-slate-900">Headquarters Address</strong>
                    <span className="text-slate-600 leading-relaxed">
                      Directorate of Public Health and Family Welfare, Koti, Hyderabad, Telangana - 500095
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneCall className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <strong className="block font-bold text-slate-900">24/7 Control Room Line</strong>
                    <span className="text-slate-600 font-mono font-bold">+91 040-24651119</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong className="block font-bold text-slate-900">Official Email</strong>
                    <span className="text-slate-600">dph-surveillance@telangana.gov.in</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <div>
                    <strong className="block font-bold text-slate-900">Working Hours</strong>
                    <span className="text-slate-600">Monday - Saturday: 09:30 AM to 05:30 PM (Control Room 24/7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Helplines */}
            <div className="rounded-2xl bg-[#002244] text-white p-6 shadow-md space-y-3">
              <h3 className="text-sm font-extrabold uppercase text-sky-300">Toll-Free Emergency Services</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-blue-900/60 p-3 border border-blue-700/50">
                  <div className="text-[10px] text-slate-300 font-bold uppercase">Medical Emergency</div>
                  <div className="text-xl font-black text-white mt-1">108</div>
                </div>
                <div className="rounded-xl bg-blue-900/60 p-3 border border-blue-700/50">
                  <div className="text-[10px] text-slate-300 font-bold uppercase">Health Helpline</div>
                  <div className="text-xl font-black text-white mt-1">104</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Public Query Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-extrabold text-[#002244] mb-2">Submit Public Query or Water Issue</h2>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Submit details regarding water contamination, illness reports, or queries to the district health officer.
              </p>

              {submitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-extrabold text-emerald-900">Query Submitted Successfully</h3>
                  <p className="text-xs text-emerald-700 font-medium">
                    Your reference ticket has been logged and assigned to the District Health Officer for review.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">District Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        placeholder="e.g. Hyderabad, Karimnagar, Siddipet"
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Message / Report Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the water quality issue or health observation in your area..."
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-600 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#003366] hover:bg-[#002244] px-6 py-3 text-xs font-bold text-white shadow-md transition-all"
                  >
                    <Send className="h-4 w-4" /> Submit Official Query
                  </button>
                </form>
              )}
            </div>
          </div>
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
