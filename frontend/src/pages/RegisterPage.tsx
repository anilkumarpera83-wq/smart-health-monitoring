import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { LocationCascadeSelect } from '../components/Forms/LocationCascadeSelect';
import { UserRole } from '../types';
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('ROLE_ASHA_WORKER');

  const [location, setLocation] = useState<{
    stateId: number;
    districtId: number;
    mandalId: number;
    villageId: number;
  } | null>(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!location) {
      setError('Please select District, Mandal, and Village.');
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        fullName,
        email,
        phone,
        password,
        role,
        stateId: location.stateId,
        districtId: location.districtId,
        mandalId: location.mandalId,
        villageId: location.villageId,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-health-blue-700 text-white flex items-center justify-center font-bold">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">User Account Registration</h2>
            <p className="text-xs text-slate-500">Register as a Health Worker, Doctor, or Volunteer</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Account created successfully! Redirecting to sign in...</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="e.g. Lakshmi Devi"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="lakshmi@example.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Designated User Role *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500"
            >
              <option value="ROLE_ASHA_WORKER">ASHA Field Worker</option>
              <option value="ROLE_COMMUNITY_VOLUNTEER">Community Volunteer</option>
              <option value="ROLE_DOCTOR">Medical Doctor</option>
              <option value="ROLE_HEALTH_OFFICER">District Health Officer</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 mb-3">Assigned Location Hierarchy (Telangana)</h4>
            <LocationCascadeSelect onLocationChange={setLocation} required />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-health-blue-700 py-2.5 text-xs font-bold text-white hover:bg-health-blue-800 transition-colors shadow-xs mt-4 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-health-blue-700 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
