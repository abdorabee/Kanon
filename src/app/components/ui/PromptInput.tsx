'use client';
import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Button';

export function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // Extract case number if present, otherwise use the prompt as search term
      const caseNumberMatch = prompt.match(/(?:case number\s+)?(\d{4}\/\d+)/i);
      const searchParam = caseNumberMatch ? `case=${encodeURIComponent(caseNumberMatch[1])}` : `q=${encodeURIComponent(prompt)}`;
      
      // Use a clean URL with just the search parameter
      router.push(`/response?${searchParam}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Prompt submission error:', errorMessage);
      setError(`Failed to process prompt. Try again or check your input.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex w-full items-stretch rounded-lg border border-[#D3D3D3] bg-white overflow-hidden h-12 sm:h-14 shadow-sm">
        <div className="flex items-center justify-center px-3 text-[#333333]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
          </svg>
        </div>
        <input
          placeholder="Ask a legal question or search for a case"
          className="flex-1 bg-transparent border-0 text-[#333333] focus:outline-none focus:ring-0 text-sm px-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          aria-label="Legal prompt input"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center px-3 bg-[#1A3C5E] hover:bg-[#15324e] transition-colors"
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-white"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="text-[#BF9D9D] text-xs mt-2">{error}</p>
      )}
    </form>
  );
}