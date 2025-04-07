import { Table, Typography, Tag, Badge, Empty, Card } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Text } = Typography;

interface Requirement {
  requirementId: string;
  requirementSlug: string;
  requirementLevel: string;
  valueType: string;
  associatedEntity: string;
}

interface RequirementTableProps {
  data: Requirement[] | undefined;
  loading: boolean;
}

export default function RequirementTable({
  data,
  loading,
}: RequirementTableProps) {
  const getRequirementLevelTag = (level: string) => {
    switch (level) {
      case "REQUIRED":
        return <Tag color={token.color.red[600]}>Required</Tag>;
      case "OPTIONAL":
        return <Tag color={token.color.green[600]}>Optional</Tag>;
      default:
        return <Tag color={token.color.grey[600]}>{level}</Tag>;
    }
  };

  const getValueTypeTag = (type: string) => {
    switch (type) {
      case "BOOLEAN":
        return <Tag color={token.color.lightBlue[700]}>Boolean</Tag>;
      case "DATE":
        return <Tag color={token.color.orange[600]}>Date</Tag>;
      case "TEXT":
        return <Tag color={token.color.lightViolet[700]}>Text</Tag>;
      case "FILE":
        return <Tag color={token.color.yellow[600]}>File</Tag>;
      case "JSON":
        return <Tag color={token.color.grey[800]}>JSON</Tag>;
      default:
        return <Tag color={token.color.grey[600]}>{type}</Tag>;
    }
  };

  const columns = [
    {
      title: "Requirement ID",
      dataIndex: "requirementId",
      key: "requirementId",
      width: 100,
      ellipsis: true,
      render: (id: string) => (
        <Text copyable={{ text: id }} className="font-mono text-xs">
          {id.substring(0, 8)}...
        </Text>
      ),
    },
    {
      title: "Requirement Slug",
      dataIndex: "requirementSlug",
      key: "requirementSlug",
      width: 200,
      render: (slug: string) => (
        <div className="flex items-center gap-2">
          <FileTextOutlined style={{ color: token.color.lightBlue[700] }} />
          <Text strong style={{ color: token.color.grey[800] }}>
            {slug}
          </Text>
        </div>
      ),
    },
    {
      title: "Associated Entity",
      dataIndex: "associatedEntity",
      key: "associatedEntity",
      width: 150,
      responsive: ["md"],
      render: (entity: string) => (
        <Badge
          status={entity === "ENTITY" ? "processing" : "default"}
          text={entity}
        />
      ),
    },
    {
      title: "Requirement Level",
      dataIndex: "requirementLevel",
      key: "requirementLevel",
      width: 130,
      render: (level: string) => getRequirementLevelTag(level),
    },
    {
      title: "Value Type",
      dataIndex: "valueType",
      key: "valueType",
      width: 100,
      render: (type: string) => getValueTypeTag(type),
    },
  ];

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <Table
        dataSource={data || []}
        columns={columns as any}
        rowKey="requirementId"
        pagination={false}
        bordered={false}
        size="middle"
        loading={loading}
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No requirements found for this feature"
            />
          ),
        }}
      />
    </Card>
  );
}
