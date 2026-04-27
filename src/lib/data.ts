// ============================================================
// Gereg Intel — Comprehensive Data Layer
// Last refreshed: 2026-03-19
// ============================================================

// ─── Mongolia Market Data ────────────────────────────────────

export const mongoliaData = {
  overview: {
    population: "3.5M",
    internet_penetration: "86.5%",
    mobile_internet_share: "78%",
    internet_users: "2.93M",
    eGov_rank: "46th globally",
    ict_revenue_2025: "$268M",
    ict_revenue_2029_projected: "$324M",
    ict_growth_rate: "8.62%",
    ai_readiness_score: "3.0/5.0",
    ai_readiness_stage: "Systematic",
    digital_transformation_goal: "90%",
    five_g_coverage_target_2027: "70%",
    sme_digitalized_worldbank: "2,000+",
  },
  sectors: [
    {
      name: "Dental Clinics",
      nameLocal: "Шүдний эмнэлгүүд",
      icon: "🦷",
      market_size: "~200 clinics in UB",
      pain_points: [
        { issue: "No-shows cost $80-$150 per empty slot", impact: "High", solvable: true },
        { issue: "Paper-based patient records still dominant", impact: "Critical", solvable: true },
        { issue: "Insurance verification is manual (15+ min)", impact: "Medium", solvable: true },
        { issue: "After-hours patient triage is nonexistent", impact: "High", solvable: true },
        { issue: "Limited AI diagnostic imaging adoption", impact: "Medium", solvable: true },
      ],
      ai_solutions: [
        "Automated scheduling + no-show prediction agents",
        "Cloud-based EMR with Mongolian language support",
        "24/7 symptom triage chatbot (Mongolian NLP)",
        "AI-assisted X-ray analysis for cavity detection",
      ],
      roi_estimate: "250%",
      time_saved: "14 hrs/week",
      current_adoption: "~12%",
      key_players: [
        { name: "SOS Medica", url: "https://sosmedica.mn/" },
        { name: "Goviin Brani LLC", url: "https://www.linkedin.com/company/goviinbrani/" },
        { name: "AppStar Mongolia", url: "https://www.appstar.mn/" }
      ],
    },
    {
      name: "Restaurants & QSR",
      nameLocal: "Рестораны & Түргэн хоол",
      icon: "🍽️",
      market_size: "~3,000+ in Ulaanbaatar",
      pain_points: [
        { issue: "Staff turnover rate 40-60% annually", impact: "Critical", solvable: true },
        { issue: "30% of phone orders dropped during peak", impact: "High", solvable: true },
        { issue: "Food waste from poor demand forecasting", impact: "High", solvable: true },
        { issue: "iBarimt (POS) integration gaps", impact: "Medium", solvable: true },
        { issue: "Delivery logistics in UB traffic chaos", impact: "High", solvable: false },
      ],
      ai_solutions: [
        "Voice AI ordering agent (Mongolian language)",
        "Predictive inventory & demand forecasting",
        "Automated iBarimt-integrated POS workflows",
        "AI-driven dynamic pricing during peak hours",
      ],
      roi_estimate: "310%",
      time_saved: "22 hrs/week",
      current_adoption: "~8%",
      key_players: [
        { name: "FoodChow Mongolia", url: "https://foodchow.com/" },
        { name: "iBarimt", url: "https://ebarimt.mn/" },
        { name: "Intelmind/Cody", url: "https://intelmind.mn/" }
      ],
    },
    {
      name: "E-commerce",
      nameLocal: "Цахим худалдаа",
      icon: "🛒",
      market_size: "Growing rapidly",
      pain_points: [
        { issue: "Cart abandonment ~65-70%", impact: "Critical", solvable: true },
        { issue: "Limited local payment gateway options", impact: "High", solvable: false },
        { issue: "Mongolian-language UX is poor on most sites", impact: "High", solvable: true },
        { issue: "Customer support doesn't scale", impact: "Critical", solvable: true },
        { issue: "Cross-border logistics are complex", impact: "Medium", solvable: false },
      ],
      ai_solutions: [
        "Agentic cart recovery workflows (SMS/email)",
        "AI-powered Tier-1 support in Mongolian",
        "LLM-driven personalization engine",
        "Automated inventory sync across channels",
      ],
      roi_estimate: "195%",
      time_saved: "30 hrs/week",
      current_adoption: "~22%",
      key_players: [
        { name: "Shoppy.mn", url: "https://shoppy.mn/" },
        { name: "Wise Software", url: "https://wise.mn/" },
        { name: "Anduud Lab", url: "https://anduud.ai/" }
      ],
    },
    {
      name: "Fintech & Banking",
      nameLocal: "Финтек & Банк",
      icon: "🏦",
      market_size: "Largest AI adopter in MN",
      pain_points: [
        { issue: "Credit scoring relies on limited data", impact: "Critical", solvable: true },
        { issue: "KYC/AML processes are manual", impact: "High", solvable: true },
        { issue: "Fraud detection is reactive, not predictive", impact: "Critical", solvable: true },
        { issue: "Customer onboarding takes 2-3 days", impact: "Medium", solvable: true },
      ],
      ai_solutions: [
        "AI credit scoring with alternative data sources",
        "Automated KYC/AML compliance agents",
        "Real-time fraud detection neural networks",
        "Instant digital onboarding with ID verification",
      ],
      roi_estimate: "380%",
      time_saved: "40 hrs/week",
      current_adoption: "~35%",
      key_players: [
        { name: "Khan Bank", url: "https://khanbank.com/" },
        { name: "Golomt Bank", url: "https://golomtbank.com/" },
        { name: "LendMN", url: "https://lend.mn/" }
      ],
    },
    {
      name: "Education & EdTech",
      nameLocal: "Боловсрол & EdTech",
      icon: "📚",
      market_size: "750K+ students",
      pain_points: [
        { issue: "Teacher shortage in rural aimags", impact: "Critical", solvable: true },
        { issue: "No personalized learning paths", impact: "High", solvable: true },
        { issue: "Assessment is manual and time-consuming", impact: "Medium", solvable: true },
        { issue: "Content not localized to Mongolian", impact: "High", solvable: true },
      ],
      ai_solutions: [
        "AI tutoring agents with Mongolian NLP",
        "Adaptive learning path engines",
        "Automated grading and assessment",
        "Content generation in Mongolian Cyrillic",
      ],
      roi_estimate: "190%",
      time_saved: "18 hrs/week",
      current_adoption: "~15%",
      key_players: [
        { name: "AI Academy Asia", url: "https://aiacademy.asia/" },
        { name: "e-Mongolia Edu", url: "https://e-mongolia.mn/" }
      ],
    },
  ],
  government_initiatives: [
    { name: "Digital Nation Policy", year: "2022", desc: "Ministry of Digital Development established.", url: "https://mddc.gov.mn/" },
    { name: "e-Mongolia Platform", year: "2020", desc: "800-1,200+ online public services.", url: "https://e-mongolia.mn/" },
    { name: "National AI Strategy", year: "2026", desc: "UNDP-supported AI & Big Data Strategy.", url: "https://www.undp.org/mongolia" },
    { name: "SME Digitalization", year: "2022", desc: "World Bank funded digitalization of SMEs.", url: "https://www.worldbank.org/en/country/mongolia" },
  ],
  roadmap: [
    {
      phase: "Phase 1",
      title: "Foundational Hyper-Localization",
      timeframe: "Q1 - Q2 2026",
      status: "current",
      description: "Establish the first high-accuracy Mongolian NLP engine for enterprise use. Focus on displacing inefficient manual administrative tasks in high-density urban SMBs.",
      complexity: "High",
      tactics: [
        {
          goal: "Mongolian Cyrillic NLP Dominance",
          detail: "Fine-tune DeepSeek V3.2 or Llama 3.3 on ultra-high-quality Mongolian legal, medical, and conversational datasets to achieve 95%+ intent recognition accuracy.",
          impact: "Critical"
        },
        {
          goal: "The 'UB Dentist' Blitz",
          detail: "Deploy 50+ fully autonomous dental scheduling agents in Ulaanbaatar to prove 300% ROI within 60 days. Use as a case study for all healthcare verticals.",
          impact: "High"
        },
        {
          goal: "iBarimt Agentic Integration",
          detail: "Build a seamless 'voice-to-invoice' agent that interacts natively with the Mongolian tax authority's e-Point system via reverse-engineered API hooks.",
          impact: "Critical"
        },
        {
          goal: "Oracle Cloud Node Expansion",
          detail: "Leverage Oracle's Free Tier to host local inference nodes for low-latency support, bypassing the need for expensive GPU rentals until scale is proven.",
          impact: "Medium"
        }
      ]
    },
    {
      phase: "Phase 2",
      title: "Vertical Integration & Gov-Tech",
      timeframe: "Q3 - Q4 2026",
      status: "upcoming",
      description: "Expand horizontally into government-backed digitalization projects and vertical mining safety AI systems. Transition from tools to infrastructure.",
      complexity: "Extreme",
      tactics: [
        {
          goal: "Mining Safety Swarm Mode",
          detail: "Collaborate with Oyu Tolgoi contractors to deploy computer vision swarms for real-time safety compliance and predictive equipment failure monitoring.",
          impact: "Massive"
        },
        {
          goal: "e-Mongolia AI Pilot",
          detail: "Propose an AI-first automated document verification layer for the MDDIC, reducing public service processing times from 48 hours to 4 minutes.",
          impact: "Systemic"
        },
        {
          goal: "Financial AI Compliance",
          detail: "Establish the first AI-driven AML (Anti-Money Laundering) monitoring system localized specifically for Mongolian banking regulations and KHAN Bank integrations.",
          impact: "High"
        }
      ]
    },
    {
      phase: "Phase 3",
      title: "Institutional Scaling & Regional Hub",
      timeframe: "2027",
      status: "future",
      description: "Establish Mongolia as the AI sandbox for Central Asia. Export localized LLM expertise to Kazakhstan, Kyrgyzstan, and Uzbekistan.",
      complexity: "Ultra",
      tactics: [
        {
          goal: "Central Asian LLM Hub",
          detail: "Package the 'Mongolian Success Playbook' into a white-label SaaS for neighboring nomadic and emerging economies with similar demographic structures.",
          impact: "Regional"
        },
        {
          goal: "Autonomous Logistics Grid",
          detail: "Deploy the first AI-driven logistics optimization engine for trans-Mongolian trade routes, integrating with China's Belt and Road digital infrastructure.",
          impact: "Economic"
        }
      ]
    }
  ]
};

