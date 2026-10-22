// Vercel Edge Serverless Function for real client IP and geolocation
export const config = {
  runtime: 'edge',
};

export default function handler(request: Request) {
  const headers = request.headers;

  const ip =
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    '127.0.0.1';

  const city = headers.get('x-vercel-ip-city') || '';
  const country = headers.get('x-vercel-ip-country') || '';
  const countryCode = headers.get('x-vercel-ip-country') || '';
  const region = headers.get('x-vercel-ip-country-region') || '';
  const latitude = headers.get('x-vercel-ip-latitude') || '';
  const longitude = headers.get('x-vercel-ip-longitude') || '';
  const timezone = headers.get('x-vercel-ip-timezone') || '';

  return new Response(
    JSON.stringify({
      ip,
      city: decodeURIComponent(city),
      country,
      countryCode,
      region,
      latitude,
      longitude,
      timezone,
      timestamp: new Date().toISOString(),
      platform: 'Vercel Edge Network',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, max-age=0',
      },
    }
  );
}
