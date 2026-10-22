import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Terminal, Database, Wrench, Check } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const categoryIcons = [
    <Cpu className="w-4 h-4 text-[#C2A277]" />,
    <Terminal className="w-4 h-4 text-[#C2A277]" />,
    <Database className="w-4 h-4 text-[#C2A277]" />,
    <Wrench className="w-4 h-4 text-[#C2A277]" />,
  ];

  // Verified icon badges matching reference circular style
  const techBadges = [
    { name: 'Python', abbr: 'Py', group: 'Languages' },
    { name: 'Flask', abbr: 'Fl', group: 'Backend' },
    { name: 'Groq LPU', abbr: 'Gq', group: 'AI Engine' },
    { name: 'Tavily News', abbr: 'Tv', group: 'Search API' },
    { name: 'SQLAlchemy', abbr: 'Sa', group: 'ORM' },
    { name: 'PostgreSQL', abbr: 'Pg', group: 'Database' },
    { name: 'SQLite', abbr: 'Sq', group: 'Database' },
    { name: 'JavaScript', abbr: 'Js', group: 'Frontend' },
    { name: 'Computer Vision', abbr: 'Cv', group: 'ML' },
    { name: 'Git & GitHub', abbr: 'Gh', group: 'Version Control' },
    { name: 'Chart.js', abbr: 'Ch', group: 'Visualization' },
    { name: 'Vercel', abbr: 'Vc', group: 'Deployment' },
  ];

  return (
    <section id="skills" className="py-24 md:py-32 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#738477] font-semibold">
              TECHNICAL EXPERTISE
            </span>
            <span className="text-[#C2A277]">✦</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-medium text-[#222823] mb-4">
            Tools & Technologies
          </h2>
          <p className="text-sm text-[#4E5D52] leading-relaxed">
            Verified frameworks, libraries, and languages utilized across actual agentic workflows and production projects.
          </p>
        </div>

        {/* Circular Technology Badges Grid - Direct Reference Inspiration */}
        <div className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {techBadges.map((badge) => (
              <div
                key={badge.name}
                className="group flex flex-col items-center text-center p-4 rounded-2xl border border-[#DDD5C5] bg-[#FAF8F5] transition-all duration-300 hover:bg-[#F3EFE6] hover:border-[#C2A277]/80 hover:shadow-sm"
              >
                {/* Circular Badge inspired by the reference image */}
                <div className="w-14 h-14 rounded-full border border-[#DDD5C5] bg-[#EFE9DF] group-hover:bg-[#222823] flex items-center justify-center text-[#222823] group-hover:text-[#F8F6F0] transition-colors duration-300 mb-3 shadow-inner">
                  <span className="font-mono text-sm font-bold tracking-tight">
                    {badge.abbr}
                  </span>
                </div>

                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-[#222823] group-hover:text-[#3D4A41] transition-colors">
                  {badge.name}
                </span>

                <span className="text-[10px] font-sans text-[#738477] tracking-wider uppercase mt-1">
                  {badge.group}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Editorial Clusters */}
        <div className="rounded-2xl border border-[#DDD5C5] bg-[#F5F2EB] p-6 sm:p-8 md:p-12 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 pb-8 border-b border-[#DDD5C5]">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedCategoryIndex === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategoryIndex(idx)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277] ${
                    isSelected
                      ? 'bg-[#222823] text-[#F8F6F0] shadow-sm'
                      : 'bg-[#FAF8F5] border border-[#DDD5C5] text-[#3D4A41] hover:bg-[#EFE9DD]'
                  }`}
                >
                  {categoryIcons[idx]}
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Deep Dive */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs text-[#C2A277] font-semibold tracking-widest block mb-2">
                DISCIPLINE OVERVIEW
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#222823] mb-3">
                {SKILL_CATEGORIES[selectedCategoryIndex].title}
              </h3>
              <p className="text-sm text-[#4E5D52] leading-relaxed">
                {SKILL_CATEGORIES[selectedCategoryIndex].description}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2.5">
                {SKILL_CATEGORIES[selectedCategoryIndex].skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#DDD5C5] text-xs font-sans text-[#222823] font-medium shadow-2xs hover:border-[#C2A277] transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-[#5F7063]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
