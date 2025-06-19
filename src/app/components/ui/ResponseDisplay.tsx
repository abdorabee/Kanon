'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { Issue } from '../../lib/types';

interface ResponseDisplayProps {
  prompt: string;
  issues: Issue[];
}

export function ResponseDisplay({ prompt, issues }: ResponseDisplayProps) {
  const router = useRouter();
  const [expandedIssues, setExpandedIssues] = useState<{ [key: string]: boolean }>({});

  const toggleIssueDetails = (issueId: string) => {
    setExpandedIssues((prev) => ({ ...prev, [issueId]: !prev[issueId] }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1a1a1a] text-white p-4 @container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-[960px] w-full flex flex-col gap-6"
      >
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl text-center">
          Case Details
        </h1>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-800 border border-[#4d4d4d] rounded-xl p-6"
        >
          <h2 className="text-lg font-bold leading-tight">Prompt:</h2>
          <p className="text-[#adadad] text-base font-normal leading-normal mb-4">{prompt}</p>
        </motion.div>
        {issues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-base font-normal leading-normal text-center"
          >
            No case details found for your query.
          </motion.p>
        ) : (
          issues.map((issue, index) => (
            <motion.div
              key={issue._id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="bg-neutral-800 border border-[#4d4d4d] rounded-xl p-6"
            >
              <h2 className="text-lg font-bold leading-tight">Case {issue.case_number}</h2>
              <p className="text-[#adadad] text-sm font-normal leading-normal mb-2">
                Table: {issue.table_name}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-white text-base font-normal leading-normal">
                  <strong>Plaintiff:</strong> {issue.plaintiff_name}
                </p>
                <p className="text-white text-base font-normal leading-normal">
                  <strong>Defendant(s):</strong> {issue.defendant_names.join(', ')}
                </p>
                <button
                  onClick={() => toggleIssueDetails(issue._id)}
                  className="text-[#adadad] text-sm font-medium leading-normal hover:underline text-left"
                >
                  {expandedIssues[issue._id] ? 'Hide Judgment Details' : 'Show Judgment Details'}
                </button>
                <AnimatePresence>
                  {expandedIssues[issue._id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#2a2a2a] p-4 rounded-lg border border-[#4d4d4d] mt-2"
                    >
                      <p className="text-white text-sm font-normal leading-normal">
                        <strong>Judgment:</strong> {issue.judgment_or_decision_info}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + issues.length * 0.2 }}
          className="flex justify-center"
        >
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}