import type { Metadata } from 'next';
import { WaitlistForm } from './waitlist_form/form';

export const metadata: Metadata = {
  title: 'Caravyn - Beta Application',
  description: 'Apply for early beta access to Caravyn. Winter 2026 travel cohort.',
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-50 via-purple-50/20 to-gray-100 dark:from-zinc-950 dark:via-[#4B2492]/10 dark:to-black py-12 sm:py-20 px-4 flex flex-col items-center justify-center relative">
      {/* Top Navigation Pill */}
      <nav className="absolute top-6 flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200/80 dark:border-zinc-800/80 shadow-sm text-xs font-semibold">
        <span className="text-[#4B2492] dark:text-purple-400 font-extrabold tracking-tight">
          Caravyn
        </span>
        <span className="text-gray-300 dark:text-zinc-700">•</span>
        <a
          href="/blog"
          className="text-gray-600 dark:text-gray-300 hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors"
        >
          Travel Blog
        </a>
        <span className="text-gray-300 dark:text-zinc-700">•</span>
        <a
          href="/preview"
          className="text-gray-600 dark:text-gray-300 hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors"
        >
          Demo Map
        </a>
      </nav>

      <div className="text-center max-w-xl mb-8 sm:mb-10 mt-12 sm:mt-0">
        <span
          style={{ color: '#4B2492', backgroundColor: 'rgba(75, 36, 146, 0.1)' }}
          className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4"
        >
          ❄️ Winter 2026 Cohort • Early Beta Access
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Share travel ideas with experiences of your own
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          I am looking for anyone who is an avid traveller and willing to provide thoughtful insights and media for the places you visit.
        </p>
      </div>

      <WaitlistForm />
    </main>
  );
}

