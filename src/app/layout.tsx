import './globals.css';
import { ReactNode } from 'react';
import Footer from './components/layout/Footer';
import { Amiri, Noto_Naskh_Arabic } from 'next/font/google';

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
      <body className={`min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white ${amiri.variable} ${notoNaskhArabic.variable}`}>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}