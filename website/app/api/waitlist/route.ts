import { NextResponse } from 'next/server';

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

    // 1. Attempt to call NestJS backend if available
    const backendUrls = [
      process.env.BACKEND_INTERNAL_URL,
      'http://localhost:3000',
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
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://coeythfyfwzrwzuqowfe.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is missing.');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const headers = {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    };

    const baseUrl = supabaseUrl.replace(/\/+$/, '');

    // Try table options in order:
    // 1) 'waitlisted' (matching backend/src/users/waitlist/waitlist.service.ts)
    // 2) 'waitlist_user' (existing website fallback)
    // 3) 'waitlist' (users.service.ts fallback)
    const attempts = [
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
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
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


