export type InfrastructureType = 'Transport' | 'Energy' | 'Water' | 'Waste' | 'Connectivity' | 'Healthcare' | 'Public Services';
export type Zone = 'North' | 'South' | 'East' | 'West' | 'Central';
export type Status = 'Optimal' | 'Warning' | 'Critical' | 'Underutilized' | 'Congested' | 'Overloaded';

export interface DataPoint {
  time: string;
  value: number;
}

export interface MaintenanceTask {
  id: string;
  assetId: string;
  assetName: string;
  type: 'Routine' | 'Emergency' | 'Upgrade';
  status: 'Scheduled' | 'In Progress' | 'Completed';
  date: string;
  priority: 'Low' | 'Medium' | 'High';
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
  coordinates: [number, number];
}

export interface ZoneHealth {
  zone: Zone;
  score: number; // 0-100
  status: 'Healthy' | 'Strained' | 'Critical';
  activeIssues: number;
}