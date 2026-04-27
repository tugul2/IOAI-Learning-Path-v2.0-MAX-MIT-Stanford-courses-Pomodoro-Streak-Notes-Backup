"use client";
import dynamic from "next/dynamic";
import { Radio, Database, Activity } from "lucide-react";

const MapComponent = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-center bg-[#020617]/40 border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-8">
           <div className="relative">
              <div className="w-20 h-20 rounded-[2rem] border-2 border-dashed border-cyan-500/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Radio className="w-8 h-8 text-cyan-500 animate-pulse" />
              </div>
           </div>
           
           <div className="space-y-3 text-center">
              <h3 className="text-2xl font-black text-white tracking-widest uppercase">Initializing Satellite Network</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] max-w-xs leading-relaxed mx-auto">
                 Establishing secondary uplink to Ulaanbaatar regional nodes. Synchronizing market telemetry.
              </p>
           </div>

           <div className="flex items-center gap-10 mt-4 px-8 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-col items-center">
                 <span className="text-[8px] text-slate-600 font-black uppercase mb-1">Signal</span>
                 <Activity className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="w-px h-6 bg-white/5" />
              <div className="flex flex-col items-center">
                 <span className="text-[8px] text-slate-600 font-black uppercase mb-1">Packet</span>
                 <Database className="w-4 h-4 text-cyan-500" />
              </div>
           </div>
        </div>
        
        <div className="absolute bottom-10 left-10 pointer-events-none">
           <div className="text-[9px] font-mono text-white/10 font-black uppercase tracking-widest mb-1">Boot_Seq: 19%</div>
           <div className="w-32 h-[1px] bg-white/10 overflow-hidden">
              <div className="w-1/4 h-full bg-cyan-500 animate-[loading_2s_ease-in-out_infinite]" />
           </div>
        </div>
    </div>
  )
});

export default function LiveMap() {
  return <MapComponent />;
}