// ─── Expanded AI Model Pricing ───────────────────────────────

export const aiModels = [
  {
    name: "GPT-5.4",
    provider: "OpenAI",
    input: "$2.50",
    output: "$10.00",
    context: "1M tokens",
    free_tier: "None",
    latency: "~200ms",
    badge: "Operative Intelligence",
    category: "frontier",
    highlight: "Native computer use, 33% fewer hallucinations",
    cached_input: "$1.25",
    url: "https://openai.com/api/"
  },
  {
    name: "GPT-4o mini",
    provider: "OpenAI",
    input: "$0.15",
    output: "$0.60",
    context: "128K tokens",
    free_tier: "Rate-limited",
    latency: "~100ms",
    badge: "Budget King",
    category: "budget",
    highlight: "16x cheaper than GPT-4o, solid for most tasks",
    cached_input: "$0.075",
    url: "https://openai.com/api/"
  },
  {
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    input: "$5.00",
    output: "$25.00",
    context: "1M tokens",
    free_tier: "None",
    latency: "~300ms",
    badge: "Best Reasoning",
    category: "frontier",
    highlight: "12% improvement in logical inference",
    cached_input: "$2.50",
    url: "https://www.anthropic.com/api"
  },
  {
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    input: "$1.00",
    output: "$5.00",
    context: "200K tokens",
    free_tier: "None",
    latency: "~80ms",
    badge: "Fast & Cheap",
    category: "budget",
    highlight: "Fastest Anthropic model, good for quick tasks",
    cached_input: "$0.50",
    url: "https://www.anthropic.com/api"
  },
  {
    name: "Gemini 2.5 Flash",
    provider: "Google",
    input: "$0.30",
    output: "$2.50",
    context: "1M tokens",
    free_tier: "Free tier available",
    latency: "~120ms",
    badge: "Most Versatile",
    category: "mid-tier",
    highlight: "Multimodal, thinking budgets, price-perf",
    cached_input: "$0.15",
    url: "https://ai.google.dev/"
  },
  {
    name: "Gemini 2.5 Flash-Lite",
    provider: "Google",
    input: "$0.10",
    output: "$0.40",
    context: "1M tokens",
    free_tier: "Free tier available",
    latency: "~60ms",
    badge: "Cheapest Google",
    category: "budget",
    highlight: "Most cost-effective Google model",
    cached_input: "N/A",
    url: "https://ai.google.dev/"
  },
  {
    name: "DeepSeek V3.2",
    provider: "DeepSeek",
    input: "$0.28",
    output: "$0.42",
    context: "128K tokens",
    free_tier: "Free personal chat",
    latency: "~150ms",
    badge: "Cost Destroyer",
    category: "budget",
    highlight: "90% discount with cache hit ($0.028 input).",
    cached_input: "$0.028",
    url: "https://platform.deepseek.com/"
  },
  {
    name: "DeepSeek-R1",
    provider: "DeepSeek",
    input: "$0.55",
    output: "$2.19",
    context: "128K tokens",
    free_tier: "Free personal chat",
    latency: "~250ms",
    badge: "Math & Code",
    category: "mid-tier",
    highlight: "Advanced reasoning, math proofs, code gen",
    cached_input: "$0.14",
    url: "https://platform.deepseek.com/"
  },
  {
    name: "Llama 3.3 70B",
    provider: "Meta / Open Source",
    input: "$0.60",
    output: "$0.90",
    context: "128K tokens",
    free_tier: "Open Weights",
    latency: "~120ms",
    badge: "SOTA Open Source",
    category: "open-source",
    highlight: "Matches GPT-4o capabilities, 70B params",
    cached_input: "N/A",
    url: "https://llama.meta.com/"
  },
  {
    name: "Llama 3.2 3B",
    provider: "Meta / Ollama",
    input: "$0.00",
    output: "$0.00",
    context: "128K tokens",
    free_tier: "Local / Free",
    latency: "Local",
    badge: "Mobile Ready",
    category: "open-source",
    highlight: "Perfect for on-device, available via 'ollama run llama3.2'",
    cached_input: "N/A",
    url: "https://ollama.com/library/llama3.2"
  },
  {
    name: "Qwen 2.5 72B",
    provider: "Alibaba / Open Source",
    input: "$0.40",
    output: "$0.40",
    context: "128K tokens",
    free_tier: "Open Weights",
    latency: "~150ms",
    badge: "Coding Beast",
    category: "open-source",
    highlight: "Exceptional coding & math, top rank open LLM",
    cached_input: "N/A",
    url: "https://github.com/QwenLM/Qwen2.5"
  },
  {
    name: "Qwen 2.5-Coder 7B",
    provider: "Alibaba / Ollama",
    input: "$0.00",
    output: "$0.00",
    context: "32K tokens",
    free_tier: "Local / Free",
    latency: "Local",
    badge: "Dev Tool",
    category: "open-source",
    highlight: "Optimized for local IDEs, 'ollama run qwen2.5-coder'",
    cached_input: "N/A",
    url: "https://ollama.com/library/qwen2.5-coder"
  },
  {
    name: "NVIDIA Nemotron 340B",
    provider: "NVIDIA / Open Source",
    input: "$0.50",
    output: "$1.00",
    context: "128K tokens",
    free_tier: "Open Weights",
    latency: "~200ms",
    badge: "Giant Scale",
    category: "open-source",
    highlight: "Reward model capabilities, massive parameter count",
    cached_input: "N/A",
    url: "https://build.nvidia.com/nvidia/nemotron-4-340b-instruct"
  },
  {
    name: "Mistral Large 2",
    provider: "Mistral AI",
    input: "$2.00",
    output: "$6.00",
    context: "128K tokens",
    free_tier: "None",
    latency: "~180ms",
    badge: "EU Frontier",
    category: "frontier",
    highlight: "European powerhouse, high reasoning density",
    cached_input: "N/A",
    url: "https://mistral.ai/news/mistral-large-2/"
  },
  {
    name: "Phi-4",
    provider: "Microsoft / Ollama",
    input: "$0.00",
    output: "$0.00",
    context: "16K tokens",
    free_tier: "Local / Free",
    latency: "Local",
    badge: "SLM Master",
    category: "open-source",
    highlight: "State of the art small model, 'ollama run phi4'",
    cached_input: "N/A",
    url: "https://ollama.com/library/phi4"
  },
];

