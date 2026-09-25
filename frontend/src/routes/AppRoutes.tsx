import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Layouts/Navbar';
import { Sidebar } from '../components/Layouts/Sidebar';
import { Footer } from '../components/Layouts/Footer';

// Pages
import { LandingPage } from '../pages/LandingPage';
import { AboutUsPage } from '../pages/AboutUsPage';
import { TelanganaMapPage } from '../pages/TelanganaMapPage';
import { DiseaseInfoPage } from '../pages/DiseaseInfoPage';
import { ResourcesPage } from '../pages/ResourcesPage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

import { AdminDashboard } from '../pages/Dashboards/AdminDashboard';
import { HealthOfficerDashboard } from '../pages/Dashboards/HealthOfficerDashboard';
import { DoctorDashboard } from '../pages/Dashboards/DoctorDashboard';
import { AshaDashboard } from '../pages/Dashboards/AshaDashboard';
import { CommunityDashboard } from '../pages/Dashboards/CommunityDashboard';

import { HealthCasesPage } from '../pages/HealthCasesPage';
import { WaterQualityPage } from '../pages/WaterQualityPage';
import { AlertsPage } from '../pages/AlertsPage';
import { AIPredictionsPage } from '../pages/AIPredictionsPage';
import { ReportsPage } from '../pages/ReportsPage';
import { UsersPage } from '../pages/UsersPage';
import { AuditLogsPage } from '../pages/AuditLogsPage';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1 mx-auto w-full max-w-7xl">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Standalone Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/telangana-map" element={<TelanganaMapPage />} />
      <Route path="/disease-info" element={<DiseaseInfoPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Role Dashboards */}
      <Route path="/admin/dashboard" element={<ProtectedLayout><AdminDashboard /></ProtectedLayout>} />
      <Route path="/health-officer/dashboard" element={<ProtectedLayout><HealthOfficerDashboard /></ProtectedLayout>} />
      <Route path="/doctor/dashboard" element={<ProtectedLayout><DoctorDashboard /></ProtectedLayout>} />
      <Route path="/asha/dashboard" element={<ProtectedLayout><AshaDashboard /></ProtectedLayout>} />
      <Route path="/asha/quick-entry" element={<ProtectedLayout><AshaDashboard /></ProtectedLayout>} />
      <Route path="/community/dashboard" element={<ProtectedLayout><CommunityDashboard /></ProtectedLayout>} />

      {/* Shared Standalone Application Feature Pages */}
      <Route path="/health-cases" element={<ProtectedLayout><HealthCasesPage /></ProtectedLayout>} />
      <Route path="/water-quality" element={<ProtectedLayout><WaterQualityPage /></ProtectedLayout>} />
      <Route path="/alerts" element={<ProtectedLayout><AlertsPage /></ProtectedLayout>} />
      <Route path="/ai-predictions" element={<ProtectedLayout><AIPredictionsPage /></ProtectedLayout>} />
      <Route path="/reports" element={<ProtectedLayout><ReportsPage /></ProtectedLayout>} />
      <Route path="/users" element={<ProtectedLayout><UsersPage /></ProtectedLayout>} />
      <Route path="/audit-logs" element={<ProtectedLayout><AuditLogsPage /></ProtectedLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
