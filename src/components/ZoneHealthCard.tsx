import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zone, InfrastructureItem } from "../types/infrastructure";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface Props {
  zone: Zone;
  items: InfrastructureItem[];
}

export const ZoneHealthCard = ({ zone, items }: Props) => {
  const zoneItems = items.filter(i => i.zone === zone);
  if (zoneItems.length === 0) return null;

  const avgUtilization = zoneItems.reduce((acc, item) => acc + (item.currentUsage / item.maxCapacity), 0) / zoneItems.length;
  const healthScore = Math.max(0, 100 - (avgUtilization * 100));
  const criticalCount = zoneItems.filter(i => ['Critical', 'Overloaded', 'Congested'].includes(i.status)).length;

  const getStatus = () => {
    if (healthScore > 70 && criticalCount === 0) return { label: 'Healthy', color: 'text-emerald-500', icon: ShieldCheck, bg: 'bg-emerald-50' };
    if (healthScore > 40) return { label: 'Strained', color: 'text-amber-500', icon: ShieldAlert, bg: 'bg-amber-50' };
    return { label: 'Critical', color: 'text-rose-500', icon: ShieldX, bg: 'bg-rose-50' };
  };

  const status = getStatus();

  return (
    <Card className="border-slate-200 overflow-hidden">
      <CardHeader className={`pb-2 ${status.bg}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold">{zone} District</CardTitle>
          <status.icon className={`h-4 w-4 ${status.color}`} />
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Health Score</p>
            <p className={`text-2xl font-black ${status.color}`}>{Math.round(healthScore)}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Active Issues</p>
            <p className="text-lg font-bold text-slate-700">{criticalCount}</p>
          </div>
        </div>
        <Progress value={healthScore} className={`h-1.5 ${status.color === 'text-emerald-500' ? 'bg-emerald-100' : status.color === 'text-amber-500' ? 'bg-amber-100' : 'bg-rose-100'}`} />
        <p className="text-[10px] text-slate-500 italic">Based on {zoneItems.length} monitored assets</p>
      </CardContent>
    </Card>
  );
};