import type { Metadata } from 'next';
import TripClientView from './tripClient';
import type { Trip, Post } from '../types/trip';
import { sampleTrip } from '../types/sampleTrip';
import { getSupabaseConfig } from '../lib/supabaseConfig';

interface PageProps {
  params: Promise<{ tripId: string }>;
}

async function fetchTripData(tripId: string): Promise<{ trip: Trip; isFallback: boolean }> {
  // If explicitly requesting sample/demo, return sampleTrip
  if (tripId === 'sample' || tripId === 'preview' || tripId === sampleTrip.id) {
    return { trip: sampleTrip, isFallback: false };
  }

  const { supabaseUrl, serviceRoleKey } = getSupabaseConfig();

  if (serviceRoleKey) {
    const cleanUrl = supabaseUrl;
    const headers = {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    };

    try {
      // 1. Fetch trip from Supabase
      const tripRes = await fetch(
        `${cleanUrl}/rest/v1/trips?id=eq.${encodeURIComponent(tripId)}&select=*`,
        { headers, cache: 'no-store' }
      );

      if (tripRes.ok) {
        const trips = await tripRes.json();
        if (Array.isArray(trips) && trips.length > 0) {
          const trip = trips[0];
          let posts: Post[] = [];

          // 2. Try fetching posts via trip_items
          try {
            const itemsRes = await fetch(
              `${cleanUrl}/rest/v1/trip_items?trip_id=eq.${encodeURIComponent(tripId)}&select=post_id`,
              { headers, cache: 'no-store' }
            );
            if (itemsRes.ok) {
              const items = await itemsRes.json();
              if (Array.isArray(items) && items.length > 0) {
                const postIds = items
                  .map((it: { post_id: string }) => `"${it.post_id}"`)
                  .join(',');
                const postsRes = await fetch(
                  `${cleanUrl}/rest/v1/posts?id=in.(${postIds})&order=created_at.asc&select=*`,
                  { headers, cache: 'no-store' }
                );
                if (postsRes.ok) {
                  posts = await postsRes.json();
                }
              }
            }
          } catch (err) {
            console.warn('Error fetching trip_items:', err);
          }

          // 3. Fallback: Query posts by user_id and dates if trip_items didn't have posts
          if (posts.length === 0 && trip.user_id && trip.created_at) {
            try {
              let dateFilter = `created_at=gte.${encodeURIComponent(trip.created_at)}`;
              if (trip.ended_at) {
                dateFilter += `&created_at=lte.${encodeURIComponent(trip.ended_at)}`;
              }
              const datePostsRes = await fetch(
                `${cleanUrl}/rest/v1/posts?user_id=eq.${encodeURIComponent(trip.user_id)}&${dateFilter}&order=created_at.asc&select=*`,
                { headers, cache: 'no-store' }
              );
              if (datePostsRes.ok) {
                posts = await datePostsRes.json();
              }
            } catch (err) {
              console.warn('Error fetching posts by date:', err);
            }
          }

          return {
            trip: {
              id: trip.id,
              user_id: trip.user_id,
              name: trip.name || 'Trip',
              description: trip.description || '',
              created_at: trip.created_at,
              ended_at: trip.ended_at ?? null,
              posts: Array.isArray(posts) ? posts : [],
            },
            isFallback: false,
          };
        }
      }
    } catch (err) {
      console.error('Error querying Supabase for trip:', err);
    }
  }

  // Fallback to sampleTrip if trip could not be found or fetched
  return { trip: sampleTrip, isFallback: true };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tripId } = await params;
  return {
    title: `Caravyn - Trip ${tripId.slice(0, 8)}`,
    description: 'Explore this travel journey on Caravyn and join the Winter 2026 beta.',
  };
}

export default async function TripPage({ params }: PageProps) {
  const { tripId } = await params;
  const decodedTripId = decodeURIComponent(tripId);
  const { trip, isFallback } = await fetchTripData(decodedTripId);

  return (
    <TripClientView
      trip={trip}
      tripId={decodedTripId}
      isFallback={isFallback}
    />
  );
}

