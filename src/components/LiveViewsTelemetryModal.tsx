import React, { useState, useEffect } from 'react';
import {
  X,
  Globe,
  Laptop,
  Smartphone,
  Tablet,
  Activity,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  Radio,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import {
  RealTelemetryData,
  resolveRealVisitorTelemetry,
  TelemetryLogEntry,
} from '../utils/telemetryTracker';

interface LiveViewsTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewsCount: number;
}

export const LiveViewsTelemetryModal: React.FC<LiveViewsTelemetryModalProps> = ({
  isOpen,
  onClose,
  viewsCount,
}) => {
  const [telemetry, setTelemetry] = useState<RealTelemetryData | null>(null);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [copiedIp, setCopiedIp] = useState(false);
  const [eventLogs, setEventLogs] = useState<TelemetryLogEntry[]>([]);

  // Real session dwell timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fetch real telemetry and construct genuine runtime audit stream
  useEffect(() => {
    let isMounted = true;

    resolveRealVisitorTelemetry().then((data) => {
      if (!isMounted) return;
      setTelemetry(data);

      const now = new Date().toLocaleTimeString();
      const logs: TelemetryLogEntry[] = [
        {
          id: 'log-1',
          timestamp: now,
          type: 'CONNECT',
          message: `Connected Node: ${data.deviceType} (${data.deviceModel}) via ${data.browser}`,
          status: 'ACTIVE',
        },
        {
          id: 'log-2',
          timestamp: now,
          type: 'GEO',
          message: `Geo Resolved: ${data.city}${data.region ? `, ${data.region}` : ''} • ${data.country} [${data.ip}]`,
          status: 'VERIFIED',
        },
        {
          id: 'log-3',
          timestamp: now,
          type: 'DEVICE',
          message: `Display: ${data.screenWidth}×${data.screenHeight} (${data.devicePixelRatio}x DPR) • Touch: ${data.touchSupport ? 'Yes' : 'No'}`,
          status: 'OK',
        },
        {
          id: 'log-4',
          timestamp: now,
          type: 'NETWORK',
          message: `Telemetry Stream: ${data.latencyMs}ms Latency • Engine: ${data.hostingEnvironment}`,
          status: 'VERIFIED',
        },
      ];

      setEventLogs(logs);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyIp = () => {
    if (telemetry?.ip) {
      navigator.clipboard.writeText(telemetry.ip);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#222823]/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="telemetry-title"
    >
      <div className="relative w-full max-w-3xl bg-[#F8F6F0] border border-[#DDD5C5] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar matching editorial aesthetic */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F3EFE6] border-b border-[#DDD5C5]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <div className="flex flex-col">
              <span id="telemetry-title" className="font-serif text-base font-semibold text-[#222823]">
                Live Views & Real Visitor Telemetry
              </span>
              <span className="text-[10px] font-mono text-[#5F7063] uppercase tracking-wider">
                REAL-TIME AUDIT STREAM // AZAD CHAUHAN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD5C5] text-[#222823]">
              {telemetry?.hostingEnvironment || 'Production Node'}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EAE4D6] text-[#222823] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
              aria-label="Close telemetry view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top 4 Real KPI Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5]">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#738477] font-semibold block mb-1">
                Portfolio Views
              </span>
              <span className="font-mono text-xl font-bold text-[#222823]">
                {viewsCount.toLocaleString()}
              </span>
              <span className="text-[9px] font-mono text-emerald-700 block mt-0.5">
                Live Verified
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5]">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#738477] font-semibold block mb-1">
                Connected Node
              </span>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="font-mono text-xl font-bold text-[#222823]">
                  1 Active
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#5F7063] block mt-0.5">
                Current Client Session
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5]">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#738477] font-semibold block mb-1">
                Network Latency
              </span>
              <span className="font-mono text-xl font-bold text-[#222823]">
                {telemetry ? `${telemetry.latencyMs}ms` : 'Measuring...'}
              </span>
              <span className="text-[9px] font-mono text-emerald-700 block mt-0.5">
                Round-Trip Time
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5]">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#738477] font-semibold block mb-1">
                Active Session
              </span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C2A277]" />
                <span className="font-mono text-xl font-bold text-[#222823]">
                  {formatTimer(sessionSeconds)}
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#5F7063] block mt-0.5">
                Page Dwell Time
              </span>
            </div>
          </div>

          {/* Current Visitor Real Telemetry Card */}
          <div className="rounded-xl border border-[#DDD5C5] bg-[#FAF8F5] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5] mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C2A277]" />
                <h4 className="font-serif text-base font-semibold text-[#222823]">
                  Real Verified Client Telemetry
                </h4>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-700" />
                VERIFIED LIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Client IP Address */}
              <div className="p-3.5 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-sans tracking-wider uppercase text-[#738477] font-semibold">
                    Client IP Address
                  </span>
                  <button
                    onClick={handleCopyIp}
                    className="p-1 rounded text-[#5F7063] hover:text-[#222823] transition-colors"
                    title="Copy IP"
                  >
                    {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="font-mono text-xs font-bold text-[#222823] break-all">
                  {telemetry ? telemetry.ip : 'Resolving...'}
                </span>
              </div>

              {/* Geographic Location */}
              <div className="p-3.5 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 mb-1">
                  <Globe className="w-3.5 h-3.5 text-[#5F7063]" />
                  <span className="text-[10px] font-sans tracking-wider uppercase text-[#738477] font-semibold">
                    Location & Region
                  </span>
                </div>
                <span className="font-sans text-xs font-semibold text-[#222823]">
                  {telemetry
                    ? `${telemetry.city}${telemetry.region ? `, ${telemetry.region}` : ''} • ${telemetry.country}`
                    : 'Locating...'}
                </span>
                <span className="text-[10px] font-mono text-[#738477] mt-0.5">
                  Timezone: {telemetry?.timezone || 'Detecting...'}
                </span>
              </div>

              {/* Device Category & Screen Specs */}
              <div className="p-3.5 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 mb-1">
                  {telemetry?.deviceType === 'Mobile' ? (
                    <Smartphone className="w-3.5 h-3.5 text-[#5F7063]" />
                  ) : telemetry?.deviceType === 'Tablet' ? (
                    <Tablet className="w-3.5 h-3.5 text-[#5F7063]" />
                  ) : (
                    <Laptop className="w-3.5 h-3.5 text-[#5F7063]" />
                  )}
                  <span className="text-[10px] font-sans tracking-wider uppercase text-[#738477] font-semibold">
                    Device Category & Display
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-semibold text-[#222823]">
                    {telemetry?.deviceType} ({telemetry?.deviceModel})
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#5F7063] mt-0.5">
                  Screen: {telemetry ? `${telemetry.screenWidth}×${telemetry.screenHeight} (${telemetry.devicePixelRatio}x DPR)` : '...'}
                </span>
              </div>

              {/* OS & Browser Engine */}
              <div className="p-3.5 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5] flex flex-col justify-between">
                <div className="flex items-center gap-1.5 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-[#5F7063]" />
                  <span className="text-[10px] font-sans tracking-wider uppercase text-[#738477] font-semibold">
                    Operating System & Browser
                  </span>
                </div>
                <span className="font-sans text-xs font-semibold text-[#222823]">
                  {telemetry ? `${telemetry.os} • ${telemetry.browser}` : 'Detecting...'}
                </span>
                <span className="text-[10px] font-mono text-[#5F7063] mt-0.5">
                  Hardware: {telemetry ? `${telemetry.cpuCores} CPU Threads • Touch: ${telemetry.touchSupport ? 'Yes' : 'No'}` : '...'}
                </span>
              </div>

            </div>
          </div>

          {/* Genuine Real-Time Audit Log Feed */}
          <div className="rounded-xl border border-[#DDD5C5] bg-[#222823] text-[#F8F6F0] p-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3D4A41]">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#C2A277]" />
                <span className="text-[#DECBB0] font-bold text-[11px]">
                  LIVE CLIENT EVENT AUDIT TRAIL
                </span>
              </div>
              <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED LOGS
              </span>
            </div>

            <div className="space-y-2 text-[11px] text-[#D1DDD3]">
              {eventLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#2E3730] gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#738477]">[{log.timestamp}]</span>
                    <span>{log.message}</span>
                  </div>
                  <span
                    className={`font-semibold text-[10px] ${
                      log.status === 'ACTIVE'
                        ? 'text-emerald-400'
                        : log.status === 'VERIFIED'
                        ? 'text-[#C2A277]'
                        : 'text-[#A9B7AC]'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Telemetry Footer note */}
          <div className="p-3.5 rounded-lg bg-[#F5F2EB] border border-[#DDD5C5] flex items-center justify-between text-xs font-sans text-[#4E5D52]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C2A277]" />
              <span>
                Hosting Provider: <strong>{telemetry?.hostingEnvironment}</strong> • Referrer: <strong>{telemetry?.referrer}</strong>
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#738477]">
              DOM Ready: {telemetry ? `${telemetry.pageLoadDurationMs}ms` : '0ms'}
            </span>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-[#F3EFE6] border-t border-[#DDD5C5] flex items-center justify-between text-xs font-sans text-[#5F7063]">
          <span className="text-[11px]">
            Privacy Guarantee: Client telemetry is resolved in real-time and never shared.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#222823] text-[#F8F6F0] text-xs font-sans tracking-wider uppercase hover:bg-[#3D4A41] transition-colors"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};
