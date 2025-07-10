'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/Button';
import { useTranslation } from '@/app/context/TranslationContext';
import { useCaseStore } from '@/app/lib/store';
import { Issue } from '@/app/lib/types';

export default function CaseDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation();
  const { selectedCase, setSelectedCase } = useCaseStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Initialize caseData with null to avoid TypeScript errors
  const [caseData, setCaseData] = useState<Issue | null>(null);

  // Try to fetch the case data if it's not in the store
  useEffect(() => {
    const fetchCaseData = async () => {
      // If we already have the case in the store, use that
      if (selectedCase) {
        setCaseData(selectedCase);
        return;
      }

      // Otherwise, try to fetch it from the API
      if (params?.id) {
        setLoading(true);
        setError(null);
        
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
          let caseId = params.id as string;
          
          // Handle different ID formats
          let requestUrl;
          if (caseId.includes('-')) {
            // Format for case numbers with dashes (converted from slashes)
            const originalCaseNumber = caseId.replace(/-/g, '/');
            requestUrl = `${baseUrl}/api/v2/cases/?case_number=${encodeURIComponent(originalCaseNumber)}`;
          } else {
            // Format for MongoDB IDs
            requestUrl = `${baseUrl}/api/v2/cases/${caseId}`;
          }
          
          console.log('Fetching case data from:', requestUrl);
          
          const response = await fetch(requestUrl);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch case: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log('Case API response:', data);
          
          // Handle different response formats
          let caseItem: Issue | null = null;
          
          if (data && data.case) {
            // New API format with case property
            caseItem = data.case;
          } else if (Array.isArray(data) && data.length > 0) {
            // Array of cases, take the first one
            caseItem = data[0];
          } else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
            // Nested data array
            caseItem = data.data[0];
          } else if (data && !Array.isArray(data)) {
            // Direct case object
            caseItem = data;
          }
          
          if (caseItem) {
            setCaseData(caseItem);
            setSelectedCase(caseItem); // Also update the store
          } else {
            throw new Error('Case not found in API response');
          }
        } catch (err) {
          console.error('Error fetching case:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch case data');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchCaseData();
  }, [params?.id, selectedCase, setSelectedCase]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[#1A3C5E] mb-4">{t('loading') || 'Loading...'}</h1>
          <p className="text-[#333333] mb-6">{t('loadingCaseMessage') || 'Fetching case details...'}</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#1A3C5E] mb-4">{t('notFound') || 'Case Not Found'}</h1>
          <p className="text-[#333333] mb-6">
            {error || t('caseNotFoundMessage') || 'The requested case could not be found.'}
          </p>
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
            {t('responseDisplay.caseDetails')}
          </h1>
          <div className="flex items-center">
            <span className="text-white bg-[#1A3C5E] px-2 py-1 rounded-full text-xs">
              {caseData.case_number}
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
              <p className="text-[#333333]">{caseData.case_number}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.table') || 'Table'}
              </h2>
              <p className="text-[#333333]">{caseData.table_name}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.plaintiff') || 'Plaintiff'}
              </h2>
              <p className="text-[#333333]">{caseData.plaintiff_name}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.defendant') || 'Defendant'}
              </h2>
              <p className="text-[#333333]">{caseData.defendant_names?.join(', ') || t('responseDisplay.noDefendant')}</p>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('responseDisplay.judgment') || 'Judgment'}
              </h2>
              <div className="bg-[#F0F0F0] p-4 rounded-lg">
                <p className="text-[#333333] whitespace-pre-wrap">
                  {caseData.judgment_or_decision_info || 
                   (caseData.sessions && caseData.sessions.length > 0 && caseData.sessions[0]?.final_judgment ? 
                    caseData.sessions[0].final_judgment : 
                    t('responseDisplay.noJudgmentInfo'))
                  }
                </p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-[#1A3C5E] mb-2">
                {t('common.createdAt')}
              </h2>
              <p className="text-[#333333]">
                {new Date(caseData.created_at).toLocaleDateString()} {new Date(caseData.created_at).toLocaleTimeString()}
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
