'use client';
import { useState } from 'react';
   import { useRouter } from 'next/navigation';
   import { Button } from './Button';
   

   export function PromptInput() {
     const [prompt, setPrompt] = useState('');
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const router = useRouter();

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
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
         setError(`Failed to process prompt. Try formatting as "YYYY/NNNN" (e.g., 2025/1562).`);
       } finally {
         setLoading(false);
       }
     };

     return (
       <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
         <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
           <div
             className="text-[#adadad] flex border border-[#4d4d4d] bg-neutral-800 items-center justify-center pl-[15px] rounded-l-xl border-r-0"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="20px"
               height="20px"
               fill="currentColor"
               viewBox="0 0 256 256"
             >
               <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
             </svg>
           </div>
           <input
             placeholder="Enter your legal prompt (e.g., case number 2025/1562 or John)"
             className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#4d4d4d] bg-neutral-800 focus:border-[#4d4d4d] h-full placeholder:text-[#adadad] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base"
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             disabled={loading}
             aria-label="Legal prompt input"
           />
           <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#4d4d4d] bg-neutral-800 pr-[7px]">
             <Button type="submit" onClick={handleSubmit} disabled={loading}>
               {loading ? (
                 <svg
                   className="animate-spin h-5 w-5 text-white"
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
                 'Get started'
               )}
             </Button>
           </div>
         </div>
         {error && (
           <p className="text-red-500 text-sm font-normal leading-normal mt-2">{error}</p>
         )}
       </label>
     );
   }