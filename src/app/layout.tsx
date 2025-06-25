import './globals.css';
import { ReactNode } from 'react';
import Footer from './components/layout/Footer';
import { Amiri, Noto_Naskh_Arabic } from 'next/font/google';
import { Header } from './components/ui/Header';

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

export default async function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          id="language-direction-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Get language from localStorage or default to English
                const language = localStorage.getItem('language') || 'en';
                
                // Set dir attribute on html tag based on language
                document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.lang = language;
              })();
            `,
          }}
        />
      </head>
      <body className={`min-h-screen flex flex-col bg-[#F5F5F5] text-[#333333] antialiased overflow-x-hidden ${amiri.variable} ${notoNaskhArabic.variable}`}>
        <Header />
        <main className="flex-1 w-full max-w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}