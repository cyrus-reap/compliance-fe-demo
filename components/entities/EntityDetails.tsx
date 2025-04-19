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
  Divider,
  Row,
  Col,
} from "antd";
import {
  ClockCircleOutlined,
  InfoCircleOutlined,
  FileSearchOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import RequirementCard from "@/components/RequirementCard";
import { GetEntityDetailsType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Text, Title } = Typography;
const { Panel } = Collapse;

interface EntityDetailsProps {
  data: GetEntityDetailsType;
  onBack: () => void;
}

function getEntityStatus(
  submittedRequirements: GetEntityDetailsType["submittedRequirements"]
): string {
  if (!submittedRequirements || submittedRequirements.length === 0)
    return "Unknown";
  if (submittedRequirements.some((r) => r.status?.toUpperCase() === "REJECTED"))
    return "Rejected";
  if (submittedRequirements.some((r) => r.status?.toUpperCase() === "PENDING"))
    return "Pending";
  if (
    submittedRequirements.every((r) => r.status?.toUpperCase() === "APPROVED")
  )
    return "Approved";
  return "Unknown";
}

export default function EntityDetails({ data, onBack }: EntityDetailsProps) {
  const router = useRouter();
  const submittedRequirements = data.submittedRequirements || [];
  const [resetLoading, setResetLoading] = useState<string | null>(null);

  const getRequirementStatus = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return <Badge status="success" text="Approved" />;
      case "REJECTED":
        return <Badge status="error" text="Rejected" />;
      case "PENDING":
        return <Badge status="processing" text="Pending" />;
      default:
        return <Badge status="default" text={status || "Unknown"} />;
    }
  };

  // Infer entity status from requirements
  const entityStatus = getEntityStatus(submittedRequirements);

  return (
    <div className="max-w-4xl mx-auto">
      <Card
        className="shadow-md rounded-lg mb-8"
        styles={{ body: { padding: 0 } }}
      >
        <div className="p-6 pb-0">
          <Title level={4} className="mb-2">
            Entity Information
          </Title>
          <Text type="secondary">
            Review your entity details and verification progress.
          </Text>
        </div>
        <Divider className="!my-0" />
        <Row gutter={[32, 0]} className="p-6">
          <Col xs={24} md={12}>
            <Descriptions
              column={1}
              labelStyle={{ fontWeight: "bold", width: 120 }}
              contentStyle={{ wordBreak: "break-all" }}
              size="middle"
              layout="vertical"
              bordered={false}
            >
              <Descriptions.Item label="ID">
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
            </Descriptions>
          </Col>
          <Col xs={24} md={12}>
            <Descriptions
              column={1}
              labelStyle={{ fontWeight: "bold", width: 120 }}
              contentStyle={{ wordBreak: "break-all" }}
              size="middle"
              layout="vertical"
              bordered={false}
            >
              <Descriptions.Item label="Created At">
                <Space>
                  <ClockCircleOutlined />
                  <Text>{new Date(data.createdAt).toLocaleString()}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                <Text type="secondary">
                  {new Date(data.updatedAt).toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {getRequirementStatus(entityStatus)}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Card
        className="shadow-md rounded-lg"
        styles={{ body: { background: "#fff" } }}
        title={
          <div className="flex items-center gap-2">
            <FileSearchOutlined />
            <span>Submitted Requirements</span>
            <Badge count={submittedRequirements.length} />
          </div>
        }
        extra={
          <Tooltip title="These are the requirements submitted for this entity">
            <InfoCircleOutlined />
          </Tooltip>
        }
      >
        {submittedRequirements.length > 0 ? (
          <Collapse
            defaultActiveKey={submittedRequirements.map((_, i) => i.toString())}
            className="bg-white"
            bordered={false}
            expandIconPosition="end"
            style={{ background: "transparent" }}
          >
            {submittedRequirements.map((req, index) => {
              if (!req) return null;
              const showContinueVerification =
                req.requirement?.name === "Individual Verification Identity" &&
                req.status?.toUpperCase() === "PENDING";
              const showResetKyc =
                req.requirement?.name === "Individual Verification Identity" &&
                req.status?.toUpperCase() === "REJECTED";
              return (
                <Panel
                  key={index.toString()}
                  header={
                    <div className="flex items-center justify-between w-full">
                      <Space>
                        <Text strong>
                          {req.requirement?.name || "Unknown Requirement"}
                        </Text>
                        <Tooltip title={req.status}>
                          {getRequirementStatus(req.status || "Unknown")}
                        </Tooltip>
                      </Space>
                    </div>
                  }
                  className="mb-4 border border-gray-200 rounded-md overflow-hidden hover:shadow transition-shadow"
                  style={{ background: "#fff" }}
                >
                  <div className="mb-2">
                    <RequirementCard
                      name={req.requirement?.name || "Unknown Requirement"}
                      status={req.status || "Unknown Status"}
                      valueType={req.requirement?.valueType || "Unknown"}
                      value={req.value}
                    />
                  </div>
                  {showContinueVerification && (
                    <>
                      <Divider className="!my-4" />
                      <div className="flex justify-end">
                        <Tooltip title="Continue your identity verification process">
                          <Button
                            type="primary"
                            size="middle"
                            icon={<SafetyCertificateOutlined />}
                            onClick={() =>
                              router.push(`/kyc/entity?entityId=${data.id}`)
                            }
                            data-testid="continue-verification-btn"
                            style={{
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            Continue Verification
                            <ArrowRightOutlined />
                          </Button>
                        </Tooltip>
                      </div>
                    </>
                  )}
                  {showResetKyc && (
                    <>
                      <Divider className="!my-4" />
                      <div className="flex justify-end">
                        <Tooltip title="Reset your KYC to start the verification process again">
                          <Button
                            type="primary"
                            danger
                            loading={resetLoading === req.submissionId}
                            onClick={async () => {
                              router.push(`/kyc/entity?entityId=${data.id}`);
                            }}
                            data-testid="reset-kyc-btn"
                          >
                            Reset KYC
                          </Button>
                        </Tooltip>
                      </div>
                    </>
                  )}
                </Panel>
              );
            })}
          </Collapse>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No requirements have been submitted yet"
            className="my-8"
          />
        )}

        <Divider className="!my-6" />

        <Space
          direction="vertical"
          className="w-full"
          align="center"
          size="middle"
        >
          <Button
            type="default"
            onClick={onBack}
            className="block mx-auto"
            style={{
              fontWeight: 500,
              minWidth: 180,
            }}
          >
            Back to Entities
          </Button>
        </Space>
      </Card>
    </div>
  );
}
