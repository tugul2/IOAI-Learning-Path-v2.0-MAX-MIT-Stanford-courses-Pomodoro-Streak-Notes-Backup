"use client";
import React, { useState, useEffect, useCallback } from "react";
import { RefreshCw, Wifi } from "lucide-react";

export default function AutoRefreshBar() {
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [nextRefresh, setNextRefresh] = useState(600); // 10 min countdown
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [articleCount, setArticleCount] = useState(0);

  const doRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/refresh");
      if (res.ok) {
        const data = await res.json();
        setArticleCount(data.articles?.length || 0);
      }
      window.dispatchEvent(new Event("triggerRefresh"));
      setLastRefresh(new Date());
      setNextRefresh(600);
    } catch {}
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    // Initial fetch
    doRefresh();

    // Countdown timer
    const interval = setInterval(() => {
      setNextRefresh((prev) => {
        if (prev <= 1) {
          doRefresh();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [doRefresh]);

  const mins = Math.floor(nextRefresh / 60);
  const secs = nextRefresh % 60;

  return (
    <div className="w-full border-b border-gray-800/50 bg-[#030712]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Wifi className={`w-3 h-3 ${isRefreshing ? "text-cyan-400 animate-pulse" : "text-emerald-400"}`} />
            <span className="text-emerald-400 uppercase tracking-wider font-bold">Live</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">
            {articleCount > 0 ? `${articleCount} sources synced` : "Connecting..."}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-600 hidden sm:inline">
            {lastRefresh
              ? `Last sync: ${lastRefresh.toLocaleTimeString("en-US", { hour12: false })}`
              : "Syncing..."}
          </span>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5">
            <RefreshCw className={`w-3 h-3 text-slate-500 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
            <span className={`${nextRefresh < 60 ? "text-amber-400" : "text-slate-500"}`}>
              Next: {mins}:{secs.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
