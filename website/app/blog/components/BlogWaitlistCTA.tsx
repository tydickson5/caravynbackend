'use client';

import React, { useState } from 'react';

interface BlogWaitlistCTAProps {
  title?: string;
  description?: string;
  className?: string;
}

export function BlogWaitlistCTA({
  title = 'Ready to share your journeys on Caravyn?',
  description = 'Join our Winter 2026 early beta cohort. Document your routes, pin your favorite spots, and inspire travelers around the world.',
  className = '',
}: BlogWaitlistCTAProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          betaTesting: true,
          nextTrip: 'From Blog CTA',
          bestTravelExperience: '',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className={`my-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#4B2492]/10 via-purple-50/40 to-white dark:from-[#4B2492]/25 dark:via-zinc-900/60 dark:to-zinc-900 border border-[#4B2492]/25 shadow-xl text-center relative overflow-hidden ${className}`}
    >
      {/* Winter 2026 Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4B2492]/15 text-[#4B2492] dark:text-purple-300 border border-[#4B2492]/20 mb-4">
        <span>❄️</span>
        <span>Winter 2026 Beta Cohort</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      {submitted ? (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm mb-1">
            <span>✓</span>
            <span>You're on the early access list!</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            We will reach out to <strong>{email}</strong> when spots open up.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2492]"
            />
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#4B2492' }}
              className="px-6 py-3 text-white text-sm font-semibold rounded-xl shadow-md hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 flex-shrink-0 cursor-pointer"
            >
              {loading ? 'Joining...' : 'Apply for Beta'}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium text-left">
              {error}
            </p>
          )}
        </form>
      )}
    </aside>
  );
}

export default BlogWaitlistCTA;

