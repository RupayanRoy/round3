import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfrastructureItem } from "../types/infrastructure";
import { AlertTriangle, CheckCircle2, BarChart3, ArrowDownCircle, Activity } from "lucide-react";

export const DashboardStats = ({ data }: { data: InfrastructureItem[] }) => {
  const overloaded = data.filter(i => ['Critical', 'Congested', 'Overloaded'].includes(i.status)).length;
  const high = data.filter(i => i.status === 'Warning').length;
  const normal = data.filter(i => i.status === 'Optimal').length;
  const underutilized = data.filter(i => i.status === 'Underutilized').length;

  const stats = [
    {
      title: "Overloaded",
      value: overloaded,
      icon: AlertTriangle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      description: "Requires immediate attention"
    },
    {
      title: "High Utilization",
      value: high,
      icon: Activity,
      color: "text-amber-600",
      bg: "bg-amber-50",
      description: "Approaching capacity"
    },
    {
      title: "Normal",
      value: normal,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      description: "Operating optimally"
    },
    {
      title: "Underutilized",
      value: underutilized,
      icon: ArrowDownCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Excess capacity available"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-md ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-[10px] text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};