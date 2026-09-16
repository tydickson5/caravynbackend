import React from 'react';
import Link from 'next/link';

export function BlogFooter() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div
              style={{ backgroundColor: '#4B2492' }}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            >
              C
            </div>
            <span className="font-bold text-base text-gray-900 dark:text-white">
              Caravyn
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
            Share travel journeys with interactive maps and genuine moments from around the world.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
            Blog
          </Link>
          <Link href="/preview" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
            Preview Route
          </Link>
          <Link href="/#waitlist" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
            Beta Waitlist
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-200/60 dark:border-zinc-800/60 text-center text-xs text-gray-400 dark:text-gray-500">
        &copy; {new Date().getFullYear()} Caravyn. Built for travellers worldwide.
      </div>
    </footer>
  );
}

export default BlogFooter;

