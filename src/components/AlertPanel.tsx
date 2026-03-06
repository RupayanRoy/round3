import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfrastructureItem } from "../types/infrastructure";
import { AlertCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AlertPanel = ({ data }: { data: InfrastructureItem[] }) => {
  const alerts = data.filter(i => i.status === 'Critical' || i.status === 'Warning');

  return (
    <Card className="h-full border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-rose-500" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No active alerts detected.</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${alert.status === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold leading-none">{alert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.status === 'Critical' ? 'Overload detected' : 'Approaching capacity'} in {alert.zone} zone.
                    </p>
                    <div className="flex items-center text-[10px] text-slate-400">
                      <Clock className="h-3 w-3 mr-1" />
                      Just now
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};