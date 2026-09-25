import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Activity,
  Droplet,
  Bell,
  Cpu,
  FileText,
  Users,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { userRole } = useAuth();

  const getDashboardPath = () => {
    switch (userRole) {
      case 'ROLE_ADMIN':
        return '/admin/dashboard';
      case 'ROLE_HEALTH_OFFICER':
        return '/health-officer/dashboard';
      case 'ROLE_DOCTOR':
        return '/doctor/dashboard';
      case 'ROLE_ASHA_WORKER':
        return '/asha/dashboard';
      case 'ROLE_COMMUNITY_VOLUNTEER':
        return '/community/dashboard';
      default:
        return '/login';
    }
  };

  const navItems = [
    { label: 'Control Center', path: getDashboardPath(), icon: LayoutDashboard },
    { label: 'Health Surveillance', path: '/health-cases', icon: Activity },
    { label: 'Water Quality', path: '/water-quality', icon: Droplet },
    { label: 'Outbreak Alerts', path: '/alerts', icon: Bell },
    { label: 'AI Risk Engine', path: '/ai-predictions', icon: Cpu },
    { label: 'Reports & Export', path: '/reports', icon: FileText },
  ];

  if (userRole === 'ROLE_ADMIN') {
    navItems.push({ label: 'User Accounts', path: '/users', icon: Users });
    navItems.push({ label: 'Audit Logs', path: '/audit-logs', icon: ShieldCheck });
  }

  if (userRole === 'ROLE_ASHA_WORKER') {
    navItems.push({ label: 'ASHA Quick Entry', path: '/asha/quick-entry', icon: ClipboardList });
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950 min-h-[calc(100vh-4rem)] p-4 hidden md:block">
      <div className="mb-4 px-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Navigation Menu</span>
      </div>
      <nav className="space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600/15 text-sky-400 font-bold border-l-4 border-blue-500 shadow-inner'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`
            }
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
