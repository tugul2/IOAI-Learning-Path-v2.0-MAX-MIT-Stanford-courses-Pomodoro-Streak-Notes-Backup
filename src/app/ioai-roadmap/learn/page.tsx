"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { SKILL_SECTIONS, type Topic, type SkillSection } from "../data";
import {
  BookOpen, CheckCircle2, Circle, ExternalLink, ChevronDown,
  Video, FileText, GraduationCap, Code2, Youtube, ArrowLeft,
  Star, Layers, Zap, Trophy, Clock, ChevronRight, Brain,
  BarChart2, Search, X, Timer, Flame, StickyNote, Bookmark,
  Play, Pause, RotateCcw, TrendingUp, Calendar, Award,
  Download, Upload, Save, LogIn, Cloud
} from "lucide-react";
import { saveProgress, loadProgress, signInWithGoogle, auth } from '@/lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

// ── LEVEL CONFIG ─────────────────────────────────────────────────────
const LEVELS = [
  { key: "BEGINNER", label: "Beginner", shortLabel: "BGN", icon: Star, color: "#22c55e",
    bg: "rgba(34,197,94,0.10)", border: "rgba(34,197,94,0.25)", glow: "0 0 20px rgba(34,197,94,0.15)",
    description: "Foundation concepts every IOAI contestant must know cold.", timeEst: "4–6 weeks", badge: "🌱 Foundation", next: "INTERMEDIATE" },
  { key: "INTERMEDIATE", label: "Intermediate", shortLabel: "INT", icon: Layers, color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)", glow: "0 0 20px rgba(59,130,246,0.15)",
    description: "Core techniques that separate medal contenders from participants.", timeEst: "8–12 weeks", badge: "⚡ Core", next: "ADVANCED" },
  { key: "ADVANCED", label: "Advanced", shortLabel: "ADV", icon: Zap, color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", glow: "0 0 20px rgba(245,158,11,0.15)",
    description: "High-performance skills required for top-10% finishes.", timeEst: "12–16 weeks", badge: "🔥 Elite", next: "MASTER" },
  { key: "MASTER", label: "Master", shortLabel: "MST", icon: Trophy, color: "#a855f7",
    bg: "rgba(168,85,247,0.10)", border: "rgba(168,85,247,0.25)", glow: "0 0 20px rgba(168,85,247,0.15)",
    description: "Research-grade mastery for gold medals and Kaggle Grandmaster tier.", timeEst: "Ongoing", badge: "👑 Grandmaster", next: null },
] as const;
type LevelKey = typeof LEVELS[number]["key"];

const RESOURCE_ICONS: Record<string, React.ReactNode> = {
  video: <Youtube className="w-3.5 h-3.5" />, course: <GraduationCap className="w-3.5 h-3.5" />,
  book: <BookOpen className="w-3.5 h-3.5" />, article: <FileText className="w-3.5 h-3.5" />,
  practice: <Code2 className="w-3.5 h-3.5" />,
};

