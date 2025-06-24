'use client';
import { useEffect, useState } from 'react';
import { getClientTranslation } from '../../lib/translation';

interface Translation {
  searchResults: string;
  caseNumber: string;
  table: string;
  plaintiff: string;
  defendant: string;
  judgment: string;
  noResults: string;
  backToHome: string;
  view: string;
  hide: string;
  language: string;
  english: string;
  arabic: string;
}

export default function Footer() {
  const [language, setLanguage] = useState('en');
  const [isClient, setIsClient] = useState(false);
  const [translations, setTranslations] = useState<Translation>({
    searchResults: 'Search Results',
    caseNumber: 'Case Number',
    table: 'Table',
    plaintiff: 'Plaintiff',
    defendant: 'Defendant(s)',
    judgment: 'Judgment',
    noResults: 'No case details found for your query.',
    backToHome: 'Back to Home',
    view: 'View',
    hide: 'Hide',
    language: 'Language',
    english: 'EN',
    arabic: 'AR',
  });

  useEffect(() => {
    // Set isClient to true when component mounts (client-side only)
    setIsClient(true);
    
    // Ensure initial language is set if not present
    const storedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(storedLanguage as 'en' | 'ar');
    
    // Load translations based on the current language
    getClientTranslation(storedLanguage as 'en' | 'ar', setTranslations);
    
    // Update HTML attributes for RTL/LTR
    const html = document.documentElement;
    html.lang = storedLanguage;
    html.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
    if (storedLanguage === 'ar') {
      html.classList.add('ar');
    } else {
      html.classList.remove('ar');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', newLang);
    
    // Update HTML attributes for RTL/LTR immediately
    const html = document.documentElement;
    html.lang = newLang;
    html.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    if (newLang === 'ar') {
      html.classList.add('ar');
    } else {
      html.classList.remove('ar');
    }
    
    // Load new translations
    getClientTranslation(newLang as 'en' | 'ar', setTranslations);
    setLanguage(newLang as 'en' | 'ar');
    
    // Reload to apply language change globally
    window.location.reload();
  };

  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              Terms of Service
            </a>
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              Privacy Policy
            </a>
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              Contact Us
            </a>
          </div>
          <p className="text-[#333333] text-base font-normal leading-normal">
          ©
          2025 Kanon. All rights reserved.
          </p>
          <div className="flex justify-center">
            <button
              onClick={toggleLanguage}
              className="text-[#333333] hover:text-[#1A3C5E] text-[10px] px-2 py-0.5 rounded-sm border border-[#D3D3D3] hover:border-[#A3CCBE] transition-colors mt-2 inline-block w-8"
              aria-label="Toggle language"
            >
              {isClient ? (language === 'en' ? 'AR' : 'EN') : ''}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}