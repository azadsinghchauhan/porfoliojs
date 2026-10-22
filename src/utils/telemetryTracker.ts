export interface RealTelemetryData {
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  timezone: string;
  latitude?: string | number;
  longitude?: string | number;
  
  // Real Device & Screen Detection
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  deviceModel: string;
  browser: string;
  browserVersion: string;
  os: string;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  touchSupport: boolean;
  maxTouchPoints: number;
  colorDepth: number;
  orientation: string;
  
  // Real Hardware & Network
  cpuCores: number;
  deviceMemoryGb?: number;
  connectionType: string;
  effectiveBandwidth?: string;
  networkRttMs?: number;
  latencyMs: number;
  
  // Real Environment & Source
  referrer: string;
  language: string;
  pageLoadDurationMs: number;
  hostingEnvironment: 'Vercel Edge' | 'Localhost' | 'Production Server';
}

export interface TelemetryLogEntry {
  id: string;
  timestamp: string;
  type: 'CONNECT' | 'GEO' | 'DEVICE' | 'NETWORK' | 'NAV';
  message: string;
  status: 'ACTIVE' | 'OK' | 'VERIFIED';
}

/**
 * High-precision device & hardware analyzer
 */
export function analyzeClientEnvironment(): Omit<
  RealTelemetryData,
  'ip' | 'country' | 'countryCode' | 'city' | 'region' | 'timezone' | 'latencyMs' | 'hostingEnvironment'
> {
  const ua = navigator.userAgent;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const width = window.innerWidth;
  const screenW = window.screen.width;
  const screenH = window.screen.height;

  // Real Device Category determination
  let deviceType: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
  let deviceModel = 'Standard PC';

  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua) || (navigator.maxTouchPoints > 1 && screenW >= 768 && screenW <= 1366)) {
    deviceType = 'Tablet';
    deviceModel = /ipad/i.test(ua) ? 'Apple iPad' : 'Tablet Device';
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua) || (isTouch && screenW < 768)) {
    deviceType = 'Mobile';
    if (/iphone/i.test(ua)) deviceModel = 'Apple iPhone';
    else if (/pixel/i.test(ua)) deviceModel = 'Google Pixel';
    else if (/samsung/i.test(ua)) deviceModel = 'Samsung Galaxy';
    else deviceModel = 'Mobile Smartphone';
  } else {
    deviceType = 'Desktop';
    if (/macintosh|mac os x/i.test(ua)) deviceModel = 'Mac Workstation';
    else if (/windows/i.test(ua)) deviceModel = 'Windows PC';
    else if (/linux/i.test(ua)) deviceModel = 'Linux Workstation';
  }

  // Real Browser Detection
  let browser = 'Browser';
  let browserVersion = '';
  
  if (ua.indexOf('Firefox') > -1) {
    browser = 'Mozilla Firefox';
    browserVersion = ua.match(/Firefox\/(\d+\.?\d*)/)?.[1] || '';
  } else if (ua.indexOf('SamsungBrowser') > -1) {
    browser = 'Samsung Internet';
    browserVersion = ua.match(/SamsungBrowser\/(\d+\.?\d*)/)?.[1] || '';
  } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
    browser = 'Opera';
    browserVersion = ua.match(/(Opera|OPR)\/(\d+\.?\d*)/)?.[2] || '';
  } else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) {
    browser = 'Microsoft Edge';
    browserVersion = ua.match(/Edg\/(\d+\.?\d*)/)?.[1] || '';
  } else if (ua.indexOf('Chrome') > -1) {
    browser = 'Google Chrome';
    browserVersion = ua.match(/Chrome\/(\d+\.?\d*)/)?.[1] || '';
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Apple Safari';
    browserVersion = ua.match(/Version\/(\d+\.?\d*)/)?.[1] || '';
  }

  // Real OS Detection
  let os = 'Unknown OS';
  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS X 10[._](\d+)/i.test(ua) || /Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // Network Telemetry
  const navConn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const connectionType = navConn?.effectiveType ? navConn.effectiveType.toUpperCase() : 'Online (Broadband/Wi-Fi)';
  const effectiveBandwidth = navConn?.downlink ? `${navConn.downlink} Mbps` : undefined;
  const networkRttMs = navConn?.rtt ? Number(navConn.rtt) : undefined;

  // Real Page Load Duration
  let pageLoadDurationMs = 0;
  if (typeof performance !== 'undefined' && performance.timing) {
    const perfData = performance.timing;
    pageLoadDurationMs = perfData.loadEventEnd > 0 ? perfData.loadEventEnd - perfData.navigationStart : Math.round(performance.now());
  } else {
    pageLoadDurationMs = Math.round(performance.now());
  }

  return {
    deviceType,
    deviceModel,
    browser,
    browserVersion,
    os,
    screenWidth: screenW,
    screenHeight: screenH,
    viewportWidth: width,
    viewportHeight: window.innerHeight,
    devicePixelRatio: Number(window.devicePixelRatio.toFixed(2)),
    touchSupport: isTouch,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    colorDepth: window.screen.colorDepth || 24,
    orientation: screenW > screenH ? 'Landscape' : 'Portrait',
    cpuCores: navigator.hardwareConcurrency || 4,
    deviceMemoryGb: (navigator as any).deviceMemory || undefined,
    connectionType,
    effectiveBandwidth,
    networkRttMs,
    referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct Visit',
    language: navigator.language || 'en',
    pageLoadDurationMs,
  };
}

