import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";
import { Issue } from '@/app/lib/types';

interface SearchParams {
  case?: string;
  q?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

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
    
    // Build the API query based on the URL parameters
    const query = new URLSearchParams({
      skip: '0',
      limit: '10',
    });
    
    // Add either case_number or search parameter
    if (caseNumber) {
      query.append('case_number', caseNumber);
    } else if (searchTerm) {
      query.append('search', searchTerm);
    }
    
    // Fetch the issues data directly from the hosted backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
    const requestUrl = `${apiUrl}/issues/?${query.toString()}`;
    console.log('Fetching from:', requestUrl);
    
    // Use the correct token from the curl example
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1MDk0NDEzM30.hNUP35v6siWStuHdXY4WPaF__Rd36C9ImB_tQOoMaHI';
    
    console.log('Using Bearer token authentication with correct token');
    
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('API request succeeded');
      if (Array.isArray(data)) {
        issues = data;
        console.log(`Found ${data.length} issues`);
      } else if (data && data.data && Array.isArray(data.data)) {
        issues = data.data;
        console.log(`Found ${data.data.length} issues (nested in data property)`);
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
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <ResponseDisplay prompt={prompt} issues={issues} />
    </>
  );
}
