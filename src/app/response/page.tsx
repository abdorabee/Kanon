import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";
import { Issue } from '@/app/lib/types';

interface SearchParams {
  case?: string;
  q?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

// Function to get a fresh token by logging in
async function getAccessToken() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
  const loginUrl = `${apiUrl}/api/v1/token`;
  
  try {
    console.log('Attempting to get a fresh token...');
    
    // Default credentials
    const username = 'admin';
    const password = 'admin_kanony_MEDA';
    
    // Form data for login
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData.toString(),
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Login failed: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('Successfully obtained new access token');
    return data.access_token;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
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
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
    const requestUrl = `${apiUrl}/api/v1/cases/?${query.toString()}`;
    console.log('Fetching from:', requestUrl);
    
    // Get a fresh token by logging in
    const token = await getAccessToken();
    
    if (!token) {
      throw new Error('Failed to obtain authentication token');
    }
    
    console.log('Using fresh Bearer token for authentication');
    
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // Don't use cache to ensure fresh requests
      cache: 'no-store',
      // Add credentials inclusion
      credentials: 'include',
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
