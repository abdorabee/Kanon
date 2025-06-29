'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { Issue } from '../../lib/types';
import { useTranslation } from '../../context/TranslationContext';
import { useCaseStore } from '../../lib/store';


interface ResponseDisplayProps {
  prompt: string;
  issues: Issue[];
}



export function ResponseDisplay({ prompt, issues }: ResponseDisplayProps) {
  const router = useRouter();
  const [expandedIssues, setExpandedIssues] = useState<{ [key: string]: boolean }>({});
  const { t } = useTranslation();

  const toggleIssueDetails = (issueId: string, event?: React.MouseEvent) => {
    // If event exists, stop propagation to prevent navigation when clicking the toggle button
    if (event) {
      event.stopPropagation();
    }
    setExpandedIssues((prev) => ({ ...prev, [issueId]: !prev[issueId] }));
  };

  const navigateToCase = (issue: Issue) => {
    // Store the selected case in the global store
    useCaseStore.getState().setSelectedCase(issue);
    router.push(`/case/${issue._id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F5F5F5] text-[#333333] p-2 sm:p-4 py-6 sm:py-8 @container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-[1000px] w-full flex flex-col gap-3 sm:gap-4 md:gap-6"
      >
        {/* Search Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-[#D3D3D3] rounded-xl p-2 sm:p-3 md:p-4 shadow-sm"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] tracking-wide">
            {t('responseDisplay.searchResults')}: <span className="text-white bg-[#1A3C5E] px-2 py-1 rounded-full text-xs sm:text-sm">{issues.length}</span>
          </h1>
          <p className="text-[#333333] text-xs sm:text-sm mt-2">{prompt}</p>
        </motion.div>

        {/* Issues Table */}
        {issues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#333333] text-sm sm:text-base md:text-lg text-center p-4"
          >
            {t('responseDisplay.noResponse')}
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white border border-[#D3D3D3] rounded-xl overflow-x-auto shadow-sm"
          >
            {/* Mobile view - card style for small screens */}
            <div className="block sm:hidden">
              {issues.map((issue, index) => (
                <div 
                  key={issue._id} 
                  className="border-b border-[#D3D3D3] p-3 cursor-pointer hover:bg-[#F0F0F0] transition-colors"
                  onClick={() => navigateToCase(issue)}
                >
                  <h3 className="font-semibold text-sm text-[#1A3C5E] mb-2">Case {index + 1}</h3>
                  
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="font-medium">{t('responseDisplay.caseNumber')}:</div>
                    <div>{issue.case_number}</div>
                    
                    <div className="font-medium">{t('responseDisplay.table')}:</div>
                    <div>{issue.table_name}</div>
                    
                    <div className="font-medium">{t('responseDisplay.plaintiff')}:</div>
                    <div>{issue.plaintiff_name}</div>
                    
                    <div className="font-medium">{t('responseDisplay.defendant')}:</div>
                    <div className="truncate">{issue.defendant_names.join(', ')}</div>
                  </div>
                  
                  <div className="mt-2">
                    <button
                      onClick={(e) => toggleIssueDetails(issue._id, e)}
                      className="text-[#1A3C5E] hover:text-[#A3CCBE] text-xs font-medium underline"
                    >
                      {expandedIssues[issue._id] ? t('responseDisplay.hide') : t('responseDisplay.view')} {t('responseDisplay.judgment')}
                    </button>
                    <AnimatePresence>
                      {expandedIssues[issue._id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="mt-2 p-2 bg-[#F0F0F0] rounded text-xs text-[#333333]"
                        >
                          {issue.judgment_or_decision_info}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop view - table for larger screens */}
            <table className="hidden sm:table w-full text-left">
              <thead>
                <tr className="border-b border-[#D3D3D3]">
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-left">{t('responseDisplay.properties')}</th>
                  {/* Column headers are now the property names */}
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{t('responseDisplay.caseNumber')}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{t('responseDisplay.table')}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{t('responseDisplay.plaintiff')}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{t('responseDisplay.defendant')}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{t('responseDisplay.judgment')}</th>
                </tr>
              </thead>
              <tbody>
                {/* Each row now represents a case */}
                {issues.map((issue, index) => (
                  <tr 
                    key={issue._id} 
                    className="border-b border-[#D3D3D3] hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                    onClick={() => navigateToCase(issue)}
                  >
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#333333] text-left">Case {index + 1}</th>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.case_number}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.table_name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.plaintiff_name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center truncate max-w-[120px]" title={issue.defendant_names.join(', ')}>{issue.defendant_names.join(', ')}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-center">
                      <button
                        onClick={(e) => toggleIssueDetails(issue._id, e)}
                        className="text-[#1A3C5E] hover:text-[#A3CCBE] text-xs sm:text-sm md:text-base font-medium underline"
                      >
                        {expandedIssues[issue._id] ? t('responseDisplay.hide') : t('responseDisplay.view')}
                      </button>
                      <AnimatePresence>
                        {expandedIssues[issue._id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="mt-2 p-2 bg-[#F0F0F0] rounded text-xs sm:text-sm md:text-base text-[#333333]"
                          >
                            {issue.judgment_or_decision_info}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + issues.length * 0.2 }}
          className="flex justify-center mt-2 sm:mt-4"
        >
          <Button onClick={() => router.push('/')}>{t('responseDisplay.backToHome')}</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
