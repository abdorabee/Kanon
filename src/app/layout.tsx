import { Header } from './components/ui/Header';
import { Footer } from './components/layout/Footer';
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Kanon',
  description: 'AI-powered legal assistant for streamlined legal workflows',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white">
        <main className="flex-1">{children}</main>
        <footer className="w-full bg-neutral-800 border-t border-[#4d4d4d] p-4">
          <div className="max-w-[1000px] mx-auto flex justify-center">
            <button
              onClick={() => {
                const newLang = localStorage.getItem('language') === 'en' ? 'ar' : 'en';
                localStorage.setItem('language', newLang);
                window.location.reload(); // Reload to apply language change globally
              }}
              className="bg-neutral-800 border border-[#4d4d4d] text-[#e0e0e0] hover:bg-[#3d3d3d] px-6 py-3 text-sm md:text-base rounded-lg shadow-[3px_3px_10px_rgba(0,0,0,0.3),-3px_-3px_10px_rgba(60,60,60,0.2)]"
            >
              Language: {localStorage.getItem('language') === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </footer>
      </body>
    </html>
  );
}