// ─── Expanded VPS / GPU Hosting ──────────────────────────────

export const hostingProviders = [
  {
    provider: "Contabo",
    category: "cpu",
    url: "https://contabo.com/en/",
    plans: [
      { name: "Cloud VPS S", price: "$5.50/mo", vcpu: "4", ram: "8 GB", storage: "100 GB NVMe", bandwidth: "Unlimited", highlight: true },
      { name: "Cloud VPS M", price: "$9.50/mo", vcpu: "6", ram: "16 GB", storage: "200 GB NVMe", bandwidth: "Unlimited", highlight: false },
    ],
    gpu_plans: [
      { name: "L40S Dedicated", price: "€600/mo", gpu: "1x L40S", vram: "48 GB", cpu: "32 cores", ram: "106 GB" },
      { name: "H100 Dedicated", price: "€1,600/mo", gpu: "1x H100", vram: "80 GB", cpu: "32 cores", ram: "106 GB" },
    ],
    value_prop: "Best raw power-to-price ratio. Unlimited traffic. One-click AI model deployment.",
  },
  {
    provider: "Oracle Cloud",
    category: "free",
    url: "https://www.oracle.com/cloud/",
    plans: [
      { name: "Always Free ARM", price: "$0.00/mo", vcpu: "4 OCPU", ram: "24 GB", storage: "200 GB", bandwidth: "10 TB/mo", highlight: true },
    ],
    gpu_plans: [
      { name: "L40S GPU", price: "$0.88/hr", gpu: "1x L40S", vram: "48 GB", cpu: "16 cores", ram: "256 GB" },
      { name: "H100 GPU", price: "$2.50/hr", gpu: "1x H100", vram: "80 GB", cpu: "112 cores", ram: "2 TB" },
    ],
    value_prop: "Best free tier (24GB ARM). Enterprise-grade AI/ML services. $300 trial credit.",
  },
  {
    provider: "Hetzner",
    category: "cpu",
    url: "https://www.hetzner.com/",
    plans: [
      { name: "CX32", price: "€5.99/mo", vcpu: "4", ram: "8 GB", storage: "80 GB NVMe", bandwidth: "20 TB", highlight: true },
      { name: "CX42", price: "€14.99/mo", vcpu: "8", ram: "16 GB", storage: "160 GB NVMe", bandwidth: "20 TB", highlight: false },
    ],
    gpu_plans: [
      { name: "GEX44 (RTX 4000)", price: "€212/mo", gpu: "1x RTX 4000 Ada", vram: "20 GB", cpu: "14 cores", ram: "64 GB" },
    ],
    value_prop: "German engineering. Best EU latency. Transparent pricing. Excellent for inference.",
  },
  {
    provider: "Vultr",
    category: "gpu",
    url: "https://www.vultr.com/",
    plans: [
      { name: "Cloud Compute vc2", price: "$20.00/mo", vcpu: "2", ram: "4 GB", storage: "80 GB SSD", bandwidth: "3 TB", highlight: true },
    ],
    gpu_plans: [
      { name: "A100 80GB", price: "$1.29/hr", gpu: "1x A100", vram: "80 GB", cpu: "12 cores", ram: "120 GB" },
      { name: "L40S", price: "$1.67/hr", gpu: "1x L40S", vram: "48 GB", cpu: "16 cores", ram: "120 GB" },
    ],
    value_prop: "Global edge locations. Pay-as-you-go GPU. Multi-GPU clusters available.",
  },
  {
    provider: "Vast.ai",
    category: "gpu",
    url: "https://vast.ai/",
    plans: [],
    gpu_plans: [
      { name: "RTX 4090", price: "$0.28/hr", gpu: "1x RTX 4090", vram: "24 GB", cpu: "Varies", ram: "Varies" },
      { name: "H100", price: "$1.53/hr", gpu: "1x H100", vram: "80 GB", cpu: "Varies", ram: "Varies" },
    ],
    value_prop: "Decentralized GPU marketplace. Lowest prices. Dynamic pricing. Per-second billing.",
  },
];

