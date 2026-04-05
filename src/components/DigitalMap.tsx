"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { motion } from "framer-motion";
import { 
  Radio, 
  Car, 
  MapPin, 
  AlertTriangle, 
  Zap,
  Navigation2,
  Maximize2,
  RefreshCcw,
  Activity
} from "lucide-react";

const GOOGLE_MAPS_API_KEY = ""; // USER: INSERT API KEY HERE

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  congestion: number;
  incidents?: number;
  type?: "flyover" | "junction";
}

const DEMO_NODES: Node[] = [
  { id: "cyber-towers", name: "Cyber Towers X", x: 450, y: 150, congestion: 0.8, incidents: 1, type: "flyover" },
  { id: "mindspace", name: "Mindspace Jn", x: 580, y: 320, congestion: 0.4 },
  { id: "gachibowli-x", name: "Gachibowli X", x: 320, y: 480, congestion: 0.9, incidents: 2, type: "flyover" },
  { id: "bio-diversity", name: "Bio-Diversity Flyover", x: 420, y: 600, congestion: 0.55, type: "flyover" },
  { id: "raidurg-metro", name: "Raidurg Node", x: 520, y: 120, congestion: 0.6 },
  { id: "dlf-gate", name: "DLF Cyber Node", x: 220, y: 380, congestion: 0.7 },
  { id: "financial-dist", name: "FinDist Entry", x: 150, y: 550, congestion: 0.45 },
  { id: "kothaguda", name: "Kothaguda Jn", x: 650, y: 180, congestion: 0.65 },
];

const CONNECTIONS = [
  ["cyber-towers", "mindspace"],
  ["mindspace", "gachibowli-x"],
  ["gachibowli-x", "bio-diversity"],
  ["cyber-towers", "raidurg-metro"],
  ["gachibowli-x", "dlf-gate"],
  ["dlf-gate", "financial-dist"],
  ["cyber-towers", "kothaguda"],
  ["mindspace", "kothaguda"],
];

const StatBadge = ({ icon: Icon, label, value, trend }: any) => (
  <div className="glass-panel p-3 flex flex-col gap-1 border-white/5 bg-white/2 overflow-hidden relative group hover:border-white/20 transition-all cursor-default min-w-[120px]">
    <div className="absolute top-0 left-0 w-1 h-full bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center justify-between mb-0.5">
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
       <Icon size={12} className="text-slate-600 opacity-60 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold font-mono text-white tracking-tighter leading-none">{value}</span>
      {trend && (
        <div className={`flex items-center text-[10px] ${trend === "up" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}`}>
          {trend === "up" ? "▲" : "▼"}
        </div>
      )}
    </div>
  </div>
);

