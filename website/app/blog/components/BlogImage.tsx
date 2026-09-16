'use client';

import React, { useState } from 'react';
import { getMediaUrl } from '../../map/map';

interface BlogImageProps {
  src: string;
  alt?: string;
  caption?: string;
  layout?: 'standard' | 'wide' | 'full';
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | 'auto';
  className?: string;
}

export function BlogImage({
  src,
  alt = 'Travel story photo',
  caption,
  layout = 'standard',
  aspectRatio = 'auto',
  className = '',
}: BlogImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const resolvedSrc = getMediaUrl(src) || src;

  const layoutClasses = {
    standard: 'my-8 max-w-3xl mx-auto',
    wide: 'my-10 max-w-4xl -mx-0 sm:-mx-6 lg:-mx-12',
    full: 'my-12 w-full',
  }[layout];

  const aspectClasses = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    auto: '',
  }[aspectRatio];

  return (
    <figure className={`${layoutClasses} ${className}`}>
      <div
        className={`relative overflow-hidden rounded-2xl shadow-md border border-gray-200/80 dark:border-zinc-800/80 bg-gray-100 dark:bg-zinc-900 ${aspectClasses}`}
      >
        <img
          src={resolvedSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-zinc-600 animate-pulse text-xs">
            Loading photo...
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2.5 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default BlogImage;
