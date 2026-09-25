import axios from 'axios';

export interface MapLocation {
  id: number;
  name: string;
  type: 'HEALTH_CENTER' | 'WATER_TESTING' | 'DISEASE_RISK' | 'VILLAGE' | 'MANDAL' | 'DISTRICT';
  districtId: number;
  districtName: string;
  mandalName: string;
  villageName: string;
  latitude: number;
  longitude: number;
  status: 'NORMAL' | 'WARNING' | 'HIGH_RISK';
  riskScore: number;
  activeCases: number;
  waterQualityStatus: string;
  description: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const mapService = {
  getMapLocations: async (params?: {
    districtId?: number;
    type?: string;
    status?: string;
    search?: string;
  }): Promise<MapLocation[]> => {
    try {
      const response = await axios.get(`${API_URL}/map-locations`, { params });
      return response.data;
    } catch (error) {
      console.warn('Backend API offline or unreachable, returning fallback health surveillance markers:', error);
      
      // Fallback location markers dataset covering Telangana districts
      const fallbackLocations: MapLocation[] = [
        {
          id: 101,
          name: 'Hyderabad Central Public Health Center & PHC',
          type: 'HEALTH_CENTER',
          districtId: 1,
          districtName: 'Hyderabad',
          mandalName: 'Charminar Mandal',
          villageName: 'Moghalpura',
          latitude: 17.3616,
          longitude: 78.4747,
          status: 'NORMAL',
          riskScore: 20,
          activeCases: 14,
          waterQualityStatus: 'SAFE (pH 7.2)',
          description: 'State Central Public Health Center & Epidemic Referral Hub'
        },
        {
          id: 102,
          name: 'Siddipet Primary Health Clinic',
          type: 'HEALTH_CENTER',
          districtId: 2,
          districtName: 'Siddipet',
          mandalName: 'Siddipet Mandal',
          villageName: 'Madharam',
          latitude: 18.1018,
          longitude: 78.8520,
          status: 'WARNING',
          riskScore: 58,
          activeCases: 34,
          waterQualityStatus: 'MODERATE (Turbidity 4.8 NTU)',
          description: 'Rural Surveillance Clinic & Water Sample Collection Point'
        },
        {
          id: 103,
          name: 'Warangal Area Hospital & Outbreak Hub',
          type: 'HEALTH_CENTER',
          districtId: 3,
          districtName: 'Warangal',
          mandalName: 'Warangal Mandal',
          villageName: 'Laxmidevipally',
          latitude: 17.9689,
          longitude: 79.5941,
          status: 'HIGH_RISK',
          riskScore: 88,
          activeCases: 78,
          waterQualityStatus: 'POOR (E. coli positive)',
          description: 'Acute Outbreak Response Unit & Isolation Hospital'
        },
        {
          id: 104,
          name: 'Karimnagar District Surveillance Hospital',
          type: 'HEALTH_CENTER',
          districtId: 4,
          districtName: 'Karimnagar',
          mandalName: 'Karimnagar Mandal',
          villageName: 'Bommakal',
          latitude: 18.4386,
          longitude: 79.1288,
          status: 'HIGH_RISK',
          riskScore: 79,
          activeCases: 62,
          waterQualityStatus: 'POOR (Bacterial Contamination)',
          description: 'District Infectious Disease Monitoring Center'
        },
        {
          id: 201,
          name: 'Hussain Sagar Reservoir Water Test Station',
          type: 'WATER_TESTING',
          districtId: 1,
          districtName: 'Hyderabad',
          mandalName: 'Khairatabad Mandal',
          villageName: 'Necklace Road',
          latitude: 17.4239,
          longitude: 78.4738,
          status: 'HIGH_RISK',
          riskScore: 92,
          activeCases: 45,
          waterQualityStatus: 'CRITICAL (pH 5.4, Coliform 420/100ml)',
          description: 'Central Reservoir Water Sampling & Chemical Analysis Lab'
        },
        {
          id: 202,
          name: 'Siddipet Madharam Lake Monitoring Station',
          type: 'WATER_TESTING',
          districtId: 2,
          districtName: 'Siddipet',
          mandalName: 'Siddipet Mandal',
          villageName: 'Madharam',
          latitude: 18.1150,
          longitude: 78.8650,
          status: 'HIGH_RISK',
          riskScore: 82,
          activeCases: 38,
          waterQualityStatus: 'POOR (E. coli & High Silt)',
          description: 'Village Borewell & Drinking Water Testing Facility'
        },
        {
          id: 203,
          name: 'Kakatiya Canal Water Sampling Point',
          type: 'WATER_TESTING',
          districtId: 3,
          districtName: 'Warangal',
          mandalName: 'Hanamkonda Mandal',
          villageName: 'Kazipet',
          latitude: 17.9810,
          longitude: 79.5220,
          status: 'WARNING',
          riskScore: 65,
          activeCases: 22,
          waterQualityStatus: 'MODERATE (Turbidity 6.2 NTU)',
          description: 'Canal Supply Quality Monitoring Node'
        },
        {
          id: 301,
          name: 'Madharam Diarrhea Outbreak Hotspot',
          type: 'DISEASE_RISK',
          districtId: 2,
          districtName: 'Siddipet',
          mandalName: 'Siddipet Mandal',
          villageName: 'Madharam',
          latitude: 18.0950,
          longitude: 78.8410,
          status: 'HIGH_RISK',
          riskScore: 90,
          activeCases: 48,
          waterQualityStatus: 'POOR',
          description: 'Acute Waterborne Cholera & Diarrhea Cluster'
        },
        {
          id: 302,
          name: 'Laxmidevipally Dengue & Typhoid Cluster',
          type: 'DISEASE_RISK',
          districtId: 3,
          districtName: 'Warangal',
          mandalName: 'Warangal Mandal',
          villageName: 'Laxmidevipally',
          latitude: 17.9550,
          longitude: 79.6100,
          status: 'HIGH_RISK',
          riskScore: 86,
          activeCases: 56,
          waterQualityStatus: 'MODERATE',
          description: 'High Risk Dengue & Acute Waterborne Fever Cluster'
        },
        {
          id: 401,
          name: 'Nalgonda Fluoride Water Testing Hub',
          type: 'WATER_TESTING',
          districtId: 5,
          districtName: 'Nalgonda',
          mandalName: 'Nalgonda Mandal',
          villageName: 'Chandur',
          latitude: 17.0250,
          longitude: 79.1820,
          status: 'HIGH_RISK',
          riskScore: 80,
          activeCases: 29,
          waterQualityStatus: 'POOR (High Fluoride 3.6 mg/L)',
          description: 'Groundwater Fluorosis & Contamination Station'
        },
        {
          id: 402,
          name: 'Khammam Urban Contamination Outbreak Zone',
          type: 'DISEASE_RISK',
          districtId: 6,
          districtName: 'Khammam',
          mandalName: 'Khammam Urban',
          villageName: 'Mustafa Nagar',
          latitude: 17.2550,
          longitude: 80.1410,
          status: 'HIGH_RISK',
          riskScore: 94,
          activeCases: 84,
          waterQualityStatus: 'CRITICAL (Salmonella & Sewage Contamination)',
          description: 'Urban Pipe Leakage Outbreak Hotspot'
        }
      ];

      // Apply client-side filters on fallback dataset
      return fallbackLocations.filter(l => {
        const matchesDistrict = !params?.districtId || l.districtId === params.districtId;
        const matchesType = !params?.type || params.type === 'ALL' || l.type === params.type;
        const matchesStatus = !params?.status || params.status === 'ALL' || l.status === params.status;
        const matchesSearch = !params?.search ||
          l.name.toLowerCase().includes(params.search.toLowerCase()) ||
          l.districtName.toLowerCase().includes(params.search.toLowerCase()) ||
          l.mandalName.toLowerCase().includes(params.search.toLowerCase()) ||
          l.villageName.toLowerCase().includes(params.search.toLowerCase());

        return matchesDistrict && matchesType && matchesStatus && matchesSearch;
      });
    }
  }
};
