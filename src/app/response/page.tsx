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
    const apiUrl = 'https://api.kanony.xyz';
    const response = await fetch(`${apiUrl}/issues/?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1MDk0MDA2MX0.Y_upBnwo5_mRTWfa1y6PUJoSUJ0cS8EKs4PmeCcdpjg'
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch issues:', response.statusText);
    } else {
      const data = await response.json();
      if (Array.isArray(data)) {
        issues = data;
      } else {
        console.error('Unexpected response format:', data);
      }
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
