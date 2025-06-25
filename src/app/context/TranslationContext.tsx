
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

// Define available languages
export type Language = 'en' | 'ar';

// Define translation context type
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

// Create the context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation provider props
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState(enTranslations);
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  // Update language and translations when language changes
  useEffect(() => {
    // Get language from localStorage if available
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ar')) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Update translations and direction when language changes
  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Update translations based on language
    setTranslations(language === 'en' ? enTranslations : arTranslations);
    
    // Update direction based on language
    setDir(language === 'ar' ? 'rtl' : 'ltr');
    
    // Update HTML dir attribute
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    // Split the key by dots
    const keys = key.split('.');
    
    // Navigate through the translations object
    let result: Record<string, unknown> = translations as Record<string, unknown>;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k] as Record<string, unknown>;
      } else {
        // Return the key if translation not found
        console.log(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return String(result);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
