import api from './api';
import { HealthCase } from '../types';

export interface CreateCasePayload {
  age: number;
  gender: string;
  districtId: number;
  mandalId: number;
  villageId: number;
  reportingDate?: string;
  suspectedDiseaseId?: number;
  severity: string;
  bodyTemperature?: number;
  durationDays?: number;
  waterSource?: string;
  notes?: string;
  symptomIds?: number[];
}

export const healthService = {
  async getAllCases(page: number = 0, size: number = 10): Promise<{ content: HealthCase[]; totalElements: number; totalPages: number }> {
    const response = await api.get(`/health-cases?page=${page}&size=${size}`);
    return response.data;
  },

  async getCaseById(id: number): Promise<HealthCase> {
    const response = await api.get<HealthCase>(`/health-cases/${id}`);
    return response.data;
  },

  async createCase(payload: CreateCasePayload): Promise<HealthCase> {
    const response = await api.post<HealthCase>('/health-cases', payload);
    return response.data;
  },

  async updateCase(id: number, payload: Partial<CreateCasePayload>): Promise<HealthCase> {
    const response = await api.put<HealthCase>(`/health-cases/${id}`, payload);
    return response.data;
  }
};
