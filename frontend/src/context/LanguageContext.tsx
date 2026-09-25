import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

interface Translations {
  [key: string]: {
    en: string;
    te: string;
  };
}

export const translations: Translations = {
  // Header & Brand
  govName: { en: 'Government of Telangana', te: 'తెలంగాణ ప్రభుత్వం' },
  deptName: { en: 'Official Website of Health, Medical & Family Welfare Department', te: 'ఆరోగ్య, వైద్య మరియు కుటుంబ సంక్షేమ శాఖ అధికారిక వెబ్‌సైట్' },
  appTitle: { en: 'SMART COMMUNITY HEALTH MONITORING', te: 'స్మార్ట్ కమ్యూనిటీ ఆరోగ్య పర్యవేక్షణ' },
  appSubtitle: { en: 'AND EARLY WARNING SYSTEM', te: 'మరియు ముందస్తు హెచ్చరిక వ్యవస్థ' },
  motto: { en: 'Healthier Communities, Stronger Telangana', te: 'ఆరోగ్యకరమైన సమాజాలు, బలమైన తెలంగాణ' },

  // Nav Items
  navHome: { en: 'Home', te: 'హోమ్' },
  navAbout: { en: 'About Us', te: 'మా గురించి' },
  navDashboard: { en: 'Dashboard', te: 'డాష్‌బోర్డ్' },
  navReports: { en: 'Reports', te: 'నివేదికలు' },
  navAlerts: { en: 'Alerts', te: 'హెచ్చరికలు' },
  navDiseaseInfo: { en: 'Disease Information', te: 'వ్యాధి వివరాలు' },
  navWaterQuality: { en: 'Water Quality', te: 'నీటి నాణ్యత' },
  navResources: { en: 'Resources', te: 'వనరులు' },
  navContact: { en: 'Contact Us', te: 'సంప్రదించండి' },
  loginBtn: { en: 'Login', te: 'లాగిన్' },

  // Hero Section
  heroTitle: { en: 'Monitoring Health. Protecting Communities.', te: 'ఆరోగ్య పర్యవేక్షణ. సమాజ రక్షణ.' },
  heroSubtitle: {
    en: 'An integrated platform for real-time health surveillance, water quality monitoring, and AI-powered early warning for disease outbreaks in Telangana.',
    te: 'తెలంగాణలో నిజసమయ ఆరోగ్య సర్వేలెన్స్, నీటి నాణ్యత పర్యవేక్షణ మరియు AI ఆధారిత వ్యాధి ముందస్తు హెచ్చరికల కోసం ఒక సమగ్ర ప్లాట్‌ఫారమ్.'
  },
  viewDashboard: { en: 'View Dashboard', te: 'డాష్‌బోర్డ్ చూడండి' },
  learnMore: { en: 'Learn More', te: 'మరింత తెలుసుకోండి' },

  // Metric Cards
  totalCases: { en: 'Total Health Cases', te: 'మొత్తం ఆరోగ్య కేసులు' },
  waterAlerts: { en: 'Water Quality Alerts', te: 'నీటి నాణ్యత హెచ్చరికలు' },
  activeAlerts: { en: 'Active Alerts', te: 'యాక్టివ్ హెచ్చరికలు' },
  aiRiskScore: { en: 'AI Risk Score', te: 'AI రిస్క్ స్కోరు' },
  highRiskVillages: { en: 'High Risk Villages', te: 'అధిక ప్రమాద గ్రామాలు' },
  fromLastMonth: { en: 'from last month', te: 'గత నెల నుండి' },
  acrossTelangana: { en: 'Across Telangana', te: 'తెలంగాణ వ్యాప్తంగా' },

  // Dashboard Sections
  diseaseTrend: { en: 'Disease Trend (Last 6 Months)', te: 'వ్యాధి ధోరణి (గత 6 నెలలు)' },
  recentAlerts: { en: 'Recent Alerts', te: 'ఇటీవలి హెచ్చరికలు' },
  riskMap: { en: 'Risk Map - Telangana', te: 'రిస్క్ మ్యాప్ - తెలంగాణ' },
  viewDetailedReport: { en: 'View Detailed Report', te: 'వివర నివేదిక చూడండి' },
  viewAllAlerts: { en: 'View All Alerts', te: 'అన్ని హెచ్చరికలు చూడండి' },
  viewFullMap: { en: 'View Full Map', te: 'పూర్తి మ్యాప్ చూడండి' },

  // Quick Action Buttons
  actionHealthCases: { en: 'Health Cases', te: 'ఆరోగ్య కేసులు' },
  actionWaterQuality: { en: 'Water Quality', te: 'నీటి నాణ్యత' },
  actionAlerts: { en: 'Alerts', te: 'హెచ్చరికలు' },
  actionAIPredictions: { en: 'AI Predictions', te: 'AI అంచనాలు' },
  actionReports: { en: 'Reports', te: 'నివేదికలు' },
  actionCommunity: { en: 'Community', te: 'సమాజం' },

  subReportTrack: { en: 'Report & Track', te: 'నమోదు & పర్యవేక్షణ' },
  subMonitorAnalyze: { en: 'Monitor & Analyze', te: 'పర్యవేక్షణ & విశ్లేషణ' },
  subViewManage: { en: 'View & Manage', te: 'వీక్షించండి & నిర్వహించండి' },
  subRiskAssessment: { en: 'Risk Assessment', te: 'ప్రమాద అంచనా' },
  subAnalyticsInsights: { en: 'Analytics & Insights', te: 'విశ్లేషణలు & గణాంకాలు' },
  subAwarenessSupport: { en: 'Awareness & Support', te: 'అవగాహన & మద్దతు' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'te' ? 'te' : 'en') as Language;
  });

  useEffect(() => {
    document.body.setAttribute('data-lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
    document.body.setAttribute('data-lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