// ─── AI News (Default Static Fallback) ───────────────────────

export const aiNewsFallback = [
  {
    date: "2026-03-16",
    title: "OpenAI Announces Project 'Starlight' — First fully autonomous agent swarm",
    source: "OpenAI",
    category: "Model Release",
    impact: "critical",
    summary: "A major update to the GPT-5 series, Starlight allows dozens of agents to collaborate on complex engineering tasks without human oversight. Early benchmarks show 80% success on multi-day dev ops projects.",
    tags: ["OpenAI", "Starlight", "Agentic Swarm"],
    url: "https://openai.com/blog",
  },
  {
    date: "2026-03-15",
    title: "Global AI Adoption in SEA Surpasses Projections",
    source: "Bloomberg",
    category: "Market Analysis",
    impact: "high",
    summary: "Southeast Asian markets, led by Vietnam and Mongolia, are now the fastest-growing regions for agentic workflow implementation in small businesses.",
    tags: ["SEA", "Global Markets", "Adoption"],
    url: "https://www.bloomberg.com/intelligence",
  },
];

export const researchIdeas = [
  {
    title: "Mongolian NLP Gap Analysis",
    icon: "🔤",
    description: "Map every Mongolian Cyrillic NLP model available. Identify the gap between demand and supply.",
    potential: "High",
    status: "Proposed",
  },
  {
    title: "Ger District Digital Adoption Study",
    icon: "🏕️",
    description: "Survey smartphone/internet usage patterns in Ulaanbaatar's ger districts.",
    potential: "Medium",
    status: "In Progress",
  },
];

