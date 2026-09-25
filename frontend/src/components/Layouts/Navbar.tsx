import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { OfflineIndicator } from '../UI/OfflineIndicator';
import { LogOut, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-slate-950 border-b border-slate-800">
      <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left Side - Brand */}
        <div className="flex items-center gap-4">

          {/* SmartHealth Logo/Icon */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
            <span className="text-xl font-black text-white">
              SH
            </span>
          </div>

          {/* Brand Text */}
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {language === 'te'
                ? 'స్మార్ట్‌హెల్త్ తెలంగాణ'
                : 'SmartHealth Telangana'}
            </h1>

            <p className="text-[10px] sm:text-xs font-medium text-slate-400">
              {language === 'te'
                ? 'నీటి బోర్న్ వ్యాధి ముందస్తు హెచ్చరిక వ్యవస్థ'
                : 'Water-Borne Disease Early Warning System'}
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">

            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>

            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                language === 'te'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              తెలుగు
            </button>

          </div>

          {/* Offline Indicator */}
          <OfflineIndicator />

          {/* Authenticated User */}
          {isAuthenticated && user ? (

            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">

              {/* User Information */}
              <div className="text-right hidden sm:block">
                <span className="block text-xs font-bold text-white leading-tight">
                  {user.fullName}
                </span>

                <span className="block text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                  {user.role
                    .replace('ROLE_', '')
                    .replace(/_/g, ' ')}
                </span>
              </div>

              {/* User Icon */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                <UserIcon className="h-4 w-4" />
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Sign out"
                className="rounded-xl p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors border border-transparent hover:border-rose-500/20"
              >
                <LogOut className="h-4 w-4" />
              </button>

            </div>

          ) : (

            /* Login */
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-all"
              >
                {t('loginBtn')}
              </Link>
            </div>

          )}

        </div>
      </div>
    </header>
  );
};