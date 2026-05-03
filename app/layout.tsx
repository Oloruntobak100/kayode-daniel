import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";

/** Bold display for hero headline (reference: Montserrat / geometric sans) */
const hero = Montserrat({
  subsets: ["latin"],
  variable: "--font-hero",
  weight: ["600", "700", "800"],
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kayode Daniel — Information systems analysis, design & consulting; full-stack delivery",
  description:
    "Consulting on how businesses work and how information systems should run them: analysis, design, integration, and automation—enterprise, health, and MSc Information Systems.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hero.variable} ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
