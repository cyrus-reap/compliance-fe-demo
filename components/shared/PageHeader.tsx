import { Typography, Button, Space, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import { ReactNode } from "react";

const { Title } = Typography;

interface PageHeaderProps {
  title: string | ReactNode;
  onBack?: () => void;
  onRefresh?: () => void;
  tooltip?: string;
  backText?: string;
  icon?: ReactNode;
  extra?: ReactNode;
}

export default function PageHeader({
  title,
  onBack,
  onRefresh,
  tooltip,
  backText = "Back",
  icon,
  extra,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
      <div>
        {onBack && (
          <div className="flex items-center gap-2 mb-2">
            <Button
              type="link"
              onClick={onBack}
              icon={<ArrowLeftOutlined />}
              style={{
                paddingLeft: 0,
                color: token.color.grey[600],
                fontSize: "14px",
              }}
            >
              {backText}
            </Button>
          </div>
        )}
        <Title
          level={2}
          className="m-0 flex items-center gap-3"
          style={{ fontSize: "24px", fontWeight: 600 }}
        >
          {icon && icon}
          {title}
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined
                style={{
                  fontSize: "16px",
                  color: token.color.grey[500],
                }}
              />
            </Tooltip>
          )}
        </Title>
      </div>
      <Space size="middle">
        {onRefresh && (
          <Button
            type="text"
            onClick={onRefresh}
            icon={<ReloadOutlined />}
            style={{
              color: token.color.grey[600],
            }}
          >
            Refresh
          </Button>
        )}
        {extra}
      </Space>
    </div>
  );
}
