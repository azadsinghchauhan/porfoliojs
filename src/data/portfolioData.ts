export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  problem: string;
  solution: string;
  features: string[];
  architectureSteps?: {
    step: string;
    title: string;
    detail: string;
  }[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  description: string;
}

export interface ProcessStage {
  number: string;
  name: string;
  description: string;
  deliverables: string;
}

export const PERSONAL_INFO = {
  name: "AZAD CHAUHAN",
  firstName: "Azad",
  lastName: "Chauhan",
  role: "AI / ML DEVELOPER & SOFTWARE BUILDER",
  headline: "BUILDING INTELLIGENT SYSTEMS THAT SOLVE REAL PROBLEMS.",
  heroSubtext:
    "Engineering autonomous agentic workflows, predictive machine learning models, and resilient full-stack applications with clean architectural discipline.",
  githubUrl: "https://github.com/azadsinghchauhan",
  currentYear: 2026,
  philosophy:
    "Building intelligent systems that solve real problems through structured data, autonomous agents, and pragmatic engineering.",
};

export const ENGINEERING_PILLARS = [
  {
    title: "AGENTIC AI",
    subtitle: "Autonomous Multi-Step Pipelines",
    description: "Self-orchestrating task execution, real-time tool use & deterministic telemetry.",
  },
  {
    title: "PREDICTIVE ML",
    subtitle: "Environmental & Pattern Models",
    description: "Structured forecasting systems turning complex variables into actionable signals.",
  },
  {
    title: "COMPUTER VISION",
    subtitle: "Visual Feature Extraction",
    description: "Image classification and optical feature analysis for practical physical inspection.",
  },
  {
    title: "FULL-STACK ARCHITECTURE",
    subtitle: "Resilient End-to-End Software",
    description: "Flask APIs, SQLAlchemy data layers, responsive interfaces & automated deployments.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "flexi-ca2",
    number: "01",
    title: "FLEXI CA 2",
    subtitle: "Automated News Topic Monitoring Using Agentic AI",
    category: "AGENTIC AI & INTELLIGENCE PIPELINE",
    featured: true,
    githubUrl: "https://github.com/azadsinghchauhan/flexi-ca2",
    liveUrl: "https://flexi-ca2.vercel.app/",
    technologies: [
      "Python",
      "Flask 3.1",
      "Groq AI LPU",
      "Tavily Search API",
      "SQLAlchemy",
      "SQLite / PostgreSQL",
      "Chart.js",
      "Jinja2",
      "JavaScript",
      "Vercel",
    ],
    summary:
      "An autonomous multi-step intelligence pipeline that continuously tracks topical news vectors, performs 3-tier explainable deduplication, extracts structured schema data via Groq AI in JSON Mode, and calculates 7-day trend velocities.",
    problem:
      "Conventional news aggregation relies on manual reading or naive keyword RSS feeds. Duplicate syndications flood feeds across multiple publishers, unstructured article summaries lack entity tagging, and high-importance developments are buried without immediate alerting.",
    solution:
      "Built a resilient 12-step autonomous agent. Starting from a topic goal and keyword vectors, it searches live news via Tavily, normalizes article metadata, filters duplicates through a deterministic 3-layer deduplication engine, prompts Groq AI with JSON Mode schema enforcement, computes mathematical 7-day velocity metrics, and writes an audit log with millisecond precision.",
    features: [
      "Autonomous 12-step deterministic agent orchestration",
      "Multi-vector search formulation & Tavily News API retrieval",
      "Metadata normalization across heterogeneous publisher formats",
      "Keyword relevance pre-scoring across title and body tokens",
      "3-Layer explainable deduplication (Canonical URL, Title Hash, Token Jaccard Similarity)",
      "Historical database deduplication against indexed records",
      "Groq AI JSON Mode structured extraction (summary, 3 key takeaways, entities, priority, rationale)",
      "Strict schema validation before persistence",
      "SQLAlchemy dual-backend storage (SQLite local / Neon Postgres serverless)",
      "7-Day mathematical trend velocity calculation",
      "Instant tactical alerts for high-priority intelligence signals",
      "Millisecond execution audit logging with per-article fault isolation",
    ],
    architectureSteps: [
      { step: "01", title: "Goal Formulation", detail: "Loads active topic parameters and parses target keyword vectors." },
      { step: "02", title: "Vector Search", detail: "Constructs Boolean query strings and queries Tavily News API for real-time coverage." },
      { step: "03", title: "Normalization", detail: "Strips URL tracking tokens, parses ISO timestamps, and standardizes publisher domains." },
      { step: "04", title: "3-Tier Deduplication", detail: "Filters duplicates using URL equivalence, normalized title hashing, and Jaccard token overlap." },
      { step: "05", title: "Groq AI Extraction", detail: "Dispatches unique payloads to Groq LPU with strict JSON schema enforcement." },
      { step: "06", title: "Trend & Alerting", detail: "Updates 7-day trend velocities, triggers priority notifications, and writes audit telemetry." },
    ],
  },
  {
    id: "heat-wave-prediction",
    number: "02",
    title: "HEAT WAVE PREDICTION SYSTEM",
    subtitle: "Environmental Anomaly & Thermal Forecasting System",
    category: "PREDICTIVE MACHINE LEARNING",
    featured: false,
    githubUrl: "https://github.com/azadsinghchauhan",
    technologies: ["Python", "Machine Learning", "Predictive Modeling", "Data Analysis", "Scientific Computing"],
    summary:
      "An AI/ML system focused on predicting heat-wave conditions from environmental and historical data.",
    problem:
      "Extreme thermal anomalies create severe risks for public health, municipal power infrastructure, and regional agriculture. Early detection requires analyzing complex multi-variable weather dynamics across historical baselines.",
    solution:
      "Engineered an environmental prediction model that processes meteorological telemetry, analyzes historical temperature anomalies, and projects probability thresholds for dangerous heat-wave episodes.",
    features: [
      "Environmental feature processing and baseline normalization",
      "Multi-variable meteorological telemetry ingestion",
      "Predictive thermal anomaly threshold classification",
      "Scientific data visualization and condition monitoring",
    ],
  },
  {
    id: "fruit-ripeness-detection",
    number: "03",
    title: "FRUIT RIPENESS DETECTION",
    subtitle: "Computer Vision & Optical Maturity Classification",
    category: "COMPUTER VISION & ML",
    featured: false,
    githubUrl: "https://github.com/azadsinghchauhan",
    technologies: ["Python", "Computer Vision", "Machine Learning", "Image Processing", "Pattern Recognition"],
    summary:
      "An image-based machine learning system designed to identify fruit ripeness from visual characteristics.",
    problem:
      "Manual fruit grading is subjective, slow, and prone to inconsistency across harvest cycles. Automated post-harvest processing requires non-invasive visual classification to reliably gauge fruit maturity.",
    solution:
      "Developed a computer vision classification workflow that evaluates optical surface pigmentation, texture distribution, and visual characteristics to categorize ripeness stages systematically.",
    features: [
      "Image preprocessing and chromatic distribution analysis",
      "Visual feature extraction for produce classification",
      "Multi-class maturity categorization",
      "Computer vision inspection and bounding visualization interface",
    ],
  },
  {
    id: "career-iq-prediction",
    number: "04",
    title: "CAREER IQ PREDICTION SYSTEM",
    subtitle: "Intelligent Career Path & Skill Recommendation Engine",
    category: "INTELLIGENT PREDICTION SYSTEM",
    featured: false,
    githubUrl: "https://github.com/azadsinghchauhan",
    technologies: ["Python", "Machine Learning", "Predictive Modeling", "Data Processing", "Recommendation Logic"],
    summary:
      "An intelligent prediction system designed to analyze relevant inputs and provide career-oriented predictions or recommendations.",
    problem:
      "Career pathway decisions often rely on fragmented advice without empirical alignment between individual competencies, skill vectors, and evolving industry role demands.",
    solution:
      "Built a machine learning evaluation system that maps candidate profiles and technical competency vectors to identify high-affinity career directions and targeted growth paths.",
    features: [
      "Competency vectorization and structured profile ingestion",
      "Predictive career affinity mapping",
      "Domain trajectory recommendation logic",
      "Clean telemetry display and skill alignment insights",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & MACHINE LEARNING",
    skills: [
      "Machine Learning",
      "Computer Vision",
      "Predictive Modeling",
      "AI Systems",
      "Agentic Workflows",
      "Groq AI LPU",
      "Tavily Search API",
    ],
    description:
      "Designing multi-step autonomous pipelines, prompt schemas in JSON Mode, computer vision classifiers, and predictive forecasting models.",
  },
  {
    title: "DEVELOPMENT & LANGUAGES",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Jinja2",
      "C / Systems Basics",
    ],
    description:
      "Writing clean, modular code across backend automation, agentic orchestrators, and responsive modern web interfaces.",
  },
  {
    title: "BACKEND & DATA",
    skills: [
      "Flask",
      "SQLAlchemy",
      "SQLite",
      "PostgreSQL",
      "REST APIs",
      "Data Normalization",
    ],
    description:
      "Constructing resilient server architectures, relational database schemas, and structured API integrations.",
  },
  {
    title: "TOOLS & DEPLOYMENT",
    skills: [
      "Git",
      "GitHub",
      "Vercel Serverless",
      "Chart.js",
      "Responsive UI",
    ],
    description:
      "Maintaining version-controlled codebases, deploying serverless cloud web apps, and rendering data visualizations.",
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    name: "DISCOVER",
    description:
      "Investigate problem constraints, identify the target intelligence requirements, and define input data signals.",
    deliverables: "Problem framing, input telemetry analysis & technical goals.",
  },
  {
    number: "02",
    name: "DEFINE",
    description:
      "Architect deterministic system workflows, strict schema definitions, and model evaluation parameters.",
    deliverables: "System pipeline design, JSON contracts & database schemas.",
  },
  {
    number: "03",
    name: "BUILD",
    description:
      "Develop the autonomous agentic pipelines, machine learning logic, backend APIs, and intuitive user interfaces.",
    deliverables: "Modular Python services, AI integrations & responsive UI.",
  },
  {
    number: "04",
    name: "TEST",
    description:
      "Execute rigorous edge-case verification, validate schema integrity, and measure runtime performance benchmarks.",
    deliverables: "Deduplication checks, fault isolation & execution audit logs.",
  },
  {
    number: "05",
    name: "DELIVER",
    description:
      "Deploy production-ready systems to cloud platforms with continuous telemetry and transparent audit trails.",
    deliverables: "Live Vercel deployment, public GitHub documentation & verified viva readiness.",
  },
];
