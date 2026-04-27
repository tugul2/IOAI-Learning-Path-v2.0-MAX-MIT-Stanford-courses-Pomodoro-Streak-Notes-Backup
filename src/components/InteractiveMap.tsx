"use client";
import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Zap, 
  ShieldAlert, 
  Rocket, 
  Activity, 
  DollarSign, 
  Lock, 
  Navigation,
  Search,
  Filter,
  Users,
  Building2,
  TrendingUp,
  Monitor,
  Cpu,
  Globe
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// ── Icons ──
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const getMarkerColor = (level: string) => {
  switch (level) {
    case "High": return "#ef4444"; // Red
    case "Mid": return "#a855f7"; // Purple
    case "Low": return "#10b981"; // Emerald
    default: return "#06b6d4"; // Cyan
  }
};

const createTacticalIcon = (level: string) => {
  const color = getMarkerColor(level);
  const size = level === "High" ? 36 : level === "Mid" ? 28 : 20;
  return L.divIcon({
    className: "tactical-div-icon",
    html: `
      <div class="relative flex items-center justify-center" style="width: ${size}px; height: ${size}px;">
        <div class="absolute inset-0 rounded-full animate-ping opacity-20" style="background-color: ${color}"></div>
        <div class="absolute inset-[15%] rounded-full opacity-40 animate-pulse" style="background-color: ${color}"></div>
        <div class="w-[30%] h-[30%] rounded-full border border-white/80 shadow-[0_0_10px_${color}]" style="background-color: ${color}"></div>
      </div>
    `,
    iconSize: [size as number, size as number],
    iconAnchor: [(size as number)/2, (size as number)/2],
  });
};

// ── Target Data Generator (200+ Nodes) ──
const generateTargets = () => {
  const seeds = [
    { name: "Khan Bank HQ", coord: [47.9177, 106.9100], level: "High", sector: "Finance", app: "Mature", ai: "Basic", pricing: "$80k-$250k" },
    { name: "Golomt Bank Tower", coord: [47.9189, 106.9175], level: "High", sector: "Finance", app: "Mature", ai: "ML-Ready", pricing: "$70k-$180k" },
    { name: "Unitel Central", coord: [47.9145, 106.9150], level: "High", sector: "Telco", app: "Advanced", ai: "Predictive", pricing: "$60k-$150k" },
    { name: "Mobicom Corp", coord: [47.9155, 106.9120], level: "High", sector: "Telco", app: "Advanced", ai: "Early", pricing: "$60k-$160k" },
    { name: "Oyu Tolgoi UB", coord: [47.9130, 106.9050], level: "High", sector: "Mining", app: "Internal", ai: "Safety-Focus", pricing: "$150k-$500k" },
    { name: "MCS Group HQ", coord: [47.9100, 106.9200], level: "High", sector: "Conglomerate", app: "Enterprise", ai: "Legacy", pricing: "$100k-$300k" },
    { name: "State Bank Hub", coord: [47.9220, 106.9150], level: "High", sector: "Finance", app: "Basic", ai: "None", pricing: "$50k-$120k" },
    { name: "Nomin Holding", coord: [47.9213, 106.9054], level: "Mid", sector: "Retail", app: "Legacy", ai: "None", pricing: "$30k-$80k" },
    { name: "Shoppy.mn", coord: [47.9220, 106.9180], level: "Mid", sector: "E-comm", app: "Modern", ai: "Early", pricing: "$20k-$60k" },
    { name: "M Bank", coord: [47.9160, 106.9250], level: "Mid", sector: "Fintech", app: "Cloud-Native", ai: "Digital-First", pricing: "$40k-$90k" },
  ];

  const targets = [...seeds];
  
  // Generate ~200 more targets procedurally around business centers
  const centers: [number, number, string][] = [
    [47.918, 106.917, "Sukhbaatar"], // Center
    [47.910, 106.885, "Bayangol"],  // West
    [47.885, 106.905, "Khan-Uul"],  // South
    [47.925, 106.935, "Bayanzurkh"] // East
  ];

  const sectors = ["Retail", "Logistics", "IT Services", "Legal", "Hospitality", "Healthcare"];
  const levels = ["Mid", "Low", "Low", "Low"]; // Weighted towards Low/SMB

  for (let i = 0; i < 210; i++) {
    const center = centers[Math.floor(Math.random() * centers.length)];
    const lat = (center[0] as number) + (Math.random() - 0.5) * 0.03;
    const lng = (center[1] as number) + (Math.random() - 0.5) * 0.06;
    const level = levels[Math.floor(Math.random() * levels.length)];
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    
    targets.push({
      name: `${sector} Node_${i + 100}`,
      coord: [lat, lng],
      level: level as any,
      sector: sector,
      app: Math.random() > 0.5 ? "Basic" : "Legacy",
      ai: "None",
      pricing: level === "Mid" ? "$15k-$45k" : "$5k-$20k"
    });
  }

  return targets;
};

