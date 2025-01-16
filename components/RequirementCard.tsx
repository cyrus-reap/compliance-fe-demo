import React from "react";
import { Card, Typography, Button, Image, Badge } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface RequirementCardProps {
  name: string;
  status: string;
  valueType: string;
  value?: any;
}

const RequirementCard: React.FC<RequirementCardProps> = ({
  name,
  status,
  valueType,
  value,
}) => {
  const isFile = valueType === "FILE";
  const fileUrl = value?.presignedUrl;

  const statusColors: Record<string, string> = {
    PENDING: "orange",
    APPROVED: "green",
    REJECTED: "red",
    UNKNOWN: "default",
  };

  const badgeColor = statusColors[status.toUpperCase()] || "default";

  const renderValue = () => {
    if (isFile && fileUrl) {
      return (
        <div className="text-gray-600 mt-4 flex items-center gap-4">
          <Image
            src={fileUrl}
            alt="File Thumbnail"
            width={80}
            height={80}
            className="rounded border"
            style={{ objectFit: "cover" }}
            preview={{ visible: false }}
          />
          <Button
            type="primary"
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={<DownloadOutlined />}
          >
            Download File
          </Button>
        </div>
      );
    }

    if (value && typeof value === "object") {
      return (
        <div className="text-gray-600 mt-4">
          <Text>Details:</Text>
          <ul className="list-disc ml-6 mt-2">
            {Object.entries(value).map(([key, val]) => (
              <li key={key}>
                <Text strong>{key}:</Text> <Text>{JSON.stringify(val)}</Text>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="text-gray-600 mt-4">
        <Text>Value: </Text>
        <Text>{value || "No Value"}</Text>
      </div>
    );
  };

  return (
    <Card bordered className="mb-4 w-full shadow-sm hover:shadow-md">
      <div className="flex justify-between items-center">
        <Text strong className="block">
          {name || "Unknown Requirement"}
        </Text>
        <Badge color={badgeColor} text={status || "Unknown Status"} />
      </div>
      {renderValue()}
    </Card>
  );
};

export default RequirementCard;
