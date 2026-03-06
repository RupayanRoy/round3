import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { InfrastructureItem, Status } from '../types/infrastructure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CityMap = ({ data }: { data: InfrastructureItem[] }) => {
  const getMarkerColor = (status: Status) => {
    if (['Critical', 'Congested', 'Overloaded'].includes(status)) return '#e11d48'; // Red
    if (status === 'Warning') return '#d97706'; // Yellow/Amber
    if (status === 'Optimal') return '#10b981'; // Green
    if (status === 'Underutilized') return '#2563eb'; // Blue
    return '#64748b';
  };

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden h-[500px]">
      <CardHeader className="bg-slate-50/50 border-b">
        <CardTitle className="text-lg font-bold">City Utilization Heatmap</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((item) => (
            <CircleMarker
              key={item.id}
              center={item.coordinates}
              pathOptions={{ 
                fillColor: getMarkerColor(item.status), 
                color: getMarkerColor(item.status),
                fillOpacity: 0.6,
                weight: 2
              }}
              radius={15}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="font-bold">{item.name}</div>
                <div className="text-xs">{item.status} - {Math.round((item.currentUsage / item.maxCapacity) * 100)}%</div>
              </Tooltip>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <p className="text-xs text-slate-500">{item.type} | {item.zone} Zone</p>
                  <div className="mt-2 text-xs">
                    <span className="font-semibold">Usage:</span> {item.currentUsage} / {item.maxCapacity} {item.unit}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
};