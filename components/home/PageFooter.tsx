import { Typography } from "antd";
import { token } from "@/app/theme";

const { Text } = Typography;

export default function PageFooter() {
  return (
    <footer
      className="pt-10 pb-8 text-center"
      style={{
        background: `linear-gradient(90deg, ${token.color.grey[900]} 0%, ${token.color.darkViolet} 100%)`,
        color: token.color.white,
        borderTop: `1px solid ${token.color.grey[700]}`,
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-4">
          <Text className="text-sm" style={{ color: token.color.grey[300] }}>
            <a
              href="https://reap-ra.readme.io"
              className="mr-6 hover:text-white hover:underline transition"
              style={{ color: token.color.grey[300], fontWeight: 500 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              href="#"
              className="mr-6 hover:text-white hover:underline transition"
              style={{ color: token.color.grey[300], fontWeight: 500 }}
            >
              Support
            </a>
            <a
              href="#"
              className="hover:text-white hover:underline transition"
              style={{ color: token.color.grey[300], fontWeight: 500 }}
            >
              Contact
            </a>
          </Text>
        </div>
        <Text
          className="text-xs"
          style={{
            color: token.color.grey[500],
            letterSpacing: 0.5,
            fontWeight: 400,
          }}
        >
          Reap Compliance API Demo © {new Date().getFullYear()}
        </Text>
      </div>
    </footer>
  );
}
