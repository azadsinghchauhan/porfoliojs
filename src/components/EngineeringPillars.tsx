import React from 'react';
import { ENGINEERING_PILLARS } from '../data/portfolioData';
import { Bot, LineChart, ScanEye, Layers } from 'lucide-react';

export const EngineeringPillars: React.FC = () => {
  const icons = [
    <Bot className="w-5 h-5 text-[#C2A277]" />,
    <LineChart className="w-5 h-5 text-[#C2A277]" />,
    <ScanEye className="w-5 h-5 text-[#C2A277]" />,
    <Layers className="w-5 h-5 text-[#C2A277]" />,
  ];

  return (
    <section className="bg-[#3D4A41] text-[#F8F6F0] py-8 border-y border-[#2F3932]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#536257]">
          {ENGINEERING_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`flex items-start gap-4 ${
                idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'
              }`}
            >
              <div className="mt-1 p-2 rounded-full bg-[#323D35] border border-[#536257] shrink-0">
                {icons[idx]}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg tracking-wide font-medium text-[#FAF8F5]">
                    {pillar.title}
                  </span>
                  <span className="text-[#C2A277] text-xs">✦</span>
                </div>
                <span className="text-xs font-sans text-[#DECBB0] tracking-wider uppercase font-semibold mt-0.5">
                  {pillar.subtitle}
                </span>
                <p className="text-[12px] text-[#D1DDD3] leading-relaxed mt-1 font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
