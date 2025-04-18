import { Card, Typography, Space, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Title, Paragraph } = Typography;

export default function SecurityInfoCard() {
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
