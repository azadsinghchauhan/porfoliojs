import React from 'react';
import { Mail, ArrowRight, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactCtaProps {
  onOpenContact: () => void;
}

export const ContactCta: React.FC<ContactCtaProps> = ({ onOpenContact }) => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Full-Width Dark Sage/Forest Editorial Card matching reference bottom card */}
        <div className="rounded-3xl bg-[#3D4A41] text-[#F8F6F0] p-8 sm:p-12 md:p-16 border border-[#2F3932] shadow-xl overflow-hidden relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C2A277]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Core Engineering Philosophy matching quote in reference */}
            <div className="lg:col-span-6 lg:border-r lg:border-[#526356] lg:pr-12">
              <span className="font-serif text-6xl md:text-7xl text-[#C2A277] leading-none block select-none">
                “
              </span>
              <blockquote className="font-serif-editorial text-xl sm:text-2xl md:text-3xl font-normal leading-snug text-[#FAF8F5] mb-6">
                {PERSONAL_INFO.philosophy}
              </blockquote>
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#C2A277]" />
                <span className="text-xs font-sans tracking-[0.22em] uppercase text-[#DECBB0] font-semibold">
                  {PERSONAL_INFO.name}
                </span>
              </div>
            </div>

            {/* Right Column: CTA Heading, Envelope Icon & Button */}
            <div className="lg:col-span-6 flex flex-col items-start lg:pl-4">
              
              {/* Circular Envelope Icon matching reference */}
              <div className="w-16 h-16 rounded-full border border-[#647769] bg-[#333E37] flex items-center justify-center mb-6 shadow-md">
                <Mail className="w-7 h-7 text-[#C2A277]" />
              </div>

              {/* Heading */}
              <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#FAF8F5] mb-4 leading-tight">
                LET'S BUILD SOMETHING INTELLIGENT.
              </h3>

              {/* Supporting Text */}
              <p className="text-sm text-[#D1DDD3] leading-relaxed mb-8 max-w-md">
                Have an AI/ML project in mind or looking to discuss agentic pipelines and software architectures? Let's connect and build systems that make a lasting impact.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAF8F5] text-[#222823] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-[#C2A277] hover:text-[#222823] transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#647769] text-[#FAF8F5] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-[#333E37] transition-all"
                >
                  <Github className="w-4 h-4 text-[#C2A277]" />
                  <span>GITHUB</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
