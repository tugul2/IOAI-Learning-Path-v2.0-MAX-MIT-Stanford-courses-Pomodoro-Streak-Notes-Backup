// ─── Bloomberg Terminal Data — Gereg Agency Domination Plan ──────────
// Last deep-scan: 2026-03-19

// ─── LIVE MARKET TICKER DATA ─────────────────────────────────────────
export const tickerData = [
  { symbol: "AIAGENCY", name: "Global AI Agency Market", value: "$89B", change: "+34%", direction: "up" },
  { symbol: "MNDIGIT", name: "Mongolia Digital GDP", value: "$214M", change: "+8.6%", direction: "up" },
  { symbol: "OPENCLAW", name: "OpenClaw GitHub Stars", value: "250K+", change: "+1.2K/day", direction: "up" },
  { symbol: "SMBAIADPT", name: "Global SMB AI Adopt", value: "67%", change: "+12%", direction: "up" },
  { symbol: "GPT54", name: "GPT-5.4 Input Cost", value: "$2.50/M", change: "-40%", direction: "down" },
  { symbol: "GEMFLASH", name: "Gemini Flash-Lite", value: "$0.10/M", change: "-75%", direction: "down" },
  { symbol: "EGUNEAI", name: "Egune AI Valuation", value: "$38.5M", change: "+∞", direction: "up" },
  { symbol: "LENDMN", name: "LendMN Users", value: "1.3M", change: "+280K", direction: "up" },
  { symbol: "MNPOP", name: "Mongolia Internet Users", value: "2.93M", change: "+6%", direction: "up" },
  { symbol: "VASTGPU", name: "Vast.ai RTX4090/hr", value: "$0.28", change: "-15%", direction: "down" },
];

// ─── COMPETITIVE INTELLIGENCE: MONGOLIAN AI LANDSCAPE ────────────────
export const competitorMap = [
  {
    name: "Egune AI",
    type: "Platform",
    threat: "High",
    valuation: "$38.5M",
    funding: "$3.5M (Golomt Bank, 2025)",
    focus: "Mongolian NLP foundational AI platform, 2,100+ trained models",
    weakness: "Focused on platform/API — not agency services. Doesn't sell to SMBs directly.",
    geregAdvantage: "Gereg sells implementation + results. Egune builds tools — Gereg applies them to real business problems.",
    url: "https://egune.ai/",
  },
  {
    name: "LendMN / AND Global",
    type: "Fintech",
    threat: "Low",
    valuation: "$21.4M Series B",
    funding: "$41.4M total (IFC, AEON)",
    focus: "AI credit scoring, micro-lending for MSMEs, 1.3M users",
    weakness: "Pure fintech play — no automation agency services.",
    geregAdvantage: "Different market segment. Gereg targets operational automation, not lending. Potential partner, not competitor.",
    url: "https://lend.mn/",
  },
  {
    name: "Chimege Systems",
    type: "NLP Startup",
    threat: "Medium",
    valuation: "Undisclosed",
    funding: "Bootstrapped",
    focus: "Mongolian speech-to-text, NLP transcription and translation",
    weakness: "Narrow NLP focus. No full-stack agency offering.",
    geregAdvantage: "Gereg can integrate Chimege's NLP into broader automation solutions. Potential technology partner.",
    url: "https://chimege.mn/",
  },
  {
    name: "Intelmind / Cody",
    type: "AI Chatbot",
    threat: "Medium",
    valuation: "Undisclosed",
    funding: "Undisclosed",
    focus: "AI chatbot solutions for Mongolian businesses",
    weakness: "Chatbot-only. Limited to single-channel solutions.",
    geregAdvantage: "Gereg offers full agentic automation: multi-channel bots + workflow automation + OpenClaw agents + analytics.",
    url: "https://intelmind.mn/",
  },
  {
    name: "Traditional IT Vendors",
    type: "Legacy",
    threat: "Low",
    valuation: "Various",
    funding: "Self-funded",
    focus: "Website development, basic IT services, POS systems",
    weakness: "No AI expertise. Selling hours, not outcomes. Slow to adapt.",
    geregAdvantage: "Gereg sells AI outcomes with measurable ROI. 10x faster delivery using modern tools.",
    url: "#",
  },
];

