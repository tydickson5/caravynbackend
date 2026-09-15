import { NextResponse } from 'next/server';
import { getSupabaseConfig } from '../../lib/supabaseConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      betaTesting = true,
      bestTravelExperience = '',
      nextTrip = '',
    } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const isBetaTesting = Boolean(betaTesting);
    const cleanBestExp = typeof bestTravelExperience === 'string' ? bestTravelExperience.trim() : '';
    const cleanNextTrip = typeof nextTrip === 'string' ? nextTrip.trim() : '';

    // 1. Attempt to call NestJS backend if available (only in development or if BACKEND_INTERNAL_URL is set)
    const backendUrls = [
      process.env.BACKEND_INTERNAL_URL,
      process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : null,
    ].filter(Boolean) as string[];

    for (const backendUrl of backendUrls) {
      try {
        const backendRes = await fetch(`${backendUrl.replace(/\/+$/, '')}/waitlistUser/waitlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: cleanEmail,
            betaTesting: isBetaTesting,
            bestTravelExperience: cleanBestExp,
            nextTrip: cleanNextTrip,
          }),
          signal: AbortSignal.timeout(2500),
        });

        if (backendRes.ok) {
          const data = await backendRes.json();
          return NextResponse.json({ success: true, data });
        }
      } catch {
        // Backend not reachable or timed out, continue to direct Supabase insert
      }
    }

    // 2. Direct Supabase fallback
    const { supabaseUrl, apiKey, serviceRoleKey } = getSupabaseConfig();
    const token = serviceRoleKey || apiKey;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    };
    if (token) {
      headers['apikey'] = token;
      headers['Authorization'] = `Bearer ${token}`;
    }

    const baseUrl = supabaseUrl.replace(/\/+$/, '');

    // Try table options in order (waitlist_user is primary in Supabase schema):
    const attempts = [
      {
        url: `${baseUrl}/rest/v1/waitlist_user`,
        payload: {
          email: cleanEmail,
          beta_testing: isBetaTesting,
          best_travel_experience: cleanBestExp,
          next_trip: cleanNextTrip,
        },
      },
      {
        url: `${baseUrl}/rest/v1/waitlisted`,
        payload: {
          email: cleanEmail,
          beta_testing: isBetaTesting,
          best_travel_experience: cleanBestExp,
          next_trip: cleanNextTrip,
        },
      },
      {
        url: `${baseUrl}/rest/v1/waitlist_user`,
        payload: {
          email: cleanEmail,
          beta_testing: isBetaTesting,
        },
      },
      {
        url: `${baseUrl}/rest/v1/waitlist`,
        payload: {
          email: cleanEmail,
        },
      },
    ];

    let lastError = '';
    for (const attempt of attempts) {
      try {
        const res = await fetch(attempt.url, {
          method: 'POST',
          headers,
          body: JSON.stringify(attempt.payload),
        });

        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ success: true, data });
        } else {
          lastError = await res.text();
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          lastError = err.message;
        }
      }
    }

    console.error('All waitlist insertion attempts failed:', lastError);
    const isRlsError = lastError.includes('row-level security') || lastError.includes('42501');
    const isJwtError = lastError.includes('JWT') || lastError.includes('token') || lastError.includes('Invalid API key');

    let errorMessage = 'Failed to submit application. Please try again.';
    if (isRlsError) {
      errorMessage = 'Database permission error: please verify SUPABASE_SERVICE_ROLE_KEY is configured in your environment or enable public waitlist insert in Supabase.';
    } else if (isJwtError) {
      errorMessage = 'Authentication error: please verify your Supabase API keys in your environment variables.';
    }

    return NextResponse.json(
      { error: errorMessage, details: process.env.NODE_ENV !== 'production' ? lastError : undefined },
      { status: 500 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}


