"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  TrendingUp,
  Crosshair,
  ChevronDown,
  Zap,
  AlertTriangle,
  Eye,
  Flag,
  Layers,
  ArrowUpRight,
  Activity,
  Radio,
  Lock,
  Cpu,
  Monitor,
  Target,
  ArrowRight
} from "lucide-react";
import {
  tickerData,
  competitorMap,
  dominationRoadmap,
  agencyBlueprint,
  scalingSignals,
} from "@/lib/terminal-data";

/* ─── LIVE TICKER MARQUEE ─── */
function Ticker() {
  return (
    <div className="w-full overflow-hidden border-b border-white/[0.03] bg-[#020617]/80 backdrop-blur-xl relative z-50">
      <div className="flex animate-scroll-left whitespace-nowrap py-3">
        {[...tickerData, ...tickerData].map((t, i) => (
          <div key={i} className="inline-flex items-center gap-4 px-8 border-r border-white/5 group h-8">
            <span className="text-[10px] font-black text-amber-500 tracking-[0.2em] uppercase font-mono group-hover:text-amber-400 transition-colors">{t.symbol}</span>
            <span className="text-[10px] text-slate-400 font-mono font-bold">{t.value}</span>
            <div className={`flex items-center gap-1.5 text-[10px] font-black font-mono ${t.direction === "up" ? "text-emerald-400" : "text-red-400"}`}>
              {t.direction === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
              {t.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  COMPONENTS                                     */
/* ─────────────────────────────────────────────── */

function SignalCard({ s, i }: { s: typeof scalingSignals[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="p-8 rounded-[2.5rem] bg-[#020617]/40 border border-white/5 backdrop-blur-3xl group hover:border-amber-500/20 transition-all duration-500 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 group-hover:scale-110 transition-transform">
             <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] font-mono">{s.source}</span>
        </div>
        <h4 className="text-xl font-black text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors uppercase">{s.signal}</h4>
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/[0.02] border border-amber-500/10">
          <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs text-white font-mono font-bold tracking-tight uppercase">{s.dataPoint}</p>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-bold">{s.implication}</p>
      </div>
      <div className="mt-8 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3 group/action">
        <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/action:scale-125 transition-transform" />
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 leading-none block mb-1">Maneuver:</span>
          <p className="text-xs text-emerald-300 font-black uppercase tracking-tight italic">"{s.actionable}"</p>
        </div>
      </div>
    </motion.div>
  );
}

function CompetitorRow({ c, i }: { c: typeof competitorMap[0]; i: number }) {
  const [open, setOpen] = useState(false);
  const threatStyles: Record<string, string> = {
    High: "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="rounded-[2.5rem] border border-white/5 bg-[#020617]/40 backdrop-blur-3xl overflow-hidden group hover:border-white/10 transition-all duration-500"
    >
      <button onClick={() => setOpen(!open)} className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-4xl pointer-events-none group-hover:opacity-10 transition-opacity whitespace-nowrap font-black uppercase">THREAT_VECTOR</div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-xl font-black text-slate-500 shrink-0 group-hover:text-white transition-colors">{c.name[0]}</div>
          <div>
            <h4 className="text-xl font-black text-white tracking-tight leading-none uppercase">{c.name}</h4>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500 font-black uppercase tracking-widest">
               <span>{c.type}</span>
               <span className="text-white/10">|</span>
               <span className="text-slate-400">{c.valuation}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 shrink-0 relative z-10">
          <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${threatStyles[c.threat]}`}>
             {c.threat} SIGNAL
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-500" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <ChevronDown className="w-5 h-5 text-slate-500" />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 space-y-6 pt-2">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 block mb-2 leading-none">Primary Focus</span>
                    <p className="text-sm text-slate-300 font-bold uppercase tracking-tight">{c.focus}</p>
                 </div>
                 <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 block mb-2 leading-none">Funding Node</span>
                    <p className="text-sm text-slate-300 font-bold uppercase tracking-tight">{c.funding}</p>
                 </div>
               </div>

               <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                  <span className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-2 block leading-none">Vulnerability Identified</span>
                  <p className="text-sm text-white font-black italic uppercase tracking-tight">"{c.weakness}"</p>
               </div>

               <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-5 relative group/adv">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover/adv:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 block mb-1 leading-none uppercase">Gereg Agency Paradox (Advantage)</span>
                    <p className="text-sm text-emerald-300 font-black uppercase tracking-tight">{c.geregAdvantage}</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function RoadmapCard({ r, i }: { r: typeof dominationRoadmap[0]; i: number }) {
  const [open, setOpen] = useState(i === 0);
  const colors: Record<string, { border: string; dot: string; text: string; bg: string }> = {
    cyan:   { border: "border-cyan-500/10",   dot: "bg-cyan-500",   text: "text-cyan-400",   bg: "rgba(6,182,212,0.1)" },
    blue:   { border: "border-blue-500/10",   dot: "bg-blue-500",   text: "text-blue-400",   bg: "rgba(59,130,246,0.1)" },
    purple: { border: "border-purple-500/10", dot: "bg-purple-500", text: "text-purple-400", bg: "rgba(168,85,247,0.1)" },
    amber:  { border: "border-amber-500/10",  dot: "bg-amber-500",  text: "text-amber-400",  bg: "rgba(245,158,11,0.1)" },
  };
  const clr = colors[r.color] || colors.cyan;
  const statusBadge: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    planned: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    vision: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={`rounded-[3rem] border ${clr.border} bg-[#020617]/40 backdrop-blur-3xl overflow-hidden transition-all duration-700 hover:border-white/10 group/roadmap`}
    >
      <button onClick={() => setOpen(!open)} className="w-full p-8 flex flex-col md:flex-row md:items-center justify-between text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl pointer-events-none font-black italic text-white group-hover/roadmap:opacity-10 transition-opacity leading-none">
           {r.quarter.split(' ')[1]}
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className={`w-16 h-16 rounded-[2rem] ${clr.dot} bg-opacity-10 border ${clr.border} flex flex-col items-center justify-center group-hover/roadmap:scale-110 transition-transform`}>
            <span className={`text-xl font-black tracking-tighter ${clr.text}`}>{r.quarter.slice(-2)}</span>
            <span className="text-[7px] text-white/40 font-black uppercase">QRT</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${clr.text}`}>{r.phase}</span>
              <span className={`px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest border ${statusBadge[r.status]}`}>{r.status}</span>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{r.quarter} — {r.title}</h3>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-transform duration-500 shrink-0 relative z-10" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
           <ChevronDown className="w-6 h-6 text-slate-500" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-10 space-y-8 pt-4">
              {/* KPIs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {r.kpis.map((k, j) => (
                  <div key={j} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center group/kpi">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 block mb-2 leading-none">{k.metric}</span>
                    <div className="text-2xl font-black text-white mt-1 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{k.target}</div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                       <span className="text-[9px] font-black text-slate-700 uppercase">Current:</span>
                       <span className="text-[10px] font-bold text-slate-500 uppercase">{k.current}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Operations Phasing */}
              <div className="space-y-4">
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 px-2">Operational Directives</div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {r.actions.map((a, j) => (
                    <div key={j} className="group/action flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                      <div className={`w-8 h-8 rounded-xl ${clr.dot} flex items-center justify-center text-white text-[11px] font-black shrink-0 shadow-2xl`}>0{j + 1}</div>
                      <p className="text-sm text-slate-300 font-bold leading-relaxed uppercase tracking-tight">{a}</p>
                    </div>
                  ))}
                 </div>
              </div>

              {/* Strategic Intelligence Segment */}
              <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-5 relative group/intel overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.05] to-transparent pointer-events-none" />
                <Eye className="w-10 h-10 text-amber-500/50 shrink-0 mt-1" />
                <div className="relative z-10">
                   <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80 mb-2 leading-none">Classified Intelligence</div>
                   <p className="text-sm text-amber-200/90 font-black italic uppercase tracking-tight leading-relaxed">"{r.intel}"</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────── */
/*  MAIN PAGE                                      */
/* ─────────────────────────────────────────────── */
export default function BloombergTerminal() {
  const [heroVis, setHeroVis] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setHeroVis(true);
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="min-h-screen selection:bg-amber-500/30">
      {/* ── High-Fidelity Ticker Layer ── */}
      <Ticker />

      <main className="max-w-[1600px] mx-auto px-6 py-12 space-y-24 pb-32">
        
        {/* ── Cinematic Heading Section ── */}
        <section className="relative">
          <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-500/50 via-transparent to-transparent hidden xl:block" />
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-start justify-between gap-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">GEREG_TERMINAL_V5.2</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  <span className="text-[10px] text-emerald-500 font-mono font-black uppercase tracking-widest">{time} UB.OS</span>
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
                   AGENCY
                </h1>
                <h1 className="text-6xl md:text-8xl font-black text-white/20 tracking-tighter leading-none uppercase">
                   INTELLIGENCE
                </h1>
              </div>
              <p className="text-slate-400 text-sm max-w-2xl leading-relaxed font-medium">
                Deep-researched terminal access to the primary agency thesis. Synthesizing 
                high-fidelity market signals, rival maneuvers, and phased domination roadmap 
                for the Central Asian ICT corridor.
              </p>
            </div>

            <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-8 backdrop-blur-3xl shrink-0 self-end">
               <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Protocol Sync</span>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">ENCRYPTED_LINK: ACTIVE</span>
                  </div>
               </div>
               <div className="w-px h-10 bg-white/5" />
               <div className="flex flex-col items-end">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Core Resolution</span>
                  <span className="text-xs font-black text-amber-500 mt-1.5 uppercase">BLOOMBERG-GRADE</span>
               </div>
            </div>
          </motion.div>
        </section>

        {/* ── Market Arbitrage Signals ── */}
        <section className="space-y-12">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Activity className="w-6 h-6 animate-pulse" />
                 </div>
                 <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">Arbitrage Signals</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {scalingSignals.map((s, i) => <SignalCard key={i} s={s} i={i} />)}
           </div>
        </section>

        {/* ── Competitive Map: Sector Rivals ── */}
        <section className="space-y-12">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                    <Target className="w-6 h-6" />
                 </div>
                 <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">Rival Intel Layer</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
           </div>
           <div className="grid grid-cols-1 gap-6">
             {competitorMap.map((c, i) => <CompetitorRow key={i} c={c} i={i} />)}
           </div>
        </section>

        {/* ── Phased Domination Roadmap ── */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Flag className="w-6 h-6" />
                 </div>
                 <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">Master Strategy Phasing</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
           </div>
           <div className="space-y-10">
             {dominationRoadmap.map((r, i) => <RoadmapCard key={i} r={r} i={i} />)}
           </div>
        </section>

        {/* ── Full Agency Blueprint ── */}
        <section className="space-y-12">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Layers className="w-6 h-6" />
                 </div>
                 <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">Operational Blueprint</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
           </div>

           <div className="space-y-20">
             {agencyBlueprint.map((section, si) => (
               <div key={si} className="space-y-8">
                 <div className="flex items-center gap-4 px-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <h3 className="text-xl font-black text-white uppercase tracking-[0.2em]">{section.category}</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {section.items.map((item, ii) => (
                     <motion.div
                       initial={{ opacity: 0, scale: 0.98 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       key={ii}
                       className="p-8 rounded-[2.5rem] bg-[#020617]/40 border border-white/5 backdrop-blur-3xl group hover:border-purple-500/30 transition-all duration-500"
                     >
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black font-mono text-slate-500 group-hover:text-purple-400 transition-colors">0{ii+1}</div>
                          <h4 className="text-lg font-black text-white tracking-tight uppercase group-hover:text-purple-400 transition-colors uppercase italic">{item.title}</h4>
                       </div>
                       <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.detail}</p>
                     </motion.div>
                   ))}
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* ── Operational Deployment Footer ── */}
        <section className="p-16 rounded-[4rem] bg-gradient-to-br from-amber-900/10 via-transparent to-red-900/10 border border-white/5 text-center relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />
           
           <div className="relative z-10 flex flex-col items-center gap-10">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                <Terminal className="w-10 h-10" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-white tracking-widest uppercase">The Data Is Synthesized. Execute Command.</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
                  Central Asian AI sector is currently in a pre-saturation phase. 
                  The deployment blueprint is verified. Operational windows are open.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="/scale"
                  className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-amber-500 text-black font-black text-[11px] uppercase tracking-[0.3em] hover:bg-amber-400 transition-all shadow-[0_0_50px_rgba(245,158,11,0.3)]"
                >
                  Initiate Playbook <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/mongolia"
                  className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
                >
                  Scan Regional Node <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-10 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
                 <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    <Lock className="w-3.5 h-3.5" /> Security Protocol: VERIFIED
                 </div>
                 <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    TERMINAL v5.2 <span className="text-white">·</span> Data Freshness: 100% <span className="text-white">·</span> No Desync
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
