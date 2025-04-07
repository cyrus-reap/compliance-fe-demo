"use client";

import { ReactNode, useState, useEffect, Suspense } from "react";
import { Layout as AntLayout, Spin } from "antd";
import { usePathname } from "next/navigation";
import { useLayout } from "@/app/layoutContext";
import { useNavigationItems } from "@/components/layout/NavigationConfig";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
import MainContent from "@/components/layout/MainContent";

const { Content, Footer, Header } = AntLayout;

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { options } = useLayout();
  const [isLoading, setIsLoading] = useState(false);
  const navigationItems = useNavigationItems();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleRouteChange = () => {
      setIsLoading(true);
      timeout = setTimeout(() => setIsLoading(false), 700);
    };

    handleRouteChange();

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <Suspense fallback={<Spin size="large" />}>
      <AntLayout className="min-h-screen">
        <Header className="p-0 h-auto">
          <AppHeader options={options} navigationItems={navigationItems} />
        </Header>

        <LoadingOverlay isLoading={isLoading} />

        <Content>
          <MainContent isLoading={isLoading}>{children}</MainContent>
        </Content>

        <Footer className="p-0">
          <AppFooter />
        </Footer>
      </AntLayout>
    </Suspense>
  );
}
