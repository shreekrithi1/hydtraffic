"use client";

import DigitalMap from "@/components/DigitalMap";
import { 
  Activity, 
  Car, 
  Terminal, 
  Zap,
  TrendingDown,
  TrendingUp,
  Search,
  Bell,
  Cpu,
  BrainCircuit,
  Unplug
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-cyan opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[5%] w-[350px] h-[350px] bg-accent-blue opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      {/* Top Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            BRAIN_STATUS: <span className="text-emerald-500 flex items-center gap-1"><BrainCircuit className="w-3 h-3"/> SYNCED</span>
          </div>
          <div className="hidden lg:block h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2 group cursor-pointer ml-12 lg:ml-0">
            <Search className="w-4 h-4 text-slate-500 group-hover:text-accent-cyan transition-colors" />
            <input 
              type="text" 
              placeholder="Query Node..." 
              className="bg-transparent border-none text-sm text-slate-300 placeholder:text-slate-500 focus:ring-0 focus:outline-none w-24 md:w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Throughput</span>
              <span className="text-sm font-bold text-white font-mono">15.3% REDUX</span>
            </div>
            <div className="h-8 w-px bg-white/10 ml-2" />
          </div>
          <button className="p-2 glass-panel hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all group relative">
            <Activity className="w-5 h-5 text-accent-cyan" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-red rounded-full" />
          </button>
          <div className="flex items-center gap-3 glass-panel px-3 py-1.5 border-white/10 hover:border-white/20 cursor-pointer">
             <div className="w-6 h-6 rounded bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-[10px] font-bold text-background uppercase shadow-lg">
               JT
             </div>
             <span className="hidden sm:inline text-sm font-bold text-slate-300">Op_01</span>
          </div>
        </div>
      </header>


      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative space-y-8 scrollbar-hide">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white flex flex-wrap items-center gap-3 md:gap-4">
              City Brain: IT Corridor
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                <Cpu className="w-3 h-3 text-accent-cyan" />
                <span className="text-[10px] font-bold text-accent-cyan font-mono uppercase">ORCH_ON</span>
              </div>
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-2xl">
              Transitioning from traffic monitoring to <span className="text-white">Active Signal Orchestration</span> via Reinforcement Learning and Graph Neural Networks.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-accent-cyan text-background font-bold text-sm transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 fill-current"/>
              EMERGENCY
            </button>
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-xl glass-panel border-white/10 text-white font-bold text-sm transition-all hover:bg-white/5 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2">
              <Unplug className="w-4 h-4" />
              BYPASS
            </button>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Active Nodes", value: "1,428", trend: "CONNECTED", icon: Cpu, color: "accent-cyan" },
            { label: "AI Signal Control", value: "92%", trend: "OPTIMAL", icon: Zap, color: "emerald-400" },
            { label: "Estimated Flow", value: "84k v/h", trend: "+4%", icon: Car, color: "accent-orange" },
            { label: "Latency", value: "14ms", trend: "UI/SIGNAL", icon: Activity, color: "purple-500" },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 md:p-6 border-white/5 bg-white/2 hover:border-white/10 transition-all group overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 -mr-8 -mt-8 bg-${stat.color}`} />
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold font-mono text-white tracking-tight">{stat.value}</p>
                </div>
                <div className={`flex items-center text-[8px] md:text-[10px] font-bold ${stat.trend === "CONNECTED" || stat.trend === "OPTIMAL" || stat.trend.startsWith("-") ? "text-emerald-500" : "text-rose-500"}`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Left: Live Map Visualization */}
          <div className="xl:col-span-2 h-[400px] md:h-[600px] flex flex-col gap-4 min-w-0">
             <DigitalMap />
          </div>


          {/* Right: Operational Panel */}
          <div className="flex flex-col gap-8">
            <div className="glass-panel p-6 border-white/5 flex-1 min-h-0 flex flex-col relative overflow-hidden bg-white/2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
              <h3 className="text-lg font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                <Terminal className="w-4 h-4 text-accent-cyan" />
                Adaptive Signal Stream
              </h3>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {[
                  { time: "09:42:12", event: "Bio-Diversity Flyover: Phase extended +15s (RL Priority)", status: "ok" },
                  { time: "09:41:04", event: "Mindspace Node: Congestion spillback detected (GNN Link GA-24)", status: "warning" },
                  { time: "09:38:55", event: "Emergency Clearance: Fire Tender detected at Wipro Circle", status: "alert" },
                  { time: "09:35:21", event: "Shift-Sync: 1,200 employees delayed (Allocated 09:45 block)", status: "ok" },
                  { time: "09:32:04", event: "Cyber Towers: Green Wave activated for Route 44 (Corporate)", status: "ok" },
                  { time: "09:30:12", event: "Edge Sensor GA-14: Processing video locally (Anonymization Active)", status: "ok" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 transition-all group">
                    <span className="text-[10px] font-mono font-bold text-slate-500 mt-0.5 group-hover:text-accent-cyan transition-colors">{log.time}</span>
                    <div className="space-y-1 flex-1 text-[11px]">
                      <p className={`font-medium leading-relaxed ${
                        log.status === "alert" ? "text-accent-red" : 
                        log.status === "warning" ? "text-accent-orange" : 
                        "text-slate-300"
                      }`}>{log.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Optimization Insight */}
            <div className="glass-panel p-6 border-accent-cyan/10 bg-accent-cyan/2 relative overflow-hidden group hover:border-accent-cyan/30 transition-all">
              <h3 className="text-md font-bold text-white mb-4 tracking-tight flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-accent-cyan" />
                Orchestration Logic
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Queue Dispersion Efficiency</span>
                  <span className="text-accent-cyan">88.4%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-accent-cyan" />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                The RL model is prioritizing <span className="text-white">High-Occupancy Corridors</span> (Buses/Shuttles) to maximize "People Throughput" rather than just "Vehicle Count."
              </p>
              <button className="w-full py-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-bold text-[10px] hover:bg-accent-cyan hover:text-background transition-all">
                VIEW REINFORCEMENT LEARNING LOG
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}

