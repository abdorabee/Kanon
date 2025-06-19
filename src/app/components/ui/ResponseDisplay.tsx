'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { DocumentWithIssues, Issue } from '../../lib/types';

interface ResponseDisplayProps {
  prompt: string;
  documents: DocumentWithIssues[];
}

export function ResponseDisplay({ prompt, documents }: ResponseDisplayProps) {
  const router = useRouter();
  const [expandedIssues, setExpandedIssues] = useState<{ [key: string]: boolean }>({});

  const toggleIssues = (docId: string) => {
    setExpandedIssues((prev) => ({ ...prev, [docId]: !prev[docId] }));
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
          Your Legal Documents
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
        {documents.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-base font-normal leading-normal text-center"
          >
            No documents found for your query.
          </motion.p>
        ) : (
          documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="bg-neutral-800 border border-[#4d4d4d] rounded-xl p-6"
            >
              <h2 className="text-lg font-bold leading-tight">{doc.header_block.document_title}</h2>
              <p className="text-[#adadad] text-sm font-normal leading-normal mb-2">
                File: {doc.file_name}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-white text-base font-normal leading-normal">
                  <strong>Date:</strong> {doc.header_block.session_details.date}
                </p>
                <p className="text-white text-base font-normal leading-normal">
                  <strong>Presiding Judge:</strong>{' '}
                  {doc.header_block.session_details.presiding_judge.name} (
                  {doc.header_block.session_details.presiding_judge.role})
                </p>
                <p className="text-white text-base font-normal leading-normal">
                  <strong>Circuit Number:</strong>{' '}
                  {doc.header_block.session_details.circuit_number}
                </p>
                <p className="text-white text-base font-normal leading-normal">
                  <strong>Attendees:</strong>{' '}
                  {doc.header_block.session_details.attendees
                    .map((attendee) => `${attendee.name} (${attendee.role})`)
                    .join(', ')}
                </p>
                {doc.download_url && (
                  <a
                    href={doc.download_url}
                    className="text-[#adadad] text-sm font-medium leading-normal hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Document
                  </a>
                )}
                {doc.issues.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => toggleIssues(doc.id)}
                      className="text-[#adadad] text-sm font-medium leading-normal hover:underline"
                    >
                      {expandedIssues[doc.id]
                        ? 'Hide Issues'
                        : `Show ${doc.total_issues} Issue${doc.total_issues > 1 ? 's' : ''}`}
                    </button>
                    <AnimatePresence>
                      {expandedIssues[doc.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col gap-2 mt-2"
                        >
                          {doc.issues.map((issue: Issue) => (
                            <div
                              key={issue.id}
                              className="bg-[#2a2a2a] p-4 rounded-lg border border-[#4d4d4d]"
                            >
                              <p className="text-white text-sm font-normal leading-normal">
                                <strong>Case Number:</strong> {issue.case_number}
                              </p>
                              <p className="text-white text-sm font-normal leading-normal">
                                <strong>Plaintiff:</strong> {issue.plaintiff_name}
                              </p>
                              <p className="text-white text-sm font-normal leading-normal">
                                <strong>Defendant(s):</strong>{' '}
                                {issue.defendant_names.join(', ')}
                              </p>
                              <p className="text-white text-sm font-normal leading-normal">
                                <strong>Judgment:</strong>{' '}
                                {issue.judgment_or_decision_info}
                              </p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + documents.length * 0.2 }}
          className="flex justify-center"
        >
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