// ─── GEREG DOMINATION ROADMAP ─────────────────────────────────────────
export const dominationRoadmap = [
  {
    quarter: "Q1 2026",
    phase: "INFILTRATE",
    title: "Beachhead — First 5 Clients",
    status: "active",
    color: "cyan",
    kpis: [
      { metric: "Clients", target: "5", current: "Building" },
      { metric: "MRR", target: "$5,000", current: "$0" },
      { metric: "Niche", target: "Dental + QSR", current: "Selected" },
    ],
    actions: [
      "Deploy zero-cost infrastructure stack (Oracle Cloud + n8n + OpenClaw)",
      "Build dental clinic appointment bot demo using Gemini 2.5 Flash free tier",
      "Build restaurant order-taking voice agent demo",
      "Cold outreach: 50 UB dental clinics via WhatsApp with video demo",
      "Close 5 founding clients at $500-800/mo introductory rate",
      "Document every ROI result as case study content",
    ],
    intel: "200 dental clinics in UB, only ~12% use any AI. Average no-show costs $80–$150 per empty slot. Massive pain point with simple solution.",
  },
  {
    quarter: "Q2 2026",
    phase: "ESTABLISH",
    title: "Market Authority — Machine Expansion",
    status: "upcoming",
    color: "blue",
    kpis: [
      { metric: "Clients", target: "15", current: "—" },
      { metric: "MRR", target: "$15,000", current: "—" },
      { metric: "Team", target: "3 people", current: "—" },
    ],
    actions: [
      "Raise rates to $800-$1,200/mo for new clients (founding clients keep rate)",
      "Hire part-time account manager + junior developer ($600/mo total)",
      "Launch 'AI Chief of Staff' premium tier using OpenClaw at $2,000/mo",
      "Partner with Chimege Systems for Mongolian NLP integration",
      "Publish weekly case study videos: 'How Gereg saves X hrs/week'",
      "Apply for Mongolia Digital Nation SME digitalization grant",
      "Expand into e-commerce sector (Shoppy.mn, local brands)",
    ],
    intel: "E-commerce cart abandonment in MN is 65-70%. AI recovery workflows can recapture 15-25% of lost sales. Massive ROI story.",
  },
  {
    quarter: "Q3 2026",
    phase: "DOMINATE",
    title: "Category King — Untouchable Position",
    status: "planned",
    color: "purple",
    kpis: [
      { metric: "Clients", target: "35+", current: "—" },
      { metric: "MRR", target: "$40,000", current: "—" },
      { metric: "Team", target: "6 people", current: "—" },
    ],
    actions: [
      "Launch Gereg AI Platform — white-label automation SaaS for other agencies",
      "Partner with Khan Bank or Golomt Bank for SME AI bundle distribution",
      "Productize 3-tier pricing: Basic $500 / Pro $1,200 / Enterprise $2,500+",
      "Hire BD manager for fintech vertical (insurance, banking, lending)",
      "Launch referral program: 20% revenue share for client referrals",
      "Begin Mongolian government contract pitches (e-Mongolia platform integration)",
      "Host first 'Gereg AI Summit' — free event, 100 business owners",
    ],
    intel: "Khan Bank has 2.5M+ customers. Partnership = instant distribution channel. Fintech sector raised $41.4M in 2025 alone — budget exists.",
  },
  {
    quarter: "Q4 2026 → 2027",
    phase: "EXPAND",
    title: "Regional Takeover — Beyond Mongolia",
    status: "vision",
    color: "amber",
    kpis: [
      { metric: "Clients", target: "100+", current: "—" },
      { metric: "MRR", target: "$100,000+", current: "—" },
      { metric: "Markets", target: "MN + 2 SEA", current: "—" },
    ],
    actions: [
      "Open Vietnam or Philippines satellite office (same playbook, new market)",
      "Launch Gereg Academy — train local AI automation specialists",
      "White-label Gereg Platform to agencies in SEA ($300-$500/mo per agency)",
      "Raise seed round: $500K at $5M valuation (profitable + growing)",
      "Expand OpenClaw deployment to enterprise clients with custom fine-tuning",
      "Build AI-powered Mongolian language customer service standard",
      "Position for acquisition or Series A at $15-20M valuation",
    ],
    intel: "Similar markets: Vietnam (100M pop, 73% internet), Philippines (117M, 68% internet). Same SMB pain points. English-friendly. Zero AI agency competition in tier-2 cities.",
  },
];

