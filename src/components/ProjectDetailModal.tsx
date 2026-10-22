import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#222823]/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#F8F6F0] border border-[#DDD5C5] rounded-2xl shadow-2xl overflow-y-auto flex flex-col focus:outline-none"
        tabIndex={-1}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#DDD5C5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#C2A277] tracking-widest font-semibold">
              PROJECT {project.number}
            </span>
            <span className="text-[#DDD5C5]">•</span>
            <span className="text-xs font-sans tracking-[0.18em] uppercase text-[#5F7063]">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFEAE0] text-[#222823] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h2 id="modal-title" className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#222823] mb-3">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg font-serif-editorial italic text-[#4E5D52]">
              {project.subtitle}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#222823] text-[#F8F6F0] text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#3D4A41] transition-all shadow-sm"
              >
                <span>OPEN LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C2A277]" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#DDD5C5] text-[#222823] text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#EFE9DD] transition-all"
              >
                <Github className="w-4 h-4 text-[#C2A277]" />
                <span>VIEW REPOSITORY</span>
              </a>
            )}
          </div>

          {/* Technologies Tag Cluster */}
          <div className="pt-2">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#738477] font-semibold block mb-3">
              Technologies & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full bg-[#EFE9DF] border border-[#DDD5C5] text-xs font-sans font-medium text-[#222823]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-xl bg-[#F3EFE6] border border-[#DDD5C5]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <h3 className="font-serif text-lg font-semibold text-[#222823]">
                  The Challenge
                </h3>
              </div>
              <p className="text-sm text-[#4E5D52] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F3EFE6] border border-[#DDD5C5]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h3 className="font-serif text-lg font-semibold text-[#222823]">
                  Engineered Solution
                </h3>
              </div>
              <p className="text-sm text-[#4E5D52] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Steps (if available e.g. Flexi CA 2) */}
          {project.architectureSteps && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-[#C2A277]" />
                <h3 className="font-serif text-xl font-semibold text-[#222823]">
                  12-Step Agentic Pipeline Workflow
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.architectureSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#C2A277]">
                        STAGE {step.step}
                      </span>
                      <h4 className="font-serif text-base font-medium text-[#222823] mt-1 mb-1.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#5F7063] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features List */}
          <div className="pt-4">
            <h3 className="font-serif text-xl font-semibold text-[#222823] mb-4">
              Key Features & Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#DDD5C5]/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5F7063] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#303B33] leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#F3EFE6] border-t border-[#DDD5C5] flex items-center justify-between">
          <span className="text-xs font-sans text-[#5F7063]">
            Azad Chauhan Portfolio — {project.title}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-[#DDD5C5] text-xs font-sans tracking-wider uppercase text-[#222823] hover:bg-[#FAF8F5] transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
