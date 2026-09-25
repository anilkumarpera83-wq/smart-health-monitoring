import React, { useState, useEffect } from 'react';
import { healthService } from '../../services/healthService';
import { HealthCase } from '../../types';
import { DashboardCard } from '../../components/UI/DashboardCard';
import { RiskBadge } from '../../components/UI/RiskBadge';
import { DisclaimerBanner } from '../../components/UI/DisclaimerBanner';
import { SkeletonLoader } from '../../components/UI/SkeletonLoader';
import { Activity, Stethoscope, CheckSquare, Plus } from 'lucide-react';
import { Modal } from '../../components/UI/Modal';
import { LocationCascadeSelect } from '../../components/Forms/LocationCascadeSelect';

export const DoctorDashboard: React.FC = () => {
  const [cases, setCases] = useState<HealthCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Case Form State
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState('Male');
  const [severity, setSeverity] = useState('HIGH');
  const [diseaseId, setDiseaseId] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<any>(null);

  const loadData = () => {
    setLoading(true);
    healthService.getAllCases(0, 10)
      .then((res) => setCases(res.content))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    await healthService.createCase({
      age,
      gender,
      districtId: location.districtId,
      mandalId: location.mandalId,
      villageId: location.villageId,
      severity,
      suspectedDiseaseId: diseaseId,
      notes,
    });

    setIsModalOpen(false);
    loadData();
  };

  if (loading) return <SkeletonLoader rows={6} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Medical Officer & Doctor Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Clinical case verification, laboratory diagnosis confirmation, and patient symptom registry.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-health-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-health-blue-800 shadow-xs"
        >
          <Plus className="h-4 w-4" /> Report Medical Case
        </button>
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DashboardCard
          title="Patient Cases Under Review"
          value={cases.length}
          subtitle="Registered clinical reports"
          icon={<Stethoscope className="h-5 w-5" />}
          colorTheme="blue"
        />
        <DashboardCard
          title="High Severity Cases"
          value={cases.filter((c) => c.severity === 'HIGH' || c.severity === 'CRITICAL').length}
          subtitle="Requires clinical hospitalization"
          icon={<Activity className="h-5 w-5" />}
          colorTheme="red"
        />
        <DashboardCard
          title="Confirmed Diagnoses"
          value={cases.filter((c) => c.confirmedDiseaseName).length}
          subtitle="Lab confirmed"
          icon={<CheckSquare className="h-5 w-5" />}
          colorTheme="teal"
        />
      </div>

      {/* Patient Cases Registry */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-health-blue-700" />
          Recent Clinical Patient Surveillance Registry
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b">
              <tr>
                <th className="p-3">Case ID</th>
                <th className="p-3">Demographics</th>
                <th className="p-3">Location</th>
                <th className="p-3">Suspected Disease</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{c.caseNumber}</td>
                  <td className="p-3 text-slate-700">{c.age} yrs, {c.gender}</td>
                  <td className="p-3 text-slate-700">{c.villageName}, {c.districtName}</td>
                  <td className="p-3 font-semibold text-slate-900">{c.suspectedDiseaseName}</td>
                  <td className="p-3"><RiskBadge level={c.severity} size="sm" /></td>
                  <td className="p-3 text-slate-500">{c.reportingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Case Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Report New Patient Health Case">
        <form onSubmit={handleCreateCase} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Suspected Disease</label>
              <select
                value={diseaseId}
                onChange={(e) => setDiseaseId(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              >
                <option value={1}>Cholera</option>
                <option value={2}>Typhoid</option>
                <option value={3}>Hepatitis A</option>
                <option value={4}>Diarrheal Disease</option>
                <option value={5}>Gastroenteritis</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
          </div>

          <LocationCascadeSelect onLocationChange={setLocation} required />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Notes & Observations</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Enter patient symptoms, dehydration status, etc."
              className="w-full rounded-lg border border-slate-300 p-2 text-xs"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-health-blue-700 py-2.5 text-xs font-bold text-white hover:bg-health-blue-800"
          >
            Submit Health Case Report
          </button>
        </form>
      </Modal>
    </div>
  );
};
