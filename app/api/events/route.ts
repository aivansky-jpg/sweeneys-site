import { NextResponse } from "next/server";

// Facebook Graph API fetcher.
// Configure in Vercel (Project Settings -> Environment Variables):
//   FB_PAGE_ID      - Facebook Page ID (or page username like "sweeneysphilly")
//   FB_ACCESS_TOKEN - Facebook Page access token (created via Meta for Developers)
//
// If env vars are missing, this endpoint returns ok:false and the UI will fall back
// to an embedded Facebook Events widget.

export const revalidate = 300; // cache for 5 minutes (ISR-like)

export async function GET() {
  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_ACCESS_TOKEN;

  if (!pageId || !token) {
    return NextResponse.json({ ok: false, reason: "Missing FB_PAGE_ID / FB_ACCESS_TOKEN" }, { status: 200 });
  }

  // Graph API version can be bumped if needed.
  const url = new URL(`https://graph.facebook.com/v19.0/${pageId}/events`);
  url.searchParams.set(
    "fields",
    [
      "id",
      "name",
      "description",
      "start_time",
      "end_time",
      "place",
      "cover",
      "ticket_uri",
      "event_times",
    ].join(",")
  );
  url.searchParams.set("time_filter", "upcoming");
  url.searchParams.set("limit", "12");
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url.toString(), {
      // Keep data fresh but avoid hammering Facebook.
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { ok: false, reason: `Facebook API error (${res.status})`, details: text.slice(0, 500) },
        { status: 200 }
      );
    }

    const json = await res.json();

    // Normalize / keep only what we need.
    const events = (json?.data || []).map((e: any) => ({
      id: e.id,
      name: e.name,
      description: e.description,
      start_time: e.start_time,
      end_time: e.end_time,
      place: e.place,
      cover_url: e.cover?.source,
      ticket_uri: e.ticket_uri,
    }));

    return NextResponse.json({ ok: true, events }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, reason: "Fetch failed", details: String(err) }, { status: 200 });
  }
}
