"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    console.log('[ThemeProvider] Mounting ThemeProvider');
    setMounted(true);
    console.log('[ThemeProvider] Provider mounted');
  }, []);

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false} // Disable system theme to have more control
      storageKey="theme" // Ensure we're using the same key as our script
    >
      {mounted && children}
    </NextThemesProvider>
  );
}
