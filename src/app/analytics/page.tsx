"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  MapPin, 
  Car, 
  Clock, 
  Calendar,
  Zap,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from "recharts";

const throughputData = [
  { day: "Mon", vehicleVolume: 42000, peopleThroughput: 68000 },
  { day: "Tue", vehicleVolume: 41000, peopleThroughput: 65000 },
  { day: "Wed", vehicleVolume: 39000, peopleThroughput: 72000 }, // High shuttle use
  { day: "Thu", vehicleVolume: 44000, peopleThroughput: 70000 },
  { day: "Fri", vehicleVolume: 46000, peopleThroughput: 62000 }, // Low shuttle use
];

const bottleneckData = [
  { junction: "Cyber Towers", delay: 24, score: 92 },
  { junction: "Mindspace", delay: 18, score: 84 },
  { junction: "Gachibowli X", delay: 32, score: 76 },
  { junction: "Bio-Diversity", delay: 14, score: 94 },
  { junction: "DLF Gate", delay: 22, score: 81 },
];

export default function Analytics() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative space-y-6 md:space-y-8 scrollbar-hide font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-blue opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white flex flex-wrap items-center gap-3 md:gap-4">
            Flow Analytics
            <div className="px-3 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded-full flex items-center gap-2 shrink-0">
               <TrendingUp className="w-3 h-3 text-accent-blue" />
               <span className="text-[10px] font-bold text-accent-blue font-mono uppercase">OPTIMIZED</span>
            </div>
          </h1>
          <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
            Neural insights into traffic velocity, commuter throughput, and AI-predicted bottleneck scores for the IT corridor.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          <button className="flex-1 sm:flex-none px-4 py-2.5 glass-panel border-white/10 text-white font-bold text-[10px] flex items-center justify-center gap-2 hover:bg-white/5 transition-all uppercase tracking-widest">
            <Filter className="w-4 h-4" />
             Last 7 Days
          </button>
          <button className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-accent-blue text-background font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 uppercase tracking-tighter">
             <BarChart3 className="w-4 h-4" />
             Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Throughput Analytics */}
        <div className="glass-panel p-8 border-white/5 bg-white/2 space-y-8">
           <div className="flex items-center justify-between">
              <div>
                 <h3 className="text-xl font-bold text-white tracking-tight">People Throughput vs. Vehicle Volume</h3>
                 <p className="text-slate-500 text-xs">A metric to determine 'Quality of Flow' by counting people in high-occupancy corridors.</p>
              </div>
           </div>

           <div className="h-[350px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={throughputData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis 
                   dataKey="day" 
                   stroke="rgba(255,255,255,0.2)" 
                   fontSize={11} 
                   tickLine={false} 
                   axisLine={false} 
                 />
                 <YAxis hide />
                 <Tooltip 
                   cursor={{ fill: "rgba(255,255,255,0.03)" }}
                   contentStyle={{ 
                     backgroundColor: "rgba(2, 6, 23, 0.9)", 
                     border: "1px solid rgba(255,255,255,0.1)",
                     borderRadius: "12px",
                     fontSize: "12px"
                   }}
                 />
                 <Bar dataKey="vehicleVolume" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} name="Vehicle Count" />
                 <Bar dataKey="peopleThroughput" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} name="Commuter Count" />
               </BarChart>
             </ResponsiveContainer>
           </div>
           
           <div className="flex gap-8 border-t border-white/5 pt-6">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Occupancy Ratio</p>
                 <p className="text-2xl font-bold text-white font-mono">1.64 <span className="text-xs text-emerald-500">+12%</span></p>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-500 uppercase">Shuttle Efficiency</p>
                 <p className="text-2xl font-bold text-accent-blue font-mono">92.4%</p>
              </div>
           </div>
        </div>

        {/* Bottleneck Prediction GNN */}
        <div className="glass-panel p-8 border-white/5 bg-white/2 space-y-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan opacity-[0.03] blur-3xl rounded-full" />
           <div className="flex items-center justify-between">
              <div>
                 <h3 className="text-xl font-bold text-white tracking-tight">Bottleneck Propensity Index</h3>
                 <p className="text-slate-500 text-xs">GNN predictions on intersection saturation for the next 90 minutes.</p>
              </div>
              <div className="px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full flex items-center gap-2">
                 <Zap className="w-3 h-3 text-accent-cyan" />
                 <span className="text-[10px] font-bold text-accent-cyan font-mono uppercase">90M FORECAST</span>
              </div>
           </div>

           <div className="space-y-6">
              {bottleneckData.map((item, i) => (
                <div key={i} className="space-y-2 group/item">
                   <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs text-slate-500 font-bold group-hover/item:text-white transition-colors">0{i+1}</div>
                         <div>
                            <p className="text-sm font-bold text-white">{item.junction}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{item.delay}M AVG DELAY</p>
                         </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-lg font-bold font-mono text-accent-cyan">{item.score}%</span>
                         <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">STABILITY</span>
                      </div>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-cyan opacity-80" 
                        style={{ width: `${item.score}%` }} 
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="glass-panel p-6 border-white/5 bg-white/2 flex flex-col justify-between">
            <div>
               <h4 className="text-md font-bold text-white mb-2 tracking-tight">Corporate "Shift-Peak" Analysis</h4>
               <p className="text-xs text-slate-500 leading-relaxed">Top contributors to peak volume at Hitech City Node B.</p>
            </div>
            <div className="space-y-4 py-6">
               {[
                 { name: "Microsoft Campus", impact: "High", trend: "stable" },
                 { name: "Mindspace Tech Park", impact: "Critical", trend: "up" },
                 { name: "Google Corporate", impact: "Moderate", trend: "down" },
               ].map((corp, i) => (
                 <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 p-3 rounded-xl">
                    <span className="text-xs font-medium text-white">{corp.name}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                       corp.impact === "Critical" ? "bg-accent-red/20 text-accent-red" : 
                       corp.impact === "High" ? "bg-accent-orange/20 text-accent-orange" : 
                       "bg-emerald-500/20 text-emerald-400"
                    }`}>{corp.impact}</span>
                 </div>
               ))}
            </div>
            <button className="w-full py-3 rounded-xl border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-all">VIEW CORPORATE BREAKDOWN</button>
         </div>

         <div className="lg:col-span-2 glass-panel p-6 border-white/5 bg-accent-blue/2 relative overflow-hidden">
            <h4 className="text-md font-bold text-white mb-6 flex items-center gap-2">
               <Activity className="w-4 h-4 text-accent-blue" />
               Historical Flow Performance (Peak Hour)
            </h4>
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={throughputData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis 
                       dataKey="day" 
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
                         borderRadius: "12px"
                       }}
                     />
                     <Line type="monotone" dataKey="peopleThroughput" stroke="var(--accent-blue)" strokeWidth={4} dot={{ fill: "var(--accent-blue)", strokeWidth: 2, r: 4 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-4">
               <div className="flex flex-col items-center">
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Latency Reduction</span>
                  <span className="text-sm font-bold text-emerald-500">-15.3%</span>
               </div>
               <div className="h-6 w-px bg-white/10" />
               <div className="flex flex-col items-center">
                  <span className="text-[8px] font-bold text-slate-500 uppercase">CO2 Offset (Estimated)</span>
                  <span className="text-sm font-bold text-white">4.2 Metric Tons</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
