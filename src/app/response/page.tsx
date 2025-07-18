import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";

import { Issue } from '@/app/lib/types';
import {  authenticatedFetch } from '@/app/lib/auth';

interface SearchParams {
  case?: string;
  q?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

// No local token cache or validation needed - imported from auth.ts

export default async function ResponsePage({ searchParams }: Props) {
  const params = await searchParams;
  const caseNumber = params.case;
  const searchTerm = params.q;
  
  // Determine what to display in the prompt area
  const prompt = caseNumber ? `Case Number: ${caseNumber}` : searchTerm || 'No search term provided';
  
  let issues: Issue[] = [];
  
  try {
    // Debug environment variables
    console.log('Response Page - Environment variables:');
    console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'not set');
    console.log('API_TOKEN present:', process.env.API_TOKEN ? 'yes (first 5 chars: ' + process.env.API_TOKEN?.substring(0, 5) + '...)' : 'no');
    
    // Set a high limit value to ensure we get all results
    const query = new URLSearchParams({
      skip: '0',
      limit: '1000', // High value to effectively get all results
    });
    
    // Add either case_number or search parameter
    if (caseNumber) {
      query.append('case_number', caseNumber);
    } else if (searchTerm) {
      query.append('search', searchTerm);
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
    const requestUrl = `${baseUrl}/api/v2/cases/?${query.toString()}`;
    console.log('Fetching from:', requestUrl);
    
    // Use the authenticatedFetch utility for automatic token management
    const response = await authenticatedFetch(requestUrl, {
      method: 'GET'
    });
    
    if (!response) {
      throw new Error('Failed to make authenticated request');
    }
    
    if (response.ok) {
      const data = await response.json();
      console.log('API request succeeded');
      console.log('API response structure:', JSON.stringify(data).substring(0, 200) + '...');
     
      
      if (Array.isArray(data)) {
        // Direct array of issues
        issues = data;
        console.log(`Found ${data.length} issues (direct array)`);
      } else if (data && data.data && Array.isArray(data.data)) {
        // Nested data property containing array
        issues = data.data;
        console.log(`Found ${data.data.length} issues (nested in data property)`);
      } else if (data && Array.isArray(data.case)) {
        // New API format with case array
        issues = data.case;
        console.log(`Found ${data.case.length} cases (new API format)`);
      } else if (data && data.case) {
        // Single case object in new API format
        issues = [data.case];
        console.log('Found 1 case (single case object)');
      } else {
        console.error('Unexpected response format:', data);
      }
    } else {
      const errorText = await response.text().catch(() => 'No error text available');
      console.error(`Failed to fetch issues: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
    }
  } catch (error) {
    console.error('Error fetching issues:', error);
  }

  // Add metadata for better mobile display
  // Calculate total count for pagination
  const totalCount = issues.length;
  console.log('Total issues found:', totalCount);

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
      <ResponseDisplay prompt={prompt} issues={issues} totalCount={totalCount} />
    </>
  );
}
