import { Issue } from './types';

interface ApiResponse {
  sessionId: string;
  data: Issue[];
}

// Extract case number (e.g., "2025/1562" or "case number 2025/1562" or Arabic equivalent)
function parsePrompt(prompt: string): { case_number?: string; search?: string } {
  // Enhanced regex to support both English "case number" and Arabic "رقم القضية"
  const caseNumberMatch = prompt.match(/(?:(?:case number|رقم القضية)\s+)?(\d{4}\/\d+)/i);
  if (caseNumberMatch) {
    return { case_number: caseNumberMatch[1] };
  }
  return { search: prompt };
}

export async function submitLegalPrompt(prompt: string): Promise<ApiResponse> {
  const query = new URLSearchParams({
    skip: '0',
    limit: '10',
    ...(parsePrompt(prompt).case_number
      ? { case_number: parsePrompt(prompt).case_number! }
      : { search: prompt }),
  });

  const endpoint = `/api/issues`;

  try {
    const response = await fetch(`${endpoint}?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();
    
    // Log the response data for debugging
    console.log('API response:', responseData);
    
    // Check if the response has the expected format
    if (!responseData.sessionId) {
      throw new Error('Unexpected response format: Missing sessionId');
    }

    return responseData as ApiResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching from API:', {
      prompt,
      url: `${endpoint}?${query.toString()}`,
      error: errorMessage,
    });
    throw new Error(`Failed to fetch issues: ${errorMessage}`);
  }
}