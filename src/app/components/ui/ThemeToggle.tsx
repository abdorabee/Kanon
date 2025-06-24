"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    console.log('[ThemeToggle] Initializing...');
    setMounted(true);
    console.log('[ThemeToggle] Initialized with theme:', theme);
  }, []);
  
  // Update DOM classes when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    console.log('[ThemeToggle] Theme changed to:', theme);
    
    // Update DOM classes directly to ensure visual changes
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }
    
    console.log('[ThemeToggle] Updated DOM classes:', {
      hasLightClass: document.documentElement.classList.contains('light'),
      hasDarkClass: document.documentElement.classList.contains('dark'),
      colorScheme: document.documentElement.style.colorScheme
    });
  }, [theme, mounted]);

  const toggleTheme = () => {
    console.log('[ThemeToggle] Toggle clicked. Current theme:', theme);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Update localStorage directly to ensure it's set before reload
    localStorage.setItem('theme', newTheme);
    
    // Apply classes directly to ensure immediate visual change
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    
    // Set theme in next-themes
    setTheme(newTheme);
    console.log('[ThemeToggle] Set theme to:', newTheme);
    
    // Force a page refresh to ensure all styles are applied
    window.location.reload();
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent text-text hover:bg-secondary transition-colors"
        aria-label={`Switch to ${theme === 'dark' ? "light" : "dark"} mode`}
        data-testid="theme-toggle"
      >
        {theme === 'dark' ? (
          // Sun icon for light mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
