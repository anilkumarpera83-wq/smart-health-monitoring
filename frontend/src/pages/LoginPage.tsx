import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TelanganaLogo } from '../components/UI/TelanganaLogo';
import { Shield, Lock, Mail, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      const userStr = localStorage.getItem('user_info');
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u.role === 'ROLE_ADMIN') navigate('/admin/dashboard');
        else if (u.role === 'ROLE_HEALTH_OFFICER') navigate('/health-officer/dashboard');
        else if (u.role === 'ROLE_DOCTOR') navigate('/doctor/dashboard');
        else if (u.role === 'ROLE_ASHA_WORKER') navigate('/asha/dashboard');
        else navigate('/community/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 backdrop-blur-2xl">
        {/* Left Info Panel */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 flex flex-col justify-between border-r border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <TelanganaLogo size={48} className="h-12 w-12" />
              <div>
                <span className="font-extrabold text-base text-white block leading-none">Government of Telangana</span>
                <span className="text-[10px] text-teal-400 font-semibold mt-0.5 block">Health & Surveillance Portal</span>
              </div>
            </div>

            <h2 className="text-2xl font-black text-white mb-2">Official Public-Health Portal</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Secure authentication for Health Officers, Medical Doctors, ASHA Workers, and Community Personnel.
            </p>
          </div>

          {/* Quick Demo Login Credentials */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <span className="text-[11px] font-extrabold text-teal-400 uppercase tracking-widest block mb-2.5 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Demo Credentials (Click to Autofill)
            </span>
            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemoAccount('admin@example.com', 'Admin@123')}
                className="w-full text-left p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex justify-between border border-slate-800 hover:border-slate-700 transition-all"
              >
                <span className="font-bold">System Admin</span> <span className="font-mono text-[10px] text-slate-400">admin@example.com</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('health@example.com', 'Health@123')}
                className="w-full text-left p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex justify-between border border-slate-800 hover:border-slate-700 transition-all"
              >
                <span className="font-bold text-sky-400">Health Officer</span> <span className="font-mono text-[10px] text-slate-400">health@example.com</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('doctor@example.com', 'Doctor@123')}
                className="w-full text-left p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex justify-between border border-slate-800 hover:border-slate-700 transition-all"
              >
                <span className="font-bold text-purple-400">Medical Doctor</span> <span className="font-mono text-[10px] text-slate-400">doctor@example.com</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('asha@example.com', 'Asha@123')}
                className="w-full text-left p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex justify-between border border-slate-800 hover:border-slate-700 transition-all"
              >
                <span className="font-bold text-amber-400">ASHA Field Worker</span> <span className="font-mono text-[10px] text-slate-400">asha@example.com</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 flex flex-col justify-center bg-slate-900/90">
          <h3 className="text-xl font-black text-white mb-1">Sign In to Dashboard</h3>
          <p className="text-xs text-slate-400 mb-6">Enter your credentials to access state surveillance</p>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-500/10 p-3.5 text-xs text-rose-300 border border-rose-500/20">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="user@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 py-3 text-xs font-extrabold text-white hover:from-blue-500 hover:to-teal-500 transition-all shadow-glow-blue flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-sky-400 hover:underline">
              Register Officer Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
