"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const CommandMenu = dynamic(() => import("@/components/ui/CommandMenu"), {
  ssr: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <CustomCursor />
      <CommandMenu />
      {children}
    </NextThemesProvider>
  );
}
