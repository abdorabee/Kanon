import { Hero } from './components/ui/Hero';
import { MainLayout } from './components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="@container w-full">
        <div className="p-0 sm:p-2 md:p-4">
          <Hero />
        </div>
      </div>
   
      
    </MainLayout>
  );
}