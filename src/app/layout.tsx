import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Bricolage Grotesque is a variable font — weight must be "variable" to use axes
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Ganesh Muniganti — UX & Product Designer",
  description:
    "UX & Product Designer crafting intuitive, user-centered digital products. Specializing in UX Research, Design Systems, Prototyping, and Mobile Design.",
  keywords: [
    "UX Designer",
    "Product Designer",
    "Ganesh Muniganti",
    "Portfolio",
    "Design Systems",
    "User Research",
    "Figma",
  ],
  openGraph: {
    title: "Ganesh Muniganti — UX & Product Designer",
    description:
      "Crafting digital products that are both useful and beautiful.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakartaSans.variable} ${bricolage.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
