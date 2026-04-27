"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SKILL_SECTIONS, PHASES, LIVE_RESOURCE_LINKS, type Topic } from "./data";
import {
  BookOpen, CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronRight,
  Video, FileText, GraduationCap, Code2, Zap, Trophy, Calendar,
  BarChart2, PenSquare, Trash2, Download, Upload, RefreshCw, Youtube
} from "lucide-react";

// ── TYPES ───────────────────────────────────────────────────────────
interface LogEntry {
  id: string;
  date: string;
  phase: string;
  hours: number;
  topic: string;
  notes: string;
}

const RESOURCE_ICONS: Record<string, React.ReactNode> = {
  video:    <Youtube className="w-3 h-3" />,
  course:   <GraduationCap className="w-3 h-3" />,
  book:     <BookOpen className="w-3 h-3" />,
  article:  <FileText className="w-3 h-3" />,
  practice: <Code2 className="w-3 h-3" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  Research:  "text-purple-400 bg-purple-400/10 border-purple-400/20",
  News:      "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Tutorial:  "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Contest:   "text-red-400 bg-red-400/10 border-red-400/20",
  Community: "text-green-400 bg-green-400/10 border-green-400/20",
  Practice:  "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Course:    "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

// ── SKILL CARD ──────────────────────────────────────────────────────
function TopicCard({ topic, sectionId, completed, onToggle }: {
  topic: Topic;
  sectionId: string;
  completed: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all duration-300 ${completed ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"}`}>
      <div className="flex items-start gap-3 p-4 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <button
          onClick={e => { e.stopPropagation(); onToggle(); }}
          className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110"
          title={completed ? "Mark incomplete" : "Mark complete"}
        >
          {completed
            ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            : <Circle className="w-5 h-5 text-white/20" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-sm font-bold uppercase tracking-wide ${completed ? "text-emerald-400 line-through opacity-60" : "text-white"}`}>
              {topic.name}
            </h4>
            <ChevronDown className={`w-4 h-4 text-white/30 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{topic.description}</p>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-white/[0.04]">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 mt-3">Resources & Links</p>
          <div className="flex flex-col gap-1.5">
            {topic.resources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/10 transition-all group/r"
              >
                <span className="text-white/30 group-hover/r:text-cyan-400 transition-colors">{RESOURCE_ICONS[r.type]}</span>
                <span className="flex-1 text-xs text-slate-400 group-hover/r:text-white transition-colors truncate">{r.title}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${r.free ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                  {r.free ? "FREE" : "PAID"}
                </span>
                <ExternalLink className="w-3 h-3 text-white/20 group-hover/r:text-cyan-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SECTION HEADER ──────────────────────────────────────────────────
function SectionIcon({ icon, bg, color }: { icon: string; bg: string; color: string }) {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
      style={{ background: bg, color }}>
      {icon}
    </div>
  );
}

// ── MAIN PAGE ───────────────────────────────────────────────────────
export default function IOAIRoadmapPage() {
  const [activeTab, setActiveTab] = useState<"skills" | "roadmap" | "schedule" | "log" | "resources">("skills");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [expandedPhase, setExpandedPhase] = useState<string | null>("phase0");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [logForm, setLogForm] = useState({ date: new Date().toISOString().split("T")[0], phase: "Phase 0", hours: "", topic: "", notes: "" });
  const [liveTs, setLiveTs] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("math");

  // Persist completed topics
  useEffect(() => {
    const saved = localStorage.getItem("ioai_completed");
    if (saved) setCompleted(JSON.parse(saved));
    const savedLogs = localStorage.getItem("ioai_logs");
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  useEffect(() => {
    localStorage.setItem("ioai_completed", JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem("ioai_logs", JSON.stringify(logs));
  }, [logs]);

  // Live timestamp
  useEffect(() => {
    const tick = () => setLiveTs(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const toggleTopic = useCallback((key: string) => {
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Stats
  const totalTopics = SKILL_SECTIONS.reduce((a, s) => a + s.topics.length, 0);
  const completedTopics = Object.values(completed).filter(Boolean).length;
  const pct = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const totalLogHours = logs.reduce((a, l) => a + l.hours, 0);

  const submitLog = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: LogEntry = { id: Date.now().toString(), ...logForm, hours: parseFloat(logForm.hours) };
    setLogs(prev => [entry, ...prev]);
    setLogForm(f => ({ ...f, hours: "", topic: "", notes: "" }));
  };

  const deleteLog = (id: string) => setLogs(prev => prev.filter(l => l.id !== id));

  const exportLogs = () => {
    const a = document.createElement("a");
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    a.download = "ioai_study_logs.json";
    a.click();
  };

  const importLogs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try { setLogs(JSON.parse(ev.target?.result as string)); } catch { alert("Invalid JSON"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // TAB BUTTON
  const Tab = ({ id, label, icon }: { id: typeof activeTab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 border ${
        activeTab === id
          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
          : "text-slate-500 border-transparent hover:text-white hover:border-white/10"
      }`}
    >
      {icon}{label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* HERO */}
      <div className="border-b border-white/[0.04] bg-gradient-to-b from-[#0d1a2e] to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/60">IOAI Intelligence</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
              <span className="text-[9px] font-mono text-white/20">{liveTs}</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">LIVE</span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-black text-white tracking-tight mb-3">
            Roadmap to <span className="text-cyan-400">Top 5%</span>
            <span className="text-white/20"> in AI Olympiads</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed mb-8">
            A full 12-month structured plan — expanded skill checklist with real course links, phase roadmap, weekly schedule, and persistent study log. All progress saves locally.
          </p>

          {/* STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Topics Completed", val: `${completedTopics}/${totalTopics}`, color: "text-emerald-400" },
              { label: "Progress", val: `${pct}%`, color: "text-cyan-400" },
              { label: "Phases", val: "6", color: "text-purple-400" },
              { label: "Study Hours", val: totalLogHours.toFixed(1), color: "text-amber-400" },
              { label: "Target", val: "Top 5%", color: "text-red-400" },
            ].map(s => (
              <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-4">
            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }} />
            </div>

          {/* LEARNING PATH CTA */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <Link
              href="/ioai-roadmap/learn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all
                bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20
                text-cyan-400 hover:text-white hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-500/40
                hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <BookOpen className="w-4 h-4" />
              Launch Learning Path
              <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-full font-black">NEW</span>
            </Link>
            <span className="text-xs text-slate-600">
              Organized Beginner → Master · All 9 subjects · 39+ topics with videos & projects
            </span>
          </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="sticky top-20 z-40 border-b border-white/[0.04] bg-[#020617]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            <Tab id="skills"    label="Skill Checklist" icon={<CheckCircle2 className="w-3.5 h-3.5"/>} />
            <Tab id="roadmap"   label="Phase Roadmap"   icon={<Calendar className="w-3.5 h-3.5"/>} />
            <Tab id="schedule"  label="Weekly Schedule" icon={<BarChart2 className="w-3.5 h-3.5"/>} />
            <Tab id="log"       label="Study Log"       icon={<PenSquare className="w-3.5 h-3.5"/>} />
            <Tab id="resources" label="Live Resources"  icon={<Zap className="w-3.5 h-3.5"/>} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── SKILLS ── */}
        {activeTab === "skills" && (
          <div>
            <p className="text-slate-500 text-sm mb-6">Click any topic to expand real course links. Check topics off as you master them — saved automatically.</p>
            <div className="flex flex-col gap-6">
              {SKILL_SECTIONS.map(section => {
                const sCompleted = section.topics.filter(t => completed[`${section.id}::${t.id}`]).length;
                const isOpen = expandedSection === section.id;
                return (
                  <div key={section.id} className="border border-white/[0.06] rounded-2xl overflow-hidden">
                    <button
                      className="w-full flex items-center gap-4 p-5 hover:bg-white/[0.02] transition-colors text-left"
                      onClick={() => setExpandedSection(isOpen ? null : section.id)}
                    >
                      <SectionIcon icon={section.icon} bg={section.colorBg} color={section.color} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-base font-black text-white">{section.label}</h2>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border font-bold"
                            style={{ color: section.color, borderColor: section.color + "50", background: section.colorBg }}>
                            {sCompleted}/{section.topics.length} done
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{section.intro}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden sm:block w-20 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${section.topics.length ? (sCompleted / section.topics.length) * 100 : 0}%`, background: section.color }} />
                        </div>
                        {isOpen ? <ChevronDown className="w-4 h-4 text-white/30" /> : <ChevronRight className="w-4 h-4 text-white/30" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/[0.04] p-5 bg-white/[0.01]">
                        {section.minBar && (
                          <div className="mb-4 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-400/80">
                            ⚡ <strong>Minimum bar:</strong> {section.minBar}
                          </div>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {section.topics.map(topic => (
                            <TopicCard
                              key={topic.id}
                              topic={topic}
                              sectionId={section.id}
                              completed={!!completed[`${section.id}::${topic.id}`]}
                              onToggle={() => toggleTopic(`${section.id}::${topic.id}`)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ROADMAP ── */}
        {activeTab === "roadmap" && (
          <div className="flex flex-col gap-4">
            <p className="text-slate-500 text-sm mb-2">This roadmap assumes ~14–18 hours/week. If you can do more, compress timelines or go deeper. Click a phase to expand details.</p>
            {PHASES.map(phase => {
              const isOpen = expandedPhase === phase.id;
              return (
                <div key={phase.id} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? "border-white/10" : "border-white/[0.06] hover:border-white/[0.1]"}`}>
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left"
                    onClick={() => setExpandedPhase(isOpen ? null : phase.id)}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                      style={{ background: phase.color }}>
                      {phase.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-sm font-black text-white">{phase.title}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full border font-bold text-slate-400 border-white/10 bg-white/[0.04]">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{phase.objectives[0]}</p>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/[0.06] p-5 bg-white/[0.01] space-y-5">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Objectives</p>
                        <ul className="space-y-1">
                          {phase.objectives.map((o, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: phase.color }} />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.weekBreakdown.map((wk, i) => (
                          <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: phase.color }}>{wk.label}</p>
                            <ul className="space-y-1.5">
                              {wk.tasks.map((t, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-slate-500">
                                  <span className="text-white/20 flex-shrink-0">–</span>{t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80 mb-1">✅ Deliverable</p>
                        <p className="text-xs text-slate-400">{phase.deliverable}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── SCHEDULE ── */}
        {activeTab === "schedule" && (
          <div>
            <p className="text-slate-500 text-sm mb-6">Default weekly template — 14–18 hours/week. Adjust to your capacity. In later phases, convert Day 1 theory into a full 4–5h mock contest block every 2–3 weeks.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { day: "Day 1", label: "Theory", hours: "3h", tasks: ["1.5h math (current phase focus)", "1.5h ML/DL theory reading + structured notes"], color: "#5591c7" },
                { day: "Day 2", label: "Coding", hours: "3h", tasks: ["2h implementing algorithms or current project", "1h quick drill problems or LeetCode-style tasks"], color: "#6daa45" },
                { day: "Day 3", label: "EDA + Models", hours: "3h", tasks: ["1h exploratory data analysis on new dataset", "2h build and iterate 1–2 models"], color: "#a86fdf" },
                { day: "Day 4", label: "Contest Sim", hours: "3h", tasks: ["2–3h timed session: one contest-style task, strict timebox", "Log all attempts and score"], color: "#fdab43" },
                { day: "Day 5", label: "Review", hours: "2–3h", tasks: ["Summarise learnings; clean notebooks", "Flashcards / active recall on formulas and key concepts"], color: "#4f98a3" },
                { day: "Day 6", label: "Extra / Team", hours: "≤3h", tasks: ["Team practice or IOAI past task re-runs", "Deep dive on a specific weak area"], color: "#da7101" },
                { day: "Day 7", label: "Rest", hours: "—", tasks: ["No structured work", "Light reading only"], color: "#6b7280" },
              ].map(d => (
                <div key={d.day} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: d.color }}>{d.day}</span>
                      <p className="text-sm font-black text-white">{d.label}</p>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: d.color + "20", color: d.color }}>
                      {d.hours}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {d.tasks.map((t, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                        <span style={{ color: d.color }} className="flex-shrink-0 mt-0.5">·</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Milestones */}
            <div className="mt-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Phase-by-Week Milestone Summary</h3>
              <div className="space-y-2">
                {PHASES.map(p => (
                  <div key={p.id} className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="text-[10px] font-black text-white px-2 py-1 rounded-lg min-w-[80px] text-center flex-shrink-0"
                      style={{ background: p.color }}>Wks {p.weeks}</div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">Phase {p.num}</p>
                      <p className="text-xs text-slate-400">{p.deliverable}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── LOG ── */}
        {activeTab === "log" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Hours", val: totalLogHours.toFixed(1), color: "text-cyan-400" },
                { label: "Sessions", val: logs.length, color: "text-purple-400" },
                { label: "This Week", val: logs.filter(l => { const d = new Date(l.date); const now = new Date(); return (now.getTime() - d.getTime()) < 7*86400000; }).reduce((a,l)=>a+l.hours,0).toFixed(1)+"h", color: "text-amber-400" },
                { label: "Avg Hours/session", val: logs.length ? (totalLogHours / logs.length).toFixed(1) : "0", color: "text-emerald-400" },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Log a Session</h3>
              <form onSubmit={submitLog} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="date" value={logForm.date} onChange={e=>setLogForm(f=>({...f,date:e.target.value}))} required
                    className="bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/50 transition-colors" />
                  <select value={logForm.phase} onChange={e=>setLogForm(f=>({...f,phase:e.target.value}))} required
                    className="bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/50 transition-colors">
                    {PHASES.map(p=><option key={p.id} value={`Phase ${p.num}`}>Phase {p.num} — {p.title.split("—")[1]?.trim()}</option>)}
                  </select>
                  <input type="number" placeholder="Hours (e.g. 2.5)" step="0.25" min="0.25" value={logForm.hours} onChange={e=>setLogForm(f=>({...f,hours:e.target.value}))} required
                    className="bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20" />
                </div>
                <input type="text" placeholder="Topic (e.g. YOLOv8 fine-tuning, BERT classification)" value={logForm.topic} onChange={e=>setLogForm(f=>({...f,topic:e.target.value}))} required
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20" />
                <textarea placeholder="Notes, breakthroughs, blockers..." rows={2} value={logForm.notes} onChange={e=>setLogForm(f=>({...f,notes:e.target.value}))}
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20 resize-none" />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <button type="submit" className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-colors">
                    Save Session
                  </button>
                  <div className="flex gap-2">
                    <label className="px-4 py-2.5 border border-white/10 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center gap-2">
                      <Upload className="w-3 h-3" /> Import
                      <input type="file" className="hidden" accept=".json" onChange={importLogs} />
                    </label>
                    <button type="button" onClick={exportLogs} className="px-4 py-2.5 border border-white/10 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2">
                      <Download className="w-3 h-3" /> Export
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-3">
              {logs.length === 0 && (
                <div className="text-center py-16 text-slate-600 text-sm">No sessions logged yet. Add your first session above.</div>
              )}
              {logs.map(log => (
                <div key={log.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-bold text-white">{log.topic}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">{log.phase}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white/[0.04] text-white/60 border border-white/10 font-bold">{log.hours}h</span>
                      <span className="text-[10px] text-slate-600">{log.date}</span>
                    </div>
                    {log.notes && <p className="text-xs text-slate-500 mt-1">{log.notes}</p>}
                  </div>
                  <button onClick={() => deleteLog(log.id)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESOURCES ── */}
        {activeTab === "resources" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "3s" }} />
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60">Live Learning Resources</span>
              </div>
              <span className="text-[9px] font-mono text-white/20">{liveTs}</span>
            </div>
            <p className="text-slate-500 text-sm mb-6">Curated live links across research, news, tutorials, and practice — updated sources for AI olympiad preparation.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {LIVE_RESOURCE_LINKS.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                  <div className="flex-1 min-w-0">
                    <span className={`inline-flex text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest border mb-1.5 ${CATEGORY_COLORS[r.category] || "text-white/40 border-white/10"}`}>
                      {r.category}
                    </span>
                    <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors leading-snug">{r.title}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>

            {/* All resource links from skills */}
            <div className="mt-10">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">All Course Links by Subject</h3>
              <div className="space-y-4">
                {SKILL_SECTIONS.map(section => (
                  <div key={section.id} className="border border-white/[0.06] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 p-4 border-b border-white/[0.04]"
                      style={{ background: section.colorBg }}>
                      <SectionIcon icon={section.icon} bg={section.colorBg} color={section.color} />
                      <span className="text-sm font-black text-white">{section.label}</span>
                    </div>
                    <div className="p-4 space-y-4">
                      {section.topics.map(topic => (
                        <div key={topic.id}>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{topic.name}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {topic.resources.map((r, i) => (
                              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/10 transition-all group/r">
                                <span className="text-white/30 group-hover/r:text-cyan-400 transition-colors">{RESOURCE_ICONS[r.type]}</span>
                                <span className="flex-1 text-xs text-slate-500 group-hover/r:text-white transition-colors truncate">{r.title}</span>
                                <span className={`text-[9px] px-1 py-0.5 rounded font-bold ${r.free ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"}`}>{r.free?"FREE":"PAID"}</span>
                                <ExternalLink className="w-3 h-3 text-white/20 group-hover/r:text-cyan-400 flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
