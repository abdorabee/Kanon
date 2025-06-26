import React from 'react';
import { useTranslation } from '../../context/TranslationContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded flex items-center gap-1.5 bg-black text-white hover:bg-gray-800 transition-colors shadow-sm font-medium"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
