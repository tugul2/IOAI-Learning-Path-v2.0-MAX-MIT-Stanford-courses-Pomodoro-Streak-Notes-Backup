"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mongoliaData } from "@/lib/data";
import { 
  CheckCircle2, 
  Factory, 
  Wifi, 
  Code2, 
  Presentation, 
  Globe, 
  ExternalLink, 
  Target, 
  Zap, 
  ShieldAlert, 
  Rocket, 
  Layers, 
  ChevronRight, 
  Binary, 
  Activity, 
  Search, 
  Filter, 
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Monitor,
  Radio
} from "lucide-react";

import LiveMap from "@/components/LiveMap";

export default function MongoliaMarket() {
  const m = mongoliaData.overview;
  const [sectorFilter, setSectorFilter] = useState<string>("All");

  const sectors = ["All", ...mongoliaData.sectors.map(s => s.name)];
  const filteredSectors = sectorFilter === "All" ? mongoliaData.sectors : mongoliaData.sectors.filter(s => s.name === sectorFilter);

  return (
    <main className="max-w-[1600px] mx-auto px-6 py-12 space-y-24 selection:bg-cyan-500/30 pb-32">
      
      {/* ── Cinematic Heading Section ── */}
      <section className="relative">
        <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/50 via-transparent to-transparent hidden xl:block" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                Regional Intelligence Sector
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em]">
                Market Report 2026.Q1
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                MONGOLIA
              </h1>
              <h1 className="text-6xl md:text-8xl font-black text-white/20 tracking-tighter leading-none">
                MARKET SECTOR
              </h1>
            </div>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed font-medium">
              High-resolution analysis of the Central Asian digital bridge. Synthesizing SMB 
              vulnerabilities, ICT infrastructure nodes, and agentic AI deployment vectors within Ulaanbeatar.
            </p>
          </div>

          <div className="flex flex-col gap-6 shrink-0 self-end">
            <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center gap-10 backdrop-blur-3xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
               
               <div className="flex flex-col relative z-10">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Market Status</span>
                  <div className="flex items-center gap-3 mt-2">
                     <span className="text-2xl font-black text-white tracking-tighter uppercase whitespace-nowrap">ACCELERATING</span>
                     <div className="flex gap-1 group-hover:scale-110 transition-transform">
                        {[1,2,3,4,5].map(i => (
                          <motion.div 
                            key={i}
                            animate={{ height: i <= 4 ? [12, 16, 12] : 12 }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className={`w-1.5 rounded-full ${i <= 4 ? "bg-emerald-500" : "bg-white/10"}`} 
                          />
                        ))}
                     </div>
                  </div>
               </div>
               <div className="w-px h-12 bg-white/5 mx-2" />
               <div className="flex flex-col relative z-10">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Opportunity Index</span>
                  <span className="text-sm font-black text-cyan-400 mt-2 tracking-widest uppercase">ALPHA SEGMENT</span>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── High-Fidelity Overview Stats ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Connectivity Index", val: m.internet_penetration, icon: Wifi, color: "blue" },
          { label: "Global E-Gov Rank", val: m.eGov_rank, icon: Monitor, color: "purple" },
          { label: "ICT Revenue (2025)", val: (m as any).ict_revenue_2025, icon: TrendingUp, color: "emerald" },
          { label: "Node Expansion", val: m.five_g_coverage_target_2027, icon: Radio, color: "cyan" },
        ].map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="p-8 rounded-[2.5rem] bg-[#020617]/40 border border-white/5 backdrop-blur-3xl group flex flex-col gap-4 hover:border-white/10 transition-all duration-500"
          >
            <div className={`p-3 rounded-2xl bg-white/[0.02] border border-white/5 w-fit group-hover:scale-110 transition-transform ${
              item.color === 'blue' ? 'text-blue-500' : 
              item.color === 'purple' ? 'text-purple-500' :
              item.color === 'emerald' ? 'text-emerald-500' : 'text-cyan-500'
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
               <div className="text-3xl font-black text-white tracking-tighter mb-1">{item.val}</div>
               <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 leading-none">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── Live Tactical Deployment Map ── */}
      <section className="space-y-8">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Globe className="w-6 h-6" />
               </div>
               <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">Deployment Satellite Network</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
         </div>
         <div className="p-1 rounded-[3rem] bg-white/[0.02] border border-white/5 shadow-2xl overflow-hidden group">
            <LiveMap />
         </div>
      </section>

      {/* ── SMB Sector Intelligence ── */}
      <section className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                   <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">Target Verticals</h2>
              </div>
              <p className="text-slate-500 text-sm max-w-2xl font-medium">Extracting mission-critical inefficiencies within core SMB clusters. Every node listed represents a prime vector for agentic displacement.</p>
           </div>
           
           <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
              {sectors.slice(0, 5).map(s => (
                <button
                  key={s}
                  onClick={() => setSectorFilter(s)}
                  className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 relative ${
                    sectorFilter === s ? "text-white" : "text-slate-500 hover:text-white"
                  }`}
                >
                  {sectorFilter === s && (
                    <motion.div layoutId="sectorTab" className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl" />
                  )}
                  <span className="relative z-10">{s === 'All' ? 'GLOBAL' : s}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSectors.map((sector, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={idx}
              className="p-10 rounded-[3rem] bg-[#020617]/40 border border-white/5 relative group overflow-hidden flex flex-col backdrop-blur-3xl transition-all duration-700 hover:border-cyan-500/20"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-8xl grayscale group-hover:grayscale-0">
                {sector.icon}
              </div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                   <div className="flex items-center gap-5">
                      <div className="text-4xl filter group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all animate-float">
                        {sector.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter leading-tight">{sector.name}</h3>
                        <div className="text-cyan-500/60 font-black uppercase text-[10px] tracking-[0.3em] font-mono mt-1">
                          {sector.nameLocal}
                        </div>
                      </div>
                   </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  ROI {sector.roi_estimate}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group/stat">
                  <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest block mb-2">Market Vol</span>
                  <span className="text-sm font-black text-white uppercase group-hover:text-cyan-400 transition-colors tracking-tight">{sector.market_size}</span>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group/stat">
                  <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest block mb-2">Adoption Sat</span>
                  <span className="text-sm font-black text-white uppercase group-hover:text-cyan-400 transition-colors tracking-tight">{sector.current_adoption}</span>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500/60 mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5" /> Sector Vulnerabilities
                  </div>
                  <ul className="space-y-4">
                    {sector.pain_points.map((point, j) => (
                      <li key={j} className="flex gap-4 group/point">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 group-hover/point:scale-150 transition-transform ${
                           point.impact === "Critical" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" : 
                           point.impact === "High" ? "bg-amber-500" : "bg-blue-500"
                        }`} />
                        <div>
                          <p className="text-sm font-black text-slate-200 tracking-tight group-hover/point:text-white transition-colors">{point.issue}</p>
                          <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1">Impact Rating: <span className={point.impact === "Critical" ? "text-red-500" : "text-white/40"}>{point.impact}</span></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 group/sol">
                  <div className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" /> High-Yield Interventions
                  </div>
                  <ul className="space-y-3">
                    {sector.ai_solutions.map((sol, j) => (
                      <li key={j} className="flex gap-3 text-sm text-cyan-100 items-start font-bold uppercase tracking-tight group-hover/sol:translate-x-1 transition-transform">
                        <ArrowUpRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                   <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] font-mono leading-none">Operational Nodes</span>
                   <div className="h-px flex-1 bg-white/5 mx-4" />
                </div>
                <div className="flex flex-wrap gap-2 text-white">
                  {sector.key_players.map((kp, j) => (
                    <a 
                      key={j} 
                      href={kp.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-[9px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all flex items-center gap-2 group/kp"
                    >
                      {kp.name}
                      <ExternalLink className="w-3 h-3 text-slate-600 group-hover/kp:text-cyan-400" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Phased Market Domination ── */}
      <section className="space-y-16 pt-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                   <Binary className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-black text-white tracking-widest uppercase leading-none">The Roadmap</h2>
             </div>
             <p className="text-slate-500 text-sm max-w-2xl font-medium leading-relaxed">Systemic integration playbook for the Mongolian digital economy. Phased maneuvers identifying moats and scalability vectors.</p>
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 shrink-0 self-end">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Execution Protocols Engaged</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {(mongoliaData as any).roadmap.map((phase: any, i: number) => (
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               key={i} 
               className="relative group"
            >
              {i < (mongoliaData as any).roadmap.length - 1 && (
                <div className="absolute left-12 top-24 bottom-[-3rem] w-px bg-gradient-to-b from-purple-500/40 via-white/5 to-transparent z-0 hidden lg:block" />
              )}
              
              <div className={`p-10 rounded-[3.5rem] bg-[#020617]/40 border border-white/5 transition-all duration-700 backdrop-blur-3xl overflow-hidden relative group-hover:border-purple-500/20 ${phase.status === 'current' ? 'border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.05)]' : ''}`}>
                
                {/* Visual Index */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[15rem] pointer-events-none font-black italic text-white leading-none">
                   {i + 1}
                </div>

                <div className="flex flex-col lg:flex-row gap-16 relative z-10">
                  {/* Phase Info */}
                  <div className="lg:w-1/3 space-y-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl transition-all duration-700 group-hover:scale-110 ${phase.status === 'current' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                        {i === 0 ? <Zap className="w-10 h-10" /> : i === 1 ? <Layers className="w-10 h-10" /> : <Binary className="w-10 h-10" />}
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-2 leading-none">{phase.phase}</div>
                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{phase.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                       <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                         <Activity className="w-3.5 h-3.5" /> {phase.timeframe}
                       </div>
                       <div className={`px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${
                         phase.complexity === 'High' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                         phase.complexity === 'Extreme' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                         'bg-amber-500/10 border-amber-500/20 text-amber-400'
                       }`}>
                         {phase.complexity} Index
                       </div>
                    </div>

                    <p className="text-slate-400 leading-relaxed text-sm font-medium">
                      {phase.description}
                    </p>
                  </div>

                  {/* Tactics Grid */}
                  <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {phase.tactics.map((tactic: any, j: number) => (
                      <div key={j} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-500 flex flex-col justify-between group/tactic shadow-xl">
                        <div>
                          <div className="flex justify-between items-start mb-6">
                             <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover/tactic:bg-purple-500 group-hover/tactic:text-white transition-all">
                               <ChevronRight className="w-5 h-5 group-hover/tactic:translate-x-0.5" />
                             </div>
                             <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                                tactic.impact === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                tactic.impact === 'Massive' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                             }`}>
                               {tactic.impact} SIGNAL
                             </span>
                          </div>
                          <h4 className="text-base font-black text-white mb-3 uppercase tracking-tight">{tactic.goal}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
                            "{tactic.detail}"
                          </p>
                        </div>
                        
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                             <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Operation Active</span>
                           </div>
                           <Activity className="w-3.5 h-3.5 text-slate-800 group-hover/tactic:text-purple-500 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Policy Network ── */}
      <section className="space-y-10 pt-16 border-t border-white/5">
        <div className="flex items-center gap-3">
           <Cpu className="w-8 h-8 text-slate-700" />
           <h2 className="text-2xl font-black text-white tracking-widest uppercase">Government Node Registry</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {mongoliaData.government_initiatives.map((gov, i) => (
             <motion.a 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05 }}
               key={i} 
               href={gov.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
             >
                <div>
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="text-base font-black text-slate-300 group-hover:text-white leading-tight uppercase tracking-tight">{gov.name}</h4>
                     <span className="text-[9px] font-black text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">{gov.year}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-6 font-medium italic">"{gov.desc}"</p>
                </div>
                <div className="flex items-center text-[9px] font-black uppercase text-slate-600 group-hover:text-cyan-400 gap-2 transition-colors tracking-widest">
                   Verify Protocol <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
             </motion.a>
           ))}
        </div>
      </section>
    </main>
  );
}
