"use client";

import { ButtonHTMLAttributes, ReactNode } from 'react';
import useTranslation from 'next-translate/useTranslation';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  translationKey?: string;
  translationParams?: Record<string, any>;
}

export function Button({ children, translationKey, translationParams, ...props }: ButtonProps) {
  const { t } = useTranslation('common');

  // Get translated text if translationKey is provided
  const buttonText = translationKey ? t(translationKey, translationParams) : children;

  return (
    <button
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base hover:bg-gray-900 transition-all"
      {...props}
    >
      <span className="truncate">{buttonText}</span>
    </button>
  );
}