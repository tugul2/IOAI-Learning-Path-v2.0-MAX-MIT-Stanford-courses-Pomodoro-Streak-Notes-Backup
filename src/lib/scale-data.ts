// ─── Agency Scaling Data Layer ───────────────────────────────────────
// Last updated: 2026-03-19

export const freeDeals = [
  {
    name: "OpenClaw / Manus AI",
    category: "Agentic AI",
    tag: "HOT",
    tagColor: "red",
    status: "Live",
    description:
      "The viral open-source autonomous agent. Self-hosts on your own server — run full agentic loops for client automation at ZERO API cost. 250k+ GitHub stars, now backed by OpenAI.",
    freeAmount: "Unlimited (self-hosted)",
    link: "https://manus.im/",
    expires: "Open Source — Permanent",
    howToSteps: [
      "Deploy to Oracle Cloud Always-Free ARM (4 OCPU, 24GB RAM) for $0/mo",
      "Connect to your client's WhatsApp, Telegram, or Slack workspace",
      "Configure task loops: calendar management, email drafting, web research",
      "Set up a client-specific knowledge base and tool integrations",
      "Sell as 'AI Chief of Staff' retainer at $800–$2,000/mo per client",
    ],
    agencyUseCase:
      "Autonomous client operations — social scheduling, inbox triage, lead follow-up",
    revenueEstimate: "$2,400/mo per 3 clients",
    icon: "🦞",
  },
  {
    name: "Google Gemini 2.5 Flash",
    category: "LLM API",
    tag: "FREE TIER",
    tagColor: "green",
    status: "Live",
    description:
      "1M token context window, multimodal, thinking budgets. Google's free tier: 15 req/min — enough for most small agency dashboards, bots, and automations with zero cost.",
    freeAmount: "15 RPM / 1M TPM free",
    link: "https://ai.google.dev/",
    expires: "Ongoing free tier",
    howToSteps: [
      "Go to ai.google.dev → Get API Key (completely free, no billing required)",
      "Use 1M context to analyze entire client knowledge bases in one call",
      "Build a multi-client chatbot router using multiple free API keys",
      "Integrate with Make.com free plan for no-code automation workflows",
      "Upsell clients on a 'Smart FAQ Bot' package for $300–$600/mo",
    ],
    agencyUseCase: "Customer support bots, document Q&A, proposal generators",
    revenueEstimate: "$1,800/mo across 3–6 clients",
    icon: "💎",
  },
  {
    name: "Oracle Cloud Always Free",
    category: "Hosting",
    tag: "PERMANENT FREE",
    tagColor: "blue",
    status: "Live",
    description:
      "4 OCPU ARM cores + 24GB RAM + 200GB storage. Run your entire agency stack — Next.js app, automation server, database — at absolute zero cost. No time limit.",
    freeAmount: "$0/mo forever",
    link: "https://www.oracle.com/cloud/free/",
    expires: "Always Free (no expiry)",
    howToSteps: [
      "Create Oracle Cloud account (credit card for verification, never charged)",
      "Provision one ARM VM: 4 OCPU, 24 GB RAM — Always Free tier",
      "Install Docker + Portainer for easy container management",
      "Deploy: n8n (automation), Chatwoot (support), your client dashboards",
      "Point client subdomains here — save $50–$150/mo vs Vercel/Heroku",
    ],
    agencyUseCase:
      "Full agency infrastructure: automation server, CRM, client dashboards",
    revenueEstimate: "Save $1,800/yr per agency",
    icon: "☁️",
  },
  {
    name: "Make.com Free Plan",
    category: "Automation",
    tag: "FREE",
    tagColor: "purple",
    status: "Live",
    description:
      "1,000 operations/mo free. Connect AI APIs to CRMs, Google Sheets, WhatsApp, Slack. The backbone of no-code AI automation agencies.",
    freeAmount: "1,000 ops/mo free",
    link: "https://www.make.com/",
    expires: "Ongoing free tier",
    howToSteps: [
      "Sign up at make.com — no credit card, 1,000 free ops/mo",
      "Build a scenario: Form → GPT-4o-mini → Email response in 20 minutes",
      "Create your first client workflow: lead capture → AI qualify → CRM entry",
      "Use Webhooks to trigger automations from client websites",
      "Package as 'Lead Qualification Agent' at $300–$800/mo setup + retainer",
    ],
    agencyUseCase: "Lead qualification, invoice generation, contract automation",
    revenueEstimate: "$2,400/mo from 3 automation clients",
    icon: "⚙️",
  },
  {
    name: "Cloudflare Workers Free",
    category: "Edge Compute",
    tag: "FREE",
    tagColor: "orange",
    status: "Live",
    description:
      "100,000 requests/day free at the edge. Deploy AI endpoints, rate limiters, and API proxies globally. Scales to millions with $5/mo paid plan.",
    freeAmount: "100K req/day free",
    link: "https://workers.cloudflare.com/",
    expires: "Ongoing free tier",
    howToSteps: [
      "Sign up at cloudflare.com → Workers & Pages → Create Worker",
      "Deploy an AI proxy worker to mask your OpenAI API key from clients",
      "Add rate limiting so clients cannot abuse your API allocation",
      "Build a usage analytics dashboard to show clients their ROI",
      "White-label as 'AI API Gateway' for enterprise clients at $200–$500/mo",
    ],
    agencyUseCase: "White-label AI API gateways, proxy servers, edge caching",
    revenueEstimate: "$1,500/mo from 3–5 enterprise clients",
    icon: "🌐",
  },
  {
    name: "n8n Self-Hosted",
    category: "Automation",
    tag: "FREE",
    tagColor: "green",
    status: "Live",
    description:
      "Powerful visual workflow builder with native AI nodes. More capable than Make.com for technical agencies. Self-host on Oracle Free tier for zero cost forever.",
    freeAmount: "Free (self-hosted)",
    link: "https://n8n.io/",
    expires: "Open source forever",
    howToSteps: [
      "Deploy n8n via Docker on your Oracle Cloud Always-Free VM",
      "Build sample AI workflow for a prospect (show, don't tell — close faster)",
      "Create an agency template library: onboarding, invoicing, reporting",
      "Connect to client Notion, Airtable, WhatsApp, Google Workspace",
      "Sell 'Done-For-You Automation' packages at $1,500–$3,000 one-time setup",
    ],
    agencyUseCase:
      "Complex multi-step automations with AI decision nodes and code blocks",
    revenueEstimate: "$4,500 per 3 one-time setups",
    icon: "🔗",
  },
];

