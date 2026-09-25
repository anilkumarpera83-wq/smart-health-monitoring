import api from './api';
import { StateLocation, DistrictLocation, MandalLocation, VillageLocation } from '../types';

export const locationService = {
  async getStates(): Promise<StateLocation[]> {
    const response = await api.get<StateLocation[]>('/states');
    return response.data;
  },

  async getDistricts(stateId: number = 1): Promise<DistrictLocation[]> {
    const response = await api.get<DistrictLocation[]>(`/districts?stateId=${stateId}`);
    return response.data;
  },

  async getMandals(districtId: number): Promise<MandalLocation[]> {
    const response = await api.get<MandalLocation[]>(`/districts/${districtId}/mandals`);
    return response.data;
  },

  async getVillages(mandalId: number): Promise<VillageLocation[]> {
    const response = await api.get<VillageLocation[]>(`/mandals/${mandalId}/villages`);
    return response.data;
  }
};
