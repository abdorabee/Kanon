'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaSortUp, FaSortDown, FaCalendarAlt, FaFileAlt, FaFilter } from 'react-icons/fa';
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

  const toggleIssueDetails = (issueId: string | number, event?: React.MouseEvent) => {
    // If event exists, stop propagation to prevent navigation when clicking the toggle button
    if (event) {
      event.stopPropagation();
    }
    const id = String(issueId); // Convert to string to ensure it works as an object key
    setExpandedIssues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navigateToCase = (issue: Issue) => {
    // Store the selected case in the global store
    useCaseStore.getState().setSelectedCase(issue);
    // Use case_number as identifier if _id is not available
    const id = issue._id || `case-${issue.case_number}`;
    router.push(`/case/${id}`);
  };


  // Change sort field between date and case number
  const changeSortField = (field: 'date' | 'caseNumber') => {
    setSortField(field);
  };

  // Sort issues by the selected field and direction
  const sortedIssues = useMemo(() => {
    return [...issues].sort((a, b) => {
      if (sortField === 'date') {
        // Use last_updated if available, otherwise fall back to created_at
        const dateA = new Date(a.last_updated || a.created_at).getTime();
        const dateB = new Date(b.last_updated || b.created_at).getTime();
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
              <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative group">
                  <button 
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#1A3C5E] text-white rounded-md text-xs sm:text-sm hover:bg-[#2a4c6e] transition-colors"
                  >
                    <FaFilter className="text-xs sm:text-sm" />
                    <span>{t('responseDisplay.sortBy')}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden z-10 w-48 border border-gray-200 hidden group-hover:block">
                    <div className="p-2">
                      <p className="text-xs text-gray-500 mb-1 px-2">{t('responseDisplay.sortField')}:</p>
                      <button 
                        onClick={() => changeSortField('date')}
                        className={`w-full flex items-center justify-between px-2 py-1.5 text-xs sm:text-sm ${sortField === 'date' ? 'bg-[#f0f7ff] text-[#1A3C5E] font-medium' : 'hover:bg-gray-100'} transition-colors rounded-md`}
                      >
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-xs" />
                          <span>{t('responseDisplay.sortByDate')}</span>
                        </div>
                        {sortField === 'date' && <span className="text-[#1A3C5E] text-xs">✓</span>}
                      </button>
                      <button 
                        onClick={() => changeSortField('caseNumber')}
                        className={`w-full flex items-center justify-between px-2 py-1.5 text-xs sm:text-sm ${sortField === 'caseNumber' ? 'bg-[#f0f7ff] text-[#1A3C5E] font-medium' : 'hover:bg-gray-100'} transition-colors rounded-md`}
                      >
                        <div className="flex items-center gap-2">
                          <FaFileAlt className="text-xs" />
                          <span>{t('responseDisplay.sortByCaseNumber')}</span>
                        </div>
                        {sortField === 'caseNumber' && <span className="text-[#1A3C5E] text-xs">✓</span>}
                      </button>
                      
                      <div className="border-t border-gray-200 my-1"></div>
                      <p className="text-xs text-gray-500 mb-1 px-2">{t('responseDisplay.sortDirection')}:</p>
                      
                      <button 
                        onClick={() => setSortDirection('asc')}
                        className={`w-full flex items-center justify-between px-2 py-1.5 text-xs sm:text-sm ${sortDirection === 'asc' ? 'bg-[#f0f7ff] text-[#1A3C5E] font-medium' : 'hover:bg-gray-100'} transition-colors rounded-md`}
                      >
                        <div className="flex items-center gap-2">
                          <FaSortUp className="text-xs" />
                          <span>{t('responseDisplay.ascending')}</span>
                        </div>
                        {sortDirection === 'asc' && <span className="text-[#1A3C5E] text-xs">✓</span>}
                      </button>
                      
                      <button 
                        onClick={() => setSortDirection('desc')}
                        className={`w-full flex items-center justify-between px-2 py-1.5 text-xs sm:text-sm ${sortDirection === 'desc' ? 'bg-[#f0f7ff] text-[#1A3C5E] font-medium' : 'hover:bg-gray-100'} transition-colors rounded-md`}
                      >
                        <div className="flex items-center gap-2">
                          <FaSortDown className="text-xs" />
                          <span>{t('responseDisplay.descending')}</span>
                        </div>
                        {sortDirection === 'desc' && <span className="text-[#1A3C5E] text-xs">✓</span>}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-xs sm:text-sm text-[#333333]">
                  <span className="font-medium">{t('responseDisplay.currentSort')}:</span>
                  <span className="text-[#1A3C5E]">
                    {sortField === 'date' ? t('responseDisplay.sortByDate') : t('responseDisplay.sortByCaseNumber')}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    {sortDirection === 'asc' ? 
                      <FaSortUp className="text-[#1A3C5E] mr-1" /> : 
                      <FaSortDown className="text-[#1A3C5E] mr-1" />
                    }
                    <span className="text-[#1A3C5E]">
                      {sortDirection === 'asc' ? t('responseDisplay.ascending') : t('responseDisplay.descending')}
                    </span>
                  </span>
                </div>
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
                  key={issue._id || `mobile-${index}`} 
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
                    <div className="truncate">{issue.defendant_names?.join(', ') || t('responseDisplay.noDefendant')}</div>
                  </div>
                  
                  <div className="mt-2">
                    <button
                      onClick={(e) => toggleIssueDetails(issue._id || `judgment-${index}`, e)}
                      className="text-[#1A3C5E] hover:text-[#A3CCBE] text-xs font-medium underline"
                    >
                      {expandedIssues[issue._id || `judgment-${index}`] ? t('responseDisplay.hide') : t('responseDisplay.view')} {t('responseDisplay.judgment')}
                    </button>
                    <AnimatePresence>
                      {expandedIssues[issue._id || `judgment-${index}`] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="mt-2 p-2 bg-[#F0F0F0] rounded text-xs text-[#333333]"
                        >
                          {issue.judgment_or_decision_info || 
                            (issue.sessions && issue.sessions.length > 0 ? 
                              issue.sessions[0].final_judgment : 
                              t('responseDisplay.noJudgmentInfo')
                            )
                          }
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
                    key={issue._id || `desktop-${index}`} 
                    className="border-b border-[#D3D3D3] hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                    onClick={() => navigateToCase(issue)}
                  >
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#333333] text-left">{new Date(issue.created_at).toLocaleDateString()}</th>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.case_number}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.table_name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.plaintiff_name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center truncate max-w-[120px]" title={issue.defendant_names?.join(', ') || t('responseDisplay.noDefendant')}>{issue.defendant_names?.join(', ') || t('responseDisplay.noDefendant')}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-center">
                      <button
                        onClick={(e) => toggleIssueDetails(issue._id || `desktop-judgment-${index}`, e)}
                        className="text-[#1A3C5E] hover:text-[#A3CCBE] text-xs sm:text-sm md:text-base font-medium underline"
                      >
                        {expandedIssues[issue._id || `desktop-judgment-${index}`] ? t('responseDisplay.hide') : t('responseDisplay.view')}
                      </button>
                      <AnimatePresence>
                        {expandedIssues[issue._id || `desktop-judgment-${index}`] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="mt-2 p-2 bg-[#F0F0F0] rounded text-xs sm:text-sm md:text-base text-[#333333]"
                          >
                            {issue.judgment_or_decision_info || 
                            (issue.sessions && issue.sessions.length > 0 ? 
                              issue.sessions[0].final_judgment : 
                              t('responseDisplay.noJudgmentInfo')
                            )
                          }
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
