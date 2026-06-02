// Avoid Node v25+ experimental localStorage crashing third-party libraries during SSR
if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
  try {
    delete (globalThis as any).localStorage;
  } catch (e) {
    (globalThis as any).localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };
  }
}

import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ganesh — UX/UI Designer",
  description:
    "UX/UI Designer crafting intuitive, user-centered digital products across web and mobile platforms. Specializing in UX Research, Wireframing, Prototyping, and Design Systems.",
  keywords: [
    "UX Designer",
    "UI Designer",
    "Product Designer",
    "Ganesh",
    "Portfolio",
    "Design Systems",
    "User Research",
  ],
  openGraph: {
    title: "Ganesh — UX/UI Designer",
    description: "Crafting intuitive digital products that users love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} font-inter antialiased`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

