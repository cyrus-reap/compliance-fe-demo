"use client";

import { ReactNode, useState, useEffect, Suspense } from "react";
import { Button, Layout as AntLayout, Typography, Spin } from "antd";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { token } from "@/app/theme";
import { useLayout } from "@/app/layoutContext";

const { Header, Content, Footer } = AntLayout;
const { Title, Text } = Typography;

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { options } = useLayout();
  const [isLoading, setIsLoading] = useState(false);

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
      <AntLayout
        className="min-h-screen relative"
        style={{ backgroundColor: token.color.grey[100] }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 w-1/2 mx-auto">
            <DotLottieReact
              src="/kyc-loader.lottie"
              loop
              autoplay
              style={{ width: "200px" }}
            />
          </div>
        )}

        <Header
          className="flex items-center px-6 shadow-md"
          style={{
            backgroundColor: token.color.darkViolet,
          }}
        >
          {options.showBackButton && (
            <Button
              type="link"
              onClick={() => router.back()}
              icon={<ArrowLeftOutlined />}
              style={{
                color: token.color.white,
                fontSize: "16px",
                fontWeight: "bold",
                padding: 0,
              }}
            >
              Back
            </Button>
          )}

          {options.title && (
            <Title
              level={5}
              className="mx-auto ml-4 text-lg font-semibold leading-[48px] text-center"
              style={{
                color: token.color.white,
              }}
            >
              {options.title}
            </Title>
          )}

          <Button
            type="link"
            onClick={() => router.push("/")}
            icon={<HomeOutlined />}
            style={{
              color: token.color.white,
              fontSize: "16px",
              fontWeight: "bold",
              padding: 0,
            }}
            className="ml-auto"
          >
            Home
          </Button>
        </Header>

        <Content className="p-6">{!isLoading && children}</Content>

        <Footer
          className="text-center p-4 text-sm border-t"
          style={{
            backgroundColor: token.color.grey[100],
            borderTop: `1px solid ${token.color.grey[300]}`,
          }}
        >
          <Text type="secondary">
            (REAP) Compliance API Demo © {new Date().getFullYear()}
          </Text>
        </Footer>
      </AntLayout>
    </Suspense>
  );
}
