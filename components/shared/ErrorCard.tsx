import { Card, Typography, Button, Space } from "antd";
import { ReloadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Title, Text } = Typography;

interface ErrorCardProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  onBack?: () => void;
  backText?: string;
}

export default function ErrorCard({
  title = "An error occurred",
  description = "There was an error retrieving the data. Please try again.",
  onRetry,
  onBack,
  backText = "Go Back",
}: ErrorCardProps) {
  return (
    <div className="p-6">
      <Card className="w-full text-center p-8 shadow-md">
        <Title level={4} type="danger" className="mb-4">
          {title}
        </Title>
        <Text className="block mb-6 text-gray-500">{description}</Text>
        <Space>
          {onBack && (
            <Button onClick={onBack} icon={<ArrowLeftOutlined />}>
              {backText}
            </Button>
          )}
          {onRetry && (
            <Button
              onClick={onRetry}
              type="primary"
              icon={<ReloadOutlined />}
              style={{
                backgroundColor: token.color.lightBlue[700],
                borderColor: token.color.lightBlue[700],
              }}
            >
              Retry
            </Button>
          )}
        </Space>
      </Card>
    </div>
  );
}
