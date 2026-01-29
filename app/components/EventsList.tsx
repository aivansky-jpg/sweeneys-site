"use client";

import React from "react";

type FbEvent = {
  id: string;
  name: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  cover_url?: string;
  ticket_uri?: string;
  place?: {
    name?: string;
    location?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
    };
  };
};

function formatDateTime(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function short(s?: string, max = 140) {
  if (!s) return "";
  const clean = s.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max - 1) + "…" : clean;
}

export function EventsList({ pageUrl }: { pageUrl: string }) {
  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState<FbEvent[]>([]);
  const [hasApi, setHasApi] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;

        if (json?.ok && Array.isArray(json?.events)) {
          setHasApi(true);
          setEvents(json.events);
        } else {
          setHasApi(false);
        }
      } catch {
        if (!cancelled) setHasApi(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="text-white/70 text-sm">Loading events…</div>;
  }

  const now = Date.now();
  const upcoming = events
    .filter((e) => (e.start_time ? new Date(e.start_time).getTime() >= now - 1000 * 60 * 60 * 12 : true))
    .sort((a, b) => {
      const ta = a.start_time ? new Date(a.start_time).getTime() : 0;
      const tb = b.start_time ? new Date(b.start_time).getTime() : 0;
      return ta - tb;
    });

  if (hasApi && upcoming.length > 0) {
    return (
      <div className="grid gap-4">
        {upcoming.map((ev) => (
          <a
            key={ev.id}
            href={`https://www.facebook.com/events/${ev.id}`}
            target="_blank"
            rel="noreferrer"
            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <div className="h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-white/5">
              {ev.cover_url ? (
                <img
                  src={ev.cover_url}
                  alt={ev.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <div className="text-white font-semibold leading-tight">{ev.name}</div>
                <div className="text-xs text-white/60">{formatDateTime(ev.start_time)}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-white/70 text-sm">
        {hasApi ? "No upcoming events." : "Events are unavailable right now."}
      </div>
      <a
        className="text-sm underline text-white/80 hover:text-white"
        href={pageUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open Facebook page
      </a>
    </div>
  );
}
