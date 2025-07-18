'use client';
import { PromptInput } from './PromptInput';
import { useTranslation } from '../../context/TranslationContext';
import { useRouter } from 'next/navigation';

export function Hero() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleExampleClick = (exampleKey: string) => {
    const exampleText = t(exampleKey);
    
    // Special handling for case number example
    if (exampleKey === 'hero.example1') {
      // Extract the case number from the example text
      const caseNumberMatch = exampleText.match(/(\d{4}\/\d+)/i);
      if (caseNumberMatch) {
        const caseNumber = caseNumberMatch[1];
        router.push(`/response?case=${encodeURIComponent(caseNumber)}`);
        return;
      }
    }
    
    // Special handling for Arabic name example
    if (exampleKey === 'hero.example2') {
      const arabicName = "محمد أحمد محمود";
      router.push(`/response?q=${encodeURIComponent(arabicName)}`);
      return;
    }
    
    // Default handling for other examples
    const searchParam = `q=${encodeURIComponent(exampleText)}`;
    router.push(`/response?${searchParam}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 bg-[#F5F5F5]">
      <div className="flex flex-col gap-3 sm:gap-4 text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333]">
          {t('hero.title')}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#333333] max-w-xl mx-auto px-2 sm:px-0">
          {t('hero.subtitle')}
        </p>
      </div>
      
      <div className="w-full max-w-2xl px-2 sm:px-4">
        <PromptInput />
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 text-xs text-[#333333] px-2">
        <span className="w-full text-center mb-2 sm:w-auto sm:mb-0">{t('hero.examples')}</span>
        <button 
          onClick={() => handleExampleClick('hero.example1')}
          className="px-2 sm:px-3 py-1 bg-[#A3CCBE] hover:bg-[#8ebcaa] text-[#1A3C5E] rounded-md transition-colors text-xs sm:text-sm cursor-pointer"
        >
          {t('hero.example1')}
        </button>
        <button 
          onClick={() => handleExampleClick('hero.example2')}
          className="px-2 sm:px-3 py-1 bg-[#A3CCBE] hover:bg-[#8ebcaa] text-[#1A3C5E] rounded-md transition-colors text-xs sm:text-sm cursor-pointer"
        >
          {t('hero.example2')}
        </button>
        <button 
          onClick={() => handleExampleClick('hero.example3')}
          className="px-2 sm:px-3 py-1 bg-[#A3CCBE] hover:bg-[#8ebcaa] text-[#1A3C5E] rounded-md transition-colors text-xs sm:text-sm cursor-pointer"
        >
          {t('hero.example3')}
        </button>
      </div>
    </div>
  );
}