import api from './api';
import { User } from '../types';

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch {
      // Mock seed users fallback
      return [
        { id: 1, fullName: 'System Administrator', email: 'admin@example.com', role: 'ROLE_ADMIN', districtName: 'Hyderabad', active: true, phone: '9876543210' },
        { id: 2, fullName: 'Dr. Ramesh Health Officer', email: 'health@example.com', role: 'ROLE_HEALTH_OFFICER', districtName: 'Hyderabad', active: true, phone: '9876543211' },
        { id: 3, fullName: 'Dr. Priya Sharma', email: 'doctor@example.com', role: 'ROLE_DOCTOR', districtName: 'Karimnagar', active: true, phone: '9876543212' },
        { id: 4, fullName: 'Lakshmi ASHA Worker', email: 'asha@example.com', role: 'ROLE_ASHA_WORKER', districtName: 'Warangal', active: true, phone: '9876543213' },
        { id: 5, fullName: 'Suresh Volunteer', email: 'volunteer@example.com', role: 'ROLE_COMMUNITY_VOLUNTEER', districtName: 'Siddipet', active: true, phone: '9876543214' },
      ];
    }
  },
};
