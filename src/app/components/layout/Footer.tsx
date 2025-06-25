'use client';
import { useTranslation } from '../../context/TranslationContext';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="flex justify-center bg-[#F5F5F5]">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              {t('footer.contact')}
            </a>
          </div>
          <p className="text-[#333333] text-base font-normal leading-normal">
          {t('footer.copyright')}
          </p>

        </div>
      </div>
    </footer>
  );
}