import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#F5F2EB] border-t border-[#DDD5C5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Arched Architectural Frame matching reference */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[380px] aspect-[4/5] arch-frame border border-[#DDD5C5] bg-[#EFE9DF] p-3 shadow-lg group">
              <div className="relative w-full h-full arch-frame bg-[#FAF8F5] border border-[#E0D9CB] p-6 flex flex-col justify-between overflow-hidden">
                
                {/* Background delicate grid */}
                <div className="absolute inset-0 bg-subtle-noise opacity-60 pointer-events-none" />

                {/* Minimalist Data Structure Graphic in Arch Window */}
                <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-auto">
                  <div className="w-24 h-24 rounded-full border border-[#DDD5C5] flex items-center justify-center mb-6 relative">
                    <div className="w-16 h-16 rounded-full border border-[#C2A277] flex items-center justify-center bg-[#C2A277]/10 animate-pulse">
                      <Cpu className="w-8 h-8 text-[#222823]" />
                    </div>
                    {/* Orbiting technical dots */}
                    <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-[#C2A277]" />
                    <span className="absolute -bottom-1 w-2.5 h-2.5 rounded-full bg-[#3D4A41]" />
                    <span className="absolute -left-1 w-2.5 h-2.5 rounded-full bg-[#5F7063]" />
                  </div>

                  <span className="font-serif text-lg font-medium text-[#222823] tracking-wide text-center">
                    Engineering Discipline
                  </span>
                  <span className="text-xs font-sans text-[#5F7063] uppercase tracking-widest mt-1">
                    Determinism • Schema • Resilience
                  </span>
                </div>

                {/* Bottom Technical Seal */}
                <div className="relative z-10 pt-4 border-t border-[#E8E2D5] flex items-center justify-between text-[11px] font-mono text-[#5F7063]">
                  <span>AI/ML ARCHITECTURE</span>
                  <span className="text-[#C2A277]">✦ 2026</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Signature matching reference */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            {/* Section Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#738477] font-semibold">
                ABOUT ME
              </span>
              <span className="text-[#C2A277]">✦</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#222823] mb-6 leading-tight">
              Engineering intelligence with pragmatic software craftsmanship.
            </h2>

            {/* Structured Editorial Copy strictly adhering to NO FAKE INFO */}
            <div className="space-y-4 text-sm sm:text-base text-[#4E5D52] leading-relaxed mb-8">
              <p>
                I am an AI/ML developer and software builder dedicated to turning autonomous agentic logic, machine learning models, and complex datasets into practical, reliable software.
              </p>
              <p>
                Rather than treating AI as an opaque black box or a superficial summary button, my engineering approach emphasizes structured validation, multi-step pipeline transparency, explainable deduplication algorithms, and end-to-end telemetry.
              </p>
              <p>
                From building 12-step autonomous news intelligence pipelines like <span className="font-medium text-[#222823]">FLEXI CA 2</span> to forecasting environmental heat-wave conditions and analyzing visual characteristics through computer vision, I focus on solving real-world challenges through clean engineering.
              </p>
            </div>

            {/* 3 Core Engineering Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 pt-4 border-t border-[#DDD5C5]">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5]">
                <span className="text-xs font-mono font-bold text-[#C2A277] block mb-1">01 / AGENTIC</span>
                <span className="font-serif text-base font-medium text-[#222823] block mb-1">Autonomous</span>
                <p className="text-[11px] text-[#5F7063] leading-relaxed">
                  Self-orchestrating pipelines with schema verification & tool integration.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5]">
                <span className="text-xs font-mono font-bold text-[#C2A277] block mb-1">02 / PREDICTIVE</span>
                <span className="font-serif text-base font-medium text-[#222823] block mb-1">Data-Driven</span>
                <p className="text-[11px] text-[#5F7063] leading-relaxed">
                  Extracting meaningful patterns from environmental & domain signals.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5]">
                <span className="text-xs font-mono font-bold text-[#C2A277] block mb-1">03 / RESILIENT</span>
                <span className="font-serif text-base font-medium text-[#222823] block mb-1">Deterministic</span>
                <p className="text-[11px] text-[#5F7063] leading-relaxed">
                  Audited execution with millisecond benchmarks and fault isolation.
                </p>
              </div>
            </div>

            {/* Editorial Signature inspired by the reference image */}
            <div className="flex items-center justify-between pt-4 border-t border-[#DDD5C5]">
              <div>
                <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#738477] font-semibold block mb-1">
                  Developer & Builder
                </span>
                <span className="font-script-accent text-3xl sm:text-4xl text-[#3D4A41] block">
                  Azad Chauhan
                </span>
              </div>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans tracking-wider uppercase text-[#3D4A41] hover:text-[#222823] font-semibold underline underline-offset-4"
              >
                Inspect GitHub Work ↗
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
