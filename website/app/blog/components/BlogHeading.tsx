import React from 'react';

interface BlogHeadingProps {
  children: React.ReactNode;
  level?: 'h2' | 'h3';
  id?: string;
  className?: string;
}

export function BlogHeading({
  children,
  level = 'h2',
  id,
  className = '',
}: BlogHeadingProps) {
  if (level === 'h3') {
    return (
      <h3
        id={id}
        className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3 tracking-tight ${className}`}
      >
        {children}
      </h3>
    );
  }

  return (
    <div className={`mt-12 mb-4 group ${className}`}>
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3"
      >
        <span
          style={{ backgroundColor: '#4B2492' }}
          className="w-1.5 h-6 sm:h-7 rounded-full inline-block flex-shrink-0"
        />
        <span>{children}</span>
      </h2>
    </div>
  );
}

export default BlogHeading;
