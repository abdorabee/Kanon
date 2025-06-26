'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../context/TranslationContext';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}
export function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  const { t, language } = useTranslation();
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-start w-full max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-10 bg-white rounded-lg shadow-md"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`w-full ${language === 'ar' ? 'rtl' : 'ltr'}`}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('about.title')}</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label={t('about.close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          <div className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed space-y-2 sm:space-y-3">
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
          </div>
          
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('about.features')}</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-700">
              <li>{t('about.feature1')}</li>
              <li>{t('about.feature2')}</li>
              <li>{t('about.feature3')}</li>
              <li>{t('about.feature4')}</li>
              <li>{t('about.feature5')}</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('about.privacy')}</h2>
            <div className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed space-y-2 sm:space-y-3">
              <p>{t('about.privacyText1')}</p>
              <p>{t('about.privacyText2')}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            {t('about.close')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutOverlay;
