import api from './api';
import { DashboardSummary } from '../types';

export const dashboardService = {
  async getSummary(districtId?: number): Promise<DashboardSummary> {
    const query = districtId ? `?districtId=${districtId}` : '';
    const response = await api.get<DashboardSummary>(`/dashboard/summary${query}`);
    return response.data;
  }
};
