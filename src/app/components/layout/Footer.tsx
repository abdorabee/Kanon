'use client';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Footer() {
  const { t, lang } = useTranslation('common');

  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a href="#" className="text-[#adadad] text-base font-normal leading-normal min-w-40">
              {t('footer.termsOfService')}
            </a>
            <a href="#" className="text-[#adadad] text-base font-normal leading-normal min-w-40">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="text-[#adadad] text-base font-normal leading-normal min-w-40">
              {t('footer.contactUs')}
            </a>
          </div>
          <p className="text-[#adadad] text-base font-normal leading-normal">
            {t('footer.copyright')}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}