import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InfrastructureItem } from "../types/infrastructure";
import { StatusBadge } from "./StatusBadge";
import { Activity, Zap, Droplets, Trash2, Wifi, MapPin } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, YAxis, XAxis, Tooltip } from 'recharts';

const icons = {
  Transport: Activity,
  Energy: Zap,
  Water: Droplets,
  Waste: Trash2,
  Connectivity: Wifi,
};

export const InfrastructureCard = ({ item }: { item: InfrastructureItem }) => {
  const Icon = icons[item.type];
  const utilization = (item.currentUsage / item.maxCapacity) * 100;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className="h-4 w-4 text-slate-600" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold">{item.name}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {item.zone} Zone
            </div>
          </div>
        </div>
        <StatusBadge status={item.status} />
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Utilization</span>
            <span className="font-medium">{Math.round(utilization)}%</span>
          </div>
          <Progress 
            value={utilization} 
            className="h-2" 
            // Custom color based on status would be nice but shadcn progress is limited without custom classes
          />
          <div className="text-2xl font-bold">
            {item.currentUsage.toLocaleString()} 
            <span className="text-sm font-normal text-muted-foreground ml-1">
              / {item.maxCapacity.toLocaleString()} {item.unit}
            </span>
          </div>
          
          <div className="h-[60px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={item.history}>
                <defs>
                  <linearGradient id={`gradient-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill={`url(#gradient-${item.id})`} 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};