const targetsData = generateTargets();

const MapEffect = ({ triggerFly }: { triggerFly: boolean }) => {
    const map = useMap();
    useEffect(() => {
        if (triggerFly) {
            setTimeout(() => {
                map.flyTo([47.9150, 106.9150], 13, { duration: 3, easeLinearity: 0.1 });
            }, 1000);
        }
    }, [map, triggerFly]);
    return null;
};

export default function InteractiveMap() {
  const [mounted, setMounted] = useState(false);
  const [triggerFly, setTriggerFly] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setTriggerFly(true), 1500);
  }, []);

  const filteredTargets = useMemo(() => {
    return targetsData.filter(t => {
      const matchLevel = filter === "All" || t.level === filter;
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.sector.toLowerCase().includes(search.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [filter, search]);

  if (!mounted) return <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-gray-950 border border-white/10 rounded-3xl animate-pulse"><div className="w-12 h-12 rounded-full border-t-2 border-cyan-500 animate-spin"></div></div>;

  return (
    <div className="w-full h-full min-h-[600px] xl:min-h-[800px] relative rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(2,6,23,0.9)] group selection:bg-cyan-500/30">
        
       {/* ── War Room Master HUD ── */}
       <div className="absolute top-8 left-8 z-[1000] space-y-4 pointer-events-auto">
          <div className="p-6 rounded-[2.5rem] bg-[#020617]/90 backdrop-blur-2xl border border-white/10 shadow-3xl w-72 group-hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                  <span className="text-[10px] font-black uppercase text-white tracking-[0.4em] font-mono">GLOBAL_TARGET_INTEL</span>
              </div>
              
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                       <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest leading-none mb-2">Live Nodes</span>
                       <span className="text-2xl font-black text-white font-mono leading-none">{filteredTargets.length}<span className="text-[10px] text-slate-600 block">AVAILABLE</span></span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest leading-none mb-2">Market Pot.</span>
                       <span className="text-2xl font-black text-cyan-400 font-mono leading-none">$4.8M<span className="text-[10px] text-slate-600 block">USD ESTIMATE</span></span>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                       <input 
                         type="text" 
                         placeholder="SCAN SECTOR..." 
                         className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-black text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-700 uppercase tracking-widest"
                         value={search}
                         onChange={(e) => setSearch(e.target.value)}
                       />
                    </div>
                    <div className="flex gap-2">
                       {["All", "High", "Mid", "Low"].map(l => (
                         <button 
                           key={l}
                           onClick={() => setFilter(l)}
                           className={`flex-1 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${
                             filter === l 
                               ? "bg-white text-black border-white" 
                               : "bg-white/5 border-white/10 text-slate-500 hover:text-white"
                           }`}
                         >
                           {l}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
          </div>

          <div className="p-4 rounded-[1.5rem] bg-[#020617]/80 backdrop-blur-xl border border-white/5 w-72 flex flex-col gap-3">
             <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1 px-1">Classification Key</div>
             <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-red-500/5 border border-red-500/10">
                   <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                   <span className="text-[8px] font-black text-red-500 uppercase">HIGH</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-purple-500/5 border border-purple-500/10">
                   <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                   <span className="text-[8px] font-black text-purple-500 uppercase">MID</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                   <span className="text-[8px] font-black text-emerald-500 uppercase">LOW</span>
                </div>
             </div>
          </div>
       </div>

       {/* ── Right Status HUD (Mini List) ── */}
       <div className="absolute top-8 right-8 z-[1000] p-6 rounded-[2.5rem] bg-[#020617]/90 backdrop-blur-xl border border-white/10 shadow-3xl w-72 pointer-events-auto h-[400px] flex flex-col group-hover:border-cyan-500/30 transition-all overflow-hidden lg:flex hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
             <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-cyan-500" />
                <span className="text-[10px] font-black uppercase text-white tracking-widest">Live Feed</span>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-grow">
             {filteredTargets.slice(0, 50).map((t, i) => (
               <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all flex items-center justify-between group/row cursor-crosshair">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getMarkerColor(t.level) }} />
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-white truncate w-32 uppercase tracking-tight">{t.name}</span>
                       <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">{t.sector}</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-black text-slate-600 font-mono">{t.pricing.split('-')[0]}</span>
               </div>
             ))}
          </div>
          
          <div className="pt-4 border-t border-white/5 shrink-0">
             <div className="text-[7px] text-slate-700 font-black uppercase text-center tracking-widest">Showing Top 50 of {filteredTargets.length} Nodes</div>
          </div>
       </div>

       {/* ── Scanning Overlay ── */}
       <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.8)] z-[400] animate-scan pointer-events-none opacity-40"></div>

       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="w-full h-full"
       >
          <MapContainer 
            center={[47.9188, 106.9174]} 
            zoom={12} 
            style={{ height: "800px", width: "100%", background: "#010413" }}
            zoomControl={false}
          >
            <MapEffect triggerFly={triggerFly} />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; CARTO'
            />
            
            <ZoomControl position="bottomright" />

            {filteredTargets.map((t, idx) => (
              <Marker 
                key={idx} 
                position={t.coord as any} 
                icon={createTacticalIcon(t.level)}
              >
                <Popup className="futuristic-popup">
                  <div className="bg-[#020617]/98 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 -m-3 min-w-[340px] shadow-2xl relative overflow-hidden group/popup">
                    <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${getMarkerColor(t.level)}, transparent)` }}></div>
                    
                    <div className="flex justify-between items-start mb-6">
                       <div className="pr-10">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[8px] font-black text-slate-500 uppercase tracking-widest">{t.sector} Node</div>
                             <div className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[8px] font-black uppercase tracking-widest" style={{ color: getMarkerColor(t.level) }}>{t.level} ALPHA</div>
                          </div>
                          <h4 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">{t.name}</h4>
                       </div>
                       <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                          <Target className="w-6 h-6 text-white/10" />
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                          <span className="text-[8px] text-slate-600 font-black uppercase block tracking-widest">Entry Capital</span>
                          <span className="text-sm font-black text-white font-mono uppercase tracking-tight">{t.pricing}</span>
                       </div>
                       <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                          <span className="text-[8px] text-slate-600 font-black uppercase block tracking-widest">Agentic Reqd</span>
                          <span className="text-sm font-black text-cyan-400 font-mono uppercase tracking-tight">Level {t.level === 'High' ? '4+' : t.level === 'Mid' ? '2' : '1'}</span>
                       </div>
                    </div>

                    <div className="space-y-6 mb-10">
                       <div className="grid grid-cols-2 gap-8 px-2">
                          <div className="space-y-3">
                             <span className="text-[8px] text-slate-700 font-black uppercase tracking-widest block">Operational Node</span>
                             <div className="flex items-center gap-3">
                                <Monitor className="w-4 h-4 text-slate-500" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{t.app} INFRA</span>
                             </div>
                          </div>
                          <div className="space-y-3">
                             <span className="text-[8px] text-slate-700 font-black uppercase tracking-widest block">AI Threshold</span>
                             <div className="flex items-center gap-3">
                                <Cpu className="w-4 h-4 text-slate-500" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{t.ai} NODE</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl transition-all border border-white/10 hover:border-cyan-500/50 active:scale-95 flex items-center justify-center gap-4 group/btn">
                       <Rocket className="w-5 h-5 text-cyan-400 group-hover/btn:scale-125 transition-transform" /> 
                       Deploy Agency Solution
                    </button>
                    
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-30">
                       <div className="flex items-center gap-3">
                          <Lock className="w-4 h-4" />
                          <span className="text-[9px] font-black uppercase tracking-widest font-mono">GEREG_SENSITIVE_DATA</span>
                       </div>
                       <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
       </motion.div>

       {/* ── Status Bar HUD ── */}
       <div className="absolute bottom-8 right-32 z-[1000] px-8 py-4 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl flex items-center gap-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none translate-y-4 group-hover:translate-y-0 shadow-2xl">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Signal Locked</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Scanning Grid:</span>
             <span className="text-[9px] font-black text-white uppercase tracking-widest">Ulaanbaatar Central</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Desync Offset:</span>
             <span className="text-[9px] font-black text-cyan-400 font-mono">0.0004ms</span>
          </div>
       </div>

    </div>
  );
}
