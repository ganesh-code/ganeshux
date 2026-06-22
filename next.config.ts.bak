// Avoid Node v25+ experimental localStorage crashing third-party libraries during Next.js builds/dev
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
