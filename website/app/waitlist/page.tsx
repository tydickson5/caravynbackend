import Link from 'next/link';
import { WaitlistForm } from '../waitlist_form/form';

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-black flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-[#4B2492] dark:text-purple-400 hover:underline flex items-center gap-1.5"
        >
          &larr; Back to Map
        </Link>
      </div>

      <WaitlistForm />
    </main>
  );
}

