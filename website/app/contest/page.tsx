import type { Metadata } from 'next';
import { CONTEST_CRITERIA } from './criteria';

export const metadata: Metadata = {
  title: 'Going somewhere cool this Winter? | Caravyn',
  description: '$100 to whoever makes the best trip on Caravyn.',
};

/**
 * =========================================================================
 * 🏆 CONTEST PAGE (/contest)
 * =========================================================================
 * To add, edit, or remove criteria, update `website/app/contest/criteria.ts`
 * =========================================================================
 */
export default function ContestPage() {
  return (
    <main className="min-h-screen w-full bg-[#F9F1E5] dark:bg-[#090606] text-gray-900 dark:text-[#ededed] py-16 sm:py-24 px-6 flex flex-col items-center justify-center transition-colors">
      <div className="w-full max-w-xl text-left">
        {/* Brand Tag */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4B2492] dark:text-purple-400">
            Caravyn Contest
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
          Going somewhere cool this Winter ?
        </h1>

        {/* Subtitle with $100 */}
        <p className="text-xl sm:text-2xl font-semibold text-[#4B2492] dark:text-purple-400 mb-8">
          $100 to whoever makes the best trip.
        </p>

        {/* Simple Criteria List (no boxes, no extra details) */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Criteria
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-gray-800 dark:text-gray-200">
            {CONTEST_CRITERIA.map((criterion, index) => (
              <li key={index} className="leading-relaxed">
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
