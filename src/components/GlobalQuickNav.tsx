"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Map, 
  Layers, 
  Newspaper, 
  TrendingUp, 
  Terminal, 
  BarChart3,
  Activity,
  Cpu,
  Monitor,
  Target
} from "lucide-react";

export default function GlobalQuickNav() {
  const pathname = usePathname();
  
  const links = [
    { name: "Overview", href: "/", icon: <BarChart3 />, color: "blue", desc: "Operations Hub" },
    { name: "Mongolia", href: "/mongolia", icon: <Map />, color: "cyan", desc: "Regional Nodes" },
    { name: "Infra", href: "/infrastructure", icon: <Layers />, color: "purple", desc: "Compute Layer" },
    { name: "Terminal", href: "/terminal", icon: <Terminal />, color: "amber", desc: "Market Signals" },
    { name: "Scale", href: "/scale", icon: <TrendingUp />, color: "emerald", desc: "Growth Engine" },
  ];

  return (
    <section className="border-t border-white/5 bg-[#020617] py-24 px-6 relative overflow-hidden group/nav">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 px-2">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Quick Intelligence Access</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Cross-Sector<br /><span className="text-white/20">Navigation</span></h2>
           </div>
           
           <div className="hidden md:flex items-center gap-10">
              <div className="flex flex-col items-end">
                 <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Global Status</span>
                 <span className="text-xs font-black text-emerald-500 mt-1 uppercase tracking-widest">ALL_SYSTEMS_GO</span>
              </div>
              <div className="w-px h-10 bg-white/5" />
              <div className="flex flex-col items-end">
                 <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Active Channels</span>
                 <span className="text-xs font-black text-white mt-1 uppercase tracking-widest">05_ENDPOINTS</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {links.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={link.name}
              >
                <Link
                  href={link.href}
                  className={`group p-8 rounded-[2.5rem] border transition-all duration-500 relative flex flex-col justify-between h-56 overflow-hidden ${
                    isActive
                      ? "bg-white/[0.04] border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.05)]"
                      : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Decorative ID */}
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-7xl font-black italic group-hover:opacity-[0.07] transition-opacity pointer-events-none leading-none">
                    0{i+1}
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ring-1 ${
                      isActive 
                        ? "bg-cyan-500/10 text-cyan-400 ring-cyan-500/30" 
                        : "bg-white/5 text-slate-500 ring-white/5 group-hover:text-white group-hover:scale-110 group-hover:ring-white/20"
                    }`}>
                      {React.cloneElement(link.icon as React.ReactElement<{ className?: string }>, { 
                        className: "w-6 h-6" 
                      })}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                      <h4 className={`text-xl font-black tracking-tighter uppercase ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                        {link.name}
                      </h4>
                      <ArrowRight className={`w-4 h-4 transition-all duration-500 ${isActive ? 'text-cyan-400' : 'text-slate-700 group-hover:text-white group-hover:translate-x-1'}`} />
                    </div>
                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] mt-2 transition-colors duration-500 ${isActive ? 'text-cyan-500' : 'text-slate-600 group-hover:text-slate-400'}`}>
                      {link.desc}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]" 
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