// ─── Breaking AI Updates (March 2026) ───────────────────────────────
export const breakingUpdates = [
  {
    title: "OpenAI 'Starlight' Swarm Mode: 10x Efficiency Boost",
    date: "2026-03-16",
    source: "OpenAI Newsroom",
    impact: "critical",
    icon: "✨",
    summary:
      "New 'Swarm' orchestration allows GPT-5.4 models to manage each other recursively. This eliminates the need for manual agent-loop management by developers. Integration with Manus AI (OpenClaw) confirmed.",
    opportunity:
      "Build 'Self-Managing Businesses' for clients. One 'Manager' agent + four 'Worker' agents. Charge $5,000+ per month for full-service AI department displacement.",
    url: "https://openai.com/blog",
  },
  {
    title: "OpenClaw Goes Foundation — Open Source Forever",
    date: "2026-03-12",
    source: "TechCrunch",
    impact: "critical",
    icon: "🦞",
    summary:
      "Creator Peter Steinberger joined OpenAI. OpenClaw (Manus) moves to an OSS foundation — free forever. 250k+ GitHub stars. Chinese clones ArkClaw, WorkBuddy, miclaw already deployed at enterprise scale.",
    opportunity:
      "Self-host on Oracle Free before demand spikes. White-label and sell as 'Agentic Assistant' service for $800–$2,000/mo per client.",
    url: "https://manus.im/",
  },
  {
    title: "Claude 4 Opus 4.6 — Best Reasoning Model Available",
    date: "2026-03-08",
    source: "Anthropic",
    impact: "high",
    icon: "🧠",
    summary:
      "12% higher on logical inference benchmarks, 1M token context, native tool use for agentic pipelines. $5/M input — best for complex reasoning tasks that justify premium pricing.",
    opportunity:
      "Offer premium 'AI Strategy Consultant' packages at $3,000–$8,000/mo for enterprise clients needing complex reasoning and compliance tasks.",
    url: "https://www.anthropic.com/api",
  },
  {
    title: "Gemini 2.5 Flash-Lite: $0.10/M Tokens Dropped",
    date: "2026-03-10",
    source: "Google AI",
    impact: "high",
    icon: "⚡",
    summary:
      "Google's cheapest model — $0.10/M input tokens with 1M context. Multimodal and fast. Sets a new cost floor for high-volume agency automations running thousands of requests daily.",
    opportunity:
      "Rebuild all client FAQ and support chatbots on Flash-Lite. Cut your LLM costs by 60% and keep the difference as agency margin.",
    url: "https://ai.google.dev/",
  },
  {
    title: "GPT-5.4 'Operative Intelligence' — Computer Use Live",
    date: "2026-03-11",
    source: "OpenAI",
    impact: "critical",
    icon: "🤖",
    summary:
      "GPT-5.4 natively controls desktops, fills web forms, browses autonomously. 33% fewer hallucinations over GPT-5. Opens a massive new category for RPA-replacement-style agency services.",
    opportunity:
      "Productize 'AI Virtual Employee' that replaces manual data entry staff. Sell at $1,200–$3,500/mo per business, targeting SMBs with 5+ admin workers.",
    url: "https://openai.com/blog",
  },
  {
    title: "DeepSeek V3.2 — 90% Cache Discount Live",
    date: "2026-03-05",
    source: "DeepSeek",
    impact: "high",
    icon: "💸",
    summary:
      "Cache hit pricing dropped to $0.028/M tokens — effectively free for repetitive workflows. Perfect for FAQ bots, document extraction, and any high-repetition client automation at scale.",
    opportunity:
      "Migrate all client FAQ bots to DeepSeek V3.2 with caching enabled. Reduce LLM costs by 90% while passing minimal savings to clients, pocketing the rest.",
    url: "https://platform.deepseek.com/",
  },
  {
    title: "Gartner: AI Agency Market Hits $89B by 2027",
    date: "2026-03-09",
    source: "Gartner",
    impact: "high",
    icon: "📈",
    summary:
      "SMB segment is the #1 growth area. Businesses with 10–50 employees now actively spending $500–$5,000/mo on AI automation services. Emerging markets like Mongolia have near-zero competition.",
    opportunity:
      "Position your agency now in Mongolia before competition arrives. Even 5 retainer clients at $1,000/mo = $60,000/yr with near-zero overhead.",
    url: "https://www.gartner.com/en/newsroom",
  },
];

