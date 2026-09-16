import React from 'react';

interface BlogHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  date: string;
  readTime?: string;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  coverImage?: {
    src: string;
    alt?: string;
    caption?: string;
  };
}

export function BlogHeader({
  title,
  subtitle,
  category = 'Travel Story',
  date,
  readTime = '4 min read',
  author = {
    name: 'Caravyn Team',
    role: 'Creator & Explorer',
  },
  coverImage,
}: BlogHeaderProps) {
  return (
    <header className="mb-10 sm:mb-12">
      {/* Category badge */}
      <div className="mb-4">
        <span
          style={{
            backgroundColor: 'rgba(75, 36, 146, 0.12)',
            color: '#4B2492',
          }}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider dark:text-purple-300 dark:bg-[#4B2492]/25"
        >
          {category}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-4">
        {title}
      </h1>

      {/* Subtitle / Lead Excerpt */}
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-normal">
          {subtitle}
        </p>
      )}

      {/* Author & Meta Row */}
      <div className="flex items-center justify-between border-y border-gray-100 dark:border-zinc-800 py-4 mb-8">
        <div className="flex items-center gap-3">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
            />
          ) : (
            <div
              style={{ backgroundColor: '#4B2492' }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
            >
              {author.name.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
              {author.name}
            </span>
            {author.role && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {author.role}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{date}</time>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>

      {/* Optional Cover Image */}
      {coverImage && (
        <figure className="my-8">
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200/80 dark:border-zinc-800/80 aspect-[16/9] bg-gray-100 dark:bg-zinc-900">
            <img
              src={coverImage.src}
              alt={coverImage.alt || title}
              className="w-full h-full object-cover"
            />
          </div>
          {coverImage.caption && (
            <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2.5 italic">
              {coverImage.caption}
            </figcaption>
          )}
        </figure>
      )}
    </header>
  );
}

export default BlogHeader;

