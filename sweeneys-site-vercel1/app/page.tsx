import React, { useMemo } from "react";

const BRAND = {
  name: "Sweeney’s",
  tagline: "Neighborhood bar • live nights • good people",
  address: "13639 Philmont Ave, Philadelphia, PA",
  phone: "(215) 677-3177",
};

const FACEBOOK_PAGE_URL = "https://www.facebook.com/sweeneysphilly";

// Menu images live in /public (easy to replace later)
const MENU_IMAGES = ["/menu-1.jpg", "/menu-2.jpg"];

function FacebookEventsEmbed({ pageUrl }: { pageUrl: string }) {
  const src = useMemo(() => {
    const params = new URLSearchParams({
      href: pageUrl,
      tabs: "events",
      width: "500",
      height: "680",
      small_header: "true",
      adapt_container_width: "true",
      hide_cover: "false",
      show_facepile: "false",
    });
    return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
  }, [pageUrl]);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="p-4 border-b border-neutral-200">
        <div className="text-base font-semibold">Upcoming events</div>
        <div className="text-sm text-neutral-600">
          Pulled from Facebook (auto-updates, past events drop off).
        </div>
      </div>
      <div className="w-full">
        <iframe
          title="Sweeney’s Facebook Events"
          src={src}
          width="100%"
          height="680"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
      <div className="p-4 text-xs text-neutral-600">
        If the embed shows blank: ensure your Page has Events enabled and is public.
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#events", label: "Events" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#" className="font-semibold tracking-tight">
            {BRAND.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-neutral-700 hover:text-neutral-950">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Call: {BRAND.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="h-[520px] w-full bg-gradient-to-b from-neutral-50 to-white" />
      </div>
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
              <span className="h-2 w-2 rounded-full bg-neutral-900" />
              Philly neighborhood bar
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              A place to meet, drink, and catch a great night of music.
            </h1>
            <p className="mt-4 text-base md:text-lg text-neutral-700 max-w-2xl">
              {BRAND.tagline}. Walk in for a beer, stay for the vibe — from acoustic nights to full-band shows.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#events"
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                See upcoming events
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                View menu
              </a>
            </div>
            <div className="mt-6 text-sm text-neutral-700">
              <div className="font-medium">{BRAND.address}</div>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-5">
              <div className="text-sm font-semibold">Quick info</div>
              <div className="mt-3 grid grid-cols-1 gap-3 text-sm">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <div className="font-medium">Reservations</div>
                  <div className="text-neutral-700">Call {BRAND.phone} (limited tables on event nights).</div>
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <div className="font-medium">Events</div>
                  <div className="text-neutral-700">Updated automatically from Facebook Events.</div>
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <div className="font-medium">Menu</div>
                  <div className="text-neutral-700">Update by swapping the menu photos in the /public folder.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-7">
        <p className="text-neutral-800 leading-relaxed">
          Sweeney’s is a local Philly spot built for good nights and familiar faces — the kind of bar where the
          staff knows your usual, the crowd feels like neighbors, and the music is always part of the story.
          We host acoustic evenings, ticketed shows, and community hangouts, with a simple goal: keep it warm,
          real, and fun.
        </p>
        <p className="mt-4 text-neutral-800 leading-relaxed">
          Whether you’re coming in for a quick drink after work, meeting friends for a weekend catch-up, or
          showing up to sing along with a band you love — you’ll feel at home. If you’re planning a private
          event or want to bring your act to the stage, reach out — we’re always open to great ideas.
        </p>
      </div>
      <div className="md:col-span-5">
        <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-5">
          <div className="text-sm font-semibold">Contact</div>
          <div className="mt-3 text-sm text-neutral-700">
            <div className="font-medium">Phone</div>
            <a className="underline" href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}>{BRAND.phone}</a>
          </div>
          <div className="mt-3 text-sm text-neutral-700">
            <div className="font-medium">Address</div>
            <div>{BRAND.address}</div>
          </div>
          <div className="mt-5 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
            Tip: Add a Google Maps embed here when you’re ready.
          </div>
        </div>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-5">
          <div className="text-sm font-semibold">Menu</div>
          <p className="mt-2 text-sm text-neutral-700">
            Easy updates: replace the two image files in the <span className="font-medium">/public</span> folder
            (menu-1.jpg and menu-2.jpg). No redesign needed.
          </p>
          <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
            Want a single PDF button instead? We can add “View Menu (PDF)” and swap one file whenever you update.
          </div>
        </div>
      </div>
      <div className="md:col-span-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MENU_IMAGES.map((src, idx) => (
            <a key={idx} href={src} target="_blank" rel="noreferrer" className="block">
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <img src={src} alt={`Menu ${idx + 1}`} className="w-full object-contain bg-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Events() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-5">
          <div className="text-sm font-semibold">Events</div>
          <p className="mt-2 text-sm text-neutral-700">
            We create all events on Facebook. The list here stays current automatically — upcoming at the top,
            past events drop off.
          </p>
          <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
            If you ever want more control (filters, ticket buttons, categories), we can add a dedicated
            events feed powered by a calendar.
          </div>
        </div>
      </div>
      <div className="md:col-span-8">
        <FacebookEventsEmbed pageUrl={FACEBOOK_PAGE_URL} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 text-sm text-neutral-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-neutral-900">{BRAND.name}</div>
            <div>{BRAND.address}</div>
          </div>
          <div className="flex items-center gap-4">
            <a className="underline" href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a className="underline" href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}>
              {BRAND.phone}
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-neutral-500">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Nav />
      <Hero />

      <Section id="about" title="About the club">
        <About />
      </Section>

      <Section id="menu" title="Menu">
        <Menu />
      </Section>

      <Section id="events" title="Events">
        <Events />
      </Section>

      <Footer />
    </div>
  );
}
