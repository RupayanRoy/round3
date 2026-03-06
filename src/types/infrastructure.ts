export type InfrastructureType = 'Transport' | 'Energy' | 'Water' | 'Waste' | 'Connectivity' | 'Healthcare' | 'Public Services';
export type Zone = 'North' | 'South' | 'East' | 'West' | 'Central';
export type Status = 'Optimal' | 'Warning' | 'Critical' | 'Underutilized' | 'Congested' | 'Overloaded';

export interface DataPoint {
  time: string;
  value: number;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  type: InfrastructureType;
  zone: Zone;
  currentUsage: number;
  maxCapacity: number;
  unit: string;
  status: Status;
  history: DataPoint[];
  lastUpdated: string;
}

export interface CityStats {
  totalResources: number;
  criticalAlerts: number;
  averageUtilization: number;
  activeZones: number;
}