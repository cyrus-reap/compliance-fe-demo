import { ReactNode } from "react";

interface MainContentProps {
  isLoading: boolean;
  children: ReactNode;
}

export default function MainContent({ isLoading, children }: MainContentProps) {
  if (isLoading) {
    return null;
  }

  return (
    <main className="p-6 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
}