// ── UNIVERSITY COURSES PER LEVEL ─────────────────────────────────────
const UNIVERSITY_COURSES: Record<LevelKey, { name: string; uni: string; url: string; tag: string }[]> = {
  BEGINNER: [
    { name: "MIT 18.06 — Linear Algebra", uni: "MIT", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", tag: "Math" },
    { name: "3Blue1Brown — Essence of Linear Algebra", uni: "YT", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", tag: "Math" },
    { name: "Khan Academy — Multivariable Calculus", uni: "Khan", url: "https://www.khanacademy.org/math/multivariable-calculus", tag: "Math" },
    { name: "Andrew Ng — Machine Learning Specialization", uni: "Stanford", url: "https://www.coursera.org/specializations/machine-learning-introduction", tag: "ML" },
    { name: "Google — ML Crash Course", uni: "Google", url: "https://developers.google.com/machine-learning/crash-course", tag: "ML" },
    { name: "MIT 6.0001 — Intro to CS & Python", uni: "MIT", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/", tag: "Python" },
    { name: "fast.ai — Practical Deep Learning Pt.1", uni: "fast.ai", url: "https://course.fast.ai/", tag: "DL" },
    { name: "StatQuest — Statistics Fundamentals", uni: "YT", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", tag: "Math" },
  ],
  INTERMEDIATE: [
    { name: "Stanford CS229 — Machine Learning", uni: "Stanford", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU", tag: "ML" },
    { name: "MIT 6.S191 — Intro to Deep Learning", uni: "MIT", url: "https://introtodeeplearning.com/", tag: "DL" },
    { name: "Stanford CS231N — CNNs for Visual Recognition", uni: "Stanford", url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv", tag: "CV" },
    { name: "Stanford CS224N — NLP with Deep Learning", uni: "Stanford", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ", tag: "NLP" },
    { name: "UC Berkeley CS188 — Intro to AI", uni: "Berkeley", url: "https://inst.eecs.berkeley.edu/~cs188/", tag: "AI" },
    { name: "Deep Learning Specialization (5 courses)", uni: "deeplearning.ai", url: "https://www.coursera.org/specializations/deep-learning", tag: "DL" },
    { name: "Hugging Face — NLP Course", uni: "HF", url: "https://huggingface.co/learn/nlp-course", tag: "NLP" },
    { name: "Mathematics for ML Specialization", uni: "Imperial", url: "https://www.coursera.org/specializations/mathematics-machine-learning", tag: "Math" },
  ],
  ADVANCED: [
    { name: "Stanford CS234 — Reinforcement Learning", uni: "Stanford", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOSOPzutgyCTapiGlY2Nd8u", tag: "RL" },
    { name: "UC Berkeley CS285 — Deep RL", uni: "Berkeley", url: "http://rail.eecs.berkeley.edu/deeprlcourse/", tag: "RL" },
    { name: "Stanford CS224W — ML with Graphs", uni: "Stanford", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn", tag: "GNN" },
    { name: "CMU 10-708 — Probabilistic Graphical Models", uni: "CMU", url: "https://www.cs.cmu.edu/~epxing/Class/10708-20/", tag: "PGM" },
    { name: "DeepMind x UCL — Deep RL Lecture Series", uni: "DeepMind", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDVH599EItlEWsUOsJbAodm", tag: "RL" },
    { name: "Hugging Face — Deep RL Course", uni: "HF", url: "https://huggingface.co/learn/deep-rl-course", tag: "RL" },
    { name: "Stanford CS236 — Deep Generative Models", uni: "Stanford", url: "https://deepgenerativemodels.github.io/", tag: "GenAI" },
    { name: "MIT 6.034 — Artificial Intelligence", uni: "MIT", url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/", tag: "AI" },
  ],
  MASTER: [
    { name: "Stanford CS330 — Multi-Task & Meta-Learning", uni: "Stanford", url: "https://cs330.stanford.edu/", tag: "Meta" },
    { name: "Geometric Deep Learning (Bronstein)", uni: "Imperial", url: "https://www.youtube.com/playlist?list=PLn2-dEmQeTfSLXW8yXP4q_Ii58wFdxb3C", tag: "GDL" },
    { name: "Stanford MLSys Seminar", uni: "Stanford", url: "https://www.youtube.com/playlist?list=PLSrTvUMQPAYX0UgZPk7fKk2vKXIc0cqh", tag: "Systems" },
    { name: "Made With ML — MLOps Course", uni: "MadeWithML", url: "https://madewithml.com/", tag: "MLOps" },
    { name: "Andrej Karpathy — Neural Networks: Zero to Hero", uni: "YT", url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ", tag: "NN" },
    { name: "fast.ai Part 2 — Deep Learning Foundations", uni: "fast.ai", url: "https://course.fast.ai/Lessons/part2.html", tag: "DL" },
    { name: "David Silver — RL Course (Full)", uni: "DeepMind", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ", tag: "RL" },
    { name: "Yannic Kilcher — Paper Explanations", uni: "YT", url: "https://www.youtube.com/@YannicKilcher", tag: "Papers" },
  ],
};

// ── EXTRA SIDEBAR CONTENT ────────────────────────────────────────────
const EXTRAS: Record<LevelKey, { title: string; items: string[] }[]> = {
  BEGINNER: [
    { title: "📋 Daily Checklist", items: ["Solve 1 math derivation by hand", "Write 10 lines of NumPy code", "Watch 1 video from current subject", "Log study session with notes", "Review yesterday — can you teach it?"] },
    { title: "📚 Essential Books (Free)", items: ["Mathematics for ML — mml-book.com", "Deep Learning Book — deeplearningbook.org", "Dive into Deep Learning — d2l.ai", "Elements of Statistical Learning — free PDF", "Pattern Recognition — Bishop"] },
  ],
  INTERMEDIATE: [
    { title: "🎯 Weekly Targets", items: ["1 Kaggle submission", "1 model from scratch (no sklearn)", "1 Optuna hyperparameter study", "1 experiment log page", "1 paper abstract + skim methods"] },
    { title: "⚒️ Tools to Master", items: ["Optuna — hyperparameter tuning", "W&B — experiment tracking", "SHAP — explainability", "Albumentations — image aug", "HF Trainer — unified fine-tuning"] },
  ],
  ADVANCED: [
    { title: "🏆 Competition Tactics", items: ["60-min baseline before tuning", "StratifiedKFold / GroupKFold", "Pseudo-labeling on test set", "Stacking: tree+linear+neural", "TTA for +0.2-0.5% boost"] },
    { title: "📄 Must-Read Papers", items: ["Attention Is All You Need (2017)", "BERT — Devlin (2019)", "ResNet — He et al. (2016)", "XGBoost — Chen (2016)", "LoRA — Hu et al. (2022)"] },
  ],
  MASTER: [
    { title: "🎓 Research Skills", items: ["ViT from scratch from paper", "DDPM diffusion from scratch", "Flash Attention deep-dive", "Custom CUDA kernel", "2-page technical report"] },
    { title: "🚀 Elite Mindset", items: ["8-hour mock IOAI every 3 weeks", "Debrief: score gap + fix plan", "Attack 3 weakest skills weekly", "Reverse-engineer gold solutions", "Teach teammates to force mastery"] },
  ],
};

// ── POMODORO TIMER ───────────────────────────────────────────────────
function PomodoroTimer({ sessions, setSessions }: { sessions: number; setSessions: (n: number) => void }) {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && time > 0) {
      interval.current = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      if (mode === "work") {
        const n = sessions + 1; setSessions(n);
        try { localStorage.setItem("ioai_pomo_sessions", String(n)); } catch {}
        setMode("break"); setTime(5 * 60);
      } else { setMode("work"); setTime(25 * 60); }
      setRunning(false);
    }
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [running, time, mode, sessions, setSessions]);

  const mins = Math.floor(time / 60); const secs = time % 60;
  const pct = mode === "work" ? ((25 * 60 - time) / (25 * 60)) * 100 : ((5 * 60 - time) / (5 * 60)) * 100;
  const col = mode === "work" ? "#ef4444" : "#22c55e";

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: `${col}40`, background: `${col}08` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4" style={{ color: col }} />
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: col }}>
            {mode === "work" ? "Focus" : "Break"}
          </span>
        </div>
        <span className="text-[10px] text-white/30">{sessions} sessions today</span>
      </div>
      <div className="text-center mb-3">
        <div className="text-3xl font-mono font-black text-white">{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</div>
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: col }} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setRunning(!running)}
          className="flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          style={{ background: `${col}20`, color: col, border: `1px solid ${col}40` }}>
          {running ? <><Pause className="w-3 h-3" />Pause</> : <><Play className="w-3 h-3" />Start</>}
        </button>
        <button onClick={() => { setRunning(false); setTime(mode === "work" ? 25 * 60 : 5 * 60); }}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── STREAK TRACKER ───────────────────────────────────────────────────
function StreakTracker({ streak, setStreak, lastDate, setLastDate }: {
  streak: number; setStreak: (n: number) => void; lastDate: string; setLastDate: (d: string) => void;
}) {
  const today = new Date().toISOString().slice(0, 10);

  const logToday = () => {
    if (lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const newStreak = lastDate === yesterday ? streak + 1 : 1;
    setStreak(newStreak); setLastDate(today);
    try { localStorage.setItem("ioai_streak", String(newStreak)); localStorage.setItem("ioai_streak_date", today); } catch {}
  };

  const isLoggedToday = lastDate === today;
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-black uppercase tracking-widest text-amber-400">Study Streak</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl font-black text-amber-400">{streak}</div>
        <div className="text-xs text-slate-400">consecutive<br/>days</div>
      </div>
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 7 }, (_, i) => {
          const d = new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10);
          const active = lastDate >= d && streak > (6 - i);
          return <div key={i} className="flex-1 h-2 rounded-full" style={{ background: active ? "#f59e0b" : "rgba(255,255,255,0.05)" }} />;
        })}
      </div>
      <button onClick={logToday} disabled={isLoggedToday}
        className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${isLoggedToday ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30"}`}>
        {isLoggedToday ? "✓ Logged Today" : "📝 Log Today's Study"}
      </button>
    </div>
  );
}

// ── TOPIC CARD ───────────────────────────────────────────────────────
function TopicCard({ topic, section, level, completed, onToggle, notes, onNote }: {
  topic: Topic; section: SkillSection; level: typeof LEVELS[number];
  completed: boolean; onToggle: () => void; notes: string; onNote: (n: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  return (
    <div style={{ borderColor: completed ? `${level.color}55` : "rgba(255,255,255,0.06)", background: completed ? `${level.color}08` : "rgba(255,255,255,0.015)", boxShadow: open ? level.glow : "none" }}
      className="rounded-xl border transition-all duration-300">
      <div className="flex items-start gap-3 p-4 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
        <button onClick={e => { e.stopPropagation(); onToggle(); }} className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110" title={completed ? "Mark incomplete" : "Mark complete"}>
          {completed ? <CheckCircle2 className="w-5 h-5" style={{ color: level.color }} /> : <Circle className="w-5 h-5 text-white/20" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: section.color, background: section.colorBg }}>{section.icon} {section.label.split(" ")[0]}</span>
            {topic.resources.length > 0 && <span className="text-[9px] font-bold text-white/30 flex items-center gap-1"><Video className="w-3 h-3" />{topic.resources.length}</span>}
            {notes && <StickyNote className="w-3 h-3 text-amber-400/60" />}
            {completed && <span className="text-[9px] font-bold text-emerald-400">✓ DONE</span>}
          </div>
          <h4 className={`text-sm font-bold mt-1.5 leading-tight ${completed ? "line-through opacity-50" : "text-white"}`}>{topic.name.replace(/^.*?—\s*(BEGINNER|INTERMEDIATE|ADVANCED|MASTER)\s*—\s*/, "")}</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{topic.description.replace(/\*\*/g, "").replace(/\n/g, " ").slice(0, 150)}{topic.description.length > 150 ? "…" : ""}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <div className="px-4 pb-4 border-t border-white/[0.04]">
          <div className="mt-3 text-xs text-slate-400 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-1 custom-scroll">{topic.description.replace(/\*\*Projects:\*\*/g, "\n📐 PROJECTS:\n").replace(/\*\*/g, "")}</div>
          {topic.resources.length > 0 && (<>
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mt-4 mb-2">📺 Resources & Links</p>
            <div className="flex flex-col gap-1.5">
              {topic.resources.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all group/r">
                  <span style={{ color: level.color }}>{RESOURCE_ICONS[r.type] ?? <ExternalLink className="w-3.5 h-3.5" />}</span>
                  <span className="text-xs text-slate-300 group-hover/r:text-white transition-colors flex-1 truncate">{r.title}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${r.type === "video" ? "bg-red-500/20 text-red-400" : "bg-slate-500/20 text-slate-400"}`}>{r.type.toUpperCase()}</span>
                  <ExternalLink className="w-3 h-3 text-white/20 flex-shrink-0" />
                </a>
              ))}
            </div>
          </>)}
          {/* Notes section */}
          <div className="mt-3">
            <button onClick={() => setShowNotes(!showNotes)} className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400/60 hover:text-amber-400 transition-colors">
              <StickyNote className="w-3 h-3" /> {showNotes ? "Hide" : "Show"} Notes {notes ? `(${notes.length} chars)` : ""}
            </button>
            {showNotes && (
              <textarea value={notes} onChange={e => onNote(e.target.value)} placeholder="Add your notes, key takeaways, questions…"
                className="mt-2 w-full bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 text-xs text-slate-300 placeholder:text-white/15 focus:outline-none focus:border-amber-400/40 min-h-[60px] resize-y custom-scroll" />
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={onToggle} className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
              style={{ background: completed ? "rgba(239,68,68,0.1)" : `${level.color}20`, color: completed ? "#ef4444" : level.color, border: `1px solid ${completed ? "rgba(239,68,68,0.2)" : `${level.color}40`}` }}>
              {completed ? "↩ Incomplete" : "✓ Complete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── LEVEL PANEL ──────────────────────────────────────────────────────
function LevelPanel({ level, topics, completedSet, onToggle, searchQuery, notes, onNote }: {
  level: typeof LEVELS[number]; topics: { topic: Topic; section: SkillSection }[];
  completedSet: Set<string>; onToggle: (k: string) => void; searchQuery: string;
  notes: Record<string, string>; onNote: (k: string, n: string) => void;
}) {
  const LevelIcon = level.icon;
  const filtered = searchQuery ? topics.filter(({ topic, section }) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) || section.label.toLowerCase().includes(searchQuery.toLowerCase())
  ) : topics;
  const doneCount = topics.filter(({ topic, section }) => completedSet.has(`${section.id}::${topic.id}`)).length;
  const pct = topics.length ? Math.round((doneCount / topics.length) * 100) : 0;
  const courses = UNIVERSITY_COURSES[level.key]; const extras = EXTRAS[level.key];

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: level.border, boxShadow: level.glow }}>
      <div className="px-6 py-5" style={{ background: `linear-gradient(135deg, ${level.bg}, rgba(0,0,0,0.3))` }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: level.bg, border: `1px solid ${level.border}` }}>
              <LevelIcon className="w-5 h-5" style={{ color: level.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-white">{level.label}</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: level.bg, color: level.color, border: `1px solid ${level.border}` }}>{level.badge}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{level.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right"><div className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3 h-3" /> Est.</div><div className="text-sm font-bold" style={{ color: level.color }}>{level.timeEst}</div></div>
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90"><circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle cx="28" cy="28" r="22" fill="none" stroke={level.color} strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 22}`} strokeDashoffset={`${2 * Math.PI * 22 * (1 - pct / 100)}`} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center"><span className="text-xs font-black" style={{ color: level.color }}>{pct}%</span></div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: level.color }} /></div>
          <span className="text-xs text-slate-500">{doneCount}/{topics.length}</span>
        </div>
      </div>
      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-2.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">📘 Curriculum Topics ({filtered.length})</p>
          {filtered.length === 0 ? <div className="text-center py-8 text-slate-500 text-sm">No topics found.</div> :
            filtered.map(({ topic, section }) => {
              const key = `${section.id}::${topic.id}`;
              return <TopicCard key={key} topic={topic} section={section} level={level} completed={completedSet.has(key)}
                onToggle={() => onToggle(key)} notes={notes[key] || ""} onNote={n => onNote(key, n)} />;
            })}
        </div>
        <div className="flex flex-col gap-4">
          {/* University Courses */}
          <div className="rounded-xl border p-4" style={{ borderColor: level.border, background: level.bg }}>
            <p className="text-xs font-black uppercase tracking-wide mb-3" style={{ color: level.color }}>🎓 University Courses</p>
            <div className="flex flex-col gap-1.5">
              {courses.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-black/20 hover:bg-black/30 border border-white/[0.04] hover:border-white/10 transition-all group/c">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/10 text-white/50">{c.uni}</span>
                  <span className="text-[11px] text-slate-300 group-hover/c:text-white transition-colors flex-1 truncate">{c.name}</span>
                  <span className="text-[8px] font-bold px-1 py-0.5 rounded" style={{ background: `${level.color}20`, color: level.color }}>{c.tag}</span>
                </a>
              ))}
            </div>
          </div>
          {extras.map(extra => (
            <div key={extra.title} className="rounded-xl border p-4" style={{ borderColor: level.border, background: level.bg }}>
              <p className="text-xs font-black uppercase tracking-wide mb-3" style={{ color: level.color }}>{extra.title}</p>
              <ul className="flex flex-col gap-2">
                {extra.items.map((item, i) => <li key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed"><span style={{ color: level.color }} className="mt-0.5 flex-shrink-0">›</span>{item}</li>)}
              </ul>
            </div>
          ))}
          {level.next && (
            <div className="rounded-xl border p-4 text-center" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">After this level</p>
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-white/60"><ChevronRight className="w-4 h-4" />{level.next.charAt(0) + level.next.slice(1).toLowerCase()} Level</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────
export default function LearningPage() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [activeLevel, setActiveLevel] = useState<LevelKey | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showTools, setShowTools] = useState(false);

  // ── LIFTED STATE (Pomodoro + Streak) ──────────────────────────────
  const [pomoSessions, setPomoSessions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakDate, setStreakDate] = useState("");

  // ── FIREBASE AUTH STATE ───────────────────────────────────────────
  const [user, setUser] = useState<User | null>(null);
  const [cloudStatus, setCloudStatus] = useState<'idle' | 'saving' | 'saved' | 'loading'>('idle');
  const initialLoadDone = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // ── LOAD FROM LOCALSTORAGE ────────────────────────────────────────
  useEffect(() => {
    try { const s = localStorage.getItem("ioai_learn_completed"); if (s) setCompleted(new Set(JSON.parse(s))); } catch {}
    try { const n = localStorage.getItem("ioai_learn_notes"); if (n) setNotes(JSON.parse(n)); } catch {}
    try { const s = localStorage.getItem("ioai_pomo_sessions"); if (s) setPomoSessions(parseInt(s)); } catch {}
    try { const s = localStorage.getItem("ioai_streak"); if (s) setStreak(parseInt(s)); } catch {}
    try { const d = localStorage.getItem("ioai_streak_date"); if (d) setStreakDate(d); } catch {}
  }, []);

  // ── AUTO-LOAD FROM FIRESTORE (on sign-in) ─────────────────────────
  useEffect(() => {
    if (!user) { initialLoadDone.current = false; return; }
    setCloudStatus('loading');
    loadProgress().then(data => {
      if (data) {
        if (data.completed) setCompleted(new Set(data.completed));
        if (data.notes) setNotes(data.notes);
        if (typeof data.pomoSessions === 'number') setPomoSessions(data.pomoSessions);
        if (typeof data.streak === 'number') setStreak(data.streak);
        if (data.streakDate) setStreakDate(data.streakDate);
        // Sync to localStorage too
        try {
          if (data.completed) localStorage.setItem("ioai_learn_completed", JSON.stringify(data.completed));
          if (data.notes) localStorage.setItem("ioai_learn_notes", JSON.stringify(data.notes));
          if (typeof data.pomoSessions === 'number') localStorage.setItem("ioai_pomo_sessions", String(data.pomoSessions));
          if (typeof data.streak === 'number') localStorage.setItem("ioai_streak", String(data.streak));
          if (data.streakDate) localStorage.setItem("ioai_streak_date", data.streakDate);
        } catch {}
      }
      initialLoadDone.current = true;
      setCloudStatus('saved');
    }).catch(() => {
      initialLoadDone.current = true;
      setCloudStatus('idle');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ── AUTO-SAVE TO FIRESTORE (debounced 1.5s) ───────────────────────
  useEffect(() => {
    if (!user || !initialLoadDone.current) return;
    setCloudStatus('saving');
    const timer = setTimeout(() => {
      saveProgress({
        completed: [...completed],
        notes,
        pomoSessions,
        streak,
        streakDate,
      }).then(() => setCloudStatus('saved')).catch(() => setCloudStatus('idle'));
    }, 1500);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, notes, pomoSessions, streak, streakDate, user]);

  const toggleTopic = (key: string) => {
    setCompleted(prev => {
      const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key);
      try { localStorage.setItem("ioai_learn_completed", JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const updateNote = useCallback((key: string, note: string) => {
    setNotes(prev => {
      const next = { ...prev, [key]: note };
      try { localStorage.setItem("ioai_learn_notes", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // ── DATA EXPORT/IMPORT ─────────────────────────────────────────────
  const exportData = () => {
    try {
      const data = {
        completed: localStorage.getItem("ioai_learn_completed"),
        notes: localStorage.getItem("ioai_learn_notes"),
        pomo_sessions: localStorage.getItem("ioai_pomo_sessions"),
        streak: localStorage.getItem("ioai_streak"),
        streak_date: localStorage.getItem("ioai_streak_date"),
        export_date: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ioai-roadmap-backup-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Error exporting data.");
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.completed) {
          localStorage.setItem("ioai_learn_completed", data.completed);
          setCompleted(new Set(JSON.parse(data.completed)));
        }
        if (data.notes) {
          localStorage.setItem("ioai_learn_notes", data.notes);
          setNotes(JSON.parse(data.notes));
        }
        if (data.pomo_sessions) localStorage.setItem("ioai_pomo_sessions", data.pomo_sessions);
        if (data.streak) localStorage.setItem("ioai_streak", data.streak);
        if (data.streak_date) localStorage.setItem("ioai_streak_date", data.streak_date);
        
        alert("Backup restored successfully! The page will now refresh.");
        window.location.reload();
      } catch (err) {
        alert("Invalid backup file format.");
      }
    };
    reader.readAsText(file);
  };

  const topicsByLevel = useMemo(() => {
    const map: Record<string, { topic: Topic; section: SkillSection }[]> = { BEGINNER: [], INTERMEDIATE: [], ADVANCED: [], MASTER: [] };
    for (const section of SKILL_SECTIONS) for (const topic of section.topics)
      for (const lv of ["BEGINNER", "INTERMEDIATE", "ADVANCED", "MASTER"] as LevelKey[])
        if (topic.name.includes(lv)) { map[lv].push({ topic, section }); break; }
    return map;
  }, []);

  const totalTopics = Object.values(topicsByLevel).flat().length;
  const totalDone = [...completed].length;
  const overallPct = totalTopics ? Math.round((totalDone / totalTopics) * 100) : 0;
  const totalResources = SKILL_SECTIONS.reduce((a, s) => a + s.topics.reduce((b, t) => b + t.resources.length, 0), 0);
  const totalCourses = Object.values(UNIVERSITY_COURSES).flat().length;
  const displayedLevels = activeLevel === "ALL" ? LEVELS : LEVELS.filter(l => l.key === activeLevel);

  return (
    <div className="min-h-screen bg-[#050a0f] text-white">
      <style>{`.custom-scroll::-webkit-scrollbar{width:4px}.custom-scroll::-webkit-scrollbar-track{background:transparent}.custom-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`}</style>

      {/* HEADER */}
      <div className="border-b border-white/[0.06] bg-[#070d14]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Link href="/ioai-roadmap" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" />Roadmap</Link>
              <div className="w-px h-4 bg-white/10" />
              <div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <h1 className="text-base font-black tracking-wide text-white">IOAI Learning Path</h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">v2.0 MAX</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Beginner → Master · MIT / Stanford / Berkeley courses · Pomodoro · Streak · Notes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Google Sign-in / Cloud status */}
              {!user ? (
                <button onClick={() => signInWithGoogle().catch(() => {})}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-cyan-400/30 hover:bg-cyan-400/5">
                  <LogIn className="w-3.5 h-3.5" /> Sign in to sync
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
                  <Cloud className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{cloudStatus === 'saving' ? 'Saving…' : cloudStatus === 'loading' ? 'Loading…' : `Synced ✓`}</span>
                  <span className="hidden lg:inline text-white/30 ml-1">{user.email}</span>
                </div>
              )}
              <button onClick={() => setShowTools(!showTools)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${showTools ? "bg-cyan-400/10 border-cyan-400/20 text-cyan-400" : "bg-white/5 border-white/10 text-white/40 hover:text-white"}`}>
                {showTools ? "Hide Tools" : "🛠 Study Tools"}
              </button>
              <div className="text-right hidden sm:block"><div className="text-xs text-slate-500">Progress</div><div className="text-lg font-black text-cyan-400">{overallPct}%</div></div>
              <div className="text-right hidden sm:block"><div className="text-xs text-slate-500">Done</div><div className="text-lg font-black text-white">{totalDone}<span className="text-slate-500 text-sm">/{totalTopics}</span></div></div>
              <div className="w-32 hidden md:block">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${overallPct}%`, background: "linear-gradient(90deg,#22c55e,#3b82f6,#f59e0b,#a855f7)" }} /></div>
                <div className="flex justify-between text-[9px] text-white/20 mt-1"><span>BGN</span><span>INT</span><span>ADV</span><span>MST</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* STUDY TOOLS PANEL */}
        {showTools && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-in">
            <PomodoroTimer sessions={pomoSessions} setSessions={(n) => { setPomoSessions(n); try { localStorage.setItem("ioai_pomo_sessions", String(n)); } catch {} }} />
            <StreakTracker streak={streak} setStreak={(n) => { setStreak(n); try { localStorage.setItem("ioai_streak", String(n)); } catch {} }} lastDate={streakDate} setLastDate={(d) => { setStreakDate(d); try { localStorage.setItem("ioai_streak_date", d); } catch {} }} />
            
            {/* Cloud Sync/Backup card */}
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Save className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Backup Data</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3 leading-relaxed flex-1">
                Save your progress to a file before pushing to GitHub to keep your data safe.
              </p>
              <div className="flex flex-col gap-2">
                <button onClick={exportData} className="w-full py-2 rounded-lg text-xs font-bold transition-all bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 flex items-center justify-center gap-2">
                  <Download className="w-3.5 h-3.5" /> Export Data
                </button>
                <label className="w-full py-2 rounded-lg text-xs font-bold transition-all bg-transparent text-slate-400 border border-white/10 hover:text-white cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="w-3.5 h-3.5" /> Restore
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>
            </div>

            {/* Stats card */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-cyan-400" /><span className="text-xs font-black uppercase tracking-widest text-cyan-400">Stats</span></div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Topics", val: `${totalDone}/${totalTopics}`, icon: <BookOpen className="w-3 h-3" /> },
                  { label: "Resources", val: String(totalResources), icon: <Video className="w-3 h-3" /> },
                  { label: "Uni Courses", val: String(totalCourses), icon: <GraduationCap className="w-3 h-3" /> },
                  { label: "Subjects", val: String(SKILL_SECTIONS.length), icon: <Layers className="w-3 h-3" /> },
                  { label: "Notes", val: String(Object.values(notes).filter(Boolean).length), icon: <StickyNote className="w-3 h-3" /> },
                  { label: "Levels", val: "4", icon: <Award className="w-3 h-3" /> },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/[0.04]">
                    <span className="text-cyan-400/60">{s.icon}</span>
                    <div><div className="text-xs font-black text-white">{s.val}</div><div className="text-[9px] text-slate-500">{s.label}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LEVEL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {LEVELS.map(lv => {
            const lvTopics = topicsByLevel[lv.key] ?? []; const lvDone = lvTopics.filter(({ topic, section }) => completed.has(`${section.id}::${topic.id}`)).length;
            const lvPct = lvTopics.length ? Math.round((lvDone / lvTopics.length) * 100) : 0; const LvIcon = lv.icon; const isActive = activeLevel === lv.key;
            return (
              <button key={lv.key} onClick={() => setActiveLevel(prev => prev === lv.key ? "ALL" : lv.key)}
                className="text-left rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02]"
                style={{ borderColor: isActive ? lv.color : lv.border, background: isActive ? lv.bg : "rgba(255,255,255,0.02)", boxShadow: isActive ? lv.glow : "none" }}>
                <div className="flex items-center justify-between mb-3"><LvIcon className="w-5 h-5" style={{ color: lv.color }} /><span className="text-[10px] font-black uppercase tracking-widest" style={{ color: lv.color }}>{lv.shortLabel}</span></div>
                <div className="text-sm font-black text-white">{lv.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{lvDone}/{lvTopics.length} topics · {UNIVERSITY_COURSES[lv.key].length} courses</div>
                <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${lvPct}%`, background: lv.color }} /></div>
                <div className="text-right text-xs font-bold mt-1" style={{ color: lv.color }}>{lvPct}%</div>
              </button>
            );
          })}
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search topics, subjects…"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/30" />
            {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"><X className="w-4 h-4" /></button>}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => setActiveLevel("ALL")} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${activeLevel === "ALL" ? "bg-white/10 text-white border-white/20" : "text-white/40 border-white/10"}`}>All</button>
            {LEVELS.map(lv => (
              <button key={lv.key} onClick={() => setActiveLevel(prev => prev === lv.key ? "ALL" : lv.key)} className="px-3 py-1.5 rounded-full text-xs font-bold transition-all border"
                style={{ background: activeLevel === lv.key ? lv.bg : "transparent", color: activeLevel === lv.key ? lv.color : "rgba(255,255,255,0.3)", borderColor: activeLevel === lv.key ? lv.border : "rgba(255,255,255,0.08)" }}>{lv.label}</button>
            ))}
          </div>
        </div>

        {/* LEVEL PANELS */}
        <div className="flex flex-col gap-8">
          {displayedLevels.map(level => (
            <LevelPanel key={level.key} level={level} topics={topicsByLevel[level.key] ?? []} completedSet={completed}
              onToggle={toggleTopic} searchQuery={searchQuery} notes={notes} onNote={updateNote} />
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-lg font-black text-white mb-2">Ready for the Full Roadmap?</h3>
          <p className="text-sm text-slate-400 mb-5 max-w-md mx-auto">The Phase Roadmap gives you the when — a 12-month week-by-week execution plan toward IOAI top 5%.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/ioai-roadmap" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold hover:bg-cyan-400/20 transition-all"><BarChart2 className="w-4 h-4" />Phase Roadmap</Link>
            <a href="https://ioai-official.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-bold hover:text-white transition-all"><ExternalLink className="w-4 h-4" />IOAI Official</a>
          </div>
        </div>
      </div>
    </div>
  );
}