export const market_intel = {
  last_updated: "2026-03-19",
  headline_metrics: {
    adoption_rate: "67%",
    avg_roi: "171%",
    admin_time_saved: "45%",
    revenue_increase: "30%",
    cost_reduction: "35%",
    cs_roi_6mo: "340%",
    global_ai_spending: "$2.52T",
    mn_internet_penetration: "86.5%",
  },
};

export const rivalStrategies = [
  {
    id: "agency",
    title: "Agency Dominance",
    icon: "🏢",
    threat: "Large international firms entering the MN market with high-cost solutions.",
    counter: "Hyper-localization. International firms lack deep Mongolian NLP sensitivity and local business cultural context. Focus on 'Zero-Day' deployment and personal onsite integration.",
    actions: ["Deploy native-speaking agents", "Offer 24/7 onsite troubleshooting in UB", "Fixed-fee model vs percentage-of-spend"]
  },
  {
    id: "scaling",
    title: "Scaling Efficiency",
    icon: "📈",
    threat: "Rivals with massive VC funding burning cash on high-end TPU/GPU clusters.",
    counter: "The 'Efficiency Arbiter' play. Use optimized SLMs (Small Language Models) on cheap/free ARM instances (Oracle Always-Free). Scale horizontally across 1,000s of low-cost nodes while they struggle with unit economics.",
    actions: ["Quantize everything to 4-bit", "Heavy use of RAG vs Fine-tuning", "Cross-cloud arbitrage (Contabo + Oracle)"]
  },
  {
    id: "service",
    title: "Service Excellence",
    icon: "🛠️",
    threat: "Automated-only support flows from competitors that alienate non-technical SME owners.",
    counter: "The 'Hybrid Intelligence' bridge. Every autonomous agent is backed by a 'one-click-to-human' failover. Superior Mongolian language sentiment analysis to detect frustration early.",
    actions: ["Multimodal support (Voice/Visual)", "Custom CRM integrations", "SLA-backed performance guarantees"]
  }
];
