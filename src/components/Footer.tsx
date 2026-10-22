import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROCESS', href: '#process' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F8F6F0] border-t border-[#DDD5C5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Row matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DDD5C5] items-center">
          
          {/* Brand & Monogram */}
          <div className="md:col-span-5 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full border border-[#DDD5C5] bg-[#F5F2EB] flex items-center justify-center font-serif text-2xl font-medium text-[#222823] shadow-inner shrink-0">
              A
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wider font-semibold text-[#222823]">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] tracking-[0.22em] text-[#5F7063] uppercase font-sans mt-0.5">
                ENGINEERING INTELLIGENT SYSTEMS THAT LEAVE A LASTING IMPACT.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 flex flex-wrap items-center gap-6 text-xs font-sans font-medium tracking-[0.2em] text-[#3D4A41]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#222823] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C2A277]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Direct Verified Social / GitHub Link */}
          <div className="md:col-span-3 flex md:justify-end items-center gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDD5C5] text-xs font-sans tracking-wider uppercase text-[#222823] hover:bg-[#222823] hover:text-[#F8F6F0] transition-colors shadow-2xs"
            >
              <Github className="w-4 h-4 text-[#C2A277]" />
              <span>azadsinghchauhan</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#738477] gap-4">
          <div className="flex items-center gap-2">
            <span>© {currentYear} {PERSONAL_INFO.name}. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
            <span>AI / ML DEVELOPER & SOFTWARE BUILDER</span>
            <span className="text-[#DDD5C5]">•</span>
            <span className="text-[#C2A277]">PORTFOLIO 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
