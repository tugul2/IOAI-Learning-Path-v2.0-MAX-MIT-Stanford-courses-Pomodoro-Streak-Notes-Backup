"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Zap, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "🧠 **Gereg Intel AI** — Bloomberg-grade intelligence at your fingertips.\n\nAsk me anything about:\n- Scaling your AI agency\n- Mongolia market intel\n- LLM pricing comparisons\n- Client acquisition strategies\n- Free tools & infrastructure",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: "user", content: text };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs.filter((m) => m.role === "user" || m.role === "assistant").slice(-10),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Simple markdown: **bold**, `code`, bullet points
  const renderMd = (text: string) => {
    return text.split("\n").map((line, i) => {
      let html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-800 rounded text-cyan-300 text-[10px]">$1</code>');
      const isBullet = line.match(/^[-•*]\s/);
      if (isBullet) {
        html = `<span class="text-cyan-500 mr-1">•</span>${html.replace(/^[-•*]\s/, "")}`;
      }
      return (
        <p
          key={i}
          className={`${isBullet ? "pl-2" : ""} ${line === "" ? "h-2" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${
          open
            ? "bg-gray-800 border border-gray-700 rotate-90 scale-90"
            : "bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.3)] animate-float"
        }`}
      >
        {open ? (
          <X className="w-5 h-5 text-slate-300" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="rounded-3xl border border-gray-800 bg-[#0a0f1a]/95 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col" style={{ height: "520px" }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-800/50 flex items-center gap-3 bg-gray-900/60 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Gereg Intel AI</h3>
              <span className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Powered by Gemini
              </span>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600/20 border border-blue-500/20 text-blue-100"
                      : "bg-gray-800/60 border border-gray-700/50 text-slate-300"
                  }`}
                >
                  {renderMd(msg.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-gray-800/60 border border-gray-700/50 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span className="text-xs text-slate-500">Analyzing intel...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-800/50 bg-gray-900/40 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about agency scaling, AI deals..."
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
