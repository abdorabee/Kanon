import { PromptInput } from './PromptInput';

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="flex flex-col gap-4 text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100">
          Kanon Legal Assistant
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Ask questions about cases, analyze legal documents, or get help with research
        </p>
      </div>
      
      <div className="w-full max-w-2xl">
        <PromptInput />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-gray-400">
        <span>Examples:</span>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
          Find case 2023/1234
        </button>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
          Summarize Smith v. Johnson
        </button>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
          Legal implications of contract breach
        </button>
      </div>
    </div>
  );
}