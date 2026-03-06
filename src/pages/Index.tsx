import { useState } from 'react';
import { useInfrastructureData } from '../hooks/use-infrastructure-data';
import { InfrastructureCard } from '../components/InfrastructureCard';
import { DashboardStats } from '../components/DashboardStats';
import { AlertPanel } from '../components/AlertPanel';
import { InfrastructureTable } from '../components/InfrastructureTable';
import { CityMap } from '../components/CityMap';
import { Zone, InfrastructureType } from '../types/infrastructure';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Bell, Settings, Search, Table as TableIcon, Map as MapIcon, Grid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const data = useInfrastructureData();
  const [zoneFilter, setZoneFilter] = useState<Zone | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<InfrastructureType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(item => {
    const matchesZone = zoneFilter === 'All' || item.zone === zoneFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <header className="sticky top-0 z-[1000] w-full border-b bg-white/80 backdrop-blur-md px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">SmartCity Monitor</h1>
              <p className="text-[10px] font-medium text-indigo-600 uppercase tracking-wider">Infrastructure OS v2.4</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Bell className="h-4 w-4 text-slate-600" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Settings className="h-4 w-4 text-slate-600" />
              </Button>
              <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Infrastructure Overview</h2>
            <p className="text-slate-500 mt-1">Real-time capacity and utilization monitoring across city zones.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live System Feed Active
          </div>
        </div>

        <DashboardStats data={data} />

        <Tabs defaultValue="grid" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <TabsList className="bg-slate-100">
                <TabsTrigger value="grid" className="gap-2">
                  <Grid className="h-4 w-4" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="table" className="gap-2">
                  <TableIcon className="h-4 w-4" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="map" className="gap-2">
                  <MapIcon className="h-4 w-4" />
                  Map
                </TabsTrigger>
              </TabsList>
              <div className="h-6 w-px bg-slate-200 hidden md:block" />
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search infrastructure..." 
                  className="pl-9 bg-slate-50 border-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={zoneFilter} onValueChange={(v) => setZoneFilter(v as any)}>
                <SelectTrigger className="w-[140px] bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Zones</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="Central">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <Button variant="outline" size="sm" onClick={() => {setZoneFilter('All'); setTypeFilter('All'); setSearchQuery('');}}>
                Reset
              </Button>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="grid" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredData.length > 0 ? (
                    filteredData.map(item => (
                      <InfrastructureCard key={item.id} item={item} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                      <p className="text-slate-400">No infrastructure items match your current filters.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-span-1">
                <AlertPanel data={data} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="table">
            <InfrastructureTable data={filteredData} />
          </TabsContent>

          <TabsContent value="map">
            <CityMap data={filteredData} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-auto border-t bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2024 SmartCity Administration Dashboard. All rights reserved.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;