"use client";

import React from "react";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Zap, 
  Car, 
  Activity, 
  ChevronRight, 
  Radio, 
  CheckCircle2, 
  AlertCircle,
  Video
} from "lucide-react";

export default function Incidents() {
  const incidents = [
    { 
      id: "INC-2442", 
      type: "Stalled Vehicle", 
      location: "Cyber Towers Flyover Node A", 
      time: "09:42:12", 
      severity: "High", 
      status: "In Progress",
      aiDetection: "YOLO v5 - Conf 94%",
      impact: "12 min delay",
      action: "Patrol Dispatched"
    },
    { 
      id: "INC-2441", 
      type: "Wrong Side Driving", 
      location: "Bio-Diversity Flyover Entry", 
      time: "09:38:04", 
      severity: "Critical", 
      status: "Automated Signal Stop",
      aiDetection: "Vision Fusion Node CY-12",
      impact: "Gridlock Risk",
      action: "Signal Overridden"
    },
    { 
      id: "INC-2440", 
      type: "Water Logging", 
      location: "Mindspace Road (Low-lying)", 
      time: "09:12:55", 
      severity: "Moderate", 
      status: "Monitoring",
      aiDetection: "IoT Probe GA-04",
      impact: "Slow Inflow",
      action: "Reroute Active"
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative space-y-6 md:space-y-8 scrollbar-hide font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-red opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white flex flex-wrap items-center gap-3 md:gap-4">
            Incident Command
            <div className="px-3 py-1 bg-accent-red/10 border border-accent-red/20 rounded-full flex items-center gap-2 shrink-0">
               <AlertTriangle className="w-3 h-3 text-accent-red" />
               <span className="text-[10px] font-bold text-accent-red font-mono uppercase">ALERTS_LIVE</span>
            </div>
          </h1>
          <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
            Real-time automated incident detection using the <span className="text-white font-bold tracking-tighter">10-Second Threshold</span> rule from Hangzhou's City Brain.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          <button className="w-full lg:w-auto px-6 py-3 rounded-xl bg-accent-red text-background font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 uppercase tracking-tighter">
             <Zap className="w-4 h-4 fill-current" />
             Emergency Broadcast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incident List */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
              Active Incident Queue
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-white">4 ITEMS</span>
           </h3>
           
           <div className="space-y-4">
             {incidents.map((incident) => (
               <div key={incident.id} className="p-6 glass-panel border-white/5 bg-white/2 hover:border-white/10 transition-all flex flex-col gap-6 group">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${
                           incident.severity === "Critical" ? "bg-accent-red/10 text-accent-red" : 
                           incident.severity === "High" ? "bg-accent-orange/10 text-accent-orange" : 
                           "bg-accent-cyan/10 text-accent-cyan"
                        }`}>
                           <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg font-bold text-white">{incident.type}</span>
                              <span className="text-[10px] font-mono font-bold text-slate-600">{incident.id}</span>
                           </div>
                           <p className="text-xs text-slate-400 flex items-center gap-1.5 uppercase font-bold tracking-tight">
                              <MapPin size={12} className="text-slate-500" /> {incident.location}
                           </p>
                        </div>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-xs font-mono font-bold text-white">{incident.time}</span>
                        <div className="flex items-center gap-1.5 mt-1">
                           <span className={`w-1.5 h-1.5 rounded-full ${
                             incident.status === "Automated Signal Stop" ? "bg-accent-red animate-pulse" : 
                             incident.status === "In Progress" ? "bg-accent-orange" : 
                             "bg-accent-cyan opacity-50"
                           }`} />
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{incident.status}</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6 border-b border-white/5">
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold text-slate-600 uppercase">Detection Logic</p>
                        <p className="text-[11px] font-mono text-slate-300">{incident.aiDetection}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold text-slate-600 uppercase">Impact Depth</p>
                        <p className="text-[11px] font-bold text-accent-red">{incident.impact}</p>
                     </div>
                     <div className="space-y-1 md:col-span-2">
                        <p className="text-[9px] font-bold text-slate-600 uppercase">Command Resolution</p>
                        <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-tight">{incident.action}</p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center bg-white/2 p-3 rounded-xl border border-white/5">
                     <div className="flex items-center gap-4">
                        <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
                           <Video size={14} /> CCTV LOG
                        </button>
                        <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
                           <Activity size={14} /> GNN ANALYSIS
                        </button>
                     </div>
                     <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                        CLOSE INCIDENT <ChevronRight size={12} />
                     </button>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Tactical Overview */}
        <div className="space-y-8">
           <div className="glass-panel p-8 border-white/5 bg-accent-red/2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                 <Radio className="w-8 h-8 text-white/5" />
              </div>
              <h3 className="text-md font-bold text-white mb-6 uppercase tracking-widest">Global Risk Matrix</h3>
              <div className="space-y-6">
                 {[
                   { label: "Corridor Inflow Saturation", val: "92%" },
                   { label: "Secondary Incident Prob", val: "14%" },
                   { label: "Avg Detection Latency", val: "8s" },
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                         <span>{stat.label}</span>
                         <span className="text-white text-xs">{stat.val}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full bg-accent-red/60 animate-pulse`} style={{ width: stat.val }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-panel p-8 border-white/5 bg-white/2 space-y-6">
              <h3 className="text-md font-bold text-white flex items-center justify-between">
                 Dispatch Log
                 <Clock className="w-4 h-4 text-slate-500" />
              </h3>
              <div className="space-y-4">
                 {[
                   { time: "09:44:02", msg: "Patrol Vehicle GA-12 dispatched to Cyber Towers", status: "ok" },
                   { time: "09:41:22", msg: "Signal JNTU Node B overridden to MANUAL", status: "warning" },
                   { time: "09:38:55", msg: "Hitech City Sector 4: WRONG_SIDE detected", status: "alert" },
                   { time: "09:35:12", msg: "Ambulance Priority: Route clearance for DLF Node", status: "ok" },
                 ].map((entry, i) => (
                   <div key={i} className="flex gap-3 text-[10px] leading-relaxed">
                      <span className="font-mono text-slate-500 shrink-0">{entry.time}</span>
                      <p className={`font-bold transition-all ${
                         entry.status === "alert" ? "text-accent-red" : 
                         entry.status === "warning" ? "text-accent-orange" : 
                         "text-slate-400"
                      }`}>{entry.msg}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full py-3 rounded-xl border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-all">VIEW FULL SYSTEM LOGS</button>
           </div>
           
           <div className="glass-panel p-8 border-emerald-500/10 bg-emerald-500/2 flex flex-col items-center text-center gap-4 group cursor-pointer hover:bg-emerald-500/5 transition-all">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-all">
                 <CheckCircle2 size={32} />
              </div>
              <div>
                 <h4 className="text-xl font-bold text-white tracking-tight">AI Resolution Ratio</h4>
                 <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">94.2% Autonomous Resolution</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                 94% of incidents last-hour were resolved via <span className="text-white">Signal Orchestration</span> before requiring physical dispatch.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
