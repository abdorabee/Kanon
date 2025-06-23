import { PromptInput } from './PromptInput';
import useTranslation from 'next-translate/useTranslation';

export function Hero() {
  const { t } = useTranslation('common');
  
  return (
    <div
      className="min-h-[320px] sm:min-h-[400px] md:min-h-[480px] flex flex-col gap-4 sm:gap-6 bg-cover bg-center bg-no-repeat @container @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-3 sm:p-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(/images/background.jpg)',
      }}
    >
      <div className="flex flex-col gap-2 text-center px-2 sm:px-4">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
          {t('hero.title')}
        </h1>
        <h2 className="text-white text-xs sm:text-sm font-normal leading-normal @[480px]:text-base">
          {t('hero.description')}
        </h2>
      </div>
      <PromptInput />
    </div>
  );
}