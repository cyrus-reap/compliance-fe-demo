import { Typography } from "antd";
import { token } from "@/app/theme";

const { Text } = Typography;

export default function PageFooter() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        backgroundColor: token.color.grey[800],
        color: token.color.white,
      }}
    >
      <div className="container mx-auto">
        <div className="mb-4">
          <Text className="text-sm" style={{ color: token.color.grey[300] }}>
            <a
              href="https://reap-ra.readme.io"
              className="mr-4 hover:text-white"
              style={{ color: token.color.grey[300] }}
            >
              Documentation
            </a>
            <a
              href="#"
              className="mr-4 hover:text-white"
              style={{ color: token.color.grey[300] }}
            >
              Support
            </a>
            <a
              href="#"
              className="hover:text-white"
              style={{ color: token.color.grey[300] }}
            >
              Contact
            </a>
          </Text>
        </div>
        <Text className="text-sm" style={{ color: token.color.grey[400] }}>
          Reap Compliance API Demo © {new Date().getFullYear()}
        </Text>
      </div>
    </footer>
  );
}
