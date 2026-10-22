import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EngineeringPillars } from './components/EngineeringPillars';
import { Projects } from './components/Projects';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Process } from './components/Process';
import { ContactCta } from './components/ContactCta';
import { ContactModal } from './components/ContactModal';
import { LiveViewsTelemetryModal } from './components/LiveViewsTelemetryModal';
import { Footer } from './components/Footer';
import { Project } from './data/portfolioData';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [telemetryModalOpen, setTelemetryModalOpen] = useState(false);

  // Initialize and persist realistic views counter
  const [viewsCount, setViewsCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('azad_portfolio_live_views');
      if (stored) {
        const next = parseInt(stored, 10) + 1;
        localStorage.setItem('azad_portfolio_live_views', next.toString());
        return next;
      }
    } catch {
      // Fallback if localStorage restricted
    }
    const initial = 1482;
    try {
      localStorage.setItem('azad_portfolio_live_views', initial.toString());
    } catch {}
    return initial;
  });

  // Subtle live view increment simulation over time
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance every 45s to increment live views
      if (Math.random() > 0.7) {
        setViewsCount((prev) => {
          const next = prev + 1;
          try {
            localStorage.setItem('azad_portfolio_live_views', next.toString());
          } catch {}
          return next;
        });
      }
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#222823] flex flex-col font-sans selection:bg-[#C2A277]/25 selection:text-[#1D241F]">
      {/* Top Sticky Navigation with Live Views Counter */}
      <Navbar
        onOpenContact={() => setContactModalOpen(true)}
        viewsCount={viewsCount}
        onOpenTelemetry={() => setTelemetryModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero onExploreWork={handleExploreWork} />

        {/* 4 Architectural Engineering Pillars (Reference Dark Forest Strip) */}
        <EngineeringPillars />

        {/* Selected Projects (Featured Flexi CA 2 + Asymmetric Grid) */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* About Me Section with Arch Window & Signature */}
        <About />

        {/* Technical Expertise & Circular Technology Badges */}
        <Skills />

        {/* 5-Stage Engineering Build Process */}
        <Process />

        {/* Editorial Philosophy Quote & Contact Call to Action */}
        <ContactCta onOpenContact={() => setContactModalOpen(true)} />
      </main>

      {/* Minimal Premium Footer */}
      <Footer />

      {/* Interactive Project Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Live Views & Visitor Telemetry Modal */}
      <LiveViewsTelemetryModal
        isOpen={telemetryModalOpen}
        onClose={() => setTelemetryModalOpen(false)}
        viewsCount={viewsCount}
      />
    </div>
  );
};

export default App;
