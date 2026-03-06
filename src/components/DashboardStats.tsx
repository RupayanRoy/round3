import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfrastructureItem } from "../types/infrastructure";
import { AlertTriangle, CheckCircle2, BarChart3, Map } from "lucide-react";

export const DashboardStats = ({ data }: { data: InfrastructureItem[] }) => {
  const criticalCount = data.filter(i => i.status === 'Critical').length;
  const warningCount = data.filter(i => i.status === 'Warning').length;
  const avgUtilization = data.reduce((acc, curr) => acc + (curr.currentUsage / curr.maxCapacity), 0) / data.length;

  const stats = [
    {
      title: "Critical Alerts",
      value: criticalCount,
      icon: AlertTriangle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "System Health",
      value: `${Math.round((1 - (criticalCount / data.length)) * 100)}%`,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Avg. Utilization",
      value: `${Math.round(avgUtilization * 100)}%`,
      icon: BarChart3,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Zones",
      value: new Set(data.map(i => i.zone)).size,
      icon: Map,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-slate-200">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};