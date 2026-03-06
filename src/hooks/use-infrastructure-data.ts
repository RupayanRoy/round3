import { useState, useEffect, useCallback } from 'react';
import { InfrastructureItem, Status, Zone, InfrastructureType } from '../types/infrastructure';

const INITIAL_DATA: InfrastructureItem[] = [
  {
    id: '1',
    name: 'Main St. Traffic Flow',
    type: 'Transport',
    zone: 'Central',
    currentUsage: 450,
    maxCapacity: 1000,
    unit: 'Vehicles/hr',
    status: 'Optimal',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'North Power Grid',
    type: 'Energy',
    zone: 'North',
    currentUsage: 850,
    maxCapacity: 1000,
    unit: 'MW',
    status: 'Warning',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'East Reservoir',
    type: 'Water',
    zone: 'East',
    currentUsage: 200,
    maxCapacity: 1000,
    unit: 'ML',
    status: 'Underutilized',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Downtown 5G Node',
    type: 'Connectivity',
    zone: 'Central',
    currentUsage: 950,
    maxCapacity: 1000,
    unit: 'Gbps',
    status: 'Critical',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'South Waste Facility',
    type: 'Waste',
    zone: 'South',
    currentUsage: 600,
    maxCapacity: 1000,
    unit: 'Tons/day',
    status: 'Optimal',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'West Metro Line',
    type: 'Transport',
    zone: 'West',
    currentUsage: 780,
    maxCapacity: 1000,
    unit: 'Pax/hr',
    status: 'Warning',
    history: [],
    lastUpdated: new Date().toISOString(),
  }
];

export function useInfrastructureData() {
  const [data, setData] = useState<InfrastructureItem[]>(INITIAL_DATA);

  const getStatus = (usage: number, capacity: number): Status => {
    const ratio = usage / capacity;
    if (ratio > 0.9) return 'Critical';
    if (ratio > 0.75) return 'Warning';
    if (ratio < 0.25) return 'Underutilized';
    return 'Optimal';
  };

  const updateData = useCallback(() => {
    setData(prevData => prevData.map(item => {
      // Simulate small fluctuations
      const change = (Math.random() - 0.5) * 50;
      const newUsage = Math.max(0, Math.min(item.maxCapacity, item.currentUsage + change));
      const newStatus = getStatus(newUsage, item.maxCapacity);
      
      const newHistory = [...item.history, { 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
        value: Math.round(newUsage) 
      }].slice(-10);

      return {
        ...item,
        currentUsage: Math.round(newUsage),
        status: newStatus,
        history: newHistory,
        lastUpdated: new Date().toISOString()
      };
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateData, 3000);
    return () => clearInterval(interval);
  }, [updateData]);

  return data;
}