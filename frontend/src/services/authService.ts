import api from './api';
import { AuthResponse } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('jwt_token', response.data.token);
      localStorage.setItem('user_info', JSON.stringify(response.data));
    }
    return response.data;
  },

  async register(userData: any): Promise<any> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
  },

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem('user_info');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
};
