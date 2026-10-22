import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, ExternalLink, Github, Activity, Thermometer, Apple, Compass } from 'lucide-react';
import { PROJECTS, Project, PERSONAL_INFO } from '../data/portfolioData';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  // Featured project interactive tab state
  const [activeTab, setActiveTab] = useState<'pipeline' | 'json' | 'dedup'>('pipeline');

  return (
    <section id="work" className="py-24 md:py-32 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header matching reference image: "SELECTED" + "PROJECTS ✦" + "VIEW ALL WORK →" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DDD5C5]">
          <div>
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#738477] font-semibold block mb-2">
              SELECTED
            </span>
            <div className="flex items-center gap-3">
              <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-medium text-[#222823]">
                PROJECTS
              </h2>
              <span className="text-[#C2A277] text-2xl sm:text-3xl">✦</span>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase font-semibold text-[#3D4A41] hover:text-[#222823] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
          >
            <span>VIEW ALL ON GITHUB</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C2A277] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* ============================================================== */}
        {/* FEATURED PROJECT: FLEXI CA 2 (Large Editorial Composition)      */}
        {/* ============================================================== */}
        <div className="mb-20 rounded-2xl border border-[#DDD5C5] bg-[#F5F2EB] p-6 sm:p-8 md:p-12 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Featured Project Editorial Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Number & Category */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-semibold text-[#C2A277] tracking-widest">
                    01
                  </span>
                  <span className="text-[#DDD5C5]">•</span>
                  <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#5F7063] font-semibold">
                    {featuredProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#222823] mb-3 leading-tight">
                  {featuredProject.title}
                </h3>

                {/* Subtitle */}
                <p className="font-serif-editorial italic text-lg sm:text-xl text-[#3D4A41] mb-5">
                  {featuredProject.subtitle}
                </p>

                {/* Summary */}
                <p className="text-sm text-[#4E5D52] leading-relaxed mb-6 font-normal">
                  {featuredProject.summary}
                </p>

                {/* Verified Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.technologies.slice(0, 7).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD5C5] text-xs font-sans text-[#222823] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {featuredProject.technologies.length > 7 && (
                    <span className="px-2.5 py-1 rounded-full bg-[#E8E2D5] text-xs text-[#5F7063]">
                      +{featuredProject.technologies.length - 7} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#DDD5C5]">
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#222823] text-[#F8F6F0] text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#3D4A41] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#C2A277]" />
                  </a>
                )}

                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#DDD5C5] text-[#222823] text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#FAF8F5] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
                  >
                    <Github className="w-4 h-4 text-[#C2A277]" />
                    <span>GITHUB</span>
                  </a>
                )}

                <button
                  onClick={() => onSelectProject(featuredProject)}
                  className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase text-[#3D4A41] hover:text-[#222823] font-semibold underline underline-offset-4 ml-auto"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C2A277]" />
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Pipeline & Telemetry Showcase */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#DDD5C5] bg-[#FAF8F5] shadow-inner overflow-hidden">
                
                {/* Visualizer Top Bar with Interactive Tabs */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#EFE9DF] border-b border-[#DDD5C5]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-mono font-medium text-[#4E5D52] ml-2 hidden sm:inline">
                      flexi-ca2 // agentic-intelligence
                    </span>
                  </div>

                  {/* Interactive Visual Tabs */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeTab === 'pipeline'
                          ? 'bg-[#222823] text-[#F8F6F0]'
                          : 'text-[#5F7063] hover:text-[#222823]'
                      }`}
                    >
                      Pipeline Flow
                    </button>
                    <button
                      onClick={() => setActiveTab('json')}
                      className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeTab === 'json'
                          ? 'bg-[#222823] text-[#F8F6F0]'
                          : 'text-[#5F7063] hover:text-[#222823]'
                      }`}
                    >
                      Groq JSON Mode
                    </button>
                    <button
                      onClick={() => setActiveTab('dedup')}
                      className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeTab === 'dedup'
                          ? 'bg-[#222823] text-[#F8F6F0]'
                          : 'text-[#5F7063] hover:text-[#222823]'
                      }`}
                    >
                      3-Layer Deduplication
                    </button>
                  </div>
                </div>

                {/* Tab Content Display */}
                <div className="p-6">
                  {/* TAB 1: 12-Step Agentic Pipeline Overview */}
                  {activeTab === 'pipeline' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5] text-xs">
                        <span className="font-mono text-[#5F7063]">
                          ORCHESTRATION: 12-STEP DETERMINISTIC
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px]">
                          STATUS: HEALTHY
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5]">
                          <span className="font-mono text-[#C2A277] font-semibold">01-03 INGESTION</span>
                          <p className="text-[#3D4A41] font-medium mt-1">Multi-Vector Search & Tavily</p>
                          <p className="text-[11px] text-[#5F7063] mt-0.5">Formulates Boolean queries and retrieves recent 7-day articles.</p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5]">
                          <span className="font-mono text-[#C2A277] font-semibold">04-07 DEDUPLICATION</span>
                          <p className="text-[#3D4A41] font-medium mt-1">3-Tier Explainable Engine</p>
                          <p className="text-[11px] text-[#5F7063] mt-0.5">URL canonicalization, title hashing, and token Jaccard similarity.</p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5]">
                          <span className="font-mono text-[#C2A277] font-semibold">08-09 GROQ AI LPU</span>
                          <p className="text-[#3D4A41] font-medium mt-1">JSON Mode Schema Validation</p>
                          <p className="text-[11px] text-[#5F7063] mt-0.5">Extracts structured summaries, 3 takeaways, entities, and importance.</p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5]">
                          <span className="font-mono text-[#C2A277] font-semibold">10-12 VELOCITY & AUDIT</span>
                          <p className="text-[#3D4A41] font-medium mt-1">7-Day Trends & Alerts</p>
                          <p className="text-[11px] text-[#5F7063] mt-0.5">Calculates growth rate and writes millisecond execution telemetry.</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#222823] text-[#F8F6F0] flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-[#C2A277]" />
                          <span>Telemetry: 12/12 steps verified & stored in Neon Postgres</span>
                        </div>
                        <span className="text-[#DECBB0]">Vercel Edge</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Groq AI JSON Mode Output Viewer */}
                  {activeTab === 'json' && (
                    <div className="animate-fadeIn">
                      <div className="text-[11px] font-mono text-[#5F7063] mb-2 flex items-center justify-between">
                        <span>POST /api/groq/v1/chat/completions (response_format: json_object)</span>
                        <span className="text-emerald-700">Schema Validated ✓</span>
                      </div>
                      <pre className="p-4 rounded-lg bg-[#222823] text-[#DECBB0] text-[11px] font-mono overflow-x-auto leading-relaxed border border-[#3D4A41]">
{`{
  "topic": "Autonomous Agentic AI Systems",
  "article_title": "Multi-Step Deterministic Workflows in Production",
  "summary": "Agentic architecture replacing naive wrappers with verifiable 12-step execution pipelines.",
  "key_takeaways": [
    "3-tier deduplication prevents duplicate processing across publisher syndicates.",
    "Groq LPU ensures ultra-low-latency structured schema extraction.",
    "7-day comparative growth rates highlight emerging technical trends."
  ],
  "entities": ["Groq", "Tavily", "Neon Postgres", "SQLAlchemy"],
  "category": "Artificial Intelligence",
  "priority": "HIGH",
  "alert_triggered": true,
  "confidence_score": "Verified"
}`}
                      </pre>
                    </div>
                  )}

                  {/* TAB 3: 3-Layer Deduplication Engine */}
                  {activeTab === 'dedup' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="text-xs font-serif text-[#222823] font-medium">
                        Explainable 3-Tier Deduplication Hierarchy (`services/deduplicator.py`)
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-lg bg-[#F5F2EB] border-l-4 border-[#C2A277] border border-[#DDD5C5]">
                          <span className="font-mono text-[#C2A277] font-bold">LAYER 1 — CANONICAL URL</span>
                          <p className="text-[11px] text-[#4E5D52] mt-0.5">
                            Strips UTM tracking query strings, hashes root domains, and eliminates identical direct links.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-[#F5F2EB] border-l-4 border-[#5F7063] border border-[#DDD5C5]">
                          <span className="font-mono text-[#5F7063] font-bold">LAYER 2 — NORMALIZED TITLE HASH</span>
                          <p className="text-[11px] text-[#4E5D52] mt-0.5">
                            Removes stop-words and punctuation; flags exact title reprints across syndicate networks.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-[#F5F2EB] border-l-4 border-[#222823] border border-[#DDD5C5]">
                          <span className="font-mono text-[#222823] font-bold">LAYER 3 — TOKEN JACCARD SIMILARITY</span>
                          <p className="text-[11px] text-[#4E5D52] mt-0.5">
                            Calculates token intersection over union (60% title / 40% snippet) to discard reworded wire stories.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* OTHER PROJECTS: ASYMMETRIC EDITORIAL GRID                      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Project 02: Heat Wave Prediction System */}
          <div className="group rounded-2xl border border-[#DDD5C5] bg-[#F5F2EB] p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C2A277]/70">
            <div>
              {/* Card Header matching reference style */}
              <div className="flex items-center justify-between pb-4 border-b border-[#DDD5C5] mb-5">
                <span className="font-mono text-xs text-[#C2A277] font-semibold">
                  PROJECT 02
                </span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#5F7063]">
                  AI / ML PREDICTION
                </span>
              </div>

              {/* Visual Preview: Scientific Temperature Telemetry */}
              <div className="rounded-xl border border-[#DDD5C5] bg-[#FAF8F5] p-4 mb-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5F7063] mb-3">
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <Thermometer className="w-3.5 h-3.5" /> Thermal Telemetry
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    Environmental Model
                  </span>
                </div>

                {/* Forecast Curve Graphic */}
                <div className="h-28 w-full flex items-end justify-between gap-1.5 pt-4 px-2 border-b border-[#E8E2D5]">
                  {[32, 35, 38, 42, 45, 43, 39, 36, 33].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-t transition-all ${
                          val >= 42 ? 'bg-amber-600' : 'bg-[#5F7063]'
                        }`}
                        style={{ height: `${(val - 25) * 4}px` }}
                      />
                      <span className="text-[9px] font-mono text-[#738477]">
                        {val}°
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5F7063] mt-2">
                  <span>Baseline Normal</span>
                  <span className="text-amber-700 font-semibold">Anomaly Threshold</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif-display text-2xl font-medium text-[#222823] mb-2 leading-snug group-hover:text-[#3D4A41] transition-colors">
                HEAT WAVE PREDICTION SYSTEM
              </h3>

              <p className="text-xs text-[#4E5D52] leading-relaxed mb-6">
                An AI/ML system focused on predicting heat-wave conditions from environmental and historical data.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {otherProjects[0]?.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD5C5] text-[11px] font-sans text-[#222823]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Action */}
            <div className="pt-4 border-t border-[#DDD5C5] flex items-center justify-between">
              <button
                onClick={() => onSelectProject(otherProjects[0])}
                className="inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase font-semibold text-[#222823] group-hover:text-[#C2A277] transition-colors"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="w-8 h-8 rounded-full border border-[#DDD5C5] flex items-center justify-center text-[#222823] group-hover:bg-[#222823] group-hover:text-[#F8F6F0] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Project 03: Fruit Ripeness Detection */}
          <div className="group rounded-2xl border border-[#DDD5C5] bg-[#F5F2EB] p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C2A277]/70">
            <div>
              {/* Card Header matching reference style */}
              <div className="flex items-center justify-between pb-4 border-b border-[#DDD5C5] mb-5">
                <span className="font-mono text-xs text-[#C2A277] font-semibold">
                  PROJECT 03
                </span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#5F7063]">
                  COMPUTER VISION & ML
                </span>
              </div>

              {/* Visual Preview: Optical Bounding & Classification Interface */}
              <div className="rounded-xl border border-[#DDD5C5] bg-[#FAF8F5] p-4 mb-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5F7063] mb-3">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <Apple className="w-3.5 h-3.5" /> Optical Feature Scan
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                    Vision Classifier
                  </span>
                </div>

                {/* Computer Vision Scanning Box */}
                <div className="relative h-28 w-full rounded-lg bg-[#222823] border border-[#3D4A41] flex items-center justify-center overflow-hidden p-2">
                  <div className="absolute inset-0 bg-[radial-gradient(#3D4A41_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                  
                  {/* Bounding Box Visual */}
                  <div className="relative w-28 h-20 border-2 border-dashed border-[#C2A277] rounded flex flex-col justify-between p-1.5">
                    <span className="text-[8px] font-mono bg-[#C2A277] text-[#222823] px-1 py-0.2 rounded w-fit font-bold">
                      MATURITY: RIPE
                    </span>
                    <div className="flex justify-between items-center text-[8px] font-mono text-[#DECBB0]">
                      <span>CHL: 0.18</span>
                      <span>CAR: 0.82</span>
                    </div>
                  </div>

                  {/* Laser scan line effect */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5F7063] mt-2">
                  <span>Surface Spectrum</span>
                  <span className="text-emerald-700 font-semibold">Feature Analysis</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif-display text-2xl font-medium text-[#222823] mb-2 leading-snug group-hover:text-[#3D4A41] transition-colors">
                FRUIT RIPENESS DETECTION
              </h3>

              <p className="text-xs text-[#4E5D52] leading-relaxed mb-6">
                An image-based machine learning system designed to identify fruit ripeness from visual characteristics.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {otherProjects[1]?.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD5C5] text-[11px] font-sans text-[#222823]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Action */}
            <div className="pt-4 border-t border-[#DDD5C5] flex items-center justify-between">
              <button
                onClick={() => onSelectProject(otherProjects[1])}
                className="inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase font-semibold text-[#222823] group-hover:text-[#C2A277] transition-colors"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="w-8 h-8 rounded-full border border-[#DDD5C5] flex items-center justify-center text-[#222823] group-hover:bg-[#222823] group-hover:text-[#F8F6F0] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Project 04: Career IQ Prediction System */}
          <div className="group rounded-2xl border border-[#DDD5C5] bg-[#F5F2EB] p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C2A277]/70">
            <div>
              {/* Card Header matching reference style */}
              <div className="flex items-center justify-between pb-4 border-b border-[#DDD5C5] mb-5">
                <span className="font-mono text-xs text-[#C2A277] font-semibold">
                  PROJECT 04
                </span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#5F7063]">
                  PREDICTIVE RECOMMENDATION
                </span>
              </div>

              {/* Visual Preview: Competency Radar & Trajectory Projection */}
              <div className="rounded-xl border border-[#DDD5C5] bg-[#FAF8F5] p-4 mb-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5F7063] mb-3">
                  <span className="flex items-center gap-1.5 text-indigo-800">
                    <Compass className="w-3.5 h-3.5" /> Trajectory Mapping
                  </span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded">
                    Affinity Engine
                  </span>
                </div>

                {/* Radar/Skill Vector Representation */}
                <div className="h-28 w-full rounded-lg bg-[#FAF8F5] border border-[#DDD5C5] flex items-center justify-center p-2 relative">
                  <div className="w-20 h-20 rounded-full border border-[#DDD5C5] flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-[#C2A277] flex items-center justify-center bg-[#C2A277]/10">
                      <span className="text-[8px] font-mono font-bold text-[#222823]">
                        CAREER IQ
                      </span>
                    </div>
                  </div>
                  {/* Surrounding affinity vectors */}
                  <span className="absolute top-2 text-[9px] font-mono text-[#5F7063]">Data Science</span>
                  <span className="absolute bottom-2 text-[9px] font-mono text-[#5F7063]">AI Engineering</span>
                  <span className="absolute left-2 text-[9px] font-mono text-[#5F7063]">Systems</span>
                  <span className="absolute right-2 text-[9px] font-mono text-[#5F7063]">Backend</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5F7063] mt-2">
                  <span>Input Profiles</span>
                  <span className="text-indigo-800 font-semibold">Affinity Score</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif-display text-2xl font-medium text-[#222823] mb-2 leading-snug group-hover:text-[#3D4A41] transition-colors">
                CAREER IQ PREDICTION SYSTEM
              </h3>

              <p className="text-xs text-[#4E5D52] leading-relaxed mb-6">
                An intelligent prediction system designed to analyze relevant inputs and provide career-oriented predictions or recommendations.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {otherProjects[2]?.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD5C5] text-[11px] font-sans text-[#222823]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Action */}
            <div className="pt-4 border-t border-[#DDD5C5] flex items-center justify-between">
              <button
                onClick={() => onSelectProject(otherProjects[2])}
                className="inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase font-semibold text-[#222823] group-hover:text-[#C2A277] transition-colors"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="w-8 h-8 rounded-full border border-[#DDD5C5] flex items-center justify-center text-[#222823] group-hover:bg-[#222823] group-hover:text-[#F8F6F0] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
