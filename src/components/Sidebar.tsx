"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Map as MapIcon, 
  Users, 
  LayoutDashboard, 
  AlertTriangle,
  Zap,
  Menu,
  X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "JTCC Operator", icon: MapIcon, href: "/jtcc" },
  { name: "HR Portal", icon: Users, href: "/hr" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Incidents", icon: AlertTriangle, href: "/incidents" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-[60] p-2 glass-panel bg-background/80 border-white/10 text-white"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-[80] w-72 lg:relative lg:z-0 lg:w-64 h-full glass-panel lg:m-4 flex flex-col overflow-hidden border-r-0 transition-transform duration-300 lg:translate-x-0 bg-background/95 lg:bg-transparent",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-cyan rounded flex items-center justify-center glow-cyan shrink-0">
              <Zap className="text-background w-5 h-5 fill-current" />
            </div>
            <h1 className="text-[10px] font-bold tracking-tight text-white uppercase leading-tight">
              Hyderabad City<br/>Traffic Command Center
            </h1>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 text-slate-500 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  isActive 
                    ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-accent-cyan" : "group-hover:text-white"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass-panel p-4 bg-white/5 border-white/10 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">System Live</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Traffic Brain processing 50 junctions in Cyberabad Corridor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

