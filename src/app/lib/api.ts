import { Issue } from './types';

// Extract case number (e.g., "2025/1562" or "case number 2025/1562")
function parsePrompt(prompt: string): { case_number?: string; search?: string } {
  const caseNumberMatch = prompt.match(/(?:case number\s+)?(\d{4}\/\d+)/i);
  if (caseNumberMatch) {
    return { case_number: caseNumberMatch[1] };
  }
  return { search: prompt };
}

export async function submitLegalPrompt(prompt: string): Promise<Issue[]> {
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

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format: Expected an array of issues');
    }

    return data as Issue[];
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