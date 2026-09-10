'use client';

import React, { useState } from 'react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [nextTrip, setNextTrip] = useState('');
  const [bestTravelExperience, setBestTravelExperience] = useState('');
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
          email: email.trim(),
          betaTesting,
          nextTrip: nextTrip.trim(),
          bestTravelExperience: bestTravelExperience.trim(),
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
    <div className="w-full max-w-lg mx-auto p-7 sm:p-9 bg-white dark:bg-[#18181b] rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 text-left transition-all">
      {/* Header */}
      <div className="text-center mb-6">
        {/* Winter 2026 Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4B2492]/10 text-[#4B2492] dark:bg-[#4B2492]/25 dark:text-purple-300 border border-[#4B2492]/20 mb-3">
          <span>❄️</span>
          <span>Looking for Winter 2026 Trips</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Beta Tester Application
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          I am looking for beta testers who would like to post their travels for the world to see. Your images will be used to help promote the beauty of the world as well as this app.
        </p>
      </div>

      {submitted ? (
        <div className="text-center p-6 bg-purple-50/70 dark:bg-[#4B2492]/20 rounded-xl border border-[#4B2492]/30">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#4B2492] text-white flex items-center justify-center text-xl font-bold shadow-md">
            ✓
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Application Received!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Thank you for applying to beta test. We are prioritizing creators with upcoming trips for <strong>Winter 2026</strong>.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            We will reach out to <strong className="text-gray-800 dark:text-gray-200">{email}</strong> with early access details soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Priority Notice Banner */}
          <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-[#4B2492]/15 border border-[#4B2492]/20 flex items-start gap-2.5">
            <span className="text-base leading-none mt-0.5">❄️</span>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-[#4B2492] dark:text-purple-300">Winter 2026 Priority:</strong> We are especially seeking testers traveling in late 2025 / Winter 2026 to road-test our map features live.
            </p>
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="waitlist-email"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address <span className="text-[#4B2492]">*</span>
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B2492] focus:border-transparent transition text-sm"
            />
          </div>

          {/* Next Trip */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label
                htmlFor="waitlist-next-trip"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
              >
                Next Trip
              </label>
              <span className="text-[11px] text-[#4B2492] dark:text-purple-400 font-medium">
                Winter 2026 trips prioritized
              </span>
            </div>
            <input
              id="waitlist-next-trip"
              type="text"
              value={nextTrip}
              onChange={(e) => setNextTrip(e.target.value)}
              placeholder="e.g. Hokkaido ski trip in Jan 2026, Iceland, Alps..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B2492] focus:border-transparent transition text-sm"
            />
          </div>

          {/* Best Travel Experience */}
          <div>
            <label
              htmlFor="waitlist-experience"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1"
            >
              Best Travel Experience
            </label>
            <textarea
              id="waitlist-experience"
              rows={3}
              value={bestTravelExperience}
              onChange={(e) => setBestTravelExperience(e.target.value)}
              placeholder="Tell us about your favorite trip, a memorable moment, or a hidden gem you loved..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B2492] focus:border-transparent transition text-sm resize-none"
            />
          </div>

          {/* Beta Testing Checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <input
              id="beta-testing-checkbox"
              type="checkbox"
              checked={betaTesting}
              onChange={(e) => setBetaTesting(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded text-[#4B2492] focus:ring-[#4B2492] cursor-pointer accent-[#4B2492]"
            />
            <label
              htmlFor="beta-testing-checkbox"
              className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none leading-tight"
            >
              I want to beta test and agree to post travel photos and insights
            </label>
          </div>

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#4B2492' }}
            className="w-full py-3.5 px-4 text-white font-semibold rounded-xl shadow-md hover:opacity-95 active:scale-[0.99] transition cursor-pointer disabled:opacity-50 text-sm mt-2"
          >
            {loading ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  );
}

// Default export for flexibility
export default WaitlistForm;