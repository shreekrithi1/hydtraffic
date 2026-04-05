"use client";

import React, { useState } from "react";
import DigitalMap from "@/components/DigitalMap";
import { 
  Shield, 
  Map as MapIcon, 
  Video, 
  Radio, 
  Zap, 
  AlertTriangle,
  ChevronRight,
  Maximize2,
  Mic,
  Activity,
  Terminal,
  Grid
} from "lucide-react";

export default function JTCCOperator() {
  const [activeSignal, setActiveSignal] = useState("CYBER_TOWERS");

  return (
    <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col h-full lg:h-screen relative scrollbar-hide font-sans pb-20 lg:pb-0">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-red opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      {/* JTCC Header Overlay */}
      <div className="relative lg:absolute top-4 lg:top-8 left-4 lg:left-8 z-50 pointer-events-none p-4 lg:p-0">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white flex flex-wrap items-center gap-3">
          JTCC Control Console
          <div className="px-3 py-1 bg-accent-red/20 border border-accent-red/40 rounded-full flex items-center gap-2">
            <Radio className="w-3 h-3 text-accent-red animate-pulse" />
            <span className="text-[10px] font-bold text-accent-red font-mono uppercase">ORCHESTRATION_LIVE</span>
          </div>
        </h1>
        <p className="text-slate-500 font-medium text-xs md:text-sm mt-1">Authorized: Inspector_Prakash | Node: Cyberabad_South</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 lg:p-8 relative overflow-visible lg:overflow-hidden">
        {/* Main Map Visualization */}
        <div className="flex-[3] min-h-[400px] lg:h-full glass-panel border-white/5 bg-black/40 overflow-hidden relative group">
          <DigitalMap />
        </div>

        {/* Tactical Sidebar */}
        <div className="flex-1 h-full flex flex-col gap-6 w-full lg:w-96 lg:min-w-[380px]">
          {/* Signal Matrix Override */}
          <div className="glass-panel p-4 md:p-6 border-accent-cyan/10 bg-accent-cyan/2 flex flex-col min-h-[400px] lg:h-1/2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-cyan" />
                Signal Matrix
              </h3>
              <div className="flex gap-2">
                 <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                   <Grid size={12} className="text-slate-400" />
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {[
                { id: "CYBER_TOWERS", name: "Cyber Towers X", phase: "Green", time: 42, saturation: 92 },
                { id: "MINDSPACE", name: "Mindspace Jn", phase: "Amber", time: 4, saturation: 45 },
                { id: "GACHIBOWLI_X", name: "Gachibowli Flyover", phase: "Red", time: 18, saturation: 112 },
                { id: "DLF_GATE", name: "DLF Cyber City", phase: "Green", time: 12, saturation: 78 },
              ].map((signal) => (
                <div key={signal.id} className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeSignal === signal.id ? "bg-white/10 border-accent-cyan" : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
                }`} onClick={() => setActiveSignal(signal.id)}>
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{signal.id}</span>
                      <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                        signal.phase === "Green" ? "bg-emerald-500/20 text-emerald-400" :
                        signal.phase === "Amber" ? "bg-accent-orange/20 text-accent-orange" :
                        "bg-accent-red/20 text-accent-red"
                      }`}>{signal.phase}</div>
                   </div>
                   <div className="flex items-end justify-between">
                      <p className="text-sm font-bold text-white leading-tight">{signal.name}</p>
                      <span className="text-lg font-mono font-bold text-white">{signal.time}<span className="text-xs text-slate-500">s</span></span>
                   </div>
                   {activeSignal === signal.id && (
                     <div className="mt-4 pt-4 border-t border-white/5 flex gap-2 animate-in fade-in slide-in-from-top-2">
                        <button className="flex-1 py-2 bg-emerald-500 text-background font-bold text-[10px] rounded-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-tighter">Force Green</button>
                        <button className="flex-1 py-2 bg-accent-red text-background font-bold text-[10px] rounded-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-tighter">Force Red</button>
                     </div>
                   )}
                </div>
              ))}
            </div>
          </div>

          {/* CCTV / Vision Wall */}
          <div className="glass-panel p-4 md:p-6 border-white/5 bg-white/2 flex-1 flex flex-col overflow-hidden min-h-[300px]">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
              Edge Fusion (YOLO)
              <Video className="w-4 h-4" />
            </h3>
            <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-video bg-black/60 rounded-xl relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded backdrop-blur">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[8px] font-bold text-white uppercase opacity-70 tracking-tighter">CAM_{i}</span>
                    </div>
                    {/* Mock detection overlays */}
                    <div className="absolute inset-4 border border-accent-cyan/40 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                       <span className="text-[8px] font-bold text-accent-cyan bg-accent-cyan/20 px-1 rounded uppercase">V_COUNT: 42</span>
                    </div>
                    <Activity className="absolute bottom-2 right-2 text-white/10 w-4 h-4" />
                 </div>
               ))}
            </div>
          </div>

          {/* Incident Management */}
          <div className="glass-panel p-4 md:p-6 border-accent-red/10 bg-accent-red/2 transition-all hover:bg-accent-red/5 group cursor-pointer">
             <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                   <AlertTriangle className="w-5 h-5 text-accent-red animate-bounce shrink-0" />
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest">Active Alert</h3>
                </div>
                <button className="text-[10px] font-bold text-accent-red flex items-center gap-1">ALL <ChevronRight size={12} /></button>
             </div>
             <p className="text-xs text-slate-400 mb-4 leading-relaxed font-medium underline-offset-4 decoration-accent-red/40 underline decoration-dotted">
                <span className="text-white font-bold">Stalled Truck:</span> Gachibowli Node B
             </p>
             <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-2 bg-accent-red text-background font-bold text-[10px] rounded-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-tighter">DISPATCH PATROL</button>
                <button className="flex-1 py-2 glass-panel border-accent-red/20 text-accent-red font-bold text-[10px] rounded-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-tighter">RE-ROUTE NODES</button>
             </div>
          </div>
        </div>
      </div>

      {/* JTCC Tactical Footer */}
      <div className="sticky lg:absolute bottom-0 lg:bottom-8 left-0 lg:left-8 right-0 lg:right-auto flex flex-col sm:flex-row items-center gap-4 md:gap-6 glass-panel px-4 md:px-6 py-4 border-white/10 backdrop-blur-3xl m-4 lg:m-0">
         <div className="flex items-center gap-4">
            <Maximize2 size={16} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
            <Mic size={16} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
            <Terminal size={16} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
            <div className="h-6 w-px bg-white/10 mx-2" />
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan</span>
               <span className="text-xs font-bold text-white font-mono tracking-tighter">GAMMA_NIGHT</span>
            </div>
         </div>
         <div className="hidden sm:block h-6 w-px bg-white/10" />
         <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg border border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan text-[10px] font-bold uppercase tracking-widest hover:bg-accent-cyan hover:text-background transition-all">VOICE_AI</button>
            <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">SYSTEM_LOGS</button>
         </div>
      </div>
    </div>

  );
}
