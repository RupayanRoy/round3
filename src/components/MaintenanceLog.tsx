import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MaintenanceTask } from "../types/infrastructure";
import { Wrench, Calendar, Clock } from "lucide-react";

const MOCK_TASKS: MaintenanceTask[] = [
  { id: '1', assetId: 'power-1', assetName: 'West Substation 4', type: 'Upgrade', status: 'In Progress', date: '2024-05-20', priority: 'High' },
  { id: '2', assetId: 'water-1', assetName: 'North Sector Reservoir', type: 'Routine', status: 'Scheduled', date: '2024-05-22', priority: 'Medium' },
  { id: '3', assetId: 'traffic-1', assetName: 'Main St. Traffic Flow', type: 'Emergency', status: 'Completed', date: '2024-05-18', priority: 'High' },
  { id: '4', assetId: 'hospital-1', assetName: 'City General ICU', type: 'Routine', status: 'Scheduled', date: '2024-05-25', priority: 'Low' },
];

export const MaintenanceLog = () => {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Wrench className="h-5 w-5 text-indigo-600" />
          Maintenance Schedule
        </CardTitle>
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100">
          4 Active Tasks
        </Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TASKS.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.assetName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">{task.type}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-bold ${task.priority === 'High' ? 'text-rose-600' : task.priority === 'Medium' ? 'text-amber-600' : 'text-blue-600'}`}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {task.date}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                      'bg-slate-100 text-slate-700 hover:bg-slate-100'
                    }
                  >
                    {task.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};