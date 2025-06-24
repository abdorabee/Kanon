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
      <body className={`min-h-screen flex flex-col bg-[#F5F5F5] text-[#333333] ${amiri.variable} ${notoNaskhArabic.variable}`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}