// ─── AGENCY BLUEPRINT — HOW TO RUN THE AGENCY ─────────────────────────
export const agencyBlueprint = [
  {
    category: "💰 Revenue Architecture",
    items: [
      {
        title: "Retainer Packages (70% of Revenue)",
        detail: "Monthly recurring revenue from ongoing AI automation management. Pricing: $500/mo (Basic — 1 bot), $1,200/mo (Pro — 3 bots + analytics), $2,500/mo (Enterprise — full automation suite + OpenClaw agent). Target: 80% gross margin.",
      },
      {
        title: "Setup Fees (15% of Revenue)",
        detail: "One-time project fees for building custom automations: $1,500–$5,000 per project. Includes discovery call, workflow mapping, implementation, testing, and training. Delivered in 2–3 weeks max.",
      },
      {
        title: "Performance Bonuses (10% of Revenue)",
        detail: "Outcome-based bonuses tied to measurable client results. Example: 15% of recovered revenue from abandoned cart automations, or $50 per new appointment booked by AI. Aligns incentives perfectly.",
      },
      {
        title: "White-Label SaaS (5% → 30% by Year 2)",
        detail: "License Gereg's automation templates and platform to other agencies at $200–$500/mo. Pure passive income. Target: 20 agency clients by end of Year 1.",
      },
    ],
  },
  {
    category: "🎯 Client Acquisition Engine",
    items: [
      {
        title: "Warm Outreach via Video Demos",
        detail: "Record 2-minute Loom videos showing a live demo specifically for the prospect's business. 'Hey [Restaurant Name], I built this AI ordering agent that could handle your phone orders...' — 5-10x higher response rate than cold email.",
      },
      {
        title: "LinkedIn Authority Building",
        detail: "Post 3x/week: client results, AI industry updates, behind-the-scenes of agency building. Target: 5,000 targeted followers in MN business community within 6 months. Every post = free marketing.",
      },
      {
        title: "Strategic Partnerships",
        detail: "Partner with accountants, lawyers, and business consultants who serve SMBs. They refer clients to you for AI automation. You pay 15-20% referral commission. Zero-cost acquisition channel.",
      },
      {
        title: "Local Events & Workshops",
        detail: "Host free 1-hour 'AI for Your Business' workshops monthly at co-working spaces in UB. Teach value first, sell second. Convert 10-20% of attendees to discovery calls.",
      },
    ],
  },
  {
    category: "⚙️ Operations Playbook",
    items: [
      {
        title: "Client Onboarding (48-Hour SLA)",
        detail: "Day 1: Discovery call (30 min) + send contract via DocuSign. Day 2: Receive payment + begin implementation. Use n8n template library for 80% of setup work. Client sees first results within 48 hours of payment.",
      },
      {
        title: "Weekly Client Reports (Automated)",
        detail: "n8n automation pulls metrics from client bots/workflows → generates PDF report → emails to client every Monday at 9 AM. Zero manual work. Clients feel premium service without any effort from you.",
      },
      {
        title: "Monthly Strategy Call (30 min)",
        detail: "Quick monthly check-in with each client. Review metrics, suggest optimizations, upsell additional services. Script: 'Your bot handled X conversations this month, saving you Y hours. Here's what we could add next...'",
      },
      {
        title: "Quarterly Business Review",
        detail: "Deep-dive presentation showing total ROI delivered. Use this meeting to: (1) raise rates if justified, (2) expand scope, (3) ask for referrals. Template provided in Gereg Intel system.",
      },
    ],
  },
  {
    category: "🛡️ Competitive Moats",
    items: [
      {
        title: "Mongolian Language Advantage",
        detail: "Gereg integrates with Egune AI and Chimege Systems for native Mongolian NLP — something no international AI agency can offer. This is an unbeatable local moat that foreign competitors cannot replicate.",
      },
      {
        title: "First-Mover Data Advantage",
        detail: "Every client engagement generates training data for better Mongolian AI models. By serving 50+ businesses, Gereg accumulates the largest proprietary dataset of Mongolian business workflows in the country.",
      },
      {
        title: "Switching Cost Lock-In",
        detail: "Once a client's operations run on Gereg's automation stack, switching is extremely costly and risky. 90%+ retention rate expected after 6 months of service. Enterprise clients become permanent revenue.",
      },
      {
        title: "Network Effects via Platform",
        detail: "As more agencies use the Gereg white-label platform, it improves with shared templates, integrations, and best practices. Each new agency customer makes the platform more valuable for all.",
      },
    ],
  },
];

