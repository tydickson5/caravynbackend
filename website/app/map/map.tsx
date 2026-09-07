// app/trips/[tripId]/map.tsx
'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Trip } from '../types/trip';

import { sampleTrip } from '../types/sampleTrip';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export function getMediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://coeythfyfwzrwzuqowfe.supabase.co';
  const bucket =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'post-media';
  const cleanPath = path.replace(/^\/+/, '');
  return `${supabaseUrl.replace(/\/+$/, '')}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

export default function Map({
  trip = sampleTrip,
  style,
}: {
  trip?: Trip;
  style?: React.CSSProperties;
} = {}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Filter out any posts missing coordinates and sort in order created
    const posts = (trip?.posts?.filter((p) => p.latitude != null && p.longitude != null) ?? [])
      .slice()
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    if (posts.length === 0) {
      // No posts to show — still render an empty map somewhere reasonable
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.4194, 37.7749],
        zoom: 2,
      });
      mapRef.current = map;
      return () => map.remove();
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [posts[0].longitude, posts[0].latitude],
      zoom: 10,
    });
    mapRef.current = map;

    // Add route line connecting the posts in chronological order
    const addRoute = () => {
      if (posts.length < 2) return;
      if (map.getSource('route-line')) return;

      map.addSource('route-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: posts.map((p) => [p.longitude, p.latitude]),
          },
        },
      });

      // White outline casing for visibility over map features
      map.addLayer({
        id: 'route-line-casing',
        type: 'line',
        source: 'route-line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ffffff',
          'line-width': 6,
          'line-opacity': 0.85,
        },
      });

      // Main colored route line
      map.addLayer({
        id: 'route-line-inner',
        type: 'line',
        source: 'route-line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#4B2492',
          'line-width': 3.5,
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

      const rawPath =
        post.media_url || (post.media_type && post.media_type.includes('/') ? post.media_type : null);
      const imgSrc = getMediaUrl(rawPath);

      // Outer wrapper: Mapbox GL positions this with translate(x, y) translate(-50%, -50%)
      const el = document.createElement('div');
      el.style.width = '42px';
      el.style.height = '56px';
      el.style.cursor = 'pointer';
      el.style.zIndex = `${10 + index}`;

      // Inner element: vertical rounded rectangle card
      const card = document.createElement('div');
      card.style.position = 'relative';
      card.style.width = '100%';
      card.style.height = '100%';
      card.style.borderRadius = '9px';
      card.style.border = '3px solid white';
      card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.35)';
      card.style.backgroundColor = imgSrc ? '#e2e8f0' : '#4B2492';
      card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';

      if (imgSrc) {
        card.style.backgroundImage = `url("${imgSrc}")`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
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

      // On hover, bring marker to front and subtly scale inner card
      el.addEventListener('mouseenter', () => {
        el.style.zIndex = '9999';
        card.style.transform = 'scale(1.12)';
        card.style.boxShadow = '0 4px 14px rgba(75, 36, 146, 0.45)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.zIndex = `${10 + index}`;
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.35)';
      });

      const popupHtml = `
        <div style="max-width:200px">
          ${imgSrc ? `<img src="${imgSrc}" alt="${post.caption || 'Post image'}" style="width:100%;border-radius:8px;margin-bottom:6px;display:block" />` : ''}
          ${post.caption ? `<div style="font-size:13px;font-weight:600;color:#111;margin-bottom:4px">${post.caption}</div>` : ''}
          <div style="font-size:12px;color:#666">
            ${new Date(post.created_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      `;

      new mapboxgl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(popupHtml))
        .addTo(map);

      bounds.extend([lng, lat]);
    });

    if (posts.length > 1) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 14 });
    }

    return () => map.remove();
  }, [trip]);

  return <div ref={mapContainer} style={{ width: '100%', height: '70vh', ...style }} />;
}