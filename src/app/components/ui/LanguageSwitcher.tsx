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
      className="px-4 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black shadow-sm transition-all duration-200 ease-in-out font-medium text-sm flex items-center justify-center"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
