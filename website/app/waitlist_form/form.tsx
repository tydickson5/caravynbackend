'use client';

import React, { useState } from 'react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [betaTesting, setBetaTesting] = useState(true);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          betaTesting,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to join waitlist.');
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
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-[#18181b] rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 text-left">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Join the Waitlist
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Get early access and stay updated on the latest adventures.
        </p>
      </div>

      {submitted ? (
        <div className="text-center p-6 bg-purple-50 dark:bg-[#4B2492]/20 rounded-xl border border-[#4B2492]/30">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#4B2492] text-white flex items-center justify-center text-xl font-bold">
            ✓
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            You&apos;re on the list!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {betaTesting
              ? 'Thank you for signing up to beta test! We will email you with early access soon.'
              : 'Thank you for signing up! We will keep you updated.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="waitlist-email"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B2492] focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-1 pb-1">
            <input
              id="beta-testing-checkbox"
              type="checkbox"
              checked={betaTesting}
              onChange={(e) => setBetaTesting(e.target.checked)}
              className="w-4 h-4 rounded text-[#4B2492] focus:ring-[#4B2492] cursor-pointer accent-[#4B2492]"
            />
            <label
              htmlFor="beta-testing-checkbox"
              className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              I want to beta test
            </label>
          </div>

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#4B2492' }}
            className="w-full py-3.5 px-4 text-white font-semibold rounded-xl shadow-md hover:opacity-95 active:scale-[0.99] transition cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Get Early Access'}
          </button>
        </form>
      )}
    </div>
  );
}

// Default export for flexibility
export default WaitlistForm;