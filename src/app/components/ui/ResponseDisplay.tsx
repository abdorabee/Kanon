'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Default to newest first
  const [sortField, setSortField] = useState<'date' | 'caseNumber'>('date'); // Default to sorting by date
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

  // Toggle sort direction between ascending and descending
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Change sort field between date and case number
  const changeSortField = (field: 'date' | 'caseNumber') => {
    setSortField(field);
  };

  // Sort issues by the selected field and direction
  const sortedIssues = useMemo(() => {
    return [...issues].sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        // Extract numeric part from case numbers for proper numeric sorting
        const caseNumA = parseInt(a.case_number.replace(/\D/g, '')) || 0;
        const caseNumB = parseInt(b.case_number.replace(/\D/g, '')) || 0;
        return sortDirection === 'asc' ? caseNumA - caseNumB : caseNumB - caseNumA;
      }
    });
  }, [issues, sortDirection, sortField]);

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] tracking-wide">
              {t('responseDisplay.searchResults')}: <span className="text-white bg-[#1A3C5E] px-2 py-1 rounded-full text-xs sm:text-sm">{issues.length}</span>
            </h1>
            {issues.length > 1 && (
              <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center">
                  <button 
                    onClick={() => changeSortField('date')}
                    className={`px-2 py-1 text-xs sm:text-sm rounded-l-md ${sortField === 'date' ? 'bg-[#1A3C5E] text-white' : 'bg-gray-200 text-[#333333]'} transition-colors`}
                  >
                    {t('responseDisplay.sortByDate')}
                  </button>
                  <button 
                    onClick={() => changeSortField('caseNumber')}
                    className={`px-2 py-1 text-xs sm:text-sm rounded-r-md ${sortField === 'caseNumber' ? 'bg-[#1A3C5E] text-white' : 'bg-gray-200 text-[#333333]'} transition-colors`}
                  >
                    {t('responseDisplay.sortByCaseNumber')}
                  </button>
                </div>
                <button 
                  onClick={toggleSortDirection}
                  className="flex items-center text-xs sm:text-sm text-[#1A3C5E] hover:text-[#A3CCBE] transition-colors"
                >
                  {sortDirection === 'asc' ? (
                    <>
                      <span className="mr-1">{t('responseDisplay.ascending')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span className="mr-1">{t('responseDisplay.descending')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
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
              {sortedIssues.map((issue, index) => (
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
                {sortedIssues.map((issue, index) => (
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
