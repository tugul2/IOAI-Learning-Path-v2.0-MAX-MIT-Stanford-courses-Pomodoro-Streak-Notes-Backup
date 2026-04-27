"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  ChevronDown, 
  Activity, 
  Target, 
  Zap, 
  ShieldAlert, 
  Radio 
} from "lucide-react";

const summaries = [
  {
    period: "This Week",
    date: "Mar 16–22, 2026",
    type: "weekly",
    color: "cyan",
    highlights: [
      "GPT-5.4 'Operative Intelligence' launched with native computer use — biggest model release since GPT-4",
      "OpenClaw officially transferred to open-source foundation, ensuring permanent free access",
      "Gemini 2.5 Flash-Lite dropped pricing to $0.10/M tokens — new industry floor for inference costs",
      "Mongolia government confirmed 60,000 AI training initiative begins Q2 2026",
      "Gartner published $89B AI agency market forecast for 2027 — SMB segment is #1 growth area",
    ],
    impact: "critical",
    verdict: "This was the most significant week for AI agencies in 2026. Three major cost reductions + OpenClaw going foundation-backed = the barrier to entry for AI agencies dropped to near zero. Execute NOW.",
  },
  {
    period: "Last Week",
    date: "Mar 9–15, 2026",
    type: "weekly",
    color: "blue",
    highlights: [
      "DeepSeek V3.2 launched with 90% cache discount — $0.028/M for cached requests",
      "Claude 4 Opus 4.6 released with 12% improvement on logical inference benchmarks",
      "Egune AI (Mongolia) received $3.5M from Golomt Bank at $38.5M valuation",
      "Oracle expanded Always-Free ARM tier — now includes 200GB boot volume",
      "AND Global (LendMN parent) raised $21.4M Series B from IFC",
    ],
    impact: "high",
    verdict: "Mongolian AI ecosystem is heating up fast. Egune's $38.5M valuation proves Mongolia is investable. DeepSeek's pricing makes FAQ bots essentially free to run.",
  },
  {
    period: "February 2026",
    date: "Feb 1–28, 2026",
    type: "monthly",
    color: "purple",
    highlights: [
      "Gemini 2.5 Flash launched with 1M context window and free tier (15 RPM)",
      "OpenClaw hit 200K+ GitHub stars — fastest-growing open-source project globally",
      "Chinese tech firms launched clones: Tencent 'WorkBuddy', ByteDance 'ArkClaw', Xiaomi 'miclaw'",
      "Mongolia Digital Nation Policy confirmed subsidies for SME AI projects in 2026",
      "Make.com and n8n both added native AI nodes for visual workflow building",
      "Cloudflare Workers AI launched inference at the edge — 100K requests/day free",
    ],
    impact: "high",
    verdict: "February established the foundation for zero-cost AI agencies. Free LLMs + free hosting + free automation tools = you can build a fully operational agency for $10/year.",
  },
  {
    period: "Special Ops",
    date: "March 2026 Intel",
    type: "monthly",
    color: "slate",
    highlights: [
      "RIVALRY: International firms entering UB; counter with hyper-local onsite integration.",
      "SCALING: Switch from high-cost TPUs to quantized SLMs on Oracle Always-Free nodes.",
      "SERVICE: Implement Mongolian sentiment failover to human agents for higher trust scores.",
      "ARBITRAGE: Use Contabo for raw throughput and Oracle for free-tier reliability in a hybrid mesh.",
    ],
    impact: "critical",
    verdict: "The market is shifting from 'building' to 'competing'. Pure technical excellence is no longer enough; tactical counter-strategies are now the primary driver of agency alpha.",
  },
];

export default function IntelSummary() {
  const [expanded, setExpanded] = useState<number>(0);
  const [tab, setTab] = useState<"weekly" | "monthly">("weekly");

  const filtered = summaries.filter(
    (s) => tab === "weekly" ? s.type === "weekly" : s.type === "monthly"
  );

  const impactStyles: Record<string, string> = {
    critical: "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    high: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    indicator: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  const accentColors: Record<string, string> = {
    cyan: "border-cyan-500/10",
    blue: "border-blue-500/10",
    purple: "border-purple-500/10",
    slate: "border-slate-500/10",
  };

  return (
    <section className="space-y-8">
      {/* ── Heading Context ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
               <Calendar className="w-6 h-6" />
             </div>
             <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">Intelligence Archives</h2>
          </div>
          <p className="text-slate-500 text-xs font-medium">Historical synoptic analysis of global model pivots and market shifts.</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0 self-end">
           {(["weekly", "monthly"] as const).map((t) => (
             <button
               key={t}
               onClick={() => { setTab(t); setExpanded(0); }}
               className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative ${
                 tab === t ? "text-white" : "text-slate-500 hover:text-white"
               }`}
             >
               {tab === t && (
                 <motion.div layoutId="intelTab" className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl" />
               )}
               <span className="relative z-10">{t} summary</span>
             </button>
           ))}
        </div>
      </div>

      {/* ── Summaries Grid ── */}
      <div className="space-y-4">
        {filtered.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-[2.5rem] border ${accentColors[s.color]} bg-[#020617]/40 backdrop-blur-3xl overflow-hidden transition-all duration-500 group hover:border-white/10`}
          >
            <button
              onClick={() => setExpanded(expanded === i ? -1 : i)}
              className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 text-4xl pointer-events-none group-hover:opacity-10 transition-opacity whitespace-nowrap font-black uppercase tracking-widest">HISTORICAL_INTEL</div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-white tracking-tight leading-none uppercase">{s.period}</h3>
                   <span className="text-[10px] text-slate-600 font-mono font-bold uppercase tracking-widest mt-1.5 block">{s.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0 relative z-10">
                <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${impactStyles[s.impact]}`}>
                   {s.impact} SIGNAL
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-500" style={{ transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                   <ChevronDown className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-10 space-y-8 pt-4">
                    {/* Highlights Analysis */}
                    <div className="space-y-4">
                       <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 px-2 leading-none mb-2">Alpha Extraction Highlights</div>
                       <div className="grid grid-cols-1 gap-4">
                         {s.highlights.map((h, j) => (
                           <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.05 }}
                              key={j} 
                              className="group/item flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
                           >
                             <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 group-hover/item:scale-110 transition-transform">
                               <TrendingUp className="w-4 h-4" />
                             </div>
                             <p className="text-sm text-slate-300 font-bold leading-relaxed uppercase tracking-tight">{h}</p>
                           </motion.div>
                         ))}
                       </div>
                    </div>

                    {/* Final Verdict HUD */}
                    <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex flex-col md:flex-row items-start md:items-center gap-8 relative group/verdict">
                       <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.05] to-transparent pointer-events-none" />
                       <div className="w-16 h-16 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 shadow-2xl group-hover/verdict:scale-110 transition-transform">
                         <Zap className="w-8 h-8" />
                       </div>
                       <div>
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 leading-none block mb-2 uppercase">Core Verdict & Operational Directive</span>
                         <p className="text-base text-white/90 font-black italic uppercase tracking-tighter leading-snug">"{s.verdict}"</p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
