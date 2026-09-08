'use client';

import Map from './map/map';
import { WaitlistForm } from './waitlist_form/form';

export default function Home() {
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
        <Map style={{ height: '100%', width: '100%' }} />

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
            Early Access
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Be the First on the Journey
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Sign up for our exclusive beta program. Test new features, explore travel routes, and share your adventures.
          </p>
        </div>

        <WaitlistForm />
      </section>
    </main>
  );
}
