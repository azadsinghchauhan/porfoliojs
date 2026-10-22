import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Cpu, Network, ShieldCheck, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Node definitions representing the autonomous agentic pipeline
    interface Node {
      id: string;
      label: string;
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      connections: number[];
    }

    const nodeLabels = [
      'Orchestrator',
      'Tavily Search',
      'Normalize',
      '3-Tier Deduplication',
      'Groq LPU (JSON)',
      'Schema Validator',
      'SQLAlchemy DB',
      'Trend Analytics',
      'Instant Alerts',
    ];

    const nodes: Node[] = nodeLabels.map((label, index) => {
      const angle = (index / (nodeLabels.length - 1)) * Math.PI * 2;
      const isCenter = index === 0;
      const distance = isCenter ? 0 : Math.min(width, height) * 0.32;
      const x = width / 2 + (isCenter ? 0 : Math.cos(angle) * distance);
      const y = height / 2 + 10 + (isCenter ? 0 : Math.sin(angle) * distance);

      return {
        id: `node-${index}`,
        label,
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: isCenter ? 8 : 4.5,
        color: isCenter ? '#C2A277' : '#3D4A41',
        connections: isCenter
          ? [1, 2, 3, 4, 5, 6, 7, 8]
          : [(index + 1) % nodeLabels.length === 0 ? 1 : index + 1, 0],
      };
    });

    // Particle flow along edges
    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }

    const packets: Packet[] = Array.from({ length: 8 }, () => ({
      fromIndex: Math.floor(Math.random() * nodes.length),
      toIndex: Math.floor(Math.random() * nodes.length),
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.006,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background coordinate grid
      ctx.strokeStyle = 'rgba(221, 213, 197, 0.45)';
      ctx.lineWidth = 0.6;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw subtle concentric intelligence rings from center
      const centerX = width / 2;
      const centerY = height / 2 + 10;
      ctx.strokeStyle = 'rgba(194, 162, 119, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80 + Math.sin(time) * 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 + Math.cos(time * 0.8) * 6, 0, Math.PI * 2);
      ctx.stroke();

      // Update and draw connections
      nodes.forEach((node, i) => {
        // Floating motion
        node.x = node.baseX + Math.sin(time + i) * 6;
        node.y = node.baseY + Math.cos(time + i * 1.2) * 6;

        if (isMouseOver) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            node.x -= (dx / dist) * (100 - dist) * 0.1;
            node.y -= (dy / dist) * (100 - dist) * 0.1;
          }
        }

        // Draw edges
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex];
          if (!target) return;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(61, 74, 65, 0.18)';
          ctx.lineWidth = 1;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Update and draw packets
      packets.forEach((packet) => {
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.fromIndex = Math.floor(Math.random() * nodes.length);
          const available = nodes[packet.fromIndex].connections;
          packet.toIndex = available[Math.floor(Math.random() * available.length)];
        }

        const from = nodes[packet.fromIndex];
        const to = nodes[packet.toIndex];
        if (from && to) {
          const px = from.x + (to.x - from.x) * packet.progress;
          const py = from.y + (to.y - from.y) * packet.progress;

          ctx.beginPath();
          ctx.fillStyle = '#C2A277';
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = 'rgba(194, 162, 119, 0.3)';
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw nodes and labels
      nodes.forEach((node, i) => {
        // Outer halo
        ctx.beginPath();
        ctx.fillStyle = i === 0 ? 'rgba(194, 162, 119, 0.2)' : 'rgba(78, 93, 82, 0.12)';
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#222823';
        ctx.font = '500 10px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Identity */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Handwritten Greeting Accent matching reference "Hello, I'm" */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-script-accent text-3xl md:text-4xl text-[#C2A277]">
                Hello, I'm
              </span>
            </div>

            {/* Huge Name Title inspired by editorial reference layout */}
            <div className="mb-4">
              <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.92] tracking-tight font-normal text-[#222823]">
                <span className="block font-medium">AZAD</span>
                <span className="block tracking-tight text-[#303B33]">CHAUHAN</span>
              </h1>
            </div>

            {/* Sub-Brand Title in Tracked Uppercase */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#C2A277]" />
              <p className="text-xs sm:text-sm font-sans tracking-[0.26em] uppercase text-[#4E5D52] font-semibold">
                {PERSONAL_INFO.role}
              </p>
            </div>

            {/* Strong Headline Requirement */}
            <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl leading-tight font-medium text-[#222823] mb-5 max-w-2xl">
              {PERSONAL_INFO.headline}
            </h2>

            {/* Concise Supporting Copy */}
            <p className="text-sm sm:text-base text-[#4A554D] leading-relaxed max-w-xl font-normal mb-8">
              {PERSONAL_INFO.heroSubtext} Specializing in deterministic pipeline orchestration, 3-layer deduplication, and structured intelligence extraction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={onExploreWork}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#222823] text-[#F8F6F0] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-[#3D4A41] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4 text-[#C2A277] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-[#DDD5C5] text-[#222823] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:border-[#222823] hover:bg-[#F3EFE6] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-4 h-4 text-[#C2A277]" />
              </a>
            </div>

            {/* Verified Technical Badges */}
            <div className="mt-10 pt-6 border-t border-[#DDD5C5]/70 flex flex-wrap items-center gap-6 text-[11px] font-sans tracking-wider text-[#5F7063]">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-[#C2A277]" />
                <span>Agentic Workflows</span>
              </div>
              <span className="text-[#DDD5C5]">•</span>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C2A277]" />
                <span>Predictive ML</span>
              </div>
              <span className="text-[#DDD5C5]">•</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C2A277]" />
                <span>Deterministic Systems</span>
              </div>
            </div>

          </div>

          {/* Right Column: Original Technical Visual in Arched Portal matching reference image */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* The Arched Container Frame */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] arch-frame border border-[#DDD5C5] bg-[#F4EFE6] p-3 shadow-xl overflow-hidden group">
              
              {/* Inner arched canvas area */}
              <div className="relative w-full h-full arch-frame bg-[#FAF8F5] border border-[#E8E2D5] overflow-hidden flex flex-col justify-between">
                
                {/* Canvas Neural Graph */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-0"
                  aria-label="Interactive Agentic AI Neural Network Visualization"
                />

                {/* Top Corner Telemetry Badge */}
                <div className="relative z-10 p-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#4E5D52] bg-gradient-to-b from-[#FAF8F5]/90 to-transparent">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                    <span className="font-semibold text-[#222823]">AGENTIC PIPELINE</span>
                  </div>
                  <span className="bg-[#EFEAE0] px-2 py-0.5 rounded text-[9px] border border-[#DDD5C5]">
                    12 STAGES ACTIVE
                  </span>
                </div>

                {/* Bottom Architectural Overlay Card */}
                <div className="relative z-10 m-4 p-4 rounded-xl bg-[#F8F6F0]/95 backdrop-blur-md border border-[#DDD5C5] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C2A277] font-semibold">
                      Featured Architecture
                    </span>
                    <Activity className="w-3.5 h-3.5 text-[#5F7063]" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#222823] leading-snug">
                    Autonomous News Topic Monitor
                  </h4>
                  <p className="text-[11px] text-[#4E5D52] mt-1 leading-relaxed">
                    Tavily Search → 3-Tier Deduplication → Groq AI LPU (JSON Mode) → 7-Day Velocity
                  </p>
                </div>

              </div>

            </div>

            {/* Floating Circular Badge inspired by the reference design top-right */}
            <div className="absolute -top-4 -right-2 sm:-top-6 sm:right-2 w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#DDD5C5] bg-[#F8F6F0]/95 shadow-md flex flex-col items-center justify-center p-3 text-center pointer-events-none z-20">
              <span className="text-[#C2A277] text-base mb-0.5">✦</span>
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-wider text-[#222823] uppercase leading-tight">
                AI / ML<br />ENGINEERING<br />DISCIPLINE
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