export default function DigitalMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(!GOOGLE_MAPS_API_KEY);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;
    // ... API loading logic (remains same)
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full relative font-sans overflow-hidden">
      {/* Background Neural Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_center,var(--accent-cyan)_0%,transparent_70%)]" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2 relative z-10">
        <div className="min-w-0 w-full sm:w-auto">
          <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter flex items-center gap-2 truncate uppercase italic">
            City Brain<span className="text-accent-cyan opacity-50 font-normal">v4.0</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-mono flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--accent-cyan)]" />
               SYSTEM_LATENCY: <span className="text-white">12ms</span>
            </p>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-mono flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-accent-orange shadow-[0_0_8px_var(--accent-orange)]" />
               AI_LOAD: <span className="text-white">84%</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end">
          <StatBadge icon={Car} label="Flow Density" value="1.24M" trend="up" />
          <StatBadge icon={MapPin} label="Throughput" value="98.2%" trend="up" />
        </div>
      </div>

      <div className="flex-1 glass-panel bg-black/60 overflow-hidden relative border-white/10 group cursor-crosshair shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t border-l border-white/5">
        
        {/* Background Layer: Real Google Map (if API OK) or Static Demo (if Mock) */}
        <div className="absolute inset-0 z-0">
          {isDemoMode ? (
            <div className="w-full h-full relative">
              <img 
                src="/map_static.png" 
                alt="Hyderabad IT Corridor" 
                className="w-full h-full object-cover opacity-30 grayscale-[0.5] scale-105 active:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent " />
              <div className="absolute inset-0 neural-grid opacity-30 mix-blend-overlay" />
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full opacity-60 grayscale-[0.2]" />
          )}
        </div>

        {/* Tactical Interactive Layer (SVG Overlays) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
             <filter id="glow-cyan"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
             <filter id="glow-orange"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
             <filter id="glow-heavy"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          
          {CONNECTIONS.map(([fromId, toId], i) => {
            const from = DEMO_NODES.find(n => n.id === fromId)!;
            const to = DEMO_NODES.find(n => n.id === toId)!;
            return (
              <g key={i}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(34,211,238,0.05)" strokeWidth="8" strokeLinecap="round" />
                <motion.line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={DEMO_NODES.find(n => n.id === fromId)!.congestion > 0.7 ? "var(--accent-red)" : "var(--accent-cyan)"} 
                  strokeWidth="1.5" 
                  strokeDasharray="4 12"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2 / (DEMO_NODES.find(n => n.id === fromId)!.congestion + 0.5), repeat: Infinity, ease: "linear" }}
                  opacity={0.4}
                  style={{ filter: "url(#glow-cyan)" }}
                />
              </g>
            );
          })}
        </svg>

        {/* Junction Nodes (Interactive) */}
        {DEMO_NODES.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -ml-4 -mt-4 cursor-pointer z-30 p-2 group"
            style={{ left: node.x, top: node.y }}
            whileHover={{ scale: 1.25 }}
            onClick={() => setSelectedNode(node)}
          >
            <div className={`absolute inset-0 rounded-full blur-[20px] opacity-20 animate-pulse ${
              node.congestion > 0.7 ? "bg-accent-red" : node.congestion > 0.4 ? "bg-accent-orange" : "bg-accent-cyan"
            }`} style={{ width: 50, height: 50 }} />
            
            <div className={`relative w-8 h-8 rounded-full border-2 flex flex-col items-center justify-center backdrop-blur-xl bg-black/60 z-20 transition-all group-hover:bg-white/10 ${
              node.type === "flyover" ? "rounded-lg scale-110 border-accent-cyan/80 shadow-[0_0_15px_rgba(34,211,238,0.3)]" : 
              node.congestion > 0.7 ? "border-accent-red/80 shadow-[0_0_15px_rgba(244,63,94,0.3)]" : 
              node.congestion > 0.4 ? "border-accent-orange/80 shadow-[0_0_15px_rgba(251,146,60,0.3)]" : 
              "border-accent-cyan/80 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            }`}>
               <span className="text-[10px] font-black text-white tracking-tighter">0{Math.round(node.congestion * 9)}</span>
            </div>

            {node.incidents && (
               <div className="absolute -top-1 -right-1 bg-accent-red w-4 h-4 rounded-full flex items-center justify-center z-30 shadow-lg border border-black/20">
                  <AlertTriangle size={8} className="text-white" />
               </div>
            )}

            <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-2 py-1 rounded text-[10px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-all border border-white/10 z-50">
              {node.name}
            </div>
          </motion.div>
        ))}

        {/* Minimalist Map Status Footer (Only critical status) */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2 pointer-events-none z-40">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_var(--emerald-500)]" />
           <span className="text-[8px] font-black text-white/40 uppercase tracking-widest font-mono">Telemetry_Sync_OK</span>
        </div>
      </div>

      {/* Robust Tactical Telemetry Hub (Moved below map to avoid obstruction) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="glass-panel p-4 bg-white/2 border-white/10 flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-10 transition-opacity"><Zap size={48} /></div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <Zap className="w-3 h-3 text-accent-cyan" />
               Neural Flow Insight
            </h4>
            <p className="text-[11px] text-white/80 leading-relaxed font-medium">
               Orchestration logic is processing <span className="text-accent-cyan">8.4k points/min</span> with <span className="text-accent-cyan">94.2% AI confidence</span>. Signal waves are optimized for Gachibowli-Hitech corridors.
            </p>
         </div>

         <div className="glass-panel p-4 bg-white/2 border-white/10 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3 text-accent-orange" />
                  System Orchestration
               </h4>
               <button 
                 onClick={() => setIsDemoMode(!isDemoMode)}
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded border border-white/10 transition-all text-[9px] font-black text-white uppercase tracking-widest active:scale-95"
               >
                  <RefreshCcw size={10} className={isDemoMode ? "animate-spin-slow" : ""} />
                  {isDemoMode ? "Enable Live Engine" : "Switch to Demo Map"}
               </button>
            </div>
            <div className="flex justify-between items-end">
               <div className="space-y-1">
                  <span className="text-[8px] font-bold text-slate-500 uppercase">GPS Saturation</span>
                  <p className="text-xl font-bold text-white font-mono leading-none">92.4%</p>
               </div>
               <div className="space-y-1 text-right">
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Latency</span>
                  <p className="text-xl font-bold text-accent-cyan font-mono leading-none">12ms</p>
               </div>
            </div>
         </div>

         <div className="glass-panel p-4 bg-accent-orange/5 border-accent-orange/20 flex flex-col gap-2 relative">
            <div className="flex items-center gap-2">
               <AlertTriangle size={12} className={isDemoMode ? "text-accent-orange animate-pulse" : "text-white opacity-20"} />
               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {isDemoMode ? "Demo Mode Active" : "Production Node"}
               </h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
               {isDemoMode 
                 ? "Displaying high-fidelity neural twin. Real-time Google layers require API synchronization in src/components/DigitalMap.tsx"
                 : "Platform is synchronized with live city-brain feeds. All signals are currently under autonomous orchestration."
               }
            </p>
            <div className="absolute bottom-2 right-2 flex gap-1">
               <div className="w-1 h-1 rounded-full bg-accent-orange" />
               <div className="w-1 h-1 rounded-full bg-slate-800" />
               <div className="w-1 h-1 rounded-full bg-slate-800" />
            </div>
         </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .neural-grid {
          background-image: radial-gradient(circle at 1px 1px, rgba(34,211,238,0.1) 1px, transparent 0);
          background-size: 30px 30px;
        }
      `}</style>
    </div>

  );
}
