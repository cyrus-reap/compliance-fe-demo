"use client";

import { ReactNode } from "react";
import { Button, Layout as AntLayout, Typography } from "antd";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { token } from "@/app/theme";
import { useLayout } from "@/app/layoutContext";

const { Header, Content, Footer } = AntLayout;
const { Title, Text } = Typography;

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { options } = useLayout();

  return (
    <AntLayout
      style={{
        minHeight: "100vh",
        backgroundColor: token.color.grey[100],
      }}
    >
      <Header
        style={{
          backgroundColor: token.color.darkViolet,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
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
            style={{
              color: token.color.white,
              margin: "0 auto 0 16px",
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "48px",
              textAlign: "center",
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
            marginLeft: "auto",
            padding: 0,
          }}
        >
          Home
        </Button>
      </Header>

      <Content>{children}</Content>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: token.color.grey[100],
          padding: "16px 24px",
          fontSize: "14px",
          borderTop: `1px solid ${token.color.grey[300]}`,
        }}
      >
        <Text type="secondary">
          (REAP) Compliance API Demo © {new Date().getFullYear()}
        </Text>
      </Footer>
    </AntLayout>
  );
}
