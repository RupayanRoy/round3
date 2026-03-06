import React from 'react';
import { InfrastructureResource } from '../types/infrastructure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Droplets, Train, Trash2, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Power: Zap,
  Water: Droplets,
  Transport: Train,
  Waste: Trash2,
  Traffic: Activity,
};

interface Props {
  resource: InfrastructureResource;
}

const InfrastructureCard: React.FC<Props> = ({ resource }) => {
  const Icon = iconMap[resource.type];
  const utilizationPercent = (resource.currentUtilization / resource.maxCapacity) * 100;
  
  const statusColors = {
    optimal: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    warning: 'bg-amber-500/10 text-amber-600 border-amber-200',
    critical: 'bg-rose-500/10 text-rose-600 border-rose-200',
    underutilized: 'bg-blue-500/10 text-blue-600 border-blue-200',
  };

  const progressColors = {
    optimal: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-rose-500',
    underutilized: 'bg-blue-500',
  };

  const isTrendingUp = resource.trend[resource.trend.length - 1] > resource.trend[resource.trend.length - 2];

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", statusColors[resource.status])}>
            <Icon size={20} />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-slate-700">{resource.name}</CardTitle>
            <p className="text-xs text-slate-500">{resource.type}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn("capitalize font-medium", statusColors[resource.status])}>
          {resource.status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-2xl font-black text-slate-900">
              {Math.round(resource.currentUtilization).toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">
              {resource.unit}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold">
            {isTrendingUp ? (
              <TrendingUp size={14} className="text-rose-500" />
            ) : (
              <TrendingDown size={14} className="text-emerald-500" />
            )}
            <span className={isTrendingUp ? "text-rose-500" : "text-emerald-500"}>
              {utilizationPercent.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-1000 ease-in-out", progressColors[resource.status])}
            style={{ width: `${utilizationPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <span>0 {resource.unit}</span>
          <span>Capacity: {resource.maxCapacity.toLocaleString()} {resource.unit}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfrastructureCard;