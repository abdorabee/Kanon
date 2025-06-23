import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5 @container">
      <div className="flex flex-col max-w-[960px] flex-1">{children}</div>
    </div>
  );
}