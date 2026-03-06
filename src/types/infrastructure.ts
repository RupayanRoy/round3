export type InfrastructureType = 'Power' | 'Water' | 'Transport' | 'Waste' | 'Traffic';

export interface InfrastructureResource {
  id: string;
  name: string;
  type: InfrastructureType;
  currentUtilization: number;
  maxCapacity: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical' | 'underutilized';
  trend: number[];
}

export interface CityZone {
  id: string;
  name: string;
  resources: InfrastructureResource[];
}

export interface Alert {
  id: string;
  timestamp: Date;
  zoneName: string;
  resourceName: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}