import api from './api';
import { AlertItem, AlertStatus } from '../types';

export const alertService = {
  async getAllAlerts(page: number = 0, size: number = 10): Promise<{ content: AlertItem[]; totalElements: number; totalPages: number }> {
    const response = await api.get(`/alerts?page=${page}&size=${size}`);
    return response.data;
  },

  async getAlertById(id: number): Promise<AlertItem> {
    const response = await api.get<AlertItem>(`/alerts/${id}`);
    return response.data;
  },

  async updateStatus(id: number, status: AlertStatus, assignedOfficerId?: number): Promise<AlertItem> {
    const response = await api.put<AlertItem>(`/alerts/${id}/status`, { status, assignedOfficerId });
    return response.data;
  }
};
