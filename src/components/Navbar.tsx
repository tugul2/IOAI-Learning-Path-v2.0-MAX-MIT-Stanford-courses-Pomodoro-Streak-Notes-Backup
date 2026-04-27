"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Map, 
  Layers, 
  Newspaper, 
  TrendingUp, 
  Terminal, 
  Cpu,
  ShieldCheck,
  Activity,
  ChevronRight,
  GraduationCap,
  Brain
} from "lucide-react";

const links = [
  { name: "Overview", href: "/", icon: BarChart3 },
  { name: "Mongolia", href: "/mongolia", icon: Map },
  { name: "Infrastructure", href: "/infrastructure", icon: Layers },
  { name: "AI News", href: "/news", icon: Newspaper },
  { name: "Agency Scale", href: "/scale", icon: TrendingUp },
  { name: "IOAI Roadmap", href: "/ioai-roadmap", icon: GraduationCap },
  { name: "Learning Path", href: "/ioai-roadmap/learn", icon: Brain },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/[0.03] bg-[#020617]/80 backdrop-blur-2xl">
      {/* ── Progress Indicator Mask ── */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-50 transition-all duration-700 pointer-events-none" style={{ width: pathname === '/' ? '20%' : pathname === '/mongolia' ? '40%' : pathname === '/infrastructure' ? '60%' : pathname === '/news' ? '80%' : '100%' }}></div>

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Brand: Cinematic Core */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 rounded-2xl bg-[#020617] border border-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Cpu className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-t-cyan-500/40 border-r-transparent border-b-transparent border-l-transparent rounded-full pointer-events-none opacity-0 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-white tracking-widest leading-none group-hover:text-cyan-400 transition-colors duration-500">
                GEREG<span className="text-white/20">.</span>INTEL
              </span>
              <div className="flex items-center gap-1.5 mt-1.5 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                <Activity className="w-2.5 h-2.5 text-cyan-400" />
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.3em] leading-none">
                  Core Interface v5.2
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav: Tactical Grid Buttons */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] p-1 rounded-2xl border border-white/5">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 group/nav ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="navTab"
                      className="absolute inset-0 bg-white/[0.04] border border-white/5 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] rounded-xl" 
                    />
                  )}
                  <Icon className={`w-4 h-4 transition-transform duration-500 group-hover/nav:-translate-y-0.5 ${isActive ? "text-cyan-400" : "opacity-40 group-hover/nav:opacity-100"}`} />
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Terminal & Refresh: Operational Sector */}
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-white/5 hidden sm:block" />
            
            <Link
              href="/terminal"
              className={`hidden sm:flex items-center gap-3 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 h-11 border ${
                pathname === "/terminal"
                  ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.3)]"
                  : "bg-black/40 border-white/5 text-amber-500 hover:border-amber-500/40 hover:bg-amber-500/5"
              }`}
            >
              <Terminal className="w-4 h-4" />
              Terminal<span className="opacity-40">_</span>
            </Link>

            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 group cursor-help transition-all hover:bg-emerald-500/20">
               <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
               <div className="hidden xl:flex flex-col">
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none">Security</span>
                  <span className="text-[9px] text-white/60 font-mono leading-none mt-1 uppercase">Protocol_v5</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
