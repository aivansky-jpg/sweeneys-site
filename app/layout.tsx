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
      <body className="min-h-screen text-white antialiased">{children}</body>
    </html>
  );
}
