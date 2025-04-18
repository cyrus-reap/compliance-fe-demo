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
          colorPrimary: token.color.darkViolet,
          colorSuccess: token.color.green[600],
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
