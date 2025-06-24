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
  // Force white background for the entire page
  const pageStyle = {
    background: '#F5F5F5',
    backgroundColor: '#F5F5F5',
  };
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
    
    // Fetch the issues data directly from the backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${apiUrl}/issues/?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

  return <ResponseDisplay prompt={prompt} issues={issues} />;
}
