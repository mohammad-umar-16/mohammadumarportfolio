// Emails Mohammad when a real browser visits. Reuses RESEND_API_KEY from the contact form.
const BOT_RE = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|curl|wget|python|node-fetch|axios/i;
const DAILY_CAP = 90; // Resend free plan = 100/day; leave room for contact-form mail

export async function handleVisit(request, env, ctx) {
  const ua = request.headers.get('User-Agent') || '';
  if (!ua || BOT_RE.test(ua)) return new Response(null, { status: 204 }); // drop bots

  let body = {};
  try { body = await request.json(); } catch {}
  const path = String(body.path || '/').slice(0, 200);
  const ref = String(body.ref || 'direct').slice(0, 200);

  const cf = request.cf || {};
  const place = [cf.city, cf.country].filter(Boolean).join(', ') || 'Unknown location';

  const day = new Date().toISOString().slice(0, 10);
  const key = new Request(`https://visit-count.internal/${day}`);
  const cache = caches.default;
  const hit = await cache.match(key);
  const count = hit ? parseInt(await hit.text(), 10) || 0 : 0;
  if (count >= DAILY_CAP) return new Response(null, { status: 204 });
  ctx.waitUntil(
    cache.put(key, new Response(String(count + 1), { headers: { 'Cache-Control': 'max-age=86400' } }))
  );

  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  ctx.waitUntil(
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio Visits <contact@mohammadumar.dev>', // same verified sender as the contact form
        to: 'mohammadumar16.mu@gmail.com',
        subject: `Portfolio visit: ${place}`,
        text: `Someone is viewing your portfolio.\n\nLocation: ${place}\nPage: ${path}\nCame from: ${ref}\nTime (IST): ${when}`,
      }),
    }).catch(() => {})
  );

  return new Response(null, { status: 204 });
}
