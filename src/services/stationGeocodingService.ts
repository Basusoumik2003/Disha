import { RouteStation } from '../types';

export interface StationGeo {
  code: string;
  name: string;
  lat: number;
  lon: number;
  state: string;
}

// Indian Railways Station Coordinates Database (Major Rail Junctions)
export const INDIAN_STATIONS_GEO: Record<string, StationGeo> = {
  MAS: { code: 'MAS', name: 'Chennai Central', lat: 13.0827, lon: 80.2707, state: 'Tamil Nadu' },
  NDLS: { code: 'NDLS', name: 'New Delhi', lat: 28.6424, lon: 77.2195, state: 'Delhi' },
  MMCT: { code: 'MMCT', name: 'Mumbai Central', lat: 18.9696, lon: 72.8193, state: 'Maharashtra' },
  CSMT: { code: 'CSMT', name: 'Mumbai CSMT', lat: 18.9402, lon: 72.8353, state: 'Maharashtra' },
  HWH: { code: 'HWH', name: 'Howrah Junction', lat: 22.5839, lon: 88.343, state: 'West Bengal' },
  SDAH: { code: 'SDAH', name: 'Kolkata Sealdah', lat: 22.5676, lon: 88.3712, state: 'West Bengal' },
  SBC: { code: 'SBC', name: 'KSR Bengaluru', lat: 12.9781, lon: 77.5697, state: 'Karnataka' },
  HYB: { code: 'HYB', name: 'Hyderabad Deccan', lat: 17.3923, lon: 78.4682, state: 'Telangana' },
  SC: { code: 'SC', name: 'Secunderabad Junction', lat: 17.4339, lon: 78.5016, state: 'Telangana' },
  BZA: { code: 'BZA', name: 'Vijayawada Junction', lat: 16.5062, lon: 80.648, state: 'Andhra Pradesh' },
  NGP: { code: 'NGP', name: 'Nagpur Junction', lat: 21.1458, lon: 79.0882, state: 'Maharashtra' },
  BPL: { code: 'BPL', name: 'Bhopal Junction', lat: 23.2599, lon: 77.4126, state: 'Madhya Pradesh' },
  RKMP: { code: 'RKMP', name: 'Rani Kamlapati (Bhopal)', lat: 23.2201, lon: 77.4385, state: 'Madhya Pradesh' },
  ET: { code: 'ET', name: 'Itarsi Junction', lat: 22.6105, lon: 77.7656, state: 'Madhya Pradesh' },
  VGLJ: { code: 'VGLJ', name: 'VGL Jhansi Junction', lat: 25.4484, lon: 78.5685, state: 'Uttar Pradesh' },
  GWL: { code: 'GWL', name: 'Gwalior Junction', lat: 26.2183, lon: 78.1828, state: 'Uttar Pradesh' },
  AGC: { code: 'AGC', name: 'Agra Cantt', lat: 27.1597, lon: 78.0078, state: 'Uttar Pradesh' },
  ST: { code: 'ST', name: 'Surat', lat: 21.2049, lon: 72.8406, state: 'Gujarat' },
  BRC: { code: 'BRC', name: 'Vadodara Junction', lat: 22.3107, lon: 73.1812, state: 'Gujarat' },
  ADI: { code: 'ADI', name: 'Ahmedabad Junction', lat: 23.0225, lon: 72.5975, state: 'Gujarat' },
  RTM: { code: 'RTM', name: 'Ratlam Junction', lat: 23.3344, lon: 75.0381, state: 'Madhya Pradesh' },
  KOTA: { code: 'KOTA', name: 'Kota Junction', lat: 25.2138, lon: 75.8648, state: 'Rajasthan' },
  JP: { code: 'JP', name: 'Jaipur Junction', lat: 26.9196, lon: 75.7878, state: 'Rajasthan' },
  CNB: { code: 'CNB', name: 'Kanpur Central', lat: 26.4542, lon: 80.35, state: 'Uttar Pradesh' },
  LKO: { code: 'LKO', name: 'Lucknow Charbagh', lat: 26.8322, lon: 80.9231, state: 'Uttar Pradesh' },
  PNBE: { code: 'PNBE', name: 'Patna Junction', lat: 25.604, lon: 85.1376, state: 'Bihar' },
  GKP: { code: 'GKP', name: 'Gorakhpur Junction', lat: 26.7606, lon: 83.3732, state: 'Uttar Pradesh' },
  CAPE: { code: 'CAPE', name: 'Kanyakumari', lat: 8.0883, lon: 77.5385, state: 'Tamil Nadu' },
  TVC: { code: 'TVC', name: 'Thiruvananthapuram Central', lat: 8.4875, lon: 76.9525, state: 'Kerala' },
  ERS: { code: 'ERS', name: 'Ernakulam Junction (Cochin)', lat: 9.9687, lon: 76.2896, state: 'Kerala' },
  DBRG: { code: 'DBRG', name: 'Dibrugarh Junction', lat: 27.4728, lon: 94.912, state: 'Assam' },
  GHY: { code: 'GHY', name: 'Guwahati Junction', lat: 26.186, lon: 91.7539, state: 'Assam' },
  BKN: { code: 'BKN', name: 'Bikaner Junction', lat: 28.0167, lon: 73.3167, state: 'Rajasthan' },
  GNC: { code: 'GNC', name: 'Gandhinagar Capital', lat: 23.223, lon: 72.65, state: 'Gujarat' },
  MYS: { code: 'MYS', name: 'Mysuru Junction', lat: 12.3164, lon: 76.6465, state: 'Karnataka' },
  WL: { code: 'WL', name: 'Warangal', lat: 17.9784, lon: 79.5941, state: 'Telangana' },
  BPQ: { code: 'BPQ', name: 'Balharshah', lat: 19.8547, lon: 79.3789, state: 'Maharashtra' },
};

export class StationGeocodingService {
  /**
   * Get lat/lon for any station code or fallback to interpolated coordinates
   */
  static getStationCoords(code: string, fallbackName?: string, index: number = 0, total: number = 10): StationGeo {
    const uppercaseCode = code.toUpperCase();
    if (INDIAN_STATIONS_GEO[uppercaseCode]) {
      return INDIAN_STATIONS_GEO[uppercaseCode];
    }

    // Dynamic Geocoding Interpolation along North-South / East-West Indian Rail corridor
    const progress = index / Math.max(1, total - 1);
    const lat = 8.0 + progress * 24.0; // Kanyakumari (8.0°N) -> Kashmir (32.0°N)
    const lon = 72.0 + Math.sin(progress * Math.PI) * 12.0; // Indian longitude corridor

    return {
      code: uppercaseCode,
      name: fallbackName || `Station ${uppercaseCode}`,
      lat: Math.round(lat * 10000) / 10000,
      lon: Math.round(lon * 10000) / 10000,
      state: 'India',
    };
  }
}
