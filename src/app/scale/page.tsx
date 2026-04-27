"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Newspaper,
  ChevronDown,
  DollarSign,
  Star,
  Rocket,
  ArrowUpRight,
  Target,
  Activity,
  Radio,
  Lock,
  Flag
} from "lucide-react";
import { freeDeals, breakingUpdates, scalingPlaybook } from "@/lib/scale-data";

// ── Hero Stat Segment ──
function HeroStat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center gap-1 group"
    >
      <div className="text-5xl md:text-6xl font-black text-white tabular-nums tracking-tighter flex items-baseline gap-1 group-hover:text-cyan-400 transition-colors duration-500">
        {count}<span className="text-white/20">{suffix}</span>
      </div>
      <div className="flex items-center gap-2">
         <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">{label}</span>
      </div>
    </motion.div>
  );
}

// ── Playbook Phase Card ──
function PhaseCard({ phase, index }: { phase: typeof scalingPlaybook[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const accentMap: Record<string, { border: string; glow: string; text: string; dot: string }> = {
    blue:     { border: "border-blue-500/10",   glow: "rgba(59,130,246,0.1)", text: "text-blue-400",   dot: "bg-blue-500" },
    cyan:     { border: "border-cyan-500/10",   glow: "rgba(6,182,212,0.1)", text: "text-cyan-400",   dot: "bg-cyan-500" },
    purple:   { border: "border-purple-500/10", glow: "rgba(168,85,247,0.1)", text: "text-purple-400", dot: "bg-purple-500" },
    gradient: { border: "border-amber-500/10",  glow: "rgba(245,158,11,0.1)", text: "text-amber-400",  dot: "bg-amber-500" },
  };
  const a = accentMap[phase.accent] || accentMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-[2.5rem] border ${a.border} bg-[#020617]/40 backdrop-blur-3xl transition-all duration-500 overflow-hidden group/phase hover:border-white/10`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-8 flex items-center justify-between text-left relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover/phase:opacity-10 transition-opacity pointer-events-none text-8xl grayscale group-hover/phase:grayscale-0">
          {phase.icon}
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${a.border} bg-white/[0.02] text-3xl transition-all group-hover/phase:scale-110`}>
            {phase.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${a.text}`}>{phase.phase}</span>
              <span className="text-[10px] text-slate-600 font-mono font-bold uppercase tracking-widest leading-none">· {phase.duration}</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">{phase.title}</h3>
          </div>
        </div>
        <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-500 shrink-0 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 space-y-6">
              <div className="space-y-4 pt-4 border-t border-white/5">
                {phase.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 group/step">
                    <div className="flex flex-col items-center gap-2 mt-1 shrink-0">
                      <div className={`w-7 h-7 rounded-xl ${a.dot} flex items-center justify-center text-white text-[10px] font-black shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                        {i + 1}
                      </div>
                      {i < phase.steps.length - 1 && (
                        <div className="w-px h-full min-h-[30px] bg-white/10" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-base font-black text-white mb-2 leading-tight group-hover/step:translate-x-1 transition-transform">{step.action}</p>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group/outcome">
                <CheckCircle className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 leading-none">Critical Outcome: </span>
                  <p className="text-sm font-black text-white mt-1 uppercase tracking-tight">{phase.outcome}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AgencyScalePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setHeroVisible(true); }, []);

  return (
    <main className="max-w-[1600px] mx-auto px-6 py-12 space-y-20 selection:bg-cyan-500/30 pb-32">

      {/* ── Cinematic Hero ── */}
      <section className="relative text-center py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl opacity-40 rounded-full" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10 relative z-10"
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <Rocket className="w-3.5 h-3.5 text-cyan-500 animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Alpha Operations — Scale-Out v5.2
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
               SCALE TO<span className="text-white/20"> $30K</span>
            </h1>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tighter leading-none italic">
               ON ZERO BUDGET
            </h1>
          </div>
          
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
             Blueprint for systemic agency displacement. Utilizing free foundation models, open-source 
             infrastructure, and local arbitrage to construct multi-stream revenue clusters.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto pt-16 border-t border-white/5">
            <HeroStat value={89} suffix="B" label="Agency Index by 2027" index={0} />
            <HeroStat value={5} suffix="NODES" label="Free Forever Stack" index={1} />
            <HeroStat value={90} suffix="%" label="Cost-to-Alpha Ratio" index={2} />
            <HeroStat value={30} suffix="K" label="Max Monthly MRR Node" index={3} />
          </div>
        </motion.div>
      </section>

      {/* ── Breaking Intel Feed ── */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">Breaking Multi-Stream</h2>
              </div>
              <p className="text-slate-500 text-xs font-medium">Synchronized updates from foundation labs and local arbitrage markets.</p>
           </div>
           <div className="hidden md:flex items-center gap-3 text-[10px] font-black uppercase text-slate-600 tracking-widest">
              <Radio className="w-3.5 h-3.5" /> Sector Sync: OK
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breakingUpdates.map((u, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={i}
              className="p-8 rounded-[2.5rem] bg-[#020617]/40 border border-white/5 hover:border-white/10 backdrop-blur-3xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">{u.icon}</div>
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest font-mono font-bold">{u.source}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                    u.impact === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-white/5 text-slate-500 border-white/10'
                  }`}>
                    {u.impact} Signal
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors">{u.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-8 font-medium">{u.summary}</p>
              </div>
              
              <div className="bg-emerald-500/5 rounded-2xl p-5 border border-emerald-500/10 group/opp">
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-emerald-400 group-hover/opp:scale-125 transition-transform" />
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1 block leading-none">Arbitrage Opportunity: </span>
                    <p className="text-[11px] text-white mt-1 leading-relaxed font-bold uppercase tracking-tight">{u.opportunity}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Free Deals: High ROI Assets ── */}
      <section className="space-y-10">
        <div className="space-y-3">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
               <Zap className="w-5 h-5 text-emerald-400" />
             </div>
             <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">Zero-Cost Assets</h2>
           </div>
           <p className="text-slate-500 text-xs font-medium">Foundation deals and always-free tier nodes currently in the database.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {freeDeals.map((deal, i) => (
             <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               key={i}
               className="p-10 rounded-[3rem] bg-[#020617]/40 border border-white/5 backdrop-blur-3xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-700"
             >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-9xl">
                  {deal.icon}
                </div>
                
                <div className="flex flex-col gap-8 relative z-10">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-5">
                         <div className="text-5xl">{deal.icon}</div>
                         <div>
                            <h3 className="text-2xl font-black text-white leading-tight">{deal.name}</h3>
                            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-[0.2em]">{deal.category}</span>
                         </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                         <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-widest">
                            {deal.tag}
                         </span>
                         <span className="text-emerald-400 text-lg font-black tracking-tighter">{deal.freeAmount}</span>
                      </div>
                   </div>

                   <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-[80%]">{deal.description}</p>

                   <div className="flex items-center gap-4 bg-white/[0.02] p-5 rounded-2xl border border-white/5 group/rev">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                         <DollarSign className="w-5 h-5 group-hover/rev:scale-110 transition-transform" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 block leading-none mb-1">Estimated Alpha Potential: </span>
                        <span className="text-base font-black text-white uppercase tracking-tight">{deal.revenueEstimate}</span>
                      </div>
                   </div>

                   <a href={deal.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 transition-all border border-cyan-500/20">
                      Acquire Intelligence <ArrowUpRight className="w-4 h-4" />
                   </a>
                </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* ── Playbook Phased Operations ── */}
      <section className="space-y-10">
        <div className="space-y-3">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
               <TrendingUp className="w-5 h-5 text-purple-400" />
             </div>
             <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">Execution Playbook</h2>
           </div>
           <p className="text-slate-500 text-xs font-medium">Standardized phased maneuvers for agency scale-out and rival displacement.</p>
        </div>

        <div className="space-y-6">
          {scalingPlaybook.map((phase, i) => (
            <PhaseCard key={i} phase={phase} index={i} />
          ))}
        </div>
      </section>

      {/* ── Operational Deployment Footer ── */}
      <section className="p-16 rounded-[4rem] bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 border border-white/5 text-center relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl opacity-20 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-3xl opacity-20 pointer-events-none" />
         
         <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="relative">
               <Flag className="w-12 h-12 text-white/20" />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <Activity className="w-6 h-6 text-cyan-400" />
               </motion.div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white tracking-widest uppercase">The Window of Alpha is Closing</h2>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
                 Global foundation labs are rapidly consolidating. Current free-tier availability and open-source 
                 parity for agency scale represents a unique, vanishing arbitrage window. Initiate operations immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/mongolia"
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-cyan-500 text-black font-black text-[11px] uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)]"
              >
                Scan Mongolia Sector <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/infrastructure"
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
              >
                View Node Pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-10 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
               <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                  <Lock className="w-3.5 h-3.5" /> Deployment Protocol: SECURE
               </div>
               <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Node v5.2 <span className="text-white">·</span> Signal verified <span className="text-white">·</span> 0.00ms Jitter
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
