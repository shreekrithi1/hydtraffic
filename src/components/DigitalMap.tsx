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
  RefreshCcw
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
  { id: "cyber-towers", name: "Cyber Towers Flyover", x: 450, y: 150, congestion: 0.8, incidents: 1, type: "flyover" },
  { id: "mindspace", name: "Mindspace Jn", x: 580, y: 320, congestion: 0.4 },
  { id: "gachibowli-x", name: "Gachibowli X Roads", x: 320, y: 480, congestion: 0.9, incidents: 2, type: "flyover" },
  { id: "bio-diversity", name: "Bio-Diversity Flyover", x: 420, y: 600, congestion: 0.55, type: "flyover" },
  { id: "raidurg-metro", name: "Raidurg Metro", x: 520, y: 120, congestion: 0.6 },
  { id: "dlf-gate", name: "DLF Cyber City", x: 220, y: 380, congestion: 0.7 },
];

const CONNECTIONS = [
  ["cyber-towers", "mindspace"],
  ["mindspace", "gachibowli-x"],
  ["gachibowli-x", "bio-diversity"],
  ["cyber-towers", "raidurg-metro"],
  ["gachibowli-x", "dlf-gate"],
];

const StatBadge = ({ icon: Icon, label, value, trend }: any) => (
  <div className="glass-panel p-3 flex flex-col gap-1 border-white/5 bg-white/2 overflow-hidden relative group hover:border-white/20 transition-all cursor-default min-w-[100px]">
    <div className="flex items-center justify-between mb-0.5">
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
       <Icon size={12} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold font-mono text-white tracking-tight">{value}</span>
      {trend && (
        <div className={`flex items-center text-[10px] ${trend === "up" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}`}>
          {trend === "up" ? "↑" : "↓"}
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
          zoom: 15,
          disableDefaultUI: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#020617" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
          ],
        });
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
    <div className="flex flex-col gap-4 h-full relative font-sans">
      <div className="flex items-center justify-between mb-2">
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2 truncate">
            City Brain: Digital Twin
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse shrink-0" />
          </h2>
          <p className="text-slate-400 text-sm truncate uppercase tracking-widest font-mono text-[9px] items-center flex gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             FLOW_STRATEGY: GNN_v4.2_OPTIMIZED
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <StatBadge icon={Car} label="Active Flow" value="1.2M" trend="up" />
          <StatBadge icon={MapPin} label="Avg Delay" value="18m" trend="down" />
        </div>
      </div>

      <div className="flex-1 glass-panel bg-black/60 overflow-hidden relative border-white/10 group cursor-crosshair shadow-2xl">
        
        {/* Background Layer: Real Google Map (if API OK) or Static Demo (if Mock) */}
        <div className="absolute inset-0 z-0">
          {isDemoMode ? (
            <div className="w-full h-full relative">
              <img 
                src="/map_static.png" 
                alt="Hyderabad IT Corridor" 
                className="w-full h-full object-cover opacity-40 grayscale-[0.3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent " />
              <div className="absolute inset-0 neural-grid opacity-20" />
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
          </defs>
          
          {CONNECTIONS.map(([fromId, toId], i) => {
            const from = DEMO_NODES.find(n => n.id === fromId)!;
            const to = DEMO_NODES.find(n => n.id === toId)!;
            return (
              <g key={i}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(34,211,238,0.1)" strokeWidth="6" strokeLinecap="round" />
                <motion.line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="var(--accent-cyan)" strokeWidth="2" strokeDasharray="10 20"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  opacity={0.3}
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
            whileHover={{ scale: 1.15 }}
            onClick={() => setSelectedNode(node)}
          >
            <div className={`absolute inset-0 rounded-full blur-[15px] opacity-40 animate-pulse ${
              node.congestion > 0.7 ? "bg-accent-red" : node.congestion > 0.4 ? "bg-accent-orange" : "bg-accent-cyan"
            }`} style={{ width: 40, height: 40 }} />
            
            <div className={`relative w-8 h-8 rounded-full border-2 flex flex-col items-center justify-center backdrop-blur bg-black/40 z-20 transition-all group-hover:border-white ${
              node.type === "flyover" ? "rounded-lg scale-110 border-accent-cyan" : 
              node.congestion > 0.7 ? "border-accent-red" : node.congestion > 0.4 ? "border-accent-orange" : "border-accent-cyan"
            }`}>
               <span className="text-[9px] font-black text-white">{node.type === "flyover" ? "F" : Math.round(node.congestion * 100)}</span>
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

        {/* Tactical HUD Overlays */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 pointer-events-none p-4 glass-panel bg-black/60 border-white/5 opacity-90 backdrop-blur-3xl max-w-[240px] z-40">
           <div className="flex items-center justify-between mb-2">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Orchestration Stats</h4>
              <Maximize2 size={10} className="text-slate-600" />
           </div>
           <p className="text-[10px] text-white/80 leading-relaxed font-medium">
              Real-time synchronization between <span className="text-accent-cyan">Google Traffic layers</span> and Edge Node sensors is currently <span className="text-emerald-500">92.4% Optimal</span>.
           </p>
           <div className="h-px bg-white/5 my-1" />
           <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
              <span>GPS Density</span>
              <span className="text-accent-cyan">8.4k data/min</span>
           </div>
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-4 z-40">
           <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Dynamic_Flow_Active</span>
           </div>
           <button 
             onClick={() => setIsDemoMode(!isDemoMode)}
             className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-all text-[9px] font-black text-white uppercase tracking-widest"
           >
              <RefreshCcw size={10} className={isDemoMode ? "animate-spin-slow" : ""} />
              {isDemoMode ? "Enable Live Engine" : "Switch to Demo Map"}
           </button>
        </div>

        {isDemoMode && (
          <div className="absolute bottom-6 right-6 p-4 glass-panel bg-accent-orange/5 border-accent-orange/20 z-40 max-w-[200px]">
             <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={12} className="text-accent-orange" />
                <span className="text-[10px] font-bold text-accent-orange uppercase tracking-widest">Demo Mode</span>
             </div>
             <p className="text-[9px] text-slate-400 leading-tight">
               Displaying high-fidelity static twin. <span className="text-white underline decoration-dotted">Insert Google API Key</span> for live corridor synchronization.
             </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}
