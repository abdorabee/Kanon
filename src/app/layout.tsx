import { Header } from './components/ui/Header';
import { Footer } from './components/layout/Footer';
import './globals.css';

export const metadata = {
  title: 'Kanon',
  description: 'AI-powered legal assistant for streamlined legal workflows',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#1a1a1a] font-inter text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}