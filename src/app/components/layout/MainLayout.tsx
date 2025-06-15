interface MainLayoutProps {
    children: React.ReactNode;
  }
  
  export function MainLayout({ children }: MainLayoutProps) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5 @container @[480px]:px-10">
        <div className="flex flex-col max-w-[960px] flex-1">{children}</div>
      </div>
    );
  }