'use client';

import useTranslation from 'next-translate/useTranslation';

interface FeatureCardProps {
  icon: 'MagnifyingGlass' | 'File' | 'PresentationChart';
  title?: string;
  description?: string;
  translationKey?: string;
}

export function FeatureCard({ icon, title, description, translationKey }: FeatureCardProps) {
  const { t } = useTranslation('common');

  // If translationKey is provided, use it to get title and description
  if (translationKey) {
    title = title || t(`${translationKey}.title`);
    description = description || t(`${translationKey}.description`);
  }

  const icons = {
    MagnifyingGlass: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
      </svg>
    ),
    File: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
      </svg>
    ),
    PresentationChart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
      </svg>
    ),
  };

  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-[#4d4d4d] bg-neutral-800 p-4 flex-col">
      <div className="text-white">{icons[icon]}</div>
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-base font-bold leading-tight">{title}</h2>
        <p className="text-[#adadad] text-sm font-normal leading-normal">{description}</p>
      </div>
    </div>
  );
}