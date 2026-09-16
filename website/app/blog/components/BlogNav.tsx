'use client';

import React from 'react';
import Link from 'next/link';

export function BlogNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            style={{ backgroundColor: '#4B2492' }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white leading-none">
              Caravyn
            </span>
            <span className="text-[10px] font-semibold text-[#4B2492] dark:text-purple-400 tracking-wider uppercase">
              Stories & Insights
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 text-sm font-semibold text-[#4B2492] dark:text-purple-300 bg-purple-50 dark:bg-[#4B2492]/20 rounded-lg transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/preview"
            className="hidden sm:inline-block px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Demo Map
          </Link>
          <Link
            href="/#waitlist"
            style={{ backgroundColor: '#4B2492' }}
            className="ml-1 sm:ml-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white rounded-xl shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            Join Beta
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default BlogNav;
