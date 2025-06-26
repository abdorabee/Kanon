'use client';

import { Hero } from './components/ui/Hero';
import { AboutOverlay } from './components/ui/AboutOverlay';
import { MainLayout } from './components/layout/MainLayout';
import { useLayout } from './context/LayoutContext';

export default function Home() {
  const { isAboutOpen, setIsAboutOpen } = useLayout();
  
  // Force white background for the entire page
  const pageStyle = {
    background: '#F5F5F5',
    backgroundColor: '#F5F5F5',
  };
  
  return (
    <div style={pageStyle} className="min-h-screen w-full">
      <MainLayout>
        <div className="@container w-full bg-[#F5F5F5]">
          <div className="p-0 sm:p-2 md:p-4">
            {isAboutOpen ? (
              <AboutOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
            ) : (
              <Hero />
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}