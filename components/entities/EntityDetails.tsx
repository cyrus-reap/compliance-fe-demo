import {
  Typography,
  Card,
  Descriptions,
  Badge,
  Space,
  Collapse,
  Empty,
  Button,
  Tooltip,
} from "antd";
import {
  ClockCircleOutlined,
  InfoCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import RequirementCard from "@/components/RequirementCard";
import { GetEntityDetailsType } from "@/types";

const { Text } = Typography;
const { Panel } = Collapse;

interface EntityDetailsProps {
  data: GetEntityDetailsType;
  onBack: () => void;
}

export default function EntityDetails({ data, onBack }: EntityDetailsProps) {
  const submittedRequirements = data.submittedRequirements || [];

  const getRequirementStatus = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return <Badge status="success" text="Approved" />;
      case "REJECTED":
        return <Badge status="error" text="Rejected" />;
      case "PENDING":
        return <Badge status="processing" text="Pending" />;
      default:
        return <Badge status="default" text={status} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md rounded-lg mb-6">
        <Descriptions
          title="Entity Information"
          bordered
          column={{ xs: 1, sm: 2, md: 2 }}
          labelStyle={{ fontWeight: "bold" }}
        >
          <Descriptions.Item label="ID" span={2}>
            <Text copyable={{ text: data.id }} className="font-mono">
              {data.id}
            </Text>
          </Descriptions.Item>

          <Descriptions.Item label="Business ID">
            {data.businessId || <Text type="secondary">Not Assigned</Text>}
          </Descriptions.Item>

          <Descriptions.Item label="External ID">
            <Text className="font-mono">{data.externalId}</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            <Space>
              <ClockCircleOutlined style={{ color: token.color.grey[600] }} />
              <Text>{new Date(data.createdAt).toLocaleString()}</Text>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Updated At">
            <Text type="secondary">
              {new Date(data.updatedAt).toLocaleString()}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title={
          <div className="flex items-center gap-2">
            <FileSearchOutlined
              style={{ color: token.color.lightViolet[700] }}
            />
            <span>Submitted Requirements</span>
            <Badge
              count={submittedRequirements.length}
              style={{ backgroundColor: token.color.lightViolet[700] }}
            />
          </div>
        }
        className="shadow-md rounded-lg"
        extra={
          <Tooltip title="These are the requirements submitted for this entity">
            <InfoCircleOutlined style={{ color: token.color.grey[600] }} />
          </Tooltip>
        }
      >
        {submittedRequirements.length > 0 ? (
          <Collapse
            defaultActiveKey={submittedRequirements.map((_, i) => i.toString())}
            className="bg-white"
            bordered={false}
          >
            {submittedRequirements.map((req, index) => {
              if (!req) return null;
              return (
                <Panel
                  key={index.toString()}
                  header={
                    <div className="flex items-center justify-between">
                      <Text strong>
                        {req.requirement?.name || "Unknown Requirement"}
                      </Text>
                      {getRequirementStatus(req.status || "Unknown")}
                    </div>
                  }
                  className="mb-4 border border-gray-200 rounded-md overflow-hidden"
                >
                  <RequirementCard
                    name={req.requirement?.name || "Unknown Requirement"}
                    status={req.status || "Unknown Status"}
                    valueType={req.requirement?.valueType || "Unknown"}
                    value={req.value}
                  />
                </Panel>
              );
            })}
          </Collapse>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No requirements have been submitted yet"
          />
        )}

        <div className="mt-6 text-center">
          <Button
            type="primary"
            onClick={onBack}
            className="block mx-auto"
            style={{
              backgroundColor: token.color.lightViolet[700],
              borderColor: token.color.lightViolet[700],
            }}
          >
            Back to Entities
          </Button>
        </div>
      </Card>
    </div>
  );
}
