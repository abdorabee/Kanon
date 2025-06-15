import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base hover:bg-gray-900 transition-all"
      {...props}
    >
      <span className="truncate">{children}</span>
    </button>
  );
}