import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sweeney’s | Philadelphia",
  description: "Sweeney’s — neighborhood bar in Philadelphia. Menu and events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white antialiased">
        {/* Subtle site-wide background image */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage: "url('/about-love-poster.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark overlay so text stays readable */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-black/80 to-black" />
        {children}
      </body>
    </html>
  );
}
