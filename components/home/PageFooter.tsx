import { Typography } from "antd";

const { Text } = Typography;

export default function PageFooter() {
  return (
    <footer className="py-8 text-center bg-gray-800 text-white">
      <div className="container mx-auto">
        <div className="mb-4">
          <Text className="text-gray-300 text-sm">
            <a
              href="https://reap-ra.readme.io"
              className="text-gray-300 hover:text-white mr-4"
            >
              Documentation
            </a>
            <a href="#" className="text-gray-300 hover:text-white mr-4">
              Support
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </Text>
        </div>
        <Text className="text-gray-400 text-sm">
          Reap Compliance API Demo © {new Date().getFullYear()}
        </Text>
      </div>
    </footer>
  );
}
