import React, { useState } from 'react';
import { waterService } from '../../services/waterService';
import { LocationCascadeSelect } from '../../components/Forms/LocationCascadeSelect';
import { DisclaimerBanner } from '../../components/UI/DisclaimerBanner';
import { Droplet, Send, CheckCircle2 } from 'lucide-react';

export const CommunityDashboard: React.FC = () => {
  const [waterSource, setWaterSource] = useState('Public Borewell #2');
  const [ph, setPh] = useState<number>(7.2);
  const [turbidity, setTurbidity] = useState<number>(4.5);
  const [bacterial, setBacterial] = useState<boolean>(false);
  const [eColi, setEColi] = useState<string>('ABSENT');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<any>(null);

  const [message, setMessage] = useState('');

  const handleSubmitWater = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!location) {
      alert('Please select District, Mandal, and Village.');
      return;
    }

    try {
      await waterService.submitRecord({
        districtId: location.districtId,
        mandalId: location.mandalId,
        villageId: location.villageId,
        waterSource,
        ph,
        turbidity,
        bacterialContamination: bacterial,
        eColiStatus: eColi,
        notes,
      });

      setMessage('Water sample reading submitted successfully!');
    } catch (err) {
      alert('Submission failed.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Community Volunteer Water Quality Entry
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Submit community water testing observations (pH, turbidity, microbial indicators).
        </p>
      </div>

      <DisclaimerBanner />

      {message && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Droplet className="h-4 w-4 text-health-teal-600" />
          New Water Sample Test Form
        </h3>

        <form onSubmit={handleSubmitWater} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Water Body / Source Name *</label>
            <input
              type="text"
              value={waterSource}
              onChange={(e) => setWaterSource(e.target.value)}
              required
              placeholder="e.g. Village Drinking Tank, Central Borewell"
              className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">pH Level (6.5 - 8.5 Safe)</label>
              <input
                type="number"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Turbidity NTU (&lt; 5.0 Safe)</label>
              <input
                type="number"
                step="0.1"
                value={turbidity}
                onChange={(e) => setTurbidity(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bacterial Contamination</label>
              <select
                value={bacterial ? 'true' : 'false'}
                onChange={(e) => setBacterial(e.target.value === 'true')}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800"
              >
                <option value="false">Negative / Clear</option>
                <option value="true">Positive / Contaminated</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">E. Coli Screening Test</label>
              <select
                value={eColi}
                onChange={(e) => setEColi(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800"
              >
                <option value="ABSENT">ABSENT (Safe)</option>
                <option value="PRESENT">PRESENT (Moderate Risk)</option>
                <option value="HIGH">HIGH (Severe Risk)</option>
              </select>
            </div>
          </div>

          <LocationCascadeSelect onLocationChange={setLocation} required />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Volunteer Field Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Odour, discoloration, pipe leakage comments..."
              className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-health-teal-600 py-3 text-xs font-bold text-white hover:bg-health-teal-700 shadow-md flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" /> Submit Water Quality Record
          </button>
        </form>
      </div>
    </div>
  );
};
