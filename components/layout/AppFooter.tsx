import { Typography } from "antd";
import { token } from "@/app/theme";

const { Text } = Typography;

export default function AppFooter() {
  return (
    <footer
      className="text-center p-4 text-sm"
      style={{
        backgroundColor: token.color.grey[100],
        borderTop: `1px solid ${token.color.grey[300]}`,
      }}
    >
      <Text type="secondary">
        (REAP) Compliance API Demo © {new Date().getFullYear()}
      </Text>
    </footer>
  );
}
