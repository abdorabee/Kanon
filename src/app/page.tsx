'use client';

import { Hero } from './components/ui/Hero';
import { FeatureCard } from './components/ui/FeatureCard';
import { CallToAction } from './components/ui/CallToAction';
import { MainLayout } from './components/layout/MainLayout';
import useTranslation from 'next-translate/useTranslation';

// Define the Home component as a client component
export default function Home() {
  const { t } = useTranslation('common');
  
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
              {t('features.heading')}
            </h1>
            <p className="text-white text-sm sm:text-base font-normal leading-normal max-w-[720px]">
              {t('features.description')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-3 p-0">
          <FeatureCard
            icon="MagnifyingGlass"
            translationKey="features.search"
          />
          <FeatureCard
            icon="File"
            translationKey="features.analysis"
          />
          <FeatureCard
            icon="PresentationChart"
            translationKey="features.strategy"
          />
        </div>
      </div>
      <CallToAction />
    </MainLayout>
  );
}