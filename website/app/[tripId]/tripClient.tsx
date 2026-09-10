'use client';

import React from 'react';
import Map from '../map/map';
import { WaitlistForm } from '../waitlist_form/form';
import type { Trip } from '../types/trip';

interface TripClientViewProps {
  trip: Trip;
  tripId: string;
  isFallback?: boolean;
}

function formatTripDates(createdAt?: string | null, endedAt?: string | null): string | null {
  if (!createdAt) return null;
  try {
    const start = new Date(createdAt);
    if (isNaN(start.getTime())) return null;

    const startFormatted = start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    if (!endedAt) {
      return `${startFormatted} – Present`;
    }

    const end = new Date(endedAt);
    if (isNaN(end.getTime())) {
      return startFormatted;
    }

    if (start.getFullYear() === end.getFullYear()) {
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
      }
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }

    return `${startFormatted} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } catch {
    return null;
  }
}

export default function TripClientView({
  trip,
  tripId,
  isFallback = false,
}: TripClientViewProps) {
  const tripDates = formatTripDates(trip.created_at, trip.ended_at);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('waitlist-email')?.focus();
      }, 600);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Hero Map Section */}
      <section className="relative w-full h-screen">
        {/* Floating Trip Info Badge */}
        <div className="absolute top-6 left-6 z-10 max-w-xs sm:max-w-sm bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-200/70 dark:border-zinc-700/70">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              style={{ color: '#4B2492', backgroundColor: 'rgba(75, 36, 146, 0.12)' }}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            >
              {isFallback ? 'Demo Preview' : 'Trip Itinerary'}
            </span>
            {trip.posts && trip.posts.length > 0 && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {trip.posts.length} {trip.posts.length === 1 ? 'stop' : 'stops'}
              </span>
            )}
          </div>

          <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
            {trip.name || 'Travel Journey'}
          </h1>

          {/* Trip Dates */}
          {tripDates && (
            <div className="flex items-center gap-1.5 text-xs text-[#4B2492] dark:text-purple-300 font-medium mt-1">
              <span className="text-xs">📅</span>
              <span>{tripDates}</span>
            </div>
          )}

          {/* Trip Description */}
          {trip.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              {trip.description}
            </p>
          )}

          {isFallback && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 font-medium">
              Trip #{tripId.slice(0, 8)} preview route
            </p>
          )}
        </div>

        {/* Interactive Map */}
        <Map trip={trip} style={{ height: '100%', width: '100%' }} />

        {/* Bottom Floating Scroll Button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <button
            onClick={scrollToWaitlist}
            style={{ backgroundColor: '#4B2492' }}
            className="px-6 py-3 text-sm font-bold text-white rounded-full shadow-2xl hover:opacity-95 active:scale-95 transition cursor-pointer flex items-center gap-2 border-2 border-white/40"
          >
            <span>Join Beta Waitlist</span>
            <span>&darr;</span>
          </button>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
        id="waitlist"
        className="min-h-screen w-full bg-gradient-to-b from-gray-50 via-purple-50/20 to-gray-100 dark:from-zinc-950 dark:via-[#4B2492]/5 dark:to-black py-24 px-4 flex flex-col items-center justify-center relative"
      >
        <div className="text-center max-w-xl mb-10">
          <span
            style={{ color: '#4B2492', backgroundColor: 'rgba(75, 36, 146, 0.1)' }}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4"
          >
            ❄️ Winter 2026 Cohort • Early Beta Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Share travel ideas with experiences of your own
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            I am looking for anyone who is an avid traveller and willing to provide thoughtful insights and media for the places you visit.
          </p>
        </div>

        <WaitlistForm />
      </section>
    </main>
  );
}

