import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { comingSoon } from "@/lib/mode";
import { site } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

// Fonts are bundled with the site (no requests to Google): Space Grotesk for
// text and headings, JetBrains Mono for scores and labels. Both OFL.
const body = localFont({
  src: [
    { path: "../fonts/space-grotesk-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/space-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/space-grotesk-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/jetbrains-mono-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: comingSoon ? "Ton Up · Coming soon to iPhone" : "Ton Up · Darts scorer and trainer for iPhone",
    template: "%s · Ton Up",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: "Ton Up · A darts scorer that takes the game seriously",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme is set by THEME_SCRIPT before React hydrates.
    <html lang="en" className={`${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* The visitor's theme pick, applied before first paint so there's no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
