import React, { useState } from 'react';
import { useOffline } from '../../context/OfflineContext';
import { healthService } from '../../services/healthService';
import { LocationCascadeSelect } from '../../components/Forms/LocationCascadeSelect';
import { DisclaimerBanner } from '../../components/UI/DisclaimerBanner';
import { ClipboardList, Save, Send, Wifi, WifiOff, CheckCircle2 } from 'lucide-react';

export const AshaDashboard: React.FC = () => {
  const { isOnline, drafts, saveDraft, removeDraft } = useOffline();

  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState('Female');
  const [severity, setSeverity] = useState('HIGH');
  const [waterSource, setWaterSource] = useState('Borewell');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<any>(null);

  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage('');

    if (!location) {
      alert('Please select District, Mandal, and Village.');
      return;
    }

    const payload = {
      age,
      gender,
      districtId: location.districtId,
      mandalId: location.mandalId,
      villageId: location.villageId,
      severity,
      waterSource,
      notes,
    };

    if (!isOnline) {
      saveDraft('HEALTH_CASE', payload);
      setSubmittedMessage('Saved locally as offline draft! Will sync automatically when reconnected.');
      return;
    }

    try {
      await healthService.createCase(payload);
      setSubmittedMessage('Health case reported successfully to central server!');
      setNotes('');
    } catch (err) {
      saveDraft('HEALTH_CASE', payload);
      setSubmittedMessage('Server unreachable. Saved as offline draft for retry.');
    }
  };

  const handleSyncDraft = async (draft: any) => {
    try {
      await healthService.createCase(draft.data);
      removeDraft(draft.id);
      alert('Draft synced successfully!');
    } catch (err) {
      alert('Sync failed. Check connection.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Mobile Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-health-blue-900 to-health-blue-800 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-health-teal-300 uppercase tracking-widest block">
              ASHA Field Operations Mobile App
            </span>
            <h1 className="text-xl sm:text-2xl font-black mt-1">Village Case Data Entry</h1>
          </div>
          <div className="rounded-full bg-white/10 p-3 backdrop-blur-md">
            <ClipboardList className="h-6 w-6 text-health-teal-400" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-semibold">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-emerald-400" /> 🟢 Network Online
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-amber-400 animate-pulse" /> 🟠 Offline Field Mode
              </>
            )}
          </span>
          <span className="font-bold text-amber-300">{drafts.length} Local Drafts Pending</span>
        </div>
      </div>

      <DisclaimerBanner />

      {submittedMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{submittedMessage}</span>
        </div>
      )}

      {/* Offline Pending Drafts List */}
      {drafts.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <h3 className="text-xs font-bold text-amber-900 mb-2">Pending Offline Drafts ({drafts.length})</h3>
          <div className="space-y-2">
            {drafts.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg bg-white p-3 text-xs border border-amber-200">
                <div>
                  <span className="font-bold text-slate-800">Draft #{d.id.slice(-4)}</span>
                  <span className="text-slate-500 ml-2">({d.timestamp})</span>
                </div>
                <button
                  onClick={() => handleSyncDraft(d)}
                  disabled={!isOnline}
                  className="rounded bg-health-blue-700 px-3 py-1 text-xs font-bold text-white hover:bg-health-blue-800 disabled:opacity-50"
                >
                  Sync Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case Entry Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Patient Case Form</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Age *</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Symptom Severity *</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800"
              >
                <option value="MEDIUM">MEDIUM (Fever / Vomiting)</option>
                <option value="HIGH">HIGH (Severe Diarrhea)</option>
                <option value="CRITICAL">CRITICAL (Dehydration / Unconscious)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Water Source</label>
              <input
                type="text"
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                placeholder="e.g. Village Public Borewell"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800"
              />
            </div>
          </div>

          <LocationCascadeSelect onLocationChange={setLocation} required />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Field Observations</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Describe symptoms, family background, or water contamination signs."
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-health-blue-700 py-3 text-xs font-bold text-white hover:bg-health-blue-800 shadow-md flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isOnline ? 'Submit Case Report' : 'Save Offline Draft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
