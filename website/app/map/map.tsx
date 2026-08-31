// app/trips/[tripId]/map.tsx
'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Trip } from '../types/trip';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function Map({ trip }: { trip: Trip }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Filter out any posts missing coordinates
    const posts = trip.posts.filter((p) => p.latitude != null && p.longitude != null);

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
      center: [posts[0].lng, posts[0].lat],
      zoom: 10,
    });
    mapRef.current = map;

    const bounds = new mapboxgl.LngLatBounds();

    posts.forEach((post) => {
      const imgSrc = post.media_type;
      if (!imgSrc) return;

      const el = document.createElement('div');
      el.style.width = '48px';
      el.style.height = '48px';
      el.style.borderRadius = '50%';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.4)';
      el.style.backgroundImage = `url(${imgSrc})`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.cursor = 'pointer';

      const popupHtml = `
        <div style="max-width:200px">
          <img src="${imgSrc}" style="width:100%;border-radius:6px;margin-bottom:6px;display:block" />
          <div style="font-size:12px;color:#666">
            ${new Date(post.created_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat([post.longitude, post.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(popupHtml))
        .addTo(map);

      bounds.extend([post.longitude, post.latitude]);
    });

    if (posts.length > 1) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 14 });
    }

    return () => map.remove();
  }, [trip]);

  return <div ref={mapContainer} style={{ width: '100%', height: '70vh' }} />;
}