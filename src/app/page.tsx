"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Activity,
  ExternalLink,
  Target,
  Zap,
  Globe,
  Radio,
  Cpu,
  ShieldCheck,
  ZapOff,
  Crosshair
} from "lucide-react";
import { market_intel, researchIdeas, aiNewsFallback } from "@/lib/data";
import IntelSummary from "@/components/IntelSummary";
import LiveMap from "@/components/LiveMap";

function MetricCard({
  icon: Icon,
  label,
  value,
  subtitle,
  accent = "blue",
  index = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtitle: string;
  accent?: "blue" | "cyan" | "purple" | "gradient" | "emerald";
  index?: number;
}) {
  const themes = {
    blue: "border-blue-500/20 hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    cyan: "border-cyan-500/20 hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
    purple: "border-purple-500/20 hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
    emerald: "border-emerald-500/20 hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
    gradient: "border-white/5 hover:border-white/20 bg-gradient-to-br from-white/[0.03] to-transparent",
  };

  const iconColors = {
    blue: "text-blue-400",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    emerald: "text-emerald-400",
    gradient: "text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-10 rounded-[3rem] bg-[#020617]/40 border backdrop-blur-2xl transition-all duration-700 group relative overflow-hidden flex flex-col justify-between min-h-[300px] ${themes[accent]}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full bg-current pointer-events-none group-hover:opacity-20 transition-opacity" />
      
      <div>
        <div className={`p-4 rounded-2xl bg-white/[0.02] border border-white/5 w-fit mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${iconColors[accent]}`}>
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 leading-none">
          {label}
        </h3>
      </div>

      <div>
        <div className="text-6xl font-black text-white tracking-tighter mt-6 flex items-baseline gap-2">
          {value}
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
        </div>
        <p className="mt-4 text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-tight max-w-[90%] opacity-70 group-hover:opacity-100 transition-opacity">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<"All" | "Proposed" | "In Progress">("All");
  const [latestNews, setLatestNews] = useState<any[]>(aiNewsFallback.slice(0, 2));

  const filteredIdeas = filter === "All" ? researchIdeas : researchIdeas.filter(idea => idea.status === filter);

  return (
    <main className="max-w-[1600px] mx-auto px-10 py-20 space-y-32 selection:bg-cyan-500/30 pb-40">
      
      {/* ── Cinematic Heading Section ── */}
      <section className="relative min-h-[50vh] flex flex-col justify-center">
        <div className="absolute -left-20 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500 via-transparent to-transparent hidden 2xl:block opacity-20" />
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-8 space-y-10"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="px-5 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  Satellite Uplink: MN_CENTRAL_NODE
                </div>
                <div className="px-5 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  Gereg Alpha v6.0.RC1
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
                  Agentic<br />
                  <span className="text-white/20">War-Room</span>
                </h1>
              </div>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-bold uppercase tracking-tight opacity-70">
                Live synaptic analysis of autonomous neural workflows, market arbitrage vectors, 
                and systemic infrastructure shifts in the Central Asian corridor.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-6">
               <button className="px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-cyan-400 hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all duration-500 flex items-center gap-4 group">
                  Initiate Scan <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </button>
               <button className="px-10 py-5 bg-white/[0.03] border border-white/10 text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all duration-500">
                  Tactical Archives
               </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="xl:col-span-4"
          >
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
              
              <div className="space-y-10 relative z-10">
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mb-3">Core Fidelity</span>
                      <div className="flex gap-1.5">
                        {[1,2,3,4,5,6].map(i => (
                          <motion.div 
                            key={i}
                            animate={{ height: [16, 24, 16] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                            className={`w-2 rounded-full ${i <= 5 ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-white/10"}`} 
                          />
                        ))}
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none block mb-2">Protocol</span>
                      <span className="text-xs font-black text-emerald-500 uppercase font-mono">ENCRYPTED_SYN</span>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-glow" />
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Nodes Locked</span>
                      </div>
                      <span className="text-xl font-black text-white font-mono">220</span>
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-glow" />
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Arbitrage</span>
                      </div>
                      <span className="text-xl font-black text-white font-mono">$4.8M</span>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Target Saturation</span>
                      <span className="text-[10px] font-black text-white font-mono">82.4%</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '82.4%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                      />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Strategic Map Preview ── */}
      <section className="space-y-12">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <Crosshair className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Deployment<br /><span className="text-white/20">Satellite Grid</span></h2>
               </div>
               <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Live visualization of 220 analyzed target nodes in the Ulaanbaatar strategic zone.</p>
            </div>
            <a href="/mongolia" className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all flex items-center gap-3 shrink-0">
               Full Grid Access <ArrowRight className="w-4 h-4" />
            </a>
         </div>

         <div className="h-[600px] w-full relative">
            <LiveMap />
            {/* HUD Overlay for Map on Home */}
            <div className="absolute top-10 right-10 z-[1000] pointer-events-none p-8 rounded-[2.5rem] bg-[#020617]/80 backdrop-blur-2xl border border-white/10 hidden lg:block max-w-xs">
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <Radio className="w-4 h-4 text-cyan-500" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Sector Analysis</span>
                  </div>
                  <div className="space-y-4">
                     {['High Level Alpha', 'Mid Market Arbs', 'Low Friction SMIs'].map((label, idx) => (
                       <div key={label} className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
                          <span className="text-[10px] font-black text-white font-mono">
                            {idx === 0 ? '07 Node' : idx === 1 ? '53 Node' : '160 Node'}
                          </span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ── High-Fidelity Metrics Grid ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MetricCard
          icon={TrendingUp}
          label="Target Alpha Reclaim"
          value="220"
          subtitle="Total verified enterprise nodes locked in for agentic deployment."
          accent="blue"
          index={0}
        />
        <MetricCard
          icon={Clock}
          label="Human Capacity Reclaim"
          value={market_intel.headline_metrics.admin_time_saved}
          subtitle="Operational hours liquidated from administrative overhead via LLM nodes."
          accent="cyan"
          index={1}
        />
        <MetricCard
          icon={DollarSign}
          label="Market Potential"
          value="$4.8M"
          subtitle="Estimated total liquifiable revenue across 220 active Mongolian sectors."
          accent="emerald"
          index={2}
        />
        <MetricCard
          icon={Cpu}
          label="Synaptic Latency"
          value="0.12ms"
          subtitle="Real-time edge inference delay across Gereg-Mesh distributed nodes."
          accent="purple"
          index={3}
        />
        <MetricCard
          icon={ShieldCheck}
          label="Failover Fidelity"
          value="99.9%"
          subtitle="Zero-day recovery success rate for autonomous business pipelines."
          accent="blue"
          index={4}
        />
        <MetricCard
          icon={Zap}
          label="Deployment Speed"
          value="Instant"
          subtitle="Rapid zero-code autonomous agent deployment protocols active."
          accent="cyan"
          index={5}
        />
      </section>

      {/* ── Data Summaries Layer ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-20">
          <IntelSummary />
          
          {/* ── Operation Proposals ── */}
          <section className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-end gap-10 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Proposal<br /><span className="text-white/20">Queue</span></h2>
                </div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Strategic research initiatives identifying future market gaps.</p>
              </div>

              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
                {["All", "Proposed", "In Progress"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${filter === f
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "text-slate-500 hover:text-white"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredIdeas.map((idea, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-700 group relative overflow-hidden flex flex-col justify-between min-h-[360px]"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-9xl group-hover:opacity-[0.08] transition-opacity pointer-events-none font-black italic">
                    {i+1}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] border ${
                        idea.status === "In Progress" 
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        {idea.status}
                      </div>
                      <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{idea.icon}</div>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-6 leading-none uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{idea.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                      {idea.description}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                    <span className="text-slate-600 text-[9px] font-black uppercase tracking-widest">TAM Alpha</span>
                    <span className="text-white text-[11px] font-mono font-black tracking-widest">{idea.potential === 'High' ? '$2.4M' : '$800K'} Potential</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Broadcast Sidebar ── */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="sticky top-32">
            <div className="p-10 rounded-[3.5rem] bg-[#020617]/40 border border-white/5 backdrop-blur-3xl space-y-10 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  <h2 className="text-xl font-black text-white tracking-[0.2em] uppercase">Live Ticker</h2>
                </div>
                <a href="/news" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 text-slate-500 hover:text-cyan-400 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="space-y-8 relative z-10">
                {latestNews.map((news, i) => (
                  <motion.a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={i} 
                    className="block group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="space-y-4 p-6 rounded-[2rem] hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-all duration-500">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] font-mono">{news.source}</span>
                        <div className={`w-2 h-2 rounded-full ${news.impact === 'critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'}`} />
                      </div>
                      <h3 className="text-base font-black text-slate-200 leading-snug group-hover:text-white transition-colors uppercase tracking-tight">{news.title}</h3>
                      <div className="flex items-center justify-between text-[9px] text-slate-600 font-black uppercase tracking-widest pt-2">
                        <span>{new Date(news.date).toLocaleDateString()}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:text-cyan-400" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 space-y-4 relative z-10">
                 <div className="flex items-center gap-3">
                    <Radio className="w-4 h-4 text-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">Protocol Sync</span>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-relaxed italic font-bold uppercase tracking-tight opacity-60">Aggregating decentralized feeds via Gereg-Core Mesh...</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
