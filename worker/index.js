export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env);
    }

    // everything else: serve the built static site as before
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid body' }, 400);
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return json({ error: 'missing fields' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: 'not configured' }, 500);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <contact@mohammadumar.dev>', // must be a verified domain sender in Resend
      to: 'mohammadumar16.mu@gmail.com',
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: message,
    }),
  });

  if (!res.ok) {
    return json({ error: 'send failed' }, 502);
  }

  return json({ ok: true }, 200);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}