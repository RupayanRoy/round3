import { useState, useEffect, useCallback } from 'react';
import { CityZone, InfrastructureResource, Alert } from '../types/infrastructure';

const INITIAL_ZONES: CityZone[] = [
  {
    id: 'cbd',
    name: 'Central Business District',
    resources: [
      { id: 'cbd-pwr', name: 'Main Grid', type: 'Power', currentUtilization: 850, maxCapacity: 1000, unit: 'MW', status: 'optimal', trend: [820, 830, 850] },
      { id: 'cbd-wtr', name: 'Water Station A', type: 'Water', currentUtilization: 450, maxCapacity: 600, unit: 'L/s', status: 'optimal', trend: [440, 445, 450] },
      { id: 'cbd-trns', name: 'Metro Line 1', type: 'Transport', currentUtilization: 12000, maxCapacity: 15000, unit: 'Pax', status: 'optimal', trend: [11000, 11500, 12000] },
    ]
  },
  {
    id: 'ind',
    name: 'Industrial Park',
    resources: [
      { id: 'ind-pwr', name: 'Heavy Industry Grid', type: 'Power', currentUtilization: 1800, maxCapacity: 2000, unit: 'MW', status: 'warning', trend: [1700, 1750, 1800] },
      { id: 'ind-wst', name: 'Waste Processing', type: 'Waste', currentUtilization: 85, maxCapacity: 100, unit: 'Tons', status: 'optimal', trend: [80, 82, 85] },
    ]
  },
  {
    id: 'res',
    name: 'Residential East',
    resources: [
      { id: 'res-pwr', name: 'Substation 4', type: 'Power', currentUtilization: 300, maxCapacity: 800, unit: 'MW', status: 'underutilized', trend: [310, 305, 300] },
      { id: 'res-trf', name: 'Main Arterial', type: 'Traffic', currentUtilization: 95, maxCapacity: 100, unit: 'V/m', status: 'critical', trend: [85, 90, 95] },
    ]
  }
];

export const useInfrastructureData = () => {
  const [zones, setZones] = useState<CityZone[]>(INITIAL_ZONES);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const updateData = useCallback(() => {
    setZones(prevZones => prevZones.map(zone => ({
      ...zone,
      resources: zone.resources.map(resource => {
        const change = (Math.random() - 0.5) * (resource.maxCapacity * 0.05);
        const newValue = Math.max(0, Math.min(resource.maxCapacity, resource.currentUtilization + change));
        
        const utilizationRatio = newValue / resource.maxCapacity;
        let status: InfrastructureResource['status'] = 'optimal';
        
        if (utilizationRatio > 0.9) status = 'critical';
        else if (utilizationRatio > 0.75) status = 'warning';
        else if (utilizationRatio < 0.2) status = 'underutilized';

        // Generate alert if status changed to critical or warning
        if (status === 'critical' && resource.status !== 'critical') {
          const newAlert: Alert = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
            zoneName: zone.name,
            resourceName: resource.name,
            message: `${resource.name} is operating at near maximum capacity (${(utilizationRatio * 100).toFixed(1)}%)`,
            severity: 'high'
          };
          setAlerts(prev => [newAlert, ...prev].slice(0, 10));
        }

        return {
          ...resource,
          currentUtilization: newValue,
          status,
          trend: [...resource.trend.slice(-19), newValue]
        };
      })
    })));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateData, 3000);
    return () => clearInterval(interval);
  }, [updateData]);

  return { zones, alerts };
};