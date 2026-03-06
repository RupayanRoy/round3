import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InfrastructureItem, Status } from "../types/infrastructure";
import { StatusBadge } from "./StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InfrastructureTable = ({ data }: { data: InfrastructureItem[] }) => {
  const getUtilizationColor = (status: Status) => {
    if (['Critical', 'Congested', 'Overloaded'].includes(status)) return 'text-rose-600 font-bold';
    if (status === 'Warning') return 'text-amber-600 font-bold';
    if (status === 'Optimal') return 'text-emerald-600 font-bold';
    if (status === 'Underutilized') return 'text-blue-600 font-bold';
    return '';
  };

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b">
        <CardTitle className="text-lg font-bold">Infrastructure Monitoring Table</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/30">
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="font-bold text-right">Max Capacity</TableHead>
              <TableHead className="font-bold text-right">Current Usage</TableHead>
              <TableHead className="font-bold text-right">Utilization %</TableHead>
              <TableHead className="font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const utilization = (item.currentUsage / item.maxCapacity) * 100;
              return (
                <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.zone}</TableCell>
                  <TableCell className="text-right">{item.maxCapacity.toLocaleString()} {item.unit.split('/')[0]}</TableCell>
                  <TableCell className="text-right">{item.currentUsage.toLocaleString()} {item.unit.split('/')[0]}</TableCell>
                  <TableCell className={`text-right ${getUtilizationColor(item.status)}`}>
                    {Math.round(utilization)}%
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};