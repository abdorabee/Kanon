import './globals.css';
import { ReactNode } from 'react';
import Footer from './components/layout/Footer';
import { Tajawal, Noto_Naskh_Arabic, Open_Sans } from 'next/font/google';
import { Header } from './components/ui/Header';
import { TranslationProvider } from './context/TranslationContext';
import { LayoutProvider } from './context/LayoutContext';

// Configure the fonts
const tajawal = Tajawal({
  weight: ['400', '500', '700'],
  subsets: ['arabic'],
  variable: '--font-tajawal',
});

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-noto-naskh-arabic',
});

export default async function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" className="font-sans">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`min-h-screen flex flex-col bg-[#F5F5F5] text-[#333333] antialiased overflow-x-hidden ${tajawal.variable} ${openSans.variable} ${notoNaskhArabic.variable}`}>
        <TranslationProvider>
          <LayoutProvider>
            <Header />
            <main className="flex-1 w-full max-w-full">{children}</main>
            <Footer />
          </LayoutProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}