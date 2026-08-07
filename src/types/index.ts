export type TrainClass = '1A' | '2A' | '3A' | 'SL' | 'CC' | 'EC';
export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface StationSummary {
  code: string;
  name: string;
  state?: string;
}

export interface Train {
  trainNumber: string;
  trainName: string;
  origin: StationSummary;
  destination: StationSummary;
  daysOfRun: DayOfWeek[];
  classes: TrainClass[];
  distanceKm: number;
  scheduledDuration: string;
  type: 'Rajdhani' | 'Shatabdi' | 'Express' | 'Duronto' | 'Vande Bharat' | 'Superfast';
}

export interface TrainPosition {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  bearingDegrees: number;
  speedKmh: number;
}

export interface StationStatus {
  code: string;
  name: string;
  kmFromOrigin: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival?: string;
  actualDeparture?: string;
  delayMinutes: number;
  platform?: string;
  lat: number;
  lon: number;
  isHalt: boolean;
}

export interface NextStationInfo extends StationStatus {
  etaMinutes: number;
  distanceKm: number;
  etaConfidence: 'high' | 'medium' | 'low';
}

export interface JourneyStats {
  distanceCoveredKm: number;
  distanceRemainingKm: number;
  completionPercentage: number; // 0 - 100
  totalDelayMinutes: number;
  delayTrend: 'improving' | 'worsening' | 'stable';
  averageSpeedKmh: number;
  currentSpeedKmh: number;
  journeyHealthScore: number; // 0 - 100
}

export interface LiveTrainStatus {
  trainNumber: string;
  trainName: string;
  position: TrainPosition;
  currentStation: StationStatus | null;
  previousStation: StationStatus | null;
  nextStation: NextStationInfo | null;
  allStations: StationStatus[];
  journeyStats: JourneyStats;
  lastUpdatedAt: string; // ISO 8601
  dataFreshness: 'live' | 'cached' | 'stale';
}

export interface RouteStation {
  code: string;
  name: string;
  km: number;
  kmFromOrigin?: number;
  lat: number;
  lon: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  haltMinutes?: number;
}

export interface SearchSuggestion {
  trainNumber: string;
  trainName: string;
  origin: string;
  destination: string;
  departureTime: string;
  status?: 'on_time' | 'delayed' | 'cancelled';
  delayMinutes?: number;
}

export interface WeatherData {
  stationName: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number; // km/h
  windDirection: string;
  condition: string;
  conditionCode: number;
  icon: string;
  visibilityKm: number;
  updatedAt: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  rainProbabilityPercentage: number;
  condition: string;
  icon: string;
}

export interface WeatherForecast {
  stationName: string;
  current: WeatherData;
  hourly: HourlyForecast[];
}

export interface ElevationDataPoint {
  distanceKm: number;
  elevationM: number;
  stationName?: string;
}

export interface ElevationProfile {
  trainNumber: string;
  points: ElevationDataPoint[];
  highestPointM: number;
  highestPointLocation: string;
  lowestPointM: number;
  totalAscentM: number;
  totalDescentM: number;
}

export type POIType = 
  | 'river' | 'lake' | 'mountain' | 'ghat'
  | 'bridge' | 'tunnel' | 'tourist_attraction'
  | 'city' | 'heritage';

export interface PointOfInterest {
  id: string;
  name: string;
  type: POIType;
  lat: number;
  lon: number;
  distanceFromTrainKm: number;
  description: string;
  imageUrl?: string;
  tags: string[];
}

export interface FavoriteTrain {
  trainNumber: string;
  trainName: string;
  origin: string;
  destination: string;
  savedAt: string;
}

export interface RecentSearch {
  query: string;
  trainNumber?: string;
  trainName?: string;
  searchedAt: string;
}

export interface SpeedDataPoint {
  time: string;
  speedKmh: number;
}

export interface DelayDataPoint {
  time: string;
  delayMinutes: number;
  stationName: string;
}

export interface UserSettings {
  autoRefreshIntervalSeconds: 15 | 30 | 60;
  distanceUnit: 'km' | 'miles';
  temperatureUnit: 'C' | 'F';
  reducedMotion: boolean;
  theme: 'white' | 'dark';
}
