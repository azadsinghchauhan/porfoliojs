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
 * High-precision device, mobile & hardware analyzer
 * Tested for iOS Safari, Android Chrome, Tablets, and Desktops
 */
export function analyzeClientEnvironment(): Omit<
  RealTelemetryData,
  'ip' | 'country' | 'countryCode' | 'city' | 'region' | 'timezone' | 'latencyMs' | 'hostingEnvironment'
> {
  const ua = navigator.userAgent;
  const isTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const minDimension = Math.min(screenW, screenH);
  const maxDimension = Math.max(screenW, screenH);
  const userAgentData = (navigator as any).userAgentData;

  // 1. Rigorous Mobile & Tablet Detection
  let deviceType: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
  let deviceModel = 'Standard PC';

  const isExplicitMobileUA = /mobile|iphone|ipod|android.*mobile|blackberry|opera mini|iemobile|silk\/.*mobile/i.test(ua);
  const isExplicitTabletUA = /ipad|tablet|(android(?!.*mobile))/i.test(ua);
  const isClientHintsMobile = userAgentData?.mobile === true;

  // iPad on iOS 13+ sends desktop Safari UA ('Macintosh; Intel Mac OS X') but has multi-touch
  const isIPadOS = /macintosh/i.test(ua) && navigator.maxTouchPoints > 1 && minDimension >= 600;

  if (isExplicitTabletUA || isIPadOS || (isTouch && minDimension >= 600 && minDimension <= 1024 && !isExplicitMobileUA)) {
    deviceType = 'Tablet';
    if (/ipad/i.test(ua) || isIPadOS) {
      deviceModel = 'Apple iPad';
    } else {
      deviceModel = 'Android Tablet';
    }
  } else if (isExplicitMobileUA || isClientHintsMobile || (isTouch && minDimension < 600)) {
    deviceType = 'Mobile';

    if (/iphone/i.test(ua)) {
      // iPhone model inference by screen height
      if (maxDimension >= 932) deviceModel = 'iPhone 14/15/16 Pro Max';
      else if (maxDimension >= 852) deviceModel = 'iPhone 14/15/16 Pro';
      else if (maxDimension >= 844) deviceModel = 'iPhone 12/13/14';
      else if (maxDimension >= 812) deviceModel = 'iPhone X/XS/11 Pro';
      else if (maxDimension >= 667) deviceModel = 'iPhone SE/8';
      else deviceModel = 'Apple iPhone';
    } else if (/samsung|sm-[a-z0-9]+/i.test(ua)) {
      deviceModel = 'Samsung Galaxy';
    } else if (/pixel/i.test(ua)) {
      deviceModel = 'Google Pixel';
    } else if (/oneplus/i.test(ua)) {
      deviceModel = 'OnePlus Device';
    } else if (/xiaomi|mi |redmi|poco/i.test(ua)) {
      deviceModel = 'Xiaomi/Redmi';
    } else if (/oppo|cph/i.test(ua)) {
      deviceModel = 'Oppo Device';
    } else if (/vivo/i.test(ua)) {
      deviceModel = 'Vivo Device';
    } else {
      deviceModel = 'Android Smartphone';
    }
  } else {
    deviceType = 'Desktop';
    if (/macintosh|mac os x/i.test(ua)) deviceModel = 'Mac Workstation';
    else if (/windows/i.test(ua)) deviceModel = 'Windows PC';
    else if (/linux/i.test(ua)) deviceModel = 'Linux Workstation';
  }

  // 2. Browser Detection
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

  // 3. OS Detection
  let os = 'Unknown OS';
  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/iPhone|iPad|iPod/i.test(ua) || isIPadOS) os = isIPadOS ? 'iPadOS' : 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Mac OS X 10[._](\d+)/i.test(ua) || /Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // 4. Hardware & Network Telemetry
  const navConn =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;
  const connectionType = navConn?.effectiveType
    ? navConn.effectiveType.toUpperCase()
    : isTouch
    ? 'Mobile Cellular / Wi-Fi'
    : 'Online (Broadband/Wi-Fi)';
  const effectiveBandwidth = navConn?.downlink ? `${navConn.downlink} Mbps` : undefined;
  const networkRttMs = navConn?.rtt ? Number(navConn.rtt) : undefined;

  // Real Page Load Duration
  let pageLoadDurationMs = 0;
  if (typeof performance !== 'undefined' && performance.timing) {
    const perfData = performance.timing;
    pageLoadDurationMs =
      perfData.loadEventEnd > 0
        ? perfData.loadEventEnd - perfData.navigationStart
        : Math.round(performance.now());
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
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: Number((window.devicePixelRatio || 1).toFixed(2)),
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
    city: 'Local Client',
    region: 'Local Environment',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    latencyMs: Math.round(endTime - startTime) || 16,
    hostingEnvironment: window.location.hostname === 'localhost' ? 'Localhost' : 'Production Server',
  };
}

/**
 * GLOBAL Cloud View Tracker (Connected across Phone, Tablet, Laptop & Desktop worldwide)
 * Utilizes centralized cloud counter with automatic session deduplication.
 */
export async function syncGlobalViews(increment: boolean = false): Promise<number> {
  const SESSION_KEY = 'azad_session_counted_v2';
  const CACHE_KEY = 'azad_global_views_cached';

  let shouldIncrement = increment;

  // Only increment if it's a genuine new session or requested
  if (shouldIncrement && typeof sessionStorage !== 'undefined') {
    if (sessionStorage.getItem(SESSION_KEY)) {
      shouldIncrement = false; // already counted this session, just read newest global count
    } else {
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
  }

  const action = shouldIncrement ? 'hit' : 'get';

  // 1. Primary: Centralized Global Counter API
  try {
    const url = `https://abacus.jasoncameron.dev/${action}/azadsinghchauhan-portfolio/views`;
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        try {
          localStorage.setItem(CACHE_KEY, data.value.toString());
        } catch {}
        return data.value;
      }
    }
  } catch {
    // Fall through to Vercel API
  }

  // 2. Secondary: Vercel serverless function proxy
  try {
    const res = await fetch(`/api/views?action=${action}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.views === 'number') {
        try {
          localStorage.setItem(CACHE_KEY, data.views.toString());
        } catch {}
        return data.views;
      }
    }
  } catch {
    // Fall through
  }

  // 3. Fallback to cached or local increment
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) return parseInt(cached, 10);
  } catch {}

  return 1;
}