// ─── MASSIVE SCALING SIGNALS FROM THE INTERNET ────────────────────────
export const scalingSignals = [
  {
    signal: "Agentic AI is the #1 Enterprise Priority in 2026",
    source: "Gartner, McKinsey, BCG",
    dataPoint: "65% of enterprises plan to deploy AI agents by end of 2026",
    implication: "Agencies that specialize in agentic AI implementation will capture the largest share of a $89B market.",
    actionable: "Position Gereg as 'Mongolia's Agentic AI Partner' — not just a chatbot agency.",
  },
  {
    signal: "LLM Costs Dropped 95% in 18 Months",
    source: "OpenAI, Google, DeepSeek",
    dataPoint: "GPT-4 was $60/M tokens in 2023. Gemini Flash-Lite is $0.10/M in 2026.",
    implication: "AI automation is now profitable even for businesses paying $200/mo. Massive TAM expansion into micro-businesses.",
    actionable: "Build ultra-low-cost bot packages for UB's 3,000+ restaurants at $300/mo — margins are still 80%+.",
  },
  {
    signal: "Mongolia Government Training 60,000 in AI",
    source: "UNDP, Mongolia Ministry of Digital Development",
    dataPoint: "National Initiative 2026-2028: 60K public servants + 10K workers + 1,000 AI Ambassadors",
    implication: "Government is creating demand. When 60K civil servants understand AI, they'll want it deployed in their departments.",
    actionable: "Position Gereg as the implementation partner for government AI initiatives. Apply for vendor status now.",
  },
  {
    signal: "Mongolia Fintech Raised $41.4M in 2025 Alone",
    source: "Tracxn, IFC, Golomt Bank",
    dataPoint: "AND Global: $21.4M Series B. Egune AI: $3.5M at $38.5M valuation.",
    implication: "Smart money is flowing into Mongolia's digital economy. AI services are fundable and profitable here.",
    actionable: "Gereg doesn't need VC funding to start — but the ecosystem exists for a seed round when ready to scale regionally.",
  },
  {
    signal: "97% of Mongolian Businesses Are SMEs",
    source: "World Bank Mongolia",
    dataPoint: "SMEs = 97% of firms but only 5.5% of GDP. Massive productivity gap.",
    implication: "AI automation can close this productivity gap. The businesses that adopt AI first will capture disproportionate market share.",
    actionable: "Frame Gereg's pitch as: 'Your competitors will use AI. The question is whether you're first or last.'",
  },
  {
    signal: "OpenClaw Makes Agentic AI Free for Anyone",
    source: "GitHub, TechCrunch, Forbes",
    dataPoint: "250K+ stars, self-hostable, zero API cost, moving to OSS Foundation",
    implication: "The technology barrier to running an AI agency just dropped to zero. Now it's about execution, relationships, and local knowledge.",
    actionable: "Gereg's advantage isn't technology — it's Mongolian market knowledge + execution speed + client relationships.",
  },
];
