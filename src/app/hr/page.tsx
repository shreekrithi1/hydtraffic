"use client";

import React from "react";
import { 
  Users, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight, 
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  BarChart2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { time: "07:00", demand: 2000, capacity: 5000 },
  { time: "07:30", demand: 3200, capacity: 5000 },
  { time: "08:00", demand: 4500, capacity: 5000 },
  { time: "08:30", demand: 6800, capacity: 5000 }, // Peak starts
  { time: "09:00", demand: 8200, capacity: 5000 }, // Peak
  { time: "09:30", demand: 5400, capacity: 5000 },
  { time: "10:00", demand: 3100, capacity: 5000 },
  { time: "10:30", demand: 1800, capacity: 5000 },
];

export default function HRPortal() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative space-y-8 scrollbar-hide">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-orange opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white flex flex-wrap items-center gap-3 md:gap-4">
            Corporate Shift-Sync
            <div className="px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full flex items-center gap-2">
              <Users className="w-3 h-3 text-accent-cyan" />
              <span className="text-[10px] font-bold text-accent-cyan font-mono uppercase">Microsoft_Hyd_Node</span>
            </div>
          </h1>
          <p className="text-sm text-slate-400 font-medium">Managing 12,000 employee commute slots for the Gachibowli Campus.</p>
        </div>
        
        <button className="w-full lg:w-auto px-6 py-3 rounded-xl bg-white text-background font-bold text-sm transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          BULK SHIFT UPLOAD
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Demand Visualization */}
        <div className="lg:col-span-2 glass-panel p-4 md:p-8 border-white/5 bg-white/2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">Supply vs. Demand Curve</h3>
              <p className="text-slate-500 text-[10px] md:text-xs">Real-time road capacity utilization for HITECH City Node</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan/30 border border-accent-cyan" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capacity</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(2, 6, 23, 0.9)", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="var(--accent-cyan)" 
                  fillOpacity={1} 
                  fill="url(#colorDemand)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="capacity" 
                  stroke="rgba(255,255,255,0.1)" 
                  fill="transparent" 
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-xl bg-accent-orange/5 border border-accent-orange/20 flex items-start gap-4">
             <AlertCircle className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
             <div className="space-y-1">
                <p className="text-sm font-bold text-accent-orange uppercase tracking-wider">Peak Overload Alert</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your current 09:00 AM shift contributes <span className="text-white font-bold">3,200 vehicles</span> to a node already at 100% capacity. 
                  Shifting 1,500 employees to the <span className="text-emerald-500 font-bold">08:15 AM</span> window will grant 
                  them <span className="text-emerald-500 font-bold">"Priority Green Wave"</span> access.
                </p>
             </div>
          </div>
        </div>

        {/* Rotation Planner */}
        <div className="space-y-6">
          <div className="glass-panel p-6 border-white/5 bg-white/2">
            <h3 className="text-md font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-cyan" />
              Allocated Shift Windows
            </h3>
            <div className="space-y-4">
              {[
                { label: "Window A", time: "08:00 - 08:30", status: "active", count: "4,500" },
                { label: "Window B", time: "08:45 - 09:15", status: "restricted", count: "1,200", reason: "Peak Constraint" },
                { label: "Window C", time: "09:30 - 10:00", status: "available", count: "3,800" },
              ].map((window, i) => (
                <div key={i} className={`p-4 rounded-xl border transition-all ${
                  window.status === "restricted" ? "bg-accent-red/5 border-accent-red/20 opacity-60" : 
                  window.status === "active" ? "bg-accent-cyan/5 border-accent-cyan/20" :
                  "bg-white/5 border-white/10 hover:bg-white/10"
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{window.label}</span>
                    {window.status === "active" ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    ) : window.status === "restricted" ? (
                      <AlertCircle className="w-3 h-3 text-accent-red" />
                    ) : null}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-white">{window.time}</p>
                      <p className="text-[10px] text-slate-500">{window.count} Employees</p>
                    </div>
                    <button className="text-[10px] font-bold text-accent-cyan hover:underline">MANAGE</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 border-white/5 bg-white/2 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <BarChart2 className="w-8 h-8 text-white/5" />
             </div>
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Traffic Compliance Score</h3>
             <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-extrabold text-white">842</span>
                <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs pb-1">
                   <ArrowUpRight size={14} />
                   +12.4%
                </div>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Your compliance with AI-suggested windows has earned <span className="text-white font-bold">12,400 Flow Credits</span> this month.
             </p>
             <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase mb-2">
                <span>Next Tier: PLATINUM</span>
                <span>80% PATH COMPLETE</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
             </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 border-white/5 bg-white/2">
        <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Active Commute Optimization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { title: "Carpooling Incentive", desc: "Unlock 2x Flow Credits for every employee using corporate carpooling.", action: "ENABLE" },
             { title: "Green Wave Priority", desc: "Prioritize corporate shuttles on Raidurg flyover for tomorrow's 08:15 slot.", action: "REQUEST" },
             { title: "WFO/WFH Re-balance", desc: "AI suggests 20% WFH for Marketing Team to avoid Mindspace blockage.", action: "VIEW PLAN" },
           ].map((card, i) => (
             <div key={i} className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">{card.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
                <button className="mt-6 text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-1 tracking-widest uppercase">
                  {card.action} <ChevronRight size={12} />
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
