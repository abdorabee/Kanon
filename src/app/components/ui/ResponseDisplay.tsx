'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { Issue } from '../../lib/types';
import { getClientTranslation } from '../../lib/translation';

interface ResponseDisplayProps {
  prompt: string;
  issues: Issue[];
}

interface Translation {
  searchResults: string;
  caseNumber: string;
  table: string;
  plaintiff: string;
  defendant: string;
  judgment: string;
  noResults: string;
  backToHome: string;
  view: string;
  hide: string;
  language: string;
  english: string;
  arabic: string;
}

export function ResponseDisplay({ prompt, issues }: ResponseDisplayProps) {
  const router = useRouter();
  const [expandedIssues, setExpandedIssues] = useState<{ [key: string]: boolean }>({});
  // We track language state but don't directly use it in rendering
  // It's used in the useEffect for loading translations
  const [, setLanguage] = useState<'en' | 'ar'>('en');
  const [translations, setTranslations] = useState<Translation>({
    searchResults: 'Search Results',
    caseNumber: 'Case Number',
    table: 'Table',
    plaintiff: 'Plaintiff',
    defendant: 'Defendant(s)',
    judgment: 'Judgment',
    noResults: 'No case details found for your query.',
    backToHome: 'Back to Home',
    view: 'View',
    hide: 'Hide',
    language: 'Language',
    english: 'EN',
    arabic: 'AR',
  });

  useEffect(() => {
    // Get language from localStorage when component mounts
    const storedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(storedLanguage as 'en' | 'ar');
    
    // Load translations based on the current language
    getClientTranslation(storedLanguage as 'en' | 'ar', setTranslations);
    
    // Listen for storage events to update when language changes in another component
    const handleStorageChange = () => {
      const newLang = localStorage.getItem('language') || 'en';
      setLanguage(newLang as 'en' | 'ar');
      getClientTranslation(newLang as 'en' | 'ar', setTranslations);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleIssueDetails = (issueId: string) => {
    setExpandedIssues((prev) => ({ ...prev, [issueId]: !prev[issueId] }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F5F5F5] text-[#333333] p-2 sm:p-4 py-6 sm:py-8 @container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-[1000px] w-full flex flex-col gap-4 sm:gap-6"
      >
        {/* Search Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-[#D3D3D3] rounded-xl p-3 sm:p-4 shadow-sm"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] tracking-wide">
            {translations.searchResults}: <span className="text-white bg-[#1A3C5E] px-2 py-1 rounded-full text-sm sm:text-base">{issues.length}</span>
          </h1>
          <p className="text-[#333333] text-xs sm:text-sm md:text-base mt-2">{prompt}</p>
        </motion.div>

        {/* Issues Table */}
        {issues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#333333] text-sm sm:text-base md:text-lg text-center p-4"
          >
            {translations.noResults}
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="overflow-x-auto w-full bg-white border border-[#D3D3D3] rounded-xl p-2 sm:p-4 shadow-sm"
          >
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#D3D3D3]">
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-left">Properties</th>
                  {/* Column headers are now the property names */}
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{translations.caseNumber}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{translations.table}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{translations.plaintiff}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{translations.defendant}</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#1A3C5E] text-center">{translations.judgment}</th>
                </tr>
              </thead>
              <tbody>
                {/* Each row now represents a case */}
                {issues.map((issue, index) => (
                  <tr key={issue._id} className="border-b border-[#D3D3D3] hover:bg-[#F0F0F0] transition-colors">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-[#333333] text-left">Case {index + 1}</th>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.case_number}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.table_name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center">{issue.plaintiff_name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-[#333333] text-center truncate max-w-[120px]" title={issue.defendant_names.join(', ')}>{issue.defendant_names.join(', ')}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base text-center">
                      <button
                        onClick={() => toggleIssueDetails(issue._id)}
                        className="text-[#1A3C5E] hover:text-[#A3CCBE] text-xs sm:text-sm md:text-base font-medium underline"
                      >
                        {expandedIssues[issue._id] ? translations.hide : translations.view}
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
          <Button onClick={() => router.push('/')}>{translations.backToHome}</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
