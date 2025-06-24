import { Hero } from './components/ui/Hero';
import { MainLayout } from './components/layout/MainLayout';

export default function Home() {
  // Force white background for the entire page
  const pageStyle = {
    background: '#F5F5F5',
    backgroundColor: '#F5F5F5',
  };
  return (
    <div style={pageStyle} className="min-h-screen w-full">
      <MainLayout>
        <div className="@container w-full bg-[#F5F5F5]">
          <div className="p-0 sm:p-2 md:p-4 bg-[#F5F5F5]">
            <Hero />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}