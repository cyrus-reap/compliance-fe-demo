import { ConfigProvider } from "antd";
import { token } from "@/app/theme";

export const AntdThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: token.color.lightViolet[700],
          colorSuccess: token.color.green[600],
          colorError: token.color.red[600],
          colorWarning: token.color.orange[600],
          colorText: token.color.grey[800],
          colorTextSecondary: token.color.grey[600],
          colorBgContainer: token.color.white,
          borderRadius: 6,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
          boxShadowSecondary: "0 2px 8px rgba(0, 0, 0, 0.06)",
          // Use theme font configuration
          fontFamily: token.font.family.sans,
          fontSize: parseInt(token.font.size.base),
          fontSizeHeading1: parseInt(token.font.size["4xl"]),
          fontSizeHeading2: parseInt(token.font.size["3xl"]),
          fontSizeHeading3: parseInt(token.font.size["2xl"]),
          fontSizeHeading4: parseInt(token.font.size.xl),
          fontSizeHeading5: parseInt(token.font.size.lg),
        },
        components: {
          Button: {
            borderRadius: 6,
            boxShadow: "none",
            primaryShadow: "0 2px 4px rgba(128, 106, 170, 0.1)",
            fontWeight: token.font.weight.medium,
          },
          Card: {
            borderRadius: 8,
            boxShadow: "none",
            borderRadiusLG: 12,
          },
          Input: {
            borderRadius: 6,
            boxShadow: "none",
            fontFamily: token.font.family.sans,
          },
          Select: {
            borderRadius: 6,
            boxShadow: "none",
            fontFamily: token.font.family.sans,
          },
          Table: {
            borderRadius: 8,
            boxShadow: "none",
            fontFamily: token.font.family.sans,
          },
          Typography: {
            fontFamilyCode: token.font.family.mono,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
