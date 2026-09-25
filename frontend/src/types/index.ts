export type UserRole = 
  | 'ROLE_ADMIN' 
  | 'ROLE_HEALTH_OFFICER' 
  | 'ROLE_DOCTOR' 
  | 'ROLE_ASHA_WORKER' 
  | 'ROLE_COMMUNITY_VOLUNTEER';

export type Role = UserRole;

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';

export interface User {
  id: number;
  fullName: String;
  email: string;
  phone?: string;
  role: UserRole;
  stateName?: string;
  districtName?: string;
  mandalName?: string;
  villageName?: string;
  active?: boolean;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  districtName?: string;
  mandalName?: string;
  villageName?: string;
}

export interface StateLocation {
  id: number;
  name: string;
  code: string;
}

export interface DistrictLocation {
  id: number;
  stateId: number;
  name: string;
  code?: string;
}

export interface MandalLocation {
  id: number;
  districtId: number;
  name: string;
}

export interface VillageLocation {
  id: number;
  mandalId: number;
  name: string;
  population?: number;
  latitude?: number;
  longitude?: number;
}

export interface HealthCase {
  id: number;
  caseNumber: string;
  age: number;
  gender: string;
  stateName?: string;
  districtName?: string;
  mandalName?: string;
  villageName?: string;
  reportingDate: string;
  suspectedDiseaseName?: string;
  confirmedDiseaseName?: string;
  severity: RiskLevel;
  bodyTemperature?: number;
  durationDays?: number;
  waterSource?: string;
  notes?: string;
  reportedByName?: string;
  symptoms?: string[];
  createdAt?: string;
}

export interface WaterQualityRecord {
  id: number;
  sampleCode: string;
  stateName?: string;
  districtName?: string;
  mandalName?: string;
  villageName?: string;
  waterSource: string;
  collectionDate: string;
  ph: number;
  turbidity: number;
  temperature?: number;
  tds?: number;
  bacterialContamination?: boolean;
  eColiStatus?: string;
  overallQuality: string;
  riskLevel: RiskLevel;
  notes?: string;
  submittedByName?: string;
  createdAt?: string;
}

export interface AlertItem {
  id: number;
  alertCode: string;
  alertType: string;
  districtName?: string;
  mandalName?: string;
  villageName?: string;
  diseaseName?: string;
  riskLevel: RiskLevel;
  riskScore: number;
  message: string;
  status: AlertStatus;
  assignedOfficerName?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface AIPredictionResult {
  id?: number;
  districtName?: string;
  mandalName?: string;
  villageName?: string;
  predictedDisease: string;
  riskScore: number;
  riskLevel: RiskLevel;
  probability: number;
  factors: string[];
  recommendations?: string[];
  modelVersion: string;
  disclaimer: string;
  createdAt?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
}

export interface DashboardSummary {
  totalCases: number;
  activeCases: number;
  confirmedCases: number;
  highRiskVillagesCount: number;
  waterQualityAlertsCount: number;
  activeOutbreakAlertsCount: number;
  averageRiskScore: number;
  diseaseDistribution: ChartDataPoint[];
  districtWiseCases: ChartDataPoint[];
  monthlyCaseTrends: ChartDataPoint[];
  waterQualityBreakdown: ChartDataPoint[];
  alertRiskLevelDistribution: ChartDataPoint[];
  disclaimer: string;
}
