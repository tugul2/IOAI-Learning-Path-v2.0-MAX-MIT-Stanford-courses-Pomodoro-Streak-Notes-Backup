"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiModels, hostingProviders } from "@/lib/data";
import { Cpu, Server, Activity, ArrowUpRight, Zap, ExternalLink, Database, Globe, Filter } from "lucide-react";

export default function InfrastructureOps() {
  const [activeTab, setActiveTab] = useState<"models" | "vps">("models");
  const [vpsFilter, setVpsFilter] = useState<"all" | "gpu" | "cpu" | "free">("all");
  const [modelFilter, setModelFilter] = useState<"all" | "frontier" | "mid-tier" | "budget" | "open-source">("all");

  const filteredModels = modelFilter === "all" ? aiModels : aiModels.filter(m => m.category === modelFilter);
  const filteredVPS = hostingProviders.filter(p => vpsFilter === "all" || p.category === vpsFilter || (vpsFilter === "gpu" && p.gpu_plans.length > 0));

  return (
    <main className="max-w-[1600px] mx-auto px-6 py-12 space-y-20 selection:bg-cyan-500/30 pb-32">
      
      {/* ── Cinematic Heading Section ── */}
      <section className="relative">
        <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-transparent to-transparent hidden xl:block" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Database className="w-3 h-3" />
                Raw Compute Layer
              </div>
              <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em]">
                Price Arbiter v5.2
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
                INFRASTRUCTURE
              </h1>
              <h1 className="text-6xl md:text-7xl font-black text-white/20 tracking-tighter leading-none">
                ARBITER
              </h1>
            </div>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed font-medium">
              Real-time monitoring of global foundation models and high-performance compute clusters. 
              Calculating optimal inference/cost ratios for autonomous agency scale-out.
            </p>
          </div>

          <div className="flex flex-col gap-6 shrink-0">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 self-end">
               <button
                 onClick={() => setActiveTab("models")}
                 className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative group ${
                   activeTab === "models" ? "text-blue-400" : "text-slate-500 hover:text-white"
                 }`}
               >
                 {activeTab === "models" && (
                   <motion.div layoutId="infraTab" className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl" />
                 )}
                 <span className="relative z-10 flex items-center gap-2">
                   <Cpu className="w-3.5 h-3.5" /> AI Models
                 </span>
               </button>
               <button
                 onClick={() => setActiveTab("vps")}
                 className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative group ${
                   activeTab === "vps" ? "text-cyan-400" : "text-slate-500 hover:text-white"
                 }`}
               >
                 {activeTab === "vps" && (
                   <motion.div layoutId="infraTab" className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-xl" />
                 )}
                 <span className="relative z-10 flex items-center gap-2">
                   <Server className="w-3.5 h-3.5" /> Cloud Nodes
                 </span>
               </button>
            </div>

            <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-6 backdrop-blur-xl">
               <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">GPU Index</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    <span className="text-xs font-black text-white">CONSTRAINED</span>
                  </div>
               </div>
               <div className="w-px h-8 bg-white/5" />
               <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Global Latency</span>
                  <span className="text-xs font-black text-emerald-400 mt-1">OPTIMAL (14ms)</span>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── AI Models Section ── */}
      <AnimatePresence mode="wait">
        {activeTab === "models" ? (
          <motion.section 
            key="models"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-8">
               <Filter className="w-4 h-4 text-slate-600 mr-2" />
               {["all", "frontier", "mid-tier", "budget", "open-source"].map(f => (
                 <button
                   key={f}
                   onClick={() => setModelFilter(f as any)}
                   className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     modelFilter === f 
                     ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                     : "bg-white/5 border border-white/10 text-slate-500 hover:text-white"
                   }`}
                 >
                   {f}
                 </button>
               ))}
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-[#020617]/40 backdrop-blur-2xl overflow-hidden shadow-3xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Asset Identifier</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Input (1M)</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Output (1M)</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Cache Save</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Vol (Tokens)</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Latency</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Directives</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredModels.map((model, i) => (
                      <tr key={i} className="group hover:bg-white/[0.02] transition-colors duration-500">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 ${
                              model.category === "frontier" ? "bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]" :
                              model.category === "budget" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                              model.category === "open-source" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                              "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            }`}>
                              <Cpu className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-black text-white tracking-tight">{model.name}</span>
                                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border ${
                                  model.category === 'open-source' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-white/5 text-slate-500 border-white/10'
                                }`}>
                                  {model.badge}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">
                                  {model.provider}
                                </span>
                                {model.url && (
                                  <a href={model.url} target="_blank" rel="noopener noreferrer" className="text-cyan-500/40 hover:text-cyan-400 transition-colors">
                                     <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 font-mono text-sm font-black text-white">
                          {model.input === "$0.00" ? <span className="text-emerald-400">ZERO_COST</span> : model.input}
                        </td>
                        <td className="px-8 py-6 font-mono text-sm font-black text-white">
                          {model.output === "$0.00" ? <span className="text-emerald-400">ZERO_COST</span> : model.output}
                        </td>
                        <td className="px-8 py-6 font-mono text-sm font-black text-amber-500/80">
                          {model.cached_input}
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 text-[11px] font-mono border border-white/5 font-bold uppercase">
                            {model.context}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <Activity className={`w-3.5 h-3.5 ${model.latency === 'Local' ? "text-emerald-400" : "text-cyan-500"}`} />
                            {model.latency}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-[11px] text-slate-500 leading-relaxed max-w-[240px] font-medium italic">
                            "{model.highlight}"
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="vps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-8">
               <Filter className="w-4 h-4 text-slate-600 mr-2" />
               {["all", "gpu", "cpu", "free"].map(f => (
                 <button
                   key={f}
                   onClick={() => setVpsFilter(f as any)}
                   className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     vpsFilter === f 
                     ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                     : "bg-white/5 border border-white/10 text-slate-500 hover:text-white"
                   }`}
                 >
                   {f}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {filteredVPS.map((host, i) => (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    key={i} 
                    className="p-10 rounded-[3rem] bg-[#020617]/40 border border-white/5 relative group overflow-hidden flex flex-col justify-between backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20"
                 >
                    {/* Background Visuals */}
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Server className="w-40 h-40 text-white" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-5 mb-10">
                        <div className="flex flex-col">
                           <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{host.provider}</h3>
                           <div className="flex items-center gap-3 mt-3">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                host.category === 'free' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                host.category === 'gpu' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              }`}>
                                {host.category} node
                              </span>
                              {host.url && (
                                <a href={host.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                           </div>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                         {host.value_prop}
                      </p>

                      <div className="space-y-8">
                         {/* GPU Tiers */}
                         {host.gpu_plans.length > 0 && (
                           <div className="space-y-4">
                             <div className="flex items-center gap-3">
                               <Zap className="w-4 h-4 text-purple-500" />
                               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500">Acceleration Core</span>
                             </div>
                             <div className="space-y-3">
                                {host.gpu_plans.map((p, j) => (
                                  <div key={j} className="flex justify-between items-center p-5 rounded-2xl bg-purple-500/5 border border-purple-500/10 group/plan hover:bg-purple-500/10 transition-all">
                                    <div>
                                       <div className="text-white font-black text-base tracking-tight">{p.name}</div>
                                       <div className="text-[10px] text-slate-500 font-mono mt-1 font-bold">{p.vram} RAM • {p.cpu} CPU</div>
                                    </div>
                                    <div className="text-right">
                                       <div className="text-purple-400 font-mono font-black text-lg">{p.price}</div>
                                    </div>
                                  </div>
                                ))}
                             </div>
                           </div>
                         )}

                         {/* Compute Tiers */}
                         {host.plans.length > 0 && (
                           <div className="space-y-4">
                             <div className="flex items-center gap-3">
                               <Cpu className="w-4 h-4 text-blue-500" />
                               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Compute Matrix</span>
                             </div>
                             <div className="space-y-3">
                                {host.plans.map((p, j) => (
                                  <div key={j} className={`flex justify-between items-center p-5 rounded-2xl border transition-all ${
                                    p.highlight ? "bg-blue-500/10 border-blue-500/20" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                                  }`}>
                                    <div>
                                       <div className="flex items-center gap-3">
                                         <span className="text-white font-black text-base tracking-tight">{p.name}</span>
                                         {p.highlight && <span className="text-[8px] bg-blue-500 text-white px-2 py-0.5 rounded-lg font-black uppercase tracking-widest">Target</span>}
                                       </div>
                                       <div className="text-[10px] text-slate-500 font-mono mt-1 font-bold uppercase">{p.vcpu} vCPU • {p.ram} RAM • {p.storage}</div>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                       <div className={`${p.price === "$0.00/mo" ? "text-emerald-400" : "text-cyan-400"} font-mono font-black text-lg`}>{p.price}</div>
                                       <div className="text-[8px] text-slate-600 font-black uppercase tracking-tighter mt-1">{p.bandwidth} LIMIT</div>
                                    </div>
                                  </div>
                                ))}
                             </div>
                           </div>
                         )}
                      </div>
                    </div>

                    <a href={host.url} target="_blank" rel="noopener noreferrer" className="mt-12 flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all border border-white/10 hover:border-cyan-500/50">
                       Establish Connection <ArrowUpRight className="w-4 h-4" />
                    </a>
                 </motion.div>
               ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </main>
  );
}
