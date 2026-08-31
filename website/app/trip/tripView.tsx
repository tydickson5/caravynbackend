// app/trips/[tripId]/page.tsx
import Map from '../map/map';
import type { Trip, Post } from '../types/trip';

async function getTrip(tripId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/get`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tripId }),
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

async function getPosts(user_id: string, created_at: string, ended_at: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/get`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, created_at, ended_at }),
    cache: 'no-store',
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function TripPage({ params }: { params: { tripId: string } }) {
  const trip = await getTrip(params.tripId);

  if (!trip) {
    return <div style={{ padding: '2rem' }}>Trip not found.</div>;
  }

  const posts: Post[] = await getPosts(trip.user_id, trip.created_at, trip.ended_at);

  const tripWithPosts: Trip = { ...trip, posts };

  return (
    <div>
      <div style={{ padding: '1rem 1.5rem' }}>
        <h1 style={{ margin: 0 }}>{tripWithPosts.name}</h1>
        <p style={{ color: '#666', marginTop: '0.25rem' }}>{tripWithPosts.description}</p>
      </div>
      <Map trip={tripWithPosts} />
    </div>
  );
}