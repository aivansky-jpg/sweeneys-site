import { NextResponse } from "next/server";

// Always fetch fresh data on the server.
export const dynamic = "force-dynamic";

// Facebook Graph API fetcher.
// Configure in Vercel (Project Settings -> Environment Variables):
//   FACEBOOK_PAGE_ID     - numeric Facebook Page ID
//   FACEBOOK_PAGE_TOKEN  - Page Access Token (NOT your personal user token)
//
// Backwards-compat (older zips):
//   FB_PAGE_ID / FB_ACCESS_TOKEN
//
// Note: We intentionally paginate to return *all* upcoming events, not just the
// first page.

// (No ISR caching here — tokens/events change and we want the latest.)

export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID ?? process.env.FB_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_TOKEN ?? process.env.FB_ACCESS_TOKEN;

  if (!pageId || !token) {
    return NextResponse.json(
      {
        ok: false,
        reason: "Missing FACEBOOK_PAGE_ID / FACEBOOK_PAGE_TOKEN",
        hint: "Add these in Vercel → Project Settings → Environment Variables, then redeploy.",
      },
      { status: 200 }
    );
  }

  const fields = [
    "id",
    "name",
    "description",
    "start_time",
    "end_time",
    "place",
    "cover",
    "ticket_uri",
    "event_times",
  ].join(",");

  // Fetch ALL upcoming events via pagination.
  const events: any[] = [];
  let after: string | undefined;
  let safety = 0;

  try {
    while (safety < 20) {
      safety += 1;

      // Graph API version can be bumped if needed.
      const url = new URL(`https://graph.facebook.com/v19.0/${pageId}/events`);
      url.searchParams.set("fields", fields);
      url.searchParams.set("time_filter", "upcoming");
      url.searchParams.set("limit", "100");
      if (after) url.searchParams.set("after", after);
      url.searchParams.set("access_token", token);

      const res = await fetch(url.toString(), { cache: "no-store" });

      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
          { ok: false, reason: `Facebook API error (${res.status})`, details: text.slice(0, 800) },
          { status: 200 }
        );
      }

      const json = await res.json();
      const chunk = json?.data || [];
      events.push(...chunk);

      after = json?.paging?.cursors?.after;
      const hasNext = Boolean(json?.paging?.next);
      if (!hasNext || !after || chunk.length === 0) break;
    }

    // Normalize / keep only what we need + ensure sorted by start_time (soonest first).
    const normalized = events
      .map((e: any) => ({
        id: e.id,
        name: e.name,
        description: e.description,
        start_time: e.start_time,
        end_time: e.end_time,
        place: e.place,
        cover_url: e.cover?.source,
        ticket_uri: e.ticket_uri,
      }))
      .sort((a: any, b: any) => {
        const ta = a.start_time ? Date.parse(a.start_time) : 0;
        const tb = b.start_time ? Date.parse(b.start_time) : 0;
        return ta - tb;
      });

    return NextResponse.json({ ok: true, events: normalized }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, reason: "Fetch failed", details: String(err) }, { status: 200 });
  }
}
