'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Trip, Post } from '../../types/trip';
import { sampleTrip } from '../../types/sampleTrip';
import { getMediaUrl } from '../../map/map';
import { getSupabaseConfig } from '../../lib/supabaseConfig';
import Link from 'next/link';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MiniMapTripProps {
  tripId?: string;
  trip?: Trip;
  posts?: Post[];
  title?: string;
  height?: string;
  caption?: string;
  showFullTripLink?: boolean;
  className?: string;
}

export function MiniMapTrip({
  tripId,
  trip: initialTrip,
  posts: initialPosts,
  title,
  height = '340px',
  caption,
  showFullTripLink = true,
  className = '',
}: MiniMapTripProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(initialTrip || null);
  const [loading, setLoading] = useState(!initialTrip && !initialPosts && Boolean(tripId));

  // Load trip by ID if provided and no trip passed
  useEffect(() => {
    if (initialTrip) {
      setCurrentTrip(initialTrip);
      return;
    }
    if (!tripId) {
      setCurrentTrip(sampleTrip);
      return;
    }

    let isMounted = true;
    async function loadTrip() {
      try {
        const { supabaseUrl, apiKey, serviceRoleKey } = getSupabaseConfig();
        const token = serviceRoleKey || apiKey;
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) {
          headers['apikey'] = token;
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(
          `${supabaseUrl}/rest/v1/trips?id=eq.${encodeURIComponent(tripId!)}&select=*`,
          { headers }
        );
        if (res.ok) {
          const trips = await res.json();
          if (trips && trips.length > 0) {
            const t = trips[0];
            let posts: Post[] = [];

            if (t.user_id && t.created_at) {
              let dateFilter = `created_at=gte.${encodeURIComponent(t.created_at)}`;
              if (t.ended_at) dateFilter += `&created_at=lte.${encodeURIComponent(t.ended_at)}`;
              const postRes = await fetch(
                `${supabaseUrl}/rest/v1/posts?user_id=eq.${encodeURIComponent(t.user_id)}&${dateFilter}&order=created_at.asc&select=*`,
                { headers }
              );
              if (postRes.ok) posts = await postRes.json();
            }

            if (isMounted) {
              setCurrentTrip({
                id: t.id,
                user_id: t.user_id,
                name: t.name || 'Trip Route',
                description: t.description || '',
                created_at: t.created_at,
                ended_at: t.ended_at ?? null,
                posts: Array.isArray(posts) ? posts : [],
              });
            }
          }
        }
      } catch (err) {
        console.warn('MiniMapTrip failed to fetch, using sample:', err);
        if (isMounted) setCurrentTrip(sampleTrip);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTrip();
    return () => {
      isMounted = false;
    };
  }, [tripId, initialTrip]);

  // Render Mapbox map
  useEffect(() => {
    if (!mapContainer.current) return;

    const posts = (initialPosts || currentTrip?.posts || [])
      .filter((p) => p.latitude != null && p.longitude != null && !(Number(p.latitude) === 0 && Number(p.longitude) === 0))
      .slice()
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    if (posts.length === 0) {
      const emptyMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.4194, 37.7749],
        zoom: 2,
        interactive: true,
      });
      mapRef.current = emptyMap;
      return () => emptyMap.remove();
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [Number(posts[0].longitude), Number(posts[0].latitude)],
      zoom: 10,
    });
    mapRef.current = map;

    // Route line
    const addRoute = () => {
      if (posts.length < 2) return;
      if (map.getSource('mini-route-line')) return;

      map.addSource('mini-route-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: posts.map((p) => [Number(p.longitude), Number(p.latitude)]),
          },
        },
      });

      map.addLayer({
        id: 'mini-route-casing',
        type: 'line',
        source: 'mini-route-line',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#ffffff',
          'line-width': 5,
          'line-opacity': 0.9,
        },
      });

      map.addLayer({
        id: 'mini-route-inner',
        type: 'line',
        source: 'mini-route-line',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#4B2492',
          'line-width': 3,
          'line-opacity': 0.95,
        },
      });
    };

    if (map.isStyleLoaded()) {
      addRoute();
    } else {
      map.on('load', addRoute);
    }

    const bounds = new mapboxgl.LngLatBounds();

    posts.forEach((post, index) => {
      const lng = Number(post.longitude);
      const lat = Number(post.latitude);
      const imgSrc = getMediaUrl(post.media_url);

      const el = document.createElement('div');
      el.style.width = '34px';
      el.style.height = '46px';
      el.style.cursor = 'pointer';
      el.style.zIndex = `${10 + index}`;

      const card = document.createElement('div');
      card.style.position = 'relative';
      card.style.width = '100%';
      card.style.height = '100%';
      card.style.borderRadius = '8px';
      card.style.border = '2.5px solid white';
      card.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      card.style.backgroundColor = '#4B2492';
      card.style.transition = 'transform 0.15s ease';

      if (imgSrc) {
        card.style.backgroundImage = `url("${imgSrc}")`;
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          `;
        };
        testImg.src = imgSrc;
      } else {
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        `;
      }

      el.appendChild(card);

      el.addEventListener('mouseenter', () => {
        el.style.zIndex = '999';
        card.style.transform = 'scale(1.15)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.zIndex = `${10 + index}`;
        card.style.transform = 'scale(1)';
      });

      const popupHtml = `
        <div style="max-width:180px">
          ${imgSrc ? `<img src="${imgSrc}" alt="${post.caption || 'Stop'}" style="width:100%;border-radius:6px;margin-bottom:6px;display:block" onerror="this.style.display='none'" />` : ''}
          ${post.caption ? `<div style="font-size:12px;font-weight:700;color:#111;margin-bottom:2px">${post.caption}</div>` : ''}
          <div style="font-size:11px;color:#666">${new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
        </div>
      `;
      const popup = new mapboxgl.Popup({ offset: 20 }).setHTML(popupHtml);

      new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);

      bounds.extend([lng, lat]);
    });

    if (posts.length > 1) {
      map.fitBounds(bounds, { padding: 45, maxZoom: 13 });
    }

    return () => map.remove();
  }, [currentTrip, initialPosts]);

  const activeTitle = title || currentTrip?.name || 'Journey Route';
  const postCount = (initialPosts || currentTrip?.posts || []).filter(
    (p) => p.latitude != null && p.longitude != null && !(Number(p.latitude) === 0 && Number(p.longitude) === 0)
  ).length;

  const targetTripId = tripId || currentTrip?.id;

  return (
    <div className={`my-8 max-w-3xl mx-auto ${className}`}>
      <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-200/80 dark:border-zinc-800/80 bg-gray-100 dark:bg-zinc-900">
        {/* Top Header Overlay Pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-gray-200/70 dark:border-zinc-700/70 text-xs">
          <span
            style={{ backgroundColor: '#4B2492' }}
            className="w-2 h-2 rounded-full animate-pulse"
          />
          <span className="font-bold text-gray-900 dark:text-white truncate max-w-[180px] sm:max-w-[260px]">
            {activeTitle}
          </span>
          {postCount > 0 && (
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              ({postCount} {postCount === 1 ? 'stop' : 'stops'})
            </span>
          )}
        </div>

        {/* View Full Route Button */}
        {showFullTripLink && targetTripId && (
          <div className="absolute top-3 right-3 z-10">
            <Link
              href={`/${targetTripId}`}
              target="_blank"
              style={{ backgroundColor: '#4B2492' }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Full Route</span>
              <span>&rarr;</span>
            </Link>
          </div>
        )}

        {/* Interactive Mapbox Container */}
        <div ref={mapContainer} style={{ width: '100%', height }} />

        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur-sm text-xs text-gray-500">
            Loading route...
          </div>
        )}
      </div>

      {caption && (
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
}

export default MiniMapTrip;
