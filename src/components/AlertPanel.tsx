import React from 'react';
import { Alert } from '../types/infrastructure';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Bell, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Props {
  alerts: Alert[];
}

const AlertPanel: React.FC<Props> = ({ alerts }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 h-full flex flex-col border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Bell size={20} />
          </div>
          <h2 className="font-black text-slate-800 tracking-tight">System Alerts</h2>
        </div>
        {alerts.length > 0 && (
          <span className="px-2 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full animate-pulse">
            {alerts.length} NEW
          </span>
        )}
      </div>

      <ScrollArea className="flex-1 pr-4">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <AlertCircle size={32} className="mb-2 opacity-20" />
            <p className="text-sm font-medium">No active alerts</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={cn(
                  "p-4 rounded-2xl border-l-4 transition-all hover:translate-x-1",
                  alert.severity === 'high' ? "bg-rose-50 border-rose-500" : "bg-amber-50 border-amber-500"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {alert.zoneName}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <Clock size={10} />
                    {format(alert.timestamp, 'HH:mm:ss')}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{alert.resourceName}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{alert.message}</p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default AlertPanel;