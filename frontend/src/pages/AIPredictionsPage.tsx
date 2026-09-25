import React, { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { AIPredictionResult, DistrictLocation, MandalLocation, VillageLocation } from '../types';
import { DisclaimerBanner } from '../components/UI/DisclaimerBanner';
import { RiskBadge } from '../components/UI/RiskBadge';
import { SkeletonLoader } from '../components/UI/SkeletonLoader';
import { GoogleHealthMap } from '../components/UI/GoogleHealthMap';
import { Cpu, Play, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import { LocationCascadeSelect } from '../components/Forms/LocationCascadeSelect';

export const AIPredictionsPage: React.FC = () => {
  const [history, setHistory] = useState<AIPredictionResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State for Interactive Inference
  const [district, setDistrict] = useState('Hyderabad');
  const [mandal, setMandal] = useState('Amberpet');
  const [village, setVillage] = useState('Amberpet Central');
  const [recentCases, setRecentCases] = useState<number>(5);
  const [waterScore, setWaterScore] = useState<number>(45);
  const [turbidity, setTurbidity] = useState<number>(8.5);
  const [disease, setDisease] = useState('Diarrheal Disease');

  const [predictionResult, setPredictionResult] = useState<AIPredictionResult | null>(null);
  const [predicting, setPredicting] = useState(false);

  const loadHistory = () => {
    setLoading(true);
    aiService.getHistory(0, 10)
      .then((res) => setHistory(res.content))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setPredicting(true);
    try {
      const res = await aiService.predict({
        district,
        mandal,
        village,
        recentCases,
        waterQualityScore: waterScore,
        turbidity,
        disease,
      });
      setPredictionResult(res);
      loadHistory();
    } catch (err) {
      console.error(err);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="h-6 w-6 text-purple-600" />
          AI Early Warning & Outbreak Predictions
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Machine Learning Random Forest model trained on water quality parameters, weather, and historical epidemiology
        </p>
      </div>

      <DisclaimerBanner />

      {/* 1. GOOGLE MAPS SURVEILLANCE DASHBOARD */}
      <div>
        <GoogleHealthMap height="520px" />
      </div>

      {/* 2. INFERENCE RUNNER FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <Play className="h-4 w-4 text-purple-600" />
            Run Real-Time AI Outbreak Inference
          </h2>

          <form onSubmit={handlePredict} className="space-y-4">
            <LocationCascadeSelect
              onLocationSelect={(d: DistrictLocation | null, m: MandalLocation | null, v: VillageLocation | null) => {
                if (d) setDistrict(d.name);
                if (m) setMandal(m.name);
                if (v) setVillage(v.name);
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Disease</label>
                <select
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold focus:border-purple-500 focus:outline-none"
                >
                  <option>Diarrheal Disease</option>
                  <option>Cholera</option>
                  <option>Typhoid Fever</option>
                  <option>Hepatitis A</option>
                  <option>Dengue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recent 7-Day Health Cases</label>
                <input
                  type="number"
                  value={recentCases}
                  onChange={(e) => setRecentCases(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Water Quality Score (0-100)</label>
                <input
                  type="number"
                  value={waterScore}
                  onChange={(e) => setWaterScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Turbidity (NTU)</label>
                <input
                  type="number"
                  step="0.1"
                  value={turbidity}
                  onChange={(e) => setTurbidity(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={predicting}
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 py-3 text-xs font-extrabold text-white transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {predicting ? 'Executing AI Inference Model...' : 'Generate Outbreak Prediction Risk'}
            </button>
          </form>
        </div>

        {/* Prediction Output Display */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 mb-4">Inference Analysis Result</h2>
            {predictionResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">Calculated Risk Probability</span>
                    <span className="text-3xl font-black text-slate-900">{predictionResult.riskScore}%</span>
                  </div>
                  <RiskBadge level={predictionResult.riskLevel} />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Predicted Disease:</span>
                    <strong className="text-slate-900">{predictionResult.predictedDisease}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Target Location:</span>
                    <strong className="text-slate-900">{predictionResult.villageName}, {predictionResult.districtName}</strong>
                  </div>
                </div>

                <div className="rounded-xl bg-purple-50 p-4 border border-purple-100 space-y-2 text-xs">
                  <span className="font-extrabold text-purple-900 block">Recommended Intervention Actions:</span>
                  <ul className="space-y-1 text-purple-800 font-medium">
                    {(predictionResult.recommendations || []).map((rec: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-purple-600 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                <Cpu className="h-10 w-10 mx-auto text-slate-300" />
                <p>Fill in parameters on the left and run inference to get real-time outbreak probability.</p>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-400 pt-4 border-t border-slate-100 italic">
            * Predictions are generated by Random Forest Classifier model. Intended for decision support only.
          </div>
        </div>
      </div>
    </div>
  );
};
