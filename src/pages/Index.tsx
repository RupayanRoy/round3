import React, { useState } from 'react';
import { useInfrastructureData } from '../hooks/useInfrastructureData';
import InfrastructureCard from '../components/InfrastructureCard';
import UtilizationChart from '../components/UtilizationChart';
import AlertPanel from '../components/AlertPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Map, Settings, ShieldAlert, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { zones, alerts } = useInfrastructureData();
  const [activeZoneId, setActiveZoneId] = useState(zones[0].id);
  
  const activeZone = zones.find(z => z.id === activeZoneId) || zones[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-200 flex flex-col items-center py-8 gap-8 z-50">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <ShieldAlert size={24} />
        </div>
        <nav className="flex flex-col gap-4">
          <button className="p-3 rounded-xl bg-indigo-50 text-indigo-600 transition-all">
            <LayoutDashboard size={24} />
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
            <Map size={24} />
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
            <Settings size={24} />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pl-20 min-h-screen">
        <header className="sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-40 px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">SmartCity Monitor</h1>
            <p className="text-slate-500 font-medium">Infrastructure Capacity & Utilization Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Search resources..." 
                className="pl-10 bg-white border-none shadow-sm rounded-xl focus-visible:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live System</span>
            </div>
          </div>
        </header>

        <div className="px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Main Dashboard */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs defaultValue={zones[0].id} onValueChange={setActiveZoneId} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-slate-200/50 p-1 rounded-2xl h-auto">
                  {zones.map(zone => (
                    <TabsTrigger 
                      key={zone.id} 
                      value={zone.id}
                      className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-slate-600 data-[state=active]:text-indigo-600 transition-all"
                    >
                      {zone.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZoneId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {activeZone.resources.map(resource => (
                      <InfrastructureCard key={resource.id} resource={resource} />
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {activeZone.resources.slice(0, 2).map(resource => (
                      <UtilizationChart key={`chart-${resource.id}`} resource={resource} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Tabs>

            {/* System Overview Stats */}
            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2">City-Wide Efficiency</h3>
                <p className="text-indigo-100 mb-6 max-w-md">Overall infrastructure utilization is currently at 64%. No major outages detected in the last 24 hours.</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-3xl font-black">98.2%</p>
                    <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Uptime</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">12.4k</p>
                    <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Active Nodes</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">0.4s</p>
                    <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Latency</p>
                  </div>
                </div>
              </div>
              <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute left-[-20px] top-[-20px] w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Right Column: Alerts & Notifications */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 h-[calc(100vh-160px)]">
              <AlertPanel alerts={alerts} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;