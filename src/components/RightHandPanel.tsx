"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Target, Zap, ChevronRight, Sword, ShieldCheck, Gauge, Activity, Radio, Lock } from "lucide-react";
import { rivalStrategies } from "@/lib/data";

export default function RightHandPanel() {
  const [activeTab, setActiveTab] = useState(rivalStrategies[0].id);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeStrategy = rivalStrategies.find(s => s.id === activeTab) || rivalStrategies[0];

  const icons: Record<string, any> = {
    agency: Sword,
    scaling: Gauge,
    service: ShieldCheck
  };

  return (
    <div className="hidden xl:flex w-[400px] border-l border-white/5 bg-[#020617]/95 backdrop-blur-xl flex-row h-full sticky top-0 z-50 overflow-hidden">
      {/* ── Sub Navigator (Rightmost) ── */}
      <div className="w-16 border-l border-white/5 flex flex-col items-center py-8 gap-6 order-last bg-[#010413]">
        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 neural-glow">
           <ShieldAlert className="w-4 h-4 text-red-500" />
        </div>
        
        {rivalStrategies.map((s) => {
          const Icon = icons[s.id] || Target;
          const isActive = activeTab === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`p-3 rounded-xl transition-all duration-500 group relative ${
                isActive 
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]" 
                  : "text-slate-600 hover:text-slate-400 hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute right-[-1px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]" 
                />
              )}
              {/* Tooltip */}
              <div className="absolute right-full mr-4 px-3 py-1.5 rounded-md bg-gray-950 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0">
                {s.title}
              </div>
            </button>
          );
        })}
        
        <div className="mt-auto flex flex-col items-center gap-1.5 opacity-20 hover:opacity-100 transition-opacity cursor-help">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
           ))}
        </div>
      </div>

      {/* ── Right Page Content ── */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
        {/* Cinematic Grid Lines Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500" 
              />
              <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.3em]">Adversarial Intel Layer</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-1">STRATEGIC</h2>
            <h2 className="text-3xl font-black text-white/40 tracking-tighter leading-none">COUNTER-OP</h2>
            <p className="text-[11px] text-slate-500 mt-4 font-medium leading-relaxed max-w-[90%]">Blueprint deployment for market dominance and rival displacement.</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-8"
            >
              <div className="p-6 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl group-hover:opacity-10 transition-opacity pointer-events-none">
                   {activeStrategy.icon}
                 </div>
                 
                 <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                      {React.createElement(icons[activeStrategy.id] || Target, { className: "w-6 h-6" })}
                   </div>
                   <h3 className="text-xl font-bold text-white tracking-tight">{activeStrategy.title}</h3>
                 </div>
                 
                 <div className="space-y-6">
                   <div className="relative p-5 rounded-2xl bg-red-500/[0.02] border border-red-500/10 overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                     <div className="text-[9px] font-black uppercase text-red-500 mb-2 tracking-widest flex items-center gap-1.5">
                       <Radio className="w-3 h-3 animate-pulse" /> Market Threat
                     </div>
                     <p className="text-xs text-slate-300 leading-relaxed font-medium">{activeStrategy.threat}</p>
                   </div>

                   <div className="relative p-5 rounded-2xl bg-cyan-500/[0.02] border border-cyan-500/10 overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
                     <div className="text-[9px] font-black uppercase text-cyan-500 mb-2 tracking-widest flex items-center gap-1.5">
                       <Zap className="w-3 h-3" /> Counter-Maneuver
                     </div>
                     <p className="text-xs text-white leading-relaxed font-semibold italic">"{activeStrategy.counter}"</p>
                   </div>

                   <div className="space-y-3 px-1">
                     <div className="text-[9px] font-black uppercase text-slate-600 tracking-widest">Execution Directives</div>
                     {activeStrategy.actions.map((action, i) => (
                       <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5 group/action"
                       >
                         <div className="w-6 h-6 rounded-lg bg-gray-900 border border-white/5 flex items-center justify-center text-[10px] font-bold font-mono text-slate-500 group-hover/action:text-red-400 group-hover/action:border-red-400/30 transition-all">
                           0{i+1}
                         </div>
                         <span className="text-xs text-slate-400 group-hover/action:text-slate-200 transition-colors">{action}</span>
                       </motion.div>
                     ))}
                   </div>
                 </div>
              </div>
              
              {/* ── Live Analytics Section ── */}
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] px-1">Tactical Analytics</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between aspect-square group">
                     <div className="text-[10px] font-bold text-slate-500">THREAT PKT</div>
                     <div className="text-3xl font-black text-white font-mono group-hover:text-red-500 transition-colors">94.2</div>
                     <Activity className="w-4 h-4 text-red-500/50 group-hover:animate-pulse" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between aspect-square group">
                     <div className="text-[10px] font-bold text-slate-500">SIGNAL SN</div>
                     <div className="text-3xl font-black text-white font-mono group-hover:text-cyan-500 transition-colors">81%</div>
                     <Radio className="w-4 h-4 text-cyan-500/50 group-hover:animate-pulse" />
                  </div>
                </div>
              </div>

              {/* ── Security / Compliance ── */}
              <div className="p-5 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <div className="text-[9px] font-black uppercase text-emerald-500 tracking-widest leading-none mb-1">Protocol Secured</div>
                    <div className="text-[10px] text-slate-500 font-medium">End-to-End Encryption verified (v5.0.2)</div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Cinematic Blur Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-20" />
      </div>
    </div>
  );
}