// ─── Agency Scaling Playbook ─────────────────────────────────────────
export const scalingPlaybook = [
  {
    phase: "Phase 1",
    title: "Zero-Cost Foundation",
    duration: "Week 1–2",
    status: "start",
    accent: "blue",
    icon: "🏗️",
    steps: [
      {
        action: "Deploy Oracle Cloud Always-Free ARM VM",
        details:
          "Your entire stack runs here for $0/mo: 4 OCPU, 24GB RAM, 200GB storage. Never pay for hosting.",
      },
      {
        action: "Set up Make.com or self-hosted n8n (both free)",
        details:
          "Visual AI automation builder — no code needed for first 3 clients. n8n is more powerful long-term.",
      },
      {
        action: "Get Google Gemini API key (free tier)",
        details:
          "15 req/min free tier — enough for your first client bots with absolute zero LLM cost.",
      },
      {
        action: "Clone OpenClaw and self-host on your VM",
        details:
          "Autonomous agent platform for premium service tier — zero API costs, runs any task loop.",
      },
      {
        action: "Register a domain + Cloudflare (free plan)",
        details:
          "Professional credibility and global SSL for ~$10/yr. Agency looks 10x bigger than it is.",
      },
    ],
    outcome: "Full agency infrastructure at ~$10/yr total cost",
  },
  {
    phase: "Phase 2",
    title: "First $3,000/mo",
    duration: "Week 3–6",
    status: "grow",
    accent: "cyan",
    icon: "🚀",
    steps: [
      {
        action: "Pick ONE niche: dental, restaurants, or e-commerce",
        details:
          "Specificity = faster sales cycles. Mongolia dental: 200 clinics, only 12% AI adoption = blue ocean.",
      },
      {
        action: "Build 1 live demo bot for that niche in 48 hours",
        details:
          "30-min appointment bot for dental OR voice order agent for restaurants using Gemini free tier.",
      },
      {
        action: "Cold outreach: 20 businesses/day via WhatsApp or email",
        details:
          "Personalize with their name + specific pain point (no-shows cost $80–$150 per slot). Show the demo.",
      },
      {
        action: "Close first 3 clients at $500–$1,000/mo each",
        details:
          "Start lower to get proof. Over-deliver massively. Raise rates at the 90-day review meeting.",
      },
      {
        action: "Automate entire client onboarding with Make.com",
        details:
          "Contract → Payment → Setup → First report — fully automatic. Zero manual work after deal closes.",
      },
    ],
    outcome: "$1,500–$3,000/mo recurring revenue",
  },
  {
    phase: "Phase 3",
    title: "Scale to $10,000/mo",
    duration: "Month 2–4",
    status: "scale",
    accent: "purple",
    icon: "📈",
    steps: [
      {
        action: "Create 3 clear service tier packages",
        details:
          "Basic $500: 1 bot. Pro $1,200: 3 bots + analytics dashboard. Enterprise $2,500+: full automation suite.",
      },
      {
        action: "Hire 1 part-time account manager",
        details:
          "Pay $300–$500/mo. They handle client communications. You focus exclusively on sales and product.",
      },
      {
        action: "Productize OpenClaw as 'AI Chief of Staff' premium tier",
        details:
          "Autonomous agent handles calendars, emails, research, reporting. Charge $1,500–$2,500/mo per client.",
      },
      {
        action: "Launch a 20% referral commission program",
        details:
          "Turn every happy client into your best salesperson. Viral growth with zero customer acquisition cost.",
      },
      {
        action: "Apply for Ulaanbaatar municipality AI digitalization grant",
        details:
          "Mongolia Digital Nation Policy offers subsidies for SME AI projects. Your agency qualifies as a vendor.",
      },
    ],
    outcome: "$8,000–$12,000/mo recurring revenue",
  },
  {
    phase: "Phase 4",
    title: "Agency as a Product",
    duration: "Month 4–12",
    status: "dominate",
    accent: "gradient",
    icon: "🏆",
    steps: [
      {
        action: "Package your proven stack as white-label SaaS",
        details:
          "Other agencies pay $200–$500/mo to resell your exact AI tools under their own brand. Pure profit.",
      },
      {
        action: "Create a YouTube / LinkedIn case study flywheel",
        details:
          "One video per week showing a real client result. 'How I saved Dental Clinic X 14hrs/week.' Pure inbound.",
      },
      {
        action: "Add GPU inference as a revenue stream",
        details:
          "Rent RTX 4090 on Vast.ai at $0.28/hr. Offer custom model fine-tuning and RAG setups at $500+ per project.",
      },
      {
        action: "Expand to SEA: Vietnam, Thailand, Philippines",
        details:
          "Same underserved SMB market. Same playbook. English works. OpenClaw removes language and tech barriers.",
      },
      {
        action: "Raise rates 20% for all clients annually",
        details:
          "Early clients get compounding ROI value and stay. New clients start at your full market rate.",
      },
    ],
    outcome: "$30,000–$80,000/mo agency + passive SaaS revenue",
  },
];
