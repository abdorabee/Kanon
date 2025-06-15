import { LegalResponse } from './types';

// Mock API function for demo
export async function submitLegalPrompt(prompt: string): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock responses
  const mockResponses = [
    'Based on your prompt, you may need to consult local regulations. For a parking ticket, you typically have 30 days to contest it with evidence such as photos or witness statements.',
    'For tenant rights issues, review your lease agreement and local tenant laws. You may be entitled to repairs or compensation if the landlord fails to address habitability concerns.',
    'In contract disputes, ensure you have written documentation. Consult a lawyer to review the terms and explore mediation or arbitration options.',
  ];

  // Return random mock response
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}