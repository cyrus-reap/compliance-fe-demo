import { ConfigProvider, theme } from "antd";
import { token } from "@/app/theme";

export const AntdThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: token.color.green[600],
          colorSuccess: token.color.green[400],
          colorError: token.color.red[600],
          colorWarning: token.color.orange[600],
          colorText: token.color.grey[800],
          colorTextSecondary: token.color.grey[600],
          colorBgContainer: token.color.white,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
