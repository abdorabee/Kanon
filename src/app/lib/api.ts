import { DocumentWithIssues } from './types';

export async function submitLegalPrompt(prompt: string): Promise<DocumentWithIssues[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/doc';
  const query = new URLSearchParams({
    search: prompt,
    skip: '0',
    limit: '10',
    include_issues: 'true',
  });

  try {
    const response = await fetch(`${API_URL}/documents/?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as DocumentWithIssues[];
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
}