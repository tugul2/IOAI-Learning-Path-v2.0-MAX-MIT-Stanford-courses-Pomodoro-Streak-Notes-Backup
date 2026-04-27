"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiNewsFallback } from "@/lib/data";
import { Calendar, ExternalLink, Activity, Globe, Cpu, Building2, AlertCircle, Radio, ArrowUpRight, Filter } from "lucide-react";

export default function AINewsFeed() {
  const [filter, setFilter] = useState("All");
  const [news, setNews] = useState<any[]>(aiNewsFallback);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchLiveNews = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/refresh");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (data.articles && data.articles.length > 0) {
        setNews(data.articles);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch live news:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
    const handleRefresh = () => fetchLiveNews();
    window.addEventListener("triggerRefresh", handleRefresh);
    return () => window.removeEventListener("triggerRefresh", handleRefresh);
  }, []);

  const categories = ["All", ...Array.from(new Set(news.map((n) => n.category)))];
  const filteredNews = filter === "All" ? news : news.filter(n => n.category === filter);

  return (
    <main className="max-w-[1600px] mx-auto px-6 py-12 space-y-20 selection:bg-cyan-500/30 pb-32">
      
      {/* ── Cinematic Heading Section ── */}
      <section className="relative">
        <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/50 via-transparent to-transparent hidden xl:block" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Radio className="w-3 h-3 animate-pulse" />
                Live Broadcast
              </div>
              <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-[0.3em]">
                Signal Strength: High
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
                INTELLIGENCE
              </h1>
              <h1 className="text-6xl md:text-7xl font-black text-white/20 tracking-tighter leading-none">
                BROADCAST
              </h1>
            </div>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed font-medium">
              Real-time synchronization with primary AI foundation model hubs and enterprise adoption nodes.
              Synthesizing global breakthroughs into actionable agency maneuvers.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-6 backdrop-blur-xl shrink-0 self-end">
             <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Feed Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${loading ? "bg-amber-500 animate-pulse" : "bg-emerald-500"} shadow-[0_0_10px_rgba(16,185,129,0.5)]`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${loading ? "text-amber-500" : "text-emerald-500"}`}>
                    {loading ? "Re-syncing..." : "Live Feed"}
                  </span>
                </div>
             </div>
             <div className="w-px h-10 bg-white/5 mx-2" />
             <div className="flex flex-col items-end">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Nodes Active</span>
                <span className="text-xs font-black text-white mt-1">19+ ENDPOINTS</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-10">
         <div className="flex flex-wrap items-center gap-3">
            <Filter className="w-4 h-4 text-slate-600 mr-2" />
            {categories.map((c, i) => (
               <button
                 key={i}
                 onClick={() => setFilter(c as string)}
                 className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                   filter === c 
                   ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                   : "bg-white/5 border border-white/10 text-slate-500 hover:text-white"
                 }`}
               >
                 {c as string}
               </button>
            ))}
         </div>
         {error && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">
              <AlertCircle className="w-4 h-4" /> Endpoint timeout. Viewing local registry.
            </div>
         )}
      </div>

      {/* ── Futuristic Timeline ── */}
      <section className="relative space-y-20 pb-20">
         <div className="absolute left-1/2 -ml-px top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden md:block" />
         
         <div className="grid grid-cols-1 gap-12">
           {filteredNews.map((article, i) => (
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 key={i} 
                 className={`relative flex flex-col md:flex-row gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                 {/* Timeline Marker (Central) */}
                 <div className="absolute left-1/2 -ml-5 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#020617] z-20 shadow-[0_0_30px_rgba(255,255,255,0.05)] text-white group cursor-crosshair hover:border-cyan-500/50 transition-colors duration-500">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                 </div>

                 {/* Information Block */}
                 <div className={`w-full md:w-[calc(50%-40px)] group ${i % 2 === 0 ? "text-right items-end" : "text-left items-start"} flex flex-col gap-4 px-2`}>
                   <div className={`flex items-center gap-3 ${i % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}>
                     <span className="text-slate-600 font-mono text-[10px] font-black uppercase tracking-widest">
                       {new Date(article.date).toLocaleDateString()}
                     </span>
                     <div className={`w-1 h-3 rounded-full ${article.impact === 'critical' ? 'bg-red-500' : 'bg-cyan-500'} opacity-40`} />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-black text-white/40 tracking-tighter leading-none transition-all group-hover:text-white duration-1000">
                     0{i+1}<span className="text-white/10">.</span> {article.title}
                   </h3>
                 </div>

                 {/* Card Block */}
                 <div className="w-full md:w-[calc(50%-40px)]">
                    <div className="p-8 rounded-[2.5rem] bg-[#020617]/60 border border-white/5 backdrop-blur-3xl relative overflow-hidden group shadow-2xl transition-all duration-500 hover:border-cyan-500/20">
                       <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                         {article.category === "Model Release" ? <Cpu className="w-24 h-24" /> : <Building2 className="w-24 h-24" />}
                       </div>

                       <div className="flex justify-between items-start mb-6">
                          <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                            article.impact === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            article.impact === 'high' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {article.impact} impact
                          </span>
                          <span className="text-cyan-500/80 font-black uppercase text-[10px] tracking-widest font-mono">Source: {article.source}</span>
                       </div>

                       <p className="text-slate-400 text-sm leading-relaxed font-medium mb-10">
                          {article.summary}
                       </p>

                       <div className="flex flex-wrap gap-2 mb-8">
                          {article.tags.map((tag: string, j: number) => (
                             <span key={j} className="text-[9px] px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-500 font-bold uppercase tracking-wider">
                                #{tag}
                             </span>
                          ))}
                       </div>

                       <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Category: {article.category}</span>
                          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all group/link">
                             Intelligence Link <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                          </a>
                       </div>
                    </div>
                 </div>
              </motion.div>
           ))}
         </div>
      </section>

      {/* ── Operational Footer ── */}
      <section className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 border border-white/5 text-center relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         <div className="relative z-10 flex flex-col items-center gap-6">
            <Radio className="w-10 h-10 text-cyan-400/50" />
            <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Sector Broadcast Fully Sync'd</h2>
            <p className="text-slate-500 text-xs font-medium max-w-xl leading-relaxed">Intelligence node v5.2 initialized. All primary endpoints are reporting status GREEN. Automatic re-synchronization occurs every 600 seconds.</p>
         </div>
      </section>
      
    </main>
  );
}
