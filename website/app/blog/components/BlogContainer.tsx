import React from 'react';

interface BlogContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'standard' | 'wide' | 'full';
}

export function BlogContainer({
  children,
  className = '',
  maxWidth = 'standard',
}: BlogContainerProps) {
  const widthClasses = {
    standard: 'max-w-3xl',
    wide: 'max-w-5xl',
    full: 'max-w-7xl',
  }[maxWidth];

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 ${widthClasses} ${className}`}>
      {children}
    </div>
  );
}

export default BlogContainer;
