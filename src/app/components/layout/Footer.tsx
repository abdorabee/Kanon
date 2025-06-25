'use client';

export default function Footer() {
  return (
    <footer className="flex justify-center bg-[#F5F5F5]">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              Terms of Service
            </a>
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              Privacy Policy
            </a>
            <a href="#" className="text-[#333333] text-base font-normal leading-normal min-w-40 hover:text-[#1A3C5E]">
              Contact Us
            </a>
          </div>
          <p className="text-[#333333] text-base font-normal leading-normal">
          ©
          2025 Kanon. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}