
export async function onRequestPost({ request, env }) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'missing fields' }), { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <contact@mohammadumar.dev>', // must be a verified domain sender
      to: 'mohammadumar16.mu@gmail.com',
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: message,
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'send failed' }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}