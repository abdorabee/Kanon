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
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
