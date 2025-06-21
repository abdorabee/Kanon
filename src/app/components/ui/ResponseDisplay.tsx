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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white p-4 py-8 @container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-[1000px] w-full flex flex-col gap-6"
      >
        {/* Search Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-800 border border-[#4d4d4d] rounded-xl p-4 shadow-[10px_10px_20px_rgba(0,0,0,0.3),-10px_-10px_20px_rgba(60,60,60,0.2)]"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#e0e0e0] tracking-wide">
            {translations.searchResults}: <span className="text-[#4caf50] bg-[#2e7d32] px-2 py-1 rounded-full">{issues.length}</span>
          </h1>
          <p className="text-[#adadad] text-sm md:text-base mt-2">{prompt}</p>
        </motion.div>

        {/* Issues Table */}
        {issues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-base md:text-lg text-center"
          >
            {translations.noResults}
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-neutral-800 border border-[#4d4d4d] rounded-xl p-4 shadow-[5px_5px_15px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(80,80,80,0.2)] overflow-x-auto"
          >
            <table className="w-full text-right min-w-[300px]">
              <thead className="bg-[#2a2a2a] border-b border-[#5a5a5a]">
                <tr>
                  <th className="py-2 px-4 text-sm md:text-base font-semibold text-[#e0e0e0]">{translations.caseNumber}</th>
                  <th className="py-2 px-4 text-sm md:text-base font-semibold text-[#e0e0e0]">{translations.table}</th>
                  <th className="py-2 px-4 text-sm md:text-base font-semibold text-[#e0e0e0]">{translations.plaintiff}</th>
                  <th className="py-2 px-4 text-sm md:text-base font-semibold text-[#e0e0e0]">{translations.defendant}</th>
                  <th className="py-2 px-4 text-sm md:text-base font-semibold text-[#e0e0e0]">{translations.judgment}</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, index) => (
                  <motion.tr
                    key={issue._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    className="border-b border-[#4d4d4d] hover:bg-[#3d3d3d] transition-colors"
                  >
                    <td className="py-3 px-4 text-sm md:text-base text-white">{issue.case_number}</td>
                    <td className="py-3 px-4 text-sm md:text-base text-[#b0b0b0]">{issue.table_name}</td>
                    <td className="py-3 px-4 text-sm md:text-base text-white">{issue.plaintiff_name}</td>
                    <td className="py-3 px-4 text-sm md:text-base text-white">{issue.defendant_names.join(', ')}</td>
                    <td className="py-3 px-4 text-sm md:text-base">
                      <button
                        onClick={() => toggleIssueDetails(issue._id)}
                        className="text-[#4caf50] hover:text-[#66bb6a] text-sm md:text-base font-medium underline"
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
                            className="mt-2 p-2 bg-[#2a2a2a] rounded text-sm md:text-base text-white"
                          >
                            {issue.judgment_or_decision_info}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + issues.length * 0.2 }}
          className="flex justify-center"
        >
          <Button onClick={() => router.push('/')}>{translations.backToHome}</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
