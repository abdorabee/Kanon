'use client';

import { useRouter, usePathname } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';

export default function LanguageSwitcher() {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = async (newLang: string) => {
    // Don't switch if already on the selected language
    if (newLang === lang) return;

    // Set the language cookie
    document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=${60 * 60 * 24 * 365}`;

    // Update HTML attributes for RTL/LTR
    const html = document.documentElement;
    html.lang = newLang;
    html.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    if (newLang === 'ar') {
      html.classList.add('ar');
    } else {
      html.classList.remove('ar');
    }

    // Set the language using next-translate
    await setLanguage(newLang);

    // Extract the current locale from the pathname
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'ar')) {
      // Replace the current locale with the new one
      segments[1] = newLang;
      const newPath = segments.join('/');
      router.push(newPath);
    }
  };

  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 rounded ${
          lang === 'en' 
            ? 'bg-neutral-800 text-white' 
            : 'text-neutral-600 hover:bg-neutral-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ar')}
        className={`px-2 py-1 rounded ${
          lang === 'ar' 
            ? 'bg-neutral-800 text-white' 
            : 'text-neutral-600 hover:bg-neutral-200'
        }`}
      >
        AR
      </button>
    </div>
  );
}
