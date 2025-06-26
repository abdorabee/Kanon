'use client';

import React, { useState, useEffect } from 'react';
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-white rounded-lg shadow-xl max-w-xl w-full p-5 md:p-6 ${language === 'ar' ? 'rtl' : 'ltr'} overflow-y-auto max-h-[85vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 pr-4">{t('about.title')}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={t('about.close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {t('about.description')}
          </p>
          
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">{t('about.features')}</h3>
            <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
              <li>{t('about.feature1')}</li>
              <li>{t('about.feature2')}</li>
              <li>{t('about.feature3')}</li>
              <li>{t('about.feature4')}</li>
              <li>{t('about.feature5')}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">{t('about.privacy')}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t('about.privacyText')}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            {t('about.close')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutOverlay;
