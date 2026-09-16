'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getMediaUrl } from '../../map/map';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MiniMapPostProps {
  latitude: number;
  longitude: number;
  title: string;
  subtitle?: string;
  imgSrc?: string;
  zoom?: number;
  height?: string;
  caption?: string;
  className?: string;
}

export function MiniMapPost({
  latitude,
  longitude,
  title,
  subtitle,
  imgSrc,
  zoom = 14,
  height = '260px',
  caption,
  className = '',
}: MiniMapPostProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const resolvedImgSrc = getMediaUrl(imgSrc);

  useEffect(() => {
    if (!mapContainer.current) return;

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (isNaN(lat) || isNaN(lng)) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom,
      attributionControl: false,
    });
    mapRef.current = map;

    // Custom Caravyn Pin Marker
    const el = document.createElement('div');
    el.className = 'relative flex items-center justify-center';
    el.style.width = '44px';
    el.style.height = '58px';
    el.style.cursor = 'pointer';

    const card = document.createElement('div');
    card.style.position = 'relative';
    card.style.width = '100%';
    card.style.height = '100%';
    card.style.borderRadius = '9px';
    card.style.border = '3px solid white';
    card.style.boxShadow = '0 4px 12px rgba(75, 36, 146, 0.4)';
    card.style.backgroundColor = '#4B2492';
    card.style.transition = 'transform 0.15s ease';

    if (resolvedImgSrc) {
      card.style.backgroundImage = `url("${resolvedImgSrc}")`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      const testImg = new Image();
      testImg.onerror = () => {
        card.style.backgroundImage = 'none';
        card.style.backgroundColor = '#4B2492';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        `;
      };
      testImg.src = resolvedImgSrc;
    } else {
      card.style.display = 'flex';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'center';
      card.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      `;
    }

    el.appendChild(card);

    el.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.15)';
    });
    el.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });

    const popupHtml = `
      <div style="max-width:180px">
        ${resolvedImgSrc ? `<img src="${resolvedImgSrc}" alt="${title}" style="width:100%;border-radius:6px;margin-bottom:6px;display:block" onerror="this.style.display='none'" />` : ''}
        <div style="font-size:13px;font-weight:700;color:#111;margin-bottom:2px">${title}</div>
        ${subtitle ? `<div style="font-size:11px;color:#666">${subtitle}</div>` : ''}
      </div>
    `;
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml);

    new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);

    return () => map.remove();
  }, [latitude, longitude, title, subtitle, resolvedImgSrc, zoom]);

  return (
    <div className={`my-8 max-w-3xl mx-auto ${className}`}>
      <div className="relative overflow-hidden rounded-2xl shadow-md border border-gray-200/80 dark:border-zinc-800/80 bg-gray-100 dark:bg-zinc-900">
        {/* Location Info Card Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-2.5 rounded-xl shadow-md border border-gray-200/70 dark:border-zinc-700/70 max-w-[85%] sm:max-w-sm">
          <div
            style={{ backgroundColor: 'rgba(75, 36, 146, 0.12)', color: '#4B2492' }}
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-[#4B2492]/25 dark:text-purple-300"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {title}
            </span>
            {subtitle && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div ref={mapContainer} style={{ width: '100%', height }} />
      </div>

      {caption && (
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
}

export default MiniMapPost;
