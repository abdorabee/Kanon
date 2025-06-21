import './globals.css';
import { ReactNode } from 'react';
import Footer from './components/layout/Footer';
import { getServerTranslation } from './lib/translation';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const translations = await getServerTranslation('en'); // Default to 'en' on server

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const lang = localStorage.getItem('language') || 'en';
                const html = document.documentElement;
                html.lang = lang;
                html.dir = lang === 'ar' ? 'rtl' : 'ltr';
                if (lang === 'ar') {
                  html.classList.add('ar');
                } else {
                  html.classList.remove('ar');
                }
              });
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}