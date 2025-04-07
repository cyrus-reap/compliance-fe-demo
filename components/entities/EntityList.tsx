import { Table, Button, Typography, Space, Tag, Empty, Card } from "antd";
import {
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import { GetAllEntitiesForUserType } from "@/types";

const { Text } = Typography;

interface EntityListProps {
  data: GetAllEntitiesForUserType[] | undefined;
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  onView: (record: GetAllEntitiesForUserType) => void;
  onCreateNew: () => void;
}

export default function EntityList({
  data,
  loading,
  pagination,
  onView,
  onCreateNew,
}: EntityListProps) {
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    if (diffDay < 30) return `${diffDay} days ago`;

    return date.toLocaleDateString();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      ellipsis: true,
      render: (id: string) => (
        <Text copyable={{ text: id }} className="font-mono text-xs">
          {id.substring(0, 8)}...
        </Text>
      ),
    },
    {
      title: "Business ID",
      dataIndex: "businessId",
      key: "businessId",
      width: 120,
      render: (businessId: string) =>
        businessId ? (
          <Tag color={token.color.lightBlue[600]}>{businessId}</Tag>
        ) : (
          <Tag color={token.color.grey[400]}>Not Assigned</Tag>
        ),
    },
    {
      title: "External ID",
      dataIndex: "externalId",
      key: "externalId",
      width: 120,
      ellipsis: true,
      render: (id: string) => <Text className="font-mono text-xs">{id}</Text>,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      sorter: (a: GetAllEntitiesForUserType, b: GetAllEntitiesForUserType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => (
        <Space size="small">
          <ClockCircleOutlined style={{ color: token.color.grey[600] }} />
          <Text className="whitespace-nowrap">{getRelativeTime(date)}</Text>
        </Space>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 150,
      responsive: ["md"],
      sorter: (a: GetAllEntitiesForUserType, b: GetAllEntitiesForUserType) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (date: string) => (
        <Text className="whitespace-nowrap text-xs text-gray-500">
          {new Date(date).toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      fixed: "right" as const,
      render: (_: any, record: GetAllEntitiesForUserType) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onView(record);
            }}
            style={{
              backgroundColor: token.color.lightBlue[700],
              borderColor: token.color.lightBlue[700],
            }}
          />
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            disabled
            title="Edit functionality is not available"
          />
          <Button
            type="default"
            size="small"
            icon={<DeleteOutlined />}
            danger
            disabled
            title="Delete functionality is not available"
          />
        </Space>
      ),
    },
  ];

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <Table
        dataSource={data || []}
        columns={columns as any}
        rowKey={(record: GetAllEntitiesForUserType) => record.id}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        loading={loading}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => onView(record),
          style: { cursor: "pointer" },
        })}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No entities found"
            >
              <Button
                type="primary"
                onClick={onCreateNew}
                style={{
                  backgroundColor: token.color.lightViolet[700],
                  borderColor: token.color.lightViolet[700],
                }}
              >
                Create Entity
              </Button>
            </Empty>
          ),
        }}
      />
    </Card>
  );
}
