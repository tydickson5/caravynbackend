'use client';

import React from 'react';
import { getMediaUrl } from '../../map/map';

interface BlogVideoProps {
  src: string;
  poster?: string;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export function BlogVideo({
  src,
  poster,
  caption,
  autoPlay = false,
  loop = false,
  muted = false,
  className = '',
}: BlogVideoProps) {
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isVimeo = src.includes('vimeo.com');

  const resolvedSrc = getMediaUrl(src) || src;
  const resolvedPoster = poster ? getMediaUrl(poster) || poster : undefined;

  // Extract YouTube embed URL
  const getYouTubeEmbed = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  return (
    <figure className={`my-8 max-w-3xl mx-auto ${className}`}>
      <div className="relative overflow-hidden rounded-2xl shadow-md border border-gray-200/80 dark:border-zinc-800/80 aspect-[16/9] bg-black">
        {isYouTube ? (
          <iframe
            src={getYouTubeEmbed(src)}
            title="Video player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isVimeo ? (
          <iframe
            src={src}
            title="Vimeo video player"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={resolvedSrc}
            poster={resolvedPoster}
            controls
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            className="w-full h-full object-contain"
          />
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

export default BlogVideo;
