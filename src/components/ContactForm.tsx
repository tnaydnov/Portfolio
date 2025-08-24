'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Send failed');
      setState('sent');
      e.currentTarget.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <form
      className="mt-8 grid gap-3 max-w-xl"
      method="post"
      action="/api/contact"
      onSubmit={handleSubmit}
    >
      <input 
        className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition" 
        name="name" 
        placeholder="Name" 
        required 
      />
      <input 
        className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition" 
        name="email" 
        type="email" 
        placeholder="Email" 
        required 
      />
      <textarea 
        className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition resize-none" 
        name="message" 
        rows={5} 
        placeholder="Message" 
        required 
      />
      <button
        disabled={state === 'sending'}
        className="rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition shadow-lg hover:shadow-xl"
      >
        {state === 'sending' ? 'Sending…' : state === 'sent' ? 'Sent ✓' : 'Send'}
      </button>
      {state === 'error' && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
    </form>
  );
}
