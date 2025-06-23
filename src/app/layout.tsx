import './globals.css';
import './theme.css';
import { ReactNode } from 'react';
import Footer from './components/layout/Footer';
import { Amiri, Noto_Naskh_Arabic, Inter } from 'next/font/google';
import { ThemeProvider } from './providers/ThemeProvider';
import { Header } from './components/ui/Header';
import themeScript from './theme-script';
import Script from 'next/script';

// Configure the fonts
const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-amiri',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-noto-naskh-arabic',
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kanon",
  description: "Kanon - Your AI-powered knowledge base",
};

export default async function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" dir="ltr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
                document.documentElement.style.colorScheme = storedTheme || 'dark';
                console.log('[Theme Script] Applied theme:', storedTheme || 'dark (default)');
              } catch (err) {
                console.error('Error applying theme:', err);
              }

              // Listen for storage events (theme changes in other tabs)
              window.addEventListener('storage', function(e) {
                if (e.key === 'theme') {
                  if (e.newValue === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                }
              });
            `
          }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`min-h-screen flex flex-col transition-colors duration-300 ${amiri.variable} ${notoNaskhArabic.variable}`}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}