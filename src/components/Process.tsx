import React from 'react';
import { PROCESS_STAGES } from '../data/portfolioData';
import { Search, Compass, Cpu, CheckSquare, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const stageIcons = [
    <Search className="w-5 h-5 text-[#222823]" />,
    <Compass className="w-5 h-5 text-[#222823]" />,
    <Cpu className="w-5 h-5 text-[#222823]" />,
    <CheckSquare className="w-5 h-5 text-[#222823]" />,
    <Rocket className="w-5 h-5 text-[#222823]" />,
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-[#F5F2EB] border-t border-[#DDD5C5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header matching reference image: "MY DESIGN PROCESS" -> "MY BUILD PROCESS ✦" */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#738477] font-semibold block mb-2">
            METHODOLOGY
          </span>
          <div className="flex items-center justify-center gap-3">
            <h2 className="font-serif-display text-4xl sm:text-5xl font-medium text-[#222823]">
              MY BUILD PROCESS
            </h2>
            <span className="text-[#C2A277] text-2xl">✦</span>
          </div>
          <p className="text-sm text-[#4E5D52] leading-relaxed mt-4">
            A deterministic engineering lifecycle transforming complex problem domains into resilient, evaluated AI systems.
          </p>
        </div>

        {/* 5-Column Process Flow directly inspired by reference image */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x lg:divide-[#DDD5C5] rounded-2xl border border-[#DDD5C5] bg-[#FAF8F5] p-6 lg:p-8 shadow-sm">
          {PROCESS_STAGES.map((stage, idx) => (
            <div
              key={stage.number}
              className={`flex flex-col items-center text-center ${
                idx === 0 ? 'lg:pr-6' : idx === 4 ? 'lg:pl-6' : 'lg:px-6'
              } py-4`}
            >
              {/* Number Label matching reference */}
              <span className="font-mono text-xs font-semibold text-[#C2A277] tracking-widest mb-4">
                {stage.number}
              </span>

              {/* Circular Icon Badge matching reference */}
              <div className="w-14 h-14 rounded-full border border-[#DDD5C5] bg-[#F5F2EB] flex items-center justify-center mb-5 shadow-xs transition-transform duration-300 hover:scale-105">
                {stageIcons[idx]}
              </div>

              {/* Stage Name */}
              <h3 className="font-serif text-lg font-semibold text-[#222823] tracking-wide mb-2 uppercase">
                {stage.name}
              </h3>

              {/* Stage Description */}
              <p className="text-xs text-[#4E5D52] leading-relaxed mb-4">
                {stage.description}
              </p>

              {/* Tangible Deliverables in Monospace/Tag */}
              <div className="mt-auto pt-3 border-t border-[#E8E2D5] w-full text-[10px] font-mono text-[#5F7063]">
                <span className="font-bold text-[#C2A277]">OUTCOME:</span> {stage.deliverables}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
