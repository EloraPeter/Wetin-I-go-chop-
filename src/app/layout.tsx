// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wetin I Go Chop? — Stop thinking. Start chopping.",
  description:
    "Tell us how you're feeling, your budget, and what you've got. We'll figure out what you can eat. Nigeria-first food decision maker.",
};

export const viewport: Viewport = {
  themeColor: "#FFF8EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={`${sora.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-cream font-sans antialiased">
        <SessionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-tomato focus:px-5 focus:py-3 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