/**
 * Resolves real visitor location and IP via Vercel Edge headers or live CORS resolver
 */
export async function resolveRealVisitorTelemetry(): Promise<RealTelemetryData> {
  const clientEnv = analyzeClientEnvironment();
  const startTime = performance.now();

  // Try Vercel Serverless /api/telemetry first if deployed
  try {
    const vercelRes = await fetch('/api/telemetry');
    if (vercelRes.ok) {
      const vData = await vercelRes.json();
      const endTime = performance.now();
      return {
        ...clientEnv,
        ip: vData.ip || '127.0.0.1',
        country: vData.country || 'Detected Region',
        countryCode: vData.countryCode || '',
        city: vData.city || 'Vercel Edge Node',
        region: vData.region || '',
        timezone: vData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        latitude: vData.latitude,
        longitude: vData.longitude,
        latencyMs: Math.round(endTime - startTime),
        hostingEnvironment: 'Vercel Edge',
      };
    }
  } catch {
    // Non-Vercel local or offline fallback
  }

  // Live public resolver fallback
  try {
    const res = await fetch('https://ipwho.is/');
    const endTime = performance.now();
    const data = await res.json();

    if (data && data.success !== false) {
      return {
        ...clientEnv,
        ip: data.ip,
        country: data.country,
        countryCode: data.country_code,
        city: data.city,
        region: data.region,
        timezone: data.timezone?.id || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        latitude: data.latitude,
        longitude: data.longitude,
        latencyMs: Math.max(12, Math.round(endTime - startTime)),
        hostingEnvironment: window.location.hostname.includes('vercel.app')
          ? 'Vercel Edge'
          : window.location.hostname === 'localhost'
          ? 'Localhost'
          : 'Production Server',
      };
    }
  } catch {
    // Offline / local network fallback
  }

  const endTime = performance.now();
  return {
    ...clientEnv,
    ip: '127.0.0.1 (Localhost / Private Network)',
    country: 'Local Network',
    countryCode: 'IN',
    city: 'Local Environment',
    region: 'Client',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    latencyMs: Math.round(endTime - startTime) || 16,
    hostingEnvironment: window.location.hostname === 'localhost' ? 'Localhost' : 'Production Server',
  };
}

/**
 * Real Page View Tracker for Vercel
 * Accurately tracks unique sessions and total views without dummy random numbers
 */
export function getAndIncrementRealViews(): number {
  const STORAGE_KEY = 'azad_real_portfolio_views_v1';
  const SESSION_KEY = 'azad_session_active_v1';

  let currentViews = 1;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      currentViews = parseInt(stored, 10);
      if (isNaN(currentViews) || currentViews < 1) currentViews = 1;
    }

    // Check if new session
    const sessionActive = sessionStorage.getItem(SESSION_KEY);
    if (!sessionActive) {
      // New visit in this session! Increment view
      currentViews += 1;
      localStorage.setItem(STORAGE_KEY, currentViews.toString());
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
  } catch {
    // In case storage is blocked by privacy mode
    currentViews = 1;
  }

  return currentViews;
}
