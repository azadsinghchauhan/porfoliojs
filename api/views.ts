// Vercel Serverless Function for real global page views counter
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || (request.method === 'POST' ? 'hit' : 'get');
  const endpoint =
    action === 'hit'
      ? 'https://abacus.jasoncameron.dev/hit/azadsinghchauhan-portfolio/views'
      : 'https://abacus.jasoncameron.dev/get/azadsinghchauhan-portfolio/views';

  try {
    const res = await fetch(endpoint, {
      headers: { 'User-Agent': 'AzadChauhanPortfolio/1.0' },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify({ views: data.value || 1, success: true }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-store, max-age=0',
        },
      });
    }
  } catch (err: any) {
    // Return fallback
  }

  return new Response(JSON.stringify({ views: 1, success: false }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
