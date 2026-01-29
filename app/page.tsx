import React, { useMemo } from "react";

const BRAND = {
  name: "Sweeney’s",
  tagline: "Neighborhood bar • live nights • good people",
  address: "13639 Philmont Ave, Philadelphia, PA",
  phone: "(215) 677-3177",
  facebookPageUrl: "https://www.facebook.com/sweeneysphilly",
};

// Visuals (easy to swap later in /public)
const ASSETS = {
  cover: "/cover.png",
  logo: "/logo.png",
};

type MenuItem = { name: string; price?: string; note?: string };
type MenuSection = {
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

// Parsed from the menu photos you provided.
const MENU: MenuSection[] = [
  {
    title: "Our Famous Wings",
    subtitle: "Sauces: Mild, Cajun, Hot, Jerk, Hot Honey, BBQ, Honey BBQ, Sweet & Spicy, Honey Garlic, Sweet Chili, Garlic Parmesan (+$1)",
    items: [
      { name: "10 Classic Wings", price: "$15" },
      { name: "Boneless", price: "$14" },
    ],
  },
  {
    title: "Soup & Salads",
    items: [
      { name: "Chili", price: "$8" },
      { name: "Caesar Salad", price: "$8", note: "Add chicken $12 • shrimp $15" },
      { name: "BLT Salad", price: "$13", note: "Bacon, lettuce, tomato, grilled chicken, mixed cheese, ranch dressing" },
    ],
  },
  {
    title: "Appetizers",
    items: [
      { name: "Fries (sm.)", price: "$4" },
      { name: "Fries (reg.)", price: "$7" },
      { name: "Cheese Fries / Seasoned Fries", note: "Cajun, Bay, Salt & Pepper, or Garlic Parm (+$1)" },
      { name: "Potato Skins", price: "$10" },
      { name: "Onion Rings", price: "$10", note: "w/ Texas Petal Sauce" },
      { name: "Mozzarella Sticks", price: "$10" },
      { name: "Bavarian Pretzel", price: "$12" },
      { name: "Pretzel Sticks", price: "$9" },
      { name: "Jalapeño Poppers", price: "$10" },
      { name: "Loaded Chili Nachos", price: "$9" },
      { name: "Pizza Log", price: "$9" },
      { name: "Eggroll", price: "$12", note: "Cheese Steak or Buffalo Chicken" },
    ],
  },
  {
    title: "Seafood",
    items: [
      { name: "Calamari Rings", price: "$12" },
      { name: "Bang Bang Shrimp", price: "$15" },
      { name: "Thai Chili Shrimp", price: "$15" },
      { name: "Fish N’ Chips", price: "$15" },
    ],
  },
  {
    title: "Protein",
    items: [
      { name: "Chicken Tenders", price: "$12", note: "w/ fries" },
      { name: "Two Hot Dogs", price: "$7", note: "w/ relish" },
      { name: "Chili Dog", price: "$8" },
    ],
  },
  {
    title: "Tex Mex",
    subtitle: "Comes w/ salsa & sour cream",
    items: [
      { name: "Quesadillas (4 Cheese)", price: "$12" },
      { name: "Quesadillas (Chicken)", price: "$12" },
      { name: "Quesadillas (Steak)", price: "$13" },
    ],
  },
  {
    title: "Tacos",
    items: [
      { name: "Chicken", price: "$12" },
      { name: "Beef", price: "$13" },
      { name: "Bang Bang Shrimp", price: "$15" },
    ],
  },
  {
    title: "Burgers",
    subtitle: "8oz burger comes w/ fries and pickles",
    items: [
      { name: "Cheese Burger", price: "$16", note: "American cheese, lettuce, tomato" },
      { name: "BBQ Bacon Burger", price: "$17", note: "BBQ sauce, bacon, American cheese, lettuce, tomato" },
      { name: "Royal Burger", price: "$18", note: "Fried egg, bacon, American cheese, lettuce, tomato" },
      { name: "Onion Burger", price: "$18", note: "Grilled onion, onion ring, American cheese, garlic aioli" },
    ],
  },
  {
    title: "Cheese Steaks",
    items: [
      { name: "Philly Cheese Steak", price: "$14" },
      { name: "Chicken Cheese Steak", price: "$14", note: "Try it with Cajun seasoning!" },
    ],
  },
  {
    title: "Sliders",
    subtitle: "Comes w/ pickles and fries",
    items: [
      { name: "Cheese Burger Sliders", price: "$14" },
      { name: "Roast Beef Sliders", price: "$15" },
    ],
  },
  {
    title: "Sandwiches",
    subtitle: "Comes w/ pickles and fries",
    items: [
      { name: "Roast Beef Sandwich", price: "$13", note: "Roast beef, garlic aioli, American cheese, horseradish" },
      { name: "BLT", price: "$10" },
    ],
  },
  {
    title: "Flatbread Pizza",
    items: [
      { name: "Cheese", price: "$12" },
      { name: "Pepperoni", price: "$13" },
    ],
  },
  {
    title: "Wraps",
    items: [
      { name: "Chicken", price: "$12", note: "Grilled chicken, lettuce, tomato, cheddar cheese, choice of dressing" },
      { name: "Chicken Caesar", price: "$14", note: "Romaine, parmigiano, Caesar dressing" },
      { name: "Bang Bang Shrimp", price: "$12", note: "Breaded shrimp, cheddar cheese, lettuce, tomato, Bang Bang sauce" },
    ],
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FacebookEventsEmbed({ pageUrl }: { pageUrl: string }) {
  const src = useMemo(() => {
    const params = new URLSearchParams({
      href: pageUrl,
      tabs: "events",
      width: "500",
      height: "760",
      small_header: "true",
      adapt_container_width: "true",
      hide_cover: "true",
      show_facepile: "false",
    });
    return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
  }, [pageUrl]);

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
      <div className="p-5 border-b border-white/10">
        <div className="text-base font-semibold text-white">Upcoming events</div>
        <div className="text-sm text-white/70">
          This list is pulled from Facebook Events and updates automatically.
        </div>
      </div>
      <div className="w-full bg-black/20">
        <iframe
          title="Sweeney’s Facebook Events"
          src={src}
          width="100%"
          height="760"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
      <div className="p-5 text-xs text-white/60">
        If the list shows blank, open our Facebook page and check that Events are public.
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
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3">
            <img
              src={ASSETS.logo}
              alt={`${BRAND.name} logo`}
              className="h-9 w-auto rounded-md"
            />
            <span className="hidden sm:inline text-sm font-semibold tracking-tight text-white/90">
              {BRAND.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/75 hover:text-white transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
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
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={ASSETS.cover} alt="Sweeney’s" className="h-[640px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#060816]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,180,255,0.25),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Philly neighborhood bar
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Live music. Great drinks. The kind of place you’ll come back to.
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/75 max-w-2xl">
              {BRAND.tagline}. From acoustic nights to full-band shows — come for a drink, stay for the vibe.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#events"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                See upcoming events
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                View menu
              </a>
            </div>
            <div className="mt-6 text-sm text-white/70">
              <div className="font-medium text-white/90">{BRAND.address}</div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur p-5">
              <div className="text-sm font-semibold text-white">Quick info</div>
              <div className="mt-3 grid grid-cols-1 gap-3 text-sm">
                <div className="rounded-2xl bg-black/30 p-4 border border-white/10">
                  <div className="font-medium text-white">Reservations</div>
                  <div className="text-white/75">Call {BRAND.phone} (limited tables on event nights).</div>
                </div>
                <div className="rounded-2xl bg-black/30 p-4 border border-white/10">
                  <div className="font-medium text-white">Events</div>
                  <div className="text-white/75">Always up to date — pulled from Facebook Events.</div>
                </div>
                <div className="rounded-2xl bg-black/30 p-4 border border-white/10">
                  <div className="font-medium text-white">Kitchen</div>
                  <div className="text-white/75">Wings, burgers, tacos, sandwiches, and more.</div>
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
        <p className="text-white/80 leading-relaxed">
          Sweeney’s is a local Philly spot built for good nights and familiar faces — the kind of bar where the
          staff knows your usual, the crowd feels like neighbors, and live music is part of the story.
        </p>
        <p className="mt-4 text-white/80 leading-relaxed">
          We host acoustic evenings, ticketed shows, and community hangouts. Come in for a quick drink after
          work, meet friends for a weekend catch-up, or show up to sing along with a band you love.
        </p>
      </div>
      <div className="md:col-span-5">
        <div className="rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur p-5">
          <div className="text-sm font-semibold text-white">Contact</div>
          <div className="mt-3 text-sm text-white/75">
            <div className="font-medium text-white">Phone</div>
            <a className="underline" href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}>{BRAND.phone}</a>
          </div>
          <div className="mt-3 text-sm text-white/75">
            <div className="font-medium text-white">Address</div>
            <div>{BRAND.address}</div>
          </div>
          <div className="mt-5 rounded-2xl bg-black/30 p-4 text-sm text-white/70 border border-white/10">
            Want directions? Add a Google Maps button any time.
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ section }: { section: MenuSection }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-white">{section.title}</div>
          {section.subtitle ? (
            <div className="mt-1 text-xs text-white/60">{section.subtitle}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {section.items.map((it, idx) => (
          <div key={idx} className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-white/85">{it.name}</div>
              {it.note ? <div className="text-xs text-white/60">{it.note}</div> : null}
            </div>
            {it.price ? (
              <div className="text-sm font-semibold text-cyan-200 whitespace-nowrap">{it.price}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div>
      <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 text-sm text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
        <div className="font-semibold text-white">Menu</div>
        <div className="mt-1">
          Written menu (easy to update). If you change prices/items, just edit <span className="font-medium">app/page.tsx</span>.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MENU.map((section) => (
          <MenuCard key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}

function Events() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="text-sm font-semibold text-white">Events</div>
          <p className="mt-2 text-sm text-white/75">
            We create all events on Facebook. The list here stays current automatically — upcoming at the top,
            past events drop off.
          </p>
          <div className="mt-4 rounded-2xl bg-black/30 p-4 text-sm text-white/70 border border-white/10">
            If you don’t see an event here, check our Facebook page.
            <div className="mt-2">
              <a className="underline" href={BRAND.facebookPageUrl} target="_blank" rel="noreferrer">
                Open Facebook page
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-8">
        <FacebookEventsEmbed pageUrl={BRAND.facebookPageUrl} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 text-sm text-white/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-white">{BRAND.name}</div>
            <div>{BRAND.address}</div>
          </div>
          <div className="flex items-center gap-4">
            <a className="underline" href={BRAND.facebookPageUrl} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a className="underline" href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}>
              {BRAND.phone}
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-white/45">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#060816] text-white">
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
