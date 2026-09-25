import api from './api';

export const reportService = {
  async getHealthReport(): Promise<any> {
    const response = await api.get('/reports/health');
    return response.data;
  },

  async getWaterReport(): Promise<any> {
    const response = await api.get('/reports/water');
    return response.data;
  },

  async downloadHealthCSV(): Promise<void> {
    const response = await api.get('/reports/health/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'health_surveillance_report.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  async downloadWaterCSV(): Promise<void> {
    const response = await api.get('/reports/water/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'water_quality_report.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
