"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { 
  Radio, 
  Car, 
  MapPin, 
  AlertTriangle, 
  Zap,
  Navigation2
} from "lucide-react";

const GOOGLE_MAPS_API_KEY = ""; // USER: INSERT API KEY HERE

const MAP_CENTER = { lat: 17.4483, lng: 78.3741 }; // Hitech City, Hyderabad
const JUNCTIONS = [
  { id: "cyber-towers", name: "Cyber Towers Flyover", lat: 17.4501, lng: 78.3813, congestion: 0.8 },
  { id: "mindspace", name: "Mindspace Jn", lat: 17.4442, lng: 78.3748, congestion: 0.4 },
  { id: "gachibowli-x", name: "Gachibowli X Roads", lat: 17.4403, lng: 78.3489, congestion: 0.9 },
  { id: "bio-diversity", name: "Bio-Diversity Flyover", lat: 17.4302, lng: 78.3615, congestion: 0.6 },
  { id: "wipro-circle", name: "Wipro Circle", lat: 17.4205, lng: 78.3432, congestion: 0.3 },
];

const StatBadge = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="glass-panel p-3 flex flex-col gap-1 border-white/5 bg-white/2 overflow-hidden relative group hover:border-white/20 transition-all cursor-default">
    <div className="flex items-center justify-between mb-0.5">
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
       <Icon size={12} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold font-mono text-white tracking-tight">{value}</span>
      {trend && (
        <div className={`flex items-center text-[10px] ${trend === "up" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}`}>
          {trend === "up" ? "↑" : "↓"}
          <span className="ml-0.5">14.2%</span>
        </div>
      )}
    </div>
  </div>
);

export default function DigitalMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(!GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setApiKeyMissing(true);
      return;
    }

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places", "visualization"],
    });

    loader.load().then((google) => {
      const mapObj = new google.maps.Map(mapRef.current as HTMLElement, {
        center: MAP_CENTER,
        zoom: 15,
        disableDefaultUI: true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#020617" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#334155" }] },
          { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "administrative", stylers: [{ visibility: "off" }] },
        ],
      });

      setMap(mapObj);

      // Add Pulse Junctions
      JUNCTIONS.forEach(junction => {
        const color = junction.congestion > 0.7 ? "#f43f5e" : junction.congestion > 0.4 ? "#fb923c" : "#22d3ee";
        
        new google.maps.Circle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map: mapObj,
          center: { lat: junction.lat, lng: junction.lng },
          radius: 150 * (junction.congestion + 0.5),
        });
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full relative">
      <div className="flex items-center justify-between mb-2">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 truncate">
            City Brain: Google Earth Sync
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse shrink-0" />
          </h2>
          <p className="text-slate-400 text-sm truncate uppercase tracking-widest font-mono text-[10px] items-center flex gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             REAL_TIME_FLOW: GOOGLE_MAPS_ACTIVE
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <StatBadge icon={Car} label="Active Flow" value="1.24M" trend="up" color="#3b82f6" />
          <StatBadge icon={MapPin} label="Avg Delay" value="18.5m" trend="down" color="#fb923c" />
        </div>
      </div>

      <div className="flex-1 glass-panel bg-black/60 neural-grid overflow-hidden relative border-white/10 group cursor-crosshair">
        <div ref={mapRef} className="w-full h-full opacity-60 grayscale-[0.2]" />

        {/* Fallback Overlay if API Key is missing */}
        {apiKeyMissing && (
           <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md">
              <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan mb-6">
                 <Navigation2 size={32} className="animate-spin-slow" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Google Maps API Integration Ready</h3>
              <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                 To activate real-time traffic layers from the IT Corridor, please insert your <span className="text-white font-bold">Google Maps API Key</span> in `src/components/DigitalMap.tsx`.
              </p>
              <div className="glass-panel px-6 py-4 border-accent-cyan/20 bg-accent-cyan/5 w-full max-w-md text-xs font-mono text-accent-cyan break-all">
                GOOGLE_MAPS_API_KEY = "PLEASE_INSERT_YOUR_KEY_HERE"
              </div>
              <button 
                onClick={() => setApiKeyMissing(false)}
                className="mt-6 px-6 py-3 rounded-xl bg-white text-background font-bold text-sm"
              >
                 BYPASS TO DEMO HUB
              </button>
           </div>
        )}

        {/* HUD Elements Overlaid on Google Maps */}
        {!apiKeyMissing && (
          <>
            {/* Top Right Information Panel */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 pointer-events-none p-4 glass-panel bg-white/5 border-white/10 backdrop-blur-xl max-w-xs transition-opacity group-hover:opacity-100 opacity-80">
               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-accent-cyan" />
                  Orchestration Insight
               </h4>
               <p className="text-[10px] text-white leading-relaxed">
                  Google real-time layers are being fed into the <span className="text-accent-cyan">GNN Model</span>. Signal timing adjustments are optimized for <span className="text-accent-cyan">15ms latency</span>.
               </p>
               <div className="h-px bg-white/10 my-1" />
               <div className="flex justify-between items-center text-[9px] font-bold uppercase text-slate-500 tracking-wider">
                  <span>GPS Fusion Density</span>
                  <span className="text-emerald-500">92.4% Reliable</span>
               </div>
            </div>

            {/* Bottom Legend */}
            <div className="absolute bottom-6 left-6 flex gap-4 pointer-events-none">
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-accent-cyan glow-cyan" />
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">Synced</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">Saturated</span>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
           animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
