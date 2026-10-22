import React, { useState, useEffect, useCallback } from 'react';
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
import { syncGlobalViews } from './utils/telemetryTracker';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [telemetryModalOpen, setTelemetryModalOpen] = useState(false);

  // Global verified views count synced across phone, desktop and all visitors
  const [viewsCount, setViewsCount] = useState<number>(() => {
    try {
      const cached = localStorage.getItem('azad_global_views_cached');
      if (cached) return parseInt(cached, 10);
    } catch {}
    return 1;
  });

  const refreshGlobalViews = useCallback(async (isInitialVisit = false) => {
    const updated = await syncGlobalViews(isInitialVisit);
    if (updated > 0) {
      setViewsCount(updated);
    }
  }, []);

  // 1. Initial hit on page load
  useEffect(() => {
    refreshGlobalViews(true);
  }, [refreshGlobalViews]);

  // 2. Real-time background sync every 15s + on window focus (e.g. visiting from phone updates desktop)
  useEffect(() => {
    const handleFocus = () => refreshGlobalViews(false);
    window.addEventListener('focus', handleFocus);

    const interval = setInterval(() => {
      refreshGlobalViews(false);
    }, 15000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [refreshGlobalViews]);

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
        onOpenTelemetry={() => {
          refreshGlobalViews(false);
          setTelemetryModalOpen(true);
        }}
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
