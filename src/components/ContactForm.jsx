import { useState } from 'react';
import { Send } from 'lucide-react';
import { PROFILE } from '../data/content';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | fallback | error

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    try {
      // requires functions/api/contact.js to be deployed and wired to Resend —
      // see that file's comments for setup. Falls back to mailto below if it 404s.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('endpoint unavailable');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      // graceful fallback: open the visitor's email client pre-filled instead
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setStatus('fallback');
    }
  };

  if (status === 'sent') {
    return (
      <p className="font-mono text-signal text-sm text-center border border-signal/30 rounded-lg py-6">
        {'>'} message sent — I'll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        type="text" required placeholder="Name" value={form.name} onChange={update('name')}
        className="bg-panel/40 border border-line rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-dim focus:border-signal/50 transition-colors outline-none"
      />
      <input
        type="email" required placeholder="Email" value={form.email} onChange={update('email')}
        className="bg-panel/40 border border-line rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-dim focus:border-signal/50 transition-colors outline-none"
      />
      <textarea
        required rows={4} placeholder="Message" value={form.message} onChange={update('message')}
        className="bg-panel/40 border border-line rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-dim focus:border-signal/50 transition-colors outline-none resize-none"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 border border-signal/40 text-signal font-mono text-xs tracking-wide rounded-md py-2.5 hover:bg-signal/10 transition-colors disabled:opacity-50"
      >
        <Send size={13} />
        {status === 'sending' ? 'sending...' : 'send message'}
      </button>
      {status === 'fallback' && (
        <p className="font-mono text-dim text-[11px] text-center">
          opened your email client instead — the direct-send endpoint isn't live yet.
        </p>
      )}
    </form>
  );
}