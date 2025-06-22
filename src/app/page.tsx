import { Hero } from './components/ui/Hero';
import { FeatureCard } from './components/ui/FeatureCard';
import { CallToAction } from './components/ui/CallToAction';
import { MainLayout } from './components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="@container w-full">
        <div className="p-0 sm:p-2 md:p-4">
          <Hero />
        </div>
      </div>
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 px-2 sm:px-4 py-6 sm:py-8 md:py-10 @container">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-2 sm:gap-4">
            <h1 className="text-white text-2xl sm:text-[28px] md:text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:tracking-[-0.033em] max-w-[720px]">
              Key Features
            </h1>
            <p className="text-white text-sm sm:text-base font-normal leading-normal max-w-[720px]">
              Explore the core functionalities that make Kanon an indispensable tool for legal
              professionals.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-3 p-0">
          <FeatureCard
            icon="MagnifyingGlass"
            title="Advanced Legal Research"
            description="Quickly access and analyze relevant legal information from a vast database of cases, statutes, and regulations."
          />
          <FeatureCard
            icon="File"
            title="Document Analysis"
            description="Efficiently review and extract key insights from legal documents, contracts, and briefs."
          />
          <FeatureCard
            icon="PresentationChart"
            title="Case Strategy"
            description="Develop effective case strategies with AI-driven insights and predictive analytics."
          />
        </div>
      </div>
      <CallToAction />
    </MainLayout>
  );
}