"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["maps"],
    });

    const initMap = async () => {
      try {
        const { Map } = await (loader as any).importLibrary("maps");
        const mapObj = new Map(mapRef.current as HTMLElement, {
          center: { lat: 17.4483, lng: 78.3741 },
          zoom: 17, // STREET-LEVEL DEFAULT ZOOM
          disableDefaultUI: false,
          zoomControl: true,
          scrollwheel: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#020617" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#5eead4" }] }, // NEON CYAN LABELS
            { featureType: "road", elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "on" }] }, // SHOW METRO/BUS STREAMS
          ],
        });

        // ENABLE GOOGLE TRAFFIC LAYER FOR CITY-WIDE REAL-TIME DATA
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(mapObj);

        setMap(mapObj);
        setIsDemoMode(false);
      } catch (e) {
        console.error("Map load failed, using Demo Mode", e);
        setIsDemoMode(true);
      }
    };

    initMap();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full relative font-sans overflow-hidden">
      {/* Background Neural Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] bg-[radial-gradient(circle_at_center,var(--accent-cyan)_0%,transparent_70%)]" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2 relative z-10">
        <div className="min-w-0 w-full sm:w-auto">
          <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter flex items-center gap-2 truncate uppercase italic">
            City Brain<span className="text-accent-cyan opacity-50 font-normal">v4.2</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-mono flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--accent-cyan)]" />
               SYSTEM_LATENCY: <span className="text-white">12ms</span>
            </p>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-mono flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-accent-orange shadow-[0_0_8px_var(--accent-orange)]" />
               TRAFFIC_DATA: <span className="text-white italic">LIVE_ENWAVE</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end">
          <StatBadge icon={Car} label="Flow Density" value="1.24M" trend="up" />
          <StatBadge icon={MapPin} label="Throughput" value="98.2%" trend="up" />
        </div>
      </div>

      <div className="flex-1 glass-panel bg-black/60 overflow-hidden relative border-white/10 group cursor-grab active:cursor-grabbing shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t border-l border-white/5 min-h-[400px]">
        
        {/* Background Layer: Real Google Map (if API OK) or Static Demo (if Mock) */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ x, y }}
          drag={isDemoMode}
          dragConstraints={{ left: -800, right: 800, top: -800, bottom: 800 }}
        >
          {isDemoMode ? (
            <div className="w-[300%] h-[300%] absolute -left-[100%] -top-[100%]">
              <img 
                src="/map_static.png" 
                alt="Hyderabad IT Corridor" 
                className="w-full h-full object-cover opacity-40 grayscale-[0.3] scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/20" />
              <div className="absolute inset-0 neural-grid opacity-30 mix-blend-overlay" />
              
              {/* Neural Scan Pulse */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-[1px] bg-accent-cyan/80 shadow-[0_0_15px_var(--accent-cyan)] z-20 pointer-events-none"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full opacity-80" />
          )}
        </motion.div>

        {/* Tactical Interactive Layer (SVG Overlays) - Only shown in Demo or as overlay */}
        <svg 
           className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
           viewBox={isDemoMode ? "0 0 1000 1000" : "0 0 1000 1000"} 
        >
          <defs>
             <filter id="glow-cyan"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          
          {isDemoMode && CONNECTIONS.map(([fromId, toId], i) => {
            const from = DEMO_NODES.find(n => n.id === fromId)!;
            const to = DEMO_NODES.find(n => n.id === toId)!;
            const isCritical = DEMO_NODES.find(n => n.id === fromId)!.congestion > 0.7;
            
            return (
              <g key={i}>
                {/* BACKGROUND ROAD BED */}
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(34,211,238,0.03)" strokeWidth="20" strokeLinecap="round" />
                
                {/* MULTI-LANE LANE 1 (LEFT) */}
                <motion.line
                  x1={from.x - 4} y1={from.y - 4} x2={to.x - 4} y2={to.y - 4}
                  stroke={isCritical ? "var(--accent-red)" : "var(--accent-cyan)"} strokeWidth="1.5" strokeDasharray="3 15"
                  animate={{ strokeDashoffset: [100, 0] }}
                  transition={{ duration: 1.5 / (from.congestion + 0.5), repeat: Infinity, ease: "linear" }}
                  opacity={0.4}
                />
                
                {/* CENTRAL FLOW DIVIDER */}
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="1 10" />

                {/* MULTI-LANE LANE 2 (RIGHT) */}
                <motion.line
                  x1={from.x + 4} y1={from.y + 4} x2={to.x + 4} y2={to.y + 4}
                  stroke={isCritical ? "var(--accent-red)" : "var(--accent-cyan)"} strokeWidth="1.5" strokeDasharray="3 18"
                  animate={{ strokeDashoffset: [100, 0] }}
                  transition={{ duration: 2.5 / (from.congestion + 0.5), repeat: Infinity, ease: "linear" }}
                  opacity={0.4}
                />
              </g>
            );
          })}
        </svg>

        {/* Junction Nodes (Interactive) */}
        {isDemoMode && DEMO_NODES.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -ml-4 -mt-4 cursor-pointer z-30 p-2 group"
            style={{ left: node.x, top: node.y }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setSelectedNode(node)}
          >
            <div className={`absolute inset-0 rounded-full blur-[20px] opacity-30 animate-pulse ${
              node.congestion > 0.7 ? "bg-accent-red" : node.congestion > 0.4 ? "bg-accent-orange" : "bg-accent-cyan"
            }`} style={{ width: 50, height: 50 }} />
            <div className={`relative w-8 h-8 rounded-full border-2 flex flex-col items-center justify-center backdrop-blur-xl bg-black/80 z-20 transition-all ${
              node.type === "flyover" ? "rounded-lg scale-110 border-accent-cyan shadow-[0_0_15px_var(--accent-cyan)]" : 
              node.congestion > 0.7 ? "border-accent-red shadow-[0_0_15px_var(--accent-red)]" : "border-accent-cyan"
            }`}>
               <span className="text-[10px] font-black text-white">0{Math.round(node.congestion * 9)}</span>
            </div>
          </motion.div>
        ))}

        {/* Minimalist Status */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2 z-40 bg-black/60 px-2 py-1 rounded text-[8px] font-mono text-white/40">
           <Maximize2 size={8} /> <span className="uppercase">Zoom_Pan_Active</span>
        </div>
      </div>

      {/* Telemetry Hub Below Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="glass-panel p-4 bg-white/2 border-white/10 flex flex-col gap-2 group">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <Activity className="w-3 h-3 text-accent-cyan" /> City-Wide Flow Saturation
            </h4>
            <p className="text-[10px] text-white/60 leading-tight">
               Google Traffic Layer engaged. Mapping <span className="text-white font-bold italic">every major road</span> and alleyway in the IT corridor via high-velocity sensor fusion.
            </p>
         </div>

         <div className="glass-panel p-4 bg-white/2 border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Switch</h4>
               <button onClick={() => setIsDemoMode(!isDemoMode)} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black text-white uppercase hover:bg-white/10 transition-all active:scale-95">
                  {isDemoMode ? "Live Engine" : "Switch to Demo"}
               </button>
            </div>
            <div className="flex justify-between items-end mt-2">
               <div className="space-y-1">
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Interaction</span>
                  <p className="text-xs font-black text-white uppercase italic">Zoom/Pan Engaged</p>
               </div>
               <div className="space-y-1 text-right">
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Stability</span>
                  <p className="text-xs font-black text-emerald-500 uppercase italic">Nominal</p>
               </div>
            </div>
         </div>

         <div className="glass-panel p-4 bg-accent-orange/5 border-accent-orange/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><AlertTriangle size={32} /></div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Status</h4>
            <div className="flex items-center gap-2 mt-2">
               <div className={`w-2 h-2 rounded-full ${isDemoMode ? "bg-accent-orange animate-pulse" : "bg-emerald-500 shadow-[0_0_8px_var(--emerald-500)]"}`} />
               <span className="text-[10px] font-black text-white tracking-widest uppercase">
                  {isDemoMode ? "Demo_Mode" : "Live_Orchestration"}
               </span>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 leading-none uppercase tracking-tighter">
               Synchronizing with 14.2k Edge Nodes.
            </p>
         </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .neural-grid { background-image: radial-gradient(circle at 1px 1px, rgba(34,211,238,0.1) 1px, transparent 0); background-size: 30px 30px; }
      `}</style>
    </div>
  );
}
