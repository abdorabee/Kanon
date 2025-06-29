'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/Button';
import { useTranslation } from '@/app/context/TranslationContext';
import { useCaseStore } from '@/app/lib/store';

export default function CaseDetailsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { selectedCase } = useCaseStore();

  // If we don't have the case data in the store, redirect back to the search page
  useEffect(() => {
    if (!selectedCase) {
      router.push('/response');
    }
  }, [selectedCase, router]);

  if (!selectedCase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#1A3C5E] mb-4">{t('notFound') || 'Case Not Found'}</h1>
          <p className="text-[#333333] mb-6">{t('caseNotFoundMessage') || 'The requested case could not be found.'}</p>
          <Button onClick={() => router.back()}>{t('back') || 'Go Back'}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333] p-4 py-8 @container">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#D3D3D3] rounded-xl p-4 shadow-sm mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A3C5E] mb-2">
            {t('caseDetails') || 'Case Details'}
          </h1>
          <div className="flex items-center">
            <span className="text-white bg-[#1A3C5E] px-2 py-1 rounded-full text-xs">
              {selectedCase.case_number}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-[#D3D3D3] rounded-xl p-4 shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.caseNumber') || 'Case Number'}
              </h2>
              <p className="text-[#333333]">{selectedCase.case_number}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.table') || 'Table'}
              </h2>
              <p className="text-[#333333]">{selectedCase.table_name}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.plaintiff') || 'Plaintiff'}
              </h2>
              <p className="text-[#333333]">{selectedCase.plaintiff_name}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.defendant') || 'Defendant'}
              </h2>
              <p className="text-[#333333]">{selectedCase.defendant_names.join(', ')}</p>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.judgment') || 'Judgment'}
              </h2>
              <div className="bg-[#F0F0F0] p-4 rounded-lg">
                <p className="text-[#333333] whitespace-pre-wrap">{selectedCase.judgment_or_decision_info}</p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('common.createdAt')}
              </h2>
              <p className="text-[#333333]">
                {new Date(selectedCase.created_at).toLocaleDateString()} {new Date(selectedCase.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button onClick={() => router.back()}>
            {t('responseDisplay.back')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
