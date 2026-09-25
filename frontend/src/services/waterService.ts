import api from './api';
import { WaterQualityRecord } from '../types';

export interface CreateWaterPayload {
  districtId: number;
  mandalId: number;
  villageId: number;
  waterSource: string;
  collectionDate?: string;
  ph: number;
  turbidity: number;
  temperature?: number;
  tds?: number;
  bacterialContamination?: boolean;
  eColiStatus?: string;
  notes?: string;
}

export const waterService = {
  async getAllRecords(page: number = 0, size: number = 10): Promise<{ content: WaterQualityRecord[]; totalElements: number; totalPages: number }> {
    const response = await api.get(`/water-quality?page=${page}&size=${size}`);
    return response.data;
  },

  async getRecordById(id: number): Promise<WaterQualityRecord> {
    const response = await api.get<WaterQualityRecord>(`/water-quality/${id}`);
    return response.data;
  },

  async submitRecord(payload: CreateWaterPayload): Promise<WaterQualityRecord> {
    const response = await api.post<WaterQualityRecord>('/water-quality', payload);
    return response.data;
  }
};
