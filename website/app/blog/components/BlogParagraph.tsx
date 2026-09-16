import React from 'react';

interface BlogParagraphProps {
  children: React.ReactNode;
  lead?: boolean;
  className?: string;
}

export function BlogParagraph({
  children,
  lead = false,
  className = '',
}: BlogParagraphProps) {
  if (lead) {
    return (
      <p
        className={`text-lg sm:text-xl font-normal text-gray-700 dark:text-gray-200 leading-relaxed mb-6 ${className}`}
      >
        {children}
      </p>
    );
  }

  return (
    <p
      className={`text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-5 font-normal ${className}`}
    >
      {children}
    </p>
  );
}

export default BlogParagraph;

