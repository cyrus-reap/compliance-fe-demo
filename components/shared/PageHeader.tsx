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
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div>
        {onBack && (
          <div className="flex items-center gap-2 mb-1">
            <Button
              type="link"
              onClick={onBack}
              icon={<ArrowLeftOutlined />}
              style={{ paddingLeft: 0 }}
            >
              {backText}
            </Button>
          </div>
        )}
        <Title level={2} className="m-0 flex items-center gap-2">
          {icon && icon}
          {title}
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined
                style={{ fontSize: "16px", color: token.color.grey[600] }}
              />
            </Tooltip>
          )}
        </Title>
      </div>
      <Space>
        {onRefresh && (
          <Button icon={<ReloadOutlined />} onClick={onRefresh}>
            Refresh
          </Button>
        )}
        {extra}
      </Space>
    </div>
  );
}
