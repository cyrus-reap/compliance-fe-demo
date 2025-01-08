"use client";

import { ReactNode } from "react";
import { Button, Layout as AntLayout, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { token } from "@/app/theme";

const { Header, Content, Footer } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  title?: string;
  children: ReactNode;
  showBackButton?: boolean; // Optionally hide the back button
}

export default function Layout({
  title,
  children,
  showBackButton = true,
}: LayoutProps) {
  const router = useRouter();

  return (
    <AntLayout
      style={{
        minHeight: "100vh",
        background: token.color.grey[200],
      }}
    >
      <Header
        style={{
          background: token.color.darkViolet,
          padding: "0 16px",
          color: token.color.white,
          display: "flex",
          alignItems: "center",
        }}
      >
        {showBackButton && (
          <Button
            type="link"
            onClick={() => router.back()}
            icon={<ArrowLeftOutlined />}
            style={{ color: token.color.white, marginRight: 16 }}
          >
            Back
          </Button>
        )}
        {title && (
          <Title
            level={4}
            style={{
              color: token.color.white,
              margin: 0,
              lineHeight: "inherit",
            }}
          >
            {title}
          </Title>
        )}
      </Header>
      <Content style={{ padding: "24px 16px", background: token.color.white }}>
        {children}
      </Content>
      <Footer
        style={{ textAlign: "center", background: token.color.grey[300] }}
      >
        <Typography.Text type="secondary">
          Reap's Compliance API Demo
        </Typography.Text>
      </Footer>
    </AntLayout>
  );
}
