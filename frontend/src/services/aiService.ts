import api from './api';
import { AIPredictionResult } from '../types';

export interface PredictPayload {
  district: string;
  mandal: string;
  village: string;
  recentCases: number;
  waterQualityScore: number;
  rainfallMm?: number;
  temperatureC?: number;
  ph?: number;
  turbidity?: number;
  disease?: string;
}

export const aiService = {
  async predict(payload: PredictPayload): Promise<AIPredictionResult> {
    const response = await api.post<AIPredictionResult>('/ai/predict', payload);
    return response.data;
  },

  async getHistory(page: number = 0, size: number = 10): Promise<{ content: AIPredictionResult[]; totalElements: number; totalPages: number }> {
    const response = await api.get(`/ai/predictions?page=${page}&size=${size}`);
    return response.data;
  }
};
