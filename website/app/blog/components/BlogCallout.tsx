import React from 'react';

interface BlogCalloutProps {
  children: React.ReactNode;
  title?: string;
  type?: 'tip' | 'insight' | 'quote' | 'warning';
  className?: string;
}

export function BlogCallout({
  children,
  title,
  type = 'tip',
  className = '',
}: BlogCalloutProps) {
  const configs = {
    tip: {
      icon: '💡',
      defaultTitle: 'Pro Traveler Tip',
      borderClass: 'border-l-4 border-l-[#4B2492]',
      bgClass: 'bg-purple-50/60 dark:bg-[#4B2492]/15 border-purple-200/50 dark:border-[#4B2492]/30',
      titleColor: 'text-[#4B2492] dark:text-purple-300',
    },
    insight: {
      icon: '📍',
      defaultTitle: 'Caravyn Highlight',
      borderClass: 'border-l-4 border-l-blue-600 dark:border-l-blue-400',
      bgClass: 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-900/30',
      titleColor: 'text-blue-900 dark:text-blue-300',
    },
    quote: {
      icon: '❝',
      defaultTitle: 'Traveler Reflection',
      borderClass: 'border-l-4 border-l-emerald-600 dark:border-l-emerald-400',
      bgClass: 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30',
      titleColor: 'text-emerald-900 dark:text-emerald-300',
    },
    warning: {
      icon: '⚠️',
      defaultTitle: 'Heads Up',
      borderClass: 'border-l-4 border-l-amber-500',
      bgClass: 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-900/30',
      titleColor: 'text-amber-900 dark:text-amber-300',
    },
  }[type];

  return (
    <aside
      className={`my-8 p-5 sm:p-6 rounded-xl border ${configs.borderClass} ${configs.bgClass} ${className}`}
    >
      <div className="flex items-center gap-2 mb-2 font-bold text-sm">
        <span className="text-base">{configs.icon}</span>
        <span className={configs.titleColor}>{title || configs.defaultTitle}</span>
      </div>
      <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed space-y-2">
        {children}
      </div>
    </aside>
  );
}

export default BlogCallout;

