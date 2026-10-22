import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
  viewsCount: number;
  onOpenTelemetry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  viewsCount,
  onOpenTelemetry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['work', 'about', 'skills', 'process', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work', id: 'work' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'PROCESS', href: '#process', id: 'process' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F6F0]/90 backdrop-blur-md py-3 border-b border-[#DDD5C5]/70 shadow-sm'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
          aria-label="Azad Chauhan — Home"
        >
          <span className="w-10 h-10 rounded-full border border-[#DDD5C5] bg-[#F3EFE6] flex items-center justify-center font-serif text-2xl font-medium text-[#222823] group-hover:border-[#C2A277] group-hover:bg-[#222823] group-hover:text-[#F8F6F0] transition-colors duration-300">
            A
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wider font-semibold text-[#222823] group-hover:text-[#4E5D52] transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] tracking-[0.22em] text-[#5F7063] uppercase font-sans">
              AI / ML Developer
            </span>
          </div>
        </a>

        {/* Center Nav Links - Desktop */}
        <nav
          className="hidden md:flex items-center gap-8 text-xs font-sans font-medium tracking-[0.2em] text-[#3D4A41]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 transition-colors duration-200 hover:text-[#222823] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277] ${
                  isActive ? 'text-[#222823] font-semibold' : 'text-[#5F7063]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C2A277] rounded-full animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action / Telemetry & Contact - Desktop */}
        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          
          {/* Live Views Counter Pill Button with Pulse Indicator */}
          <button
            onClick={onOpenTelemetry}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DDD5C5] bg-[#F5F2EB] hover:bg-[#FAF8F5] hover:border-[#C2A277] transition-all text-xs font-mono text-[#222823] shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
            title="Click to view live visitor telemetry & network analytics"
            aria-label="Live views and visitor telemetry"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-[10px] font-sans font-bold tracking-wider text-[#4E5D52] uppercase">
              LIVE
            </span>
            <span className="font-mono text-xs font-bold text-[#222823]">
              {viewsCount.toLocaleString()}
            </span>
            <Activity className="w-3.5 h-3.5 text-[#C2A277] group-hover:rotate-12 transition-transform duration-300" />
          </button>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase text-[#3D4A41] hover:text-[#222823] transition-colors py-2 px-3 rounded-full hover:bg-[#F0EBE0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
            title="Azad Chauhan GitHub"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C2A277]" />
          </a>

          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#222823] text-[#F8F6F0] text-xs font-sans tracking-[0.16em] uppercase hover:bg-[#3D4A41] transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
          >
            <span>Let's Connect</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C2A277] group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile View Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Live Views Button */}
          <button
            onClick={onOpenTelemetry}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#DDD5C5] bg-[#F5F2EB] text-[11px] font-mono text-[#222823]"
            aria-label="Live views counter"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-bold">{viewsCount.toLocaleString()}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#222823] hover:bg-[#EFE9DD] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F8F6F0] border-b border-[#DDD5C5] px-6 py-6 shadow-xl animate-fadeIn">
          
          {/* Telemetry quick status banner in mobile menu */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTelemetry();
            }}
            className="w-full mb-4 p-3 rounded-xl border border-[#DDD5C5] bg-[#F3EFE6] flex items-center justify-between text-xs font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-sans font-semibold text-[#222823]">Live Views Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#C2A277]">
              <span className="font-bold">{viewsCount.toLocaleString()}</span>
              <Activity className="w-3.5 h-3.5" />
            </div>
          </button>

          <nav className="flex flex-col gap-4 text-sm font-sans tracking-[0.2em] text-[#3D4A41]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 border-b border-[#EBE4D5] hover:text-[#222823] flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-[#C2A277]">✦</span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full border border-[#DDD5C5] text-xs tracking-widest uppercase text-[#222823] hover:bg-[#EFE9DD]"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4 text-[#C2A277]" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#222823] text-[#F8F6F0] text-xs tracking-widest uppercase hover:bg-[#3D4A41]"
              >
                <span>Let's Connect</span>
                <Sparkles className="w-4 h-4 text-[#C2A277]" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
