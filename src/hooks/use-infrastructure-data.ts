import { useState, useEffect, useCallback } from 'react';
import { InfrastructureItem, Status, Zone, InfrastructureType } from '../types/infrastructure';

const INITIAL_DATA: InfrastructureItem[] = [
  {
    id: 'traffic-1',
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
    id: 'parking-1',
    name: 'Downtown Parking Lot A',
    type: 'Transport',
    zone: 'Central',
    currentUsage: 180,
    maxCapacity: 200,
    unit: 'Spaces',
    status: 'Warning',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'hospital-1',
    name: 'City General ICU',
    type: 'Healthcare',
    zone: 'East',
    currentUsage: 42,
    maxCapacity: 50,
    unit: 'Beds',
    status: 'Warning',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'water-1',
    name: 'North Sector Reservoir',
    type: 'Water',
    zone: 'North',
    currentUsage: 8500,
    maxCapacity: 10000,
    unit: 'm³',
    status: 'Optimal',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'power-1',
    name: 'West Substation 4',
    type: 'Energy',
    zone: 'West',
    currentUsage: 850,
    maxCapacity: 1000,
    unit: 'MW',
    status: 'Warning',
    history: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'waste-1',
    name: 'South Recycling Center',
    type: 'Waste',
    zone: 'South',
    currentUsage: 120,
    maxCapacity: 500,
    unit: 'Tons/day',
    status: 'Underutilized',
    history: [],
    lastUpdated: new Date().toISOString(),
  }
];

export function useInfrastructureData() {
  const [data, setData] = useState<InfrastructureItem[]>(INITIAL_DATA);

  const getStatus = (usage: number, capacity: number, type: InfrastructureType): Status => {
    const ratio = usage / capacity;
    
    if (ratio > 0.95) {
      if (type === 'Transport') return 'Congested';
      if (type === 'Energy' || type === 'Water') return 'Overloaded';
      return 'Critical';
    }
    if (ratio > 0.8) return 'Warning';
    if (ratio < 0.15) return 'Underutilized';
    return 'Optimal';
  };

  const updateData = useCallback(() => {
    setData(prevData => prevData.map(item => {
      // Simulate realistic fluctuations based on type
      let volatility = 0.05; // 5% default
      if (item.type === 'Transport') volatility = 0.15; // Traffic is swingy
      if (item.type === 'Healthcare') volatility = 0.02; // Hospital beds change slowly
      
      const change = (Math.random() - 0.45) * (item.maxCapacity * volatility); // Slight upward bias
      const newUsage = Math.max(0, Math.min(item.maxCapacity * 1.1, item.currentUsage + change)); // Allow slight overflow for 'Overloaded'
      const newStatus = getStatus(newUsage, item.maxCapacity, item.type);
      
      const newHistory = [...item.history, { 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
        value: Math.round(newUsage) 
      }].slice(-15);

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
    // Run every 5 seconds as requested
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, [updateData]);

  return data;
}