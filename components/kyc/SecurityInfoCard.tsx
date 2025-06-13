import { Card, Typography, Space, Button } from "antd";
import { LockOutlined, SettingOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { useApiKey } from "@/contexts/ApiKeyContext";

const { Title, Paragraph } = Typography;

export default function SecurityInfoCard() {
  const { config } = useApiKey();

  return (
    <Card className="shadow-md rounded-xl bg-gray-50 border-0">
      <Space direction="vertical" size="middle" className="w-full">
        <div>
          <Title level={5} className="flex items-center gap-2">
            <LockOutlined style={{ color: token.color.green[600] }} />
            Security Information
          </Title>
          <Paragraph className="text-gray-600 mb-0">
            This verification is powered by Sumsub, a secure identity
            verification service. Your personal data is encrypted and processed
            in accordance with our privacy policy.
          </Paragraph>
        </div>

        {/* API Key Status Info */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <Title level={5} className="m-0 mb-2 flex items-center gap-2">
            <SettingOutlined style={{ color: token.color.lightBlue[600] }} />
            API Configuration
          </Title>
          <div className="flex items-center justify-between mb-2">
            <Paragraph className="text-gray-600 mb-0">
              Current API Configuration:{" "}
              <span
                className={`font-semibold ${
                  config.useCustomKey ? "text-green-600" : "text-blue-600"
                }`}
              >
                {config.useCustomKey ? "Custom API Key" : "System API Key"}
              </span>
            </Paragraph>
            <Button
              type="text"
              size="small"
              icon={<SettingOutlined />}
              className="text-gray-600 hover:text-blue-600"
              onClick={() => {
                // Find and click the API key manager button in the header
                const apiKeyButton = document.querySelector(
                  '[data-testid="api-key-manager-trigger"]'
                ) as HTMLElement;
                if (apiKeyButton) {
                  apiKeyButton.click();
                } else {
                  // Fallback: dispatch a custom event that the ApiKeyManager can listen to
                  window.dispatchEvent(new CustomEvent("openApiKeyManager"));
                }
              }}
            >
              Configure
            </Button>
          </div>
          {config.useCustomKey && (
            <Paragraph className="text-sm text-yellow-600 mb-0">
              ⚠️ You are using a custom API key for testing. Make sure it's a
              development/test key only.
            </Paragraph>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <Title level={5} className="m-0 mb-2">
            Need Help?
          </Title>
          <Paragraph className="text-gray-600 mb-2">
            If you're experiencing any issues with the verification process,
            please try the following:
          </Paragraph>
          <ul className="list-disc pl-5 text-gray-600">
            <li>
              Ensure you're using a supported browser (Chrome, Firefox, Safari)
            </li>
            <li>
              Check that your camera and microphone permissions are enabled
            </li>
            <li>Make sure you have good lighting for document photos</li>
          </ul>
          <div className="mt-3">
            <Button
              type="link"
              className="p-0"
              onClick={() =>
                window.open("https://support.sumsub.com", "_blank")
              }
            >
              Visit Support Center
            </Button>
          </div>
        </div>
      </Space>
    </Card>
  );
}
