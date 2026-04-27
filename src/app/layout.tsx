import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientProviders from "@/components/ClientProviders";
import GlobalQuickNav from "@/components/GlobalQuickNav";
import RightHandPanel from "@/components/RightHandPanel";
import { Radio, Lock, Activity, Cpu, Globe } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gereg Intel — AI Market Intelligence Dashboard",
  description:
    "Real-time market research, agency scaling intelligence, and Bloomberg-grade competitive analysis for AI automation in Mongolia and globally.",
  keywords: [
    "AI automation",
    "AI agency",
    "market intelligence",
    "LLM pricing",
    "Mongolia",
    "agentic AI",
    "OpenClaw",
    "Bloomberg terminal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-200 min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 overflow-x-hidden`}
      >
        {/* ── Background Global HUD Elements ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
          <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
          <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        </div>

        <Navbar />
        
        <ClientProviders>
          <div className="flex-grow flex w-full relative z-10">
            <div className="flex-1 overflow-x-hidden">
              {children}
            </div>
            {/* Right Hand Panel Sticky Wrapper */}
            <div className="hidden xl:block">
              <RightHandPanel />
            </div>
          </div>
        </ClientProviders>
        
        <GlobalQuickNav />

        {/* ── Cinematic Footer ── */}
        <footer className="py-20 border-t border-white/5 bg-[#020617] relative overflow-hidden group/footer">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-[1600px] mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
               <div className="col-span-1 md:col-span-2 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Globe className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-widest uppercase">Gereg Intel</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md uppercase tracking-tight">
                    Proprietary intelligence node for the Central Asian ICT corridor. 
                    Real-time market synthesis, agency alpha extraction, and systemic deployment protocols.
                  </p>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-3">
                        <Lock className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Encrypted_Link: Stable</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Activity className="w-3.5 h-3.5 text-cyan-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Latency: 0.12ms</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Core Endpoints</h4>
                  <ul className="space-y-3">
                     {['Foundation Nodes', 'Arbiter Networks', 'SME Verticals', 'Market Tickers'].map(item => (
                       <li key={item} className="group/item flex items-center gap-3 cursor-pointer">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/item:bg-cyan-500 transition-all" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover/item:text-white transition-colors">{item}</span>
                       </li>
                     ))}
                  </ul>
               </div>

               <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Operational Stats</h4>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Uptime</span>
                        <span className="text-[10px] font-black text-emerald-500">99.9997%</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Feed Sensitivity</span>
                        <span className="text-[10px] font-black text-cyan-500">ULTRA_HIGH</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Protocol</span>
                        <span className="text-[10px] font-black text-amber-500 font-mono">TCP/IP_V6_AUTH</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
                <span>© 2026 Gereg Intelligence Agency</span>
                <span className="text-white/10">|</span>
                <span>Node v5.281.0</span>
              </div>
              
              <div className="flex items-center gap-8">
                 <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <Cpu className="w-3.5 h-3.5 text-slate-700" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Hardware Level: QUARK_3</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Operational Alpha Verified</span>
                 </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
