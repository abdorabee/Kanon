import { PromptInput } from './PromptInput';

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 bg-[#F5F5F5]">
      <div className="flex flex-col gap-3 sm:gap-4 text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333]">
          Kanon Legal Assistant
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#333333] max-w-xl mx-auto px-2 sm:px-0">
          Ask questions about cases, analyze legal documents, or get help with research
        </p>
      </div>
      
      <div className="w-full max-w-2xl px-2 sm:px-4">
        <PromptInput />
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 text-xs text-[#333333] px-2">
        <span className="w-full text-center mb-2 sm:w-auto sm:mb-0">Examples:</span>
        <button className="px-2 sm:px-3 py-1 bg-[#A3CCBE] hover:bg-[#8ebcaa] text-[#1A3C5E] rounded-md transition-colors text-xs sm:text-sm">
          Find case 2023/1234
        </button>
        <button className="px-2 sm:px-3 py-1 bg-[#A3CCBE] hover:bg-[#8ebcaa] text-[#1A3C5E] rounded-md transition-colors text-xs sm:text-sm">
          Summarize Smith v. Johnson
        </button>
        <button className="px-2 sm:px-3 py-1 bg-[#A3CCBE] hover:bg-[#8ebcaa] text-[#1A3C5E] rounded-md transition-colors text-xs sm:text-sm">
          Legal implications of contract breach
        </button>
      </div>
    </div>
  );
}