import { Table, Button, Typography, Space, Tag, Empty } from "antd";
import { ClockCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { GetAllEntitiesForUserType } from "@/types";
import { ColumnsType } from "antd/es/table";
import { useMemo, useCallback } from "react";

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
  const getRelativeTime = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

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
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown";
    }
  }, []);

  const columns: ColumnsType<GetAllEntitiesForUserType> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80,
        ellipsis: true,
        render: (id: string | null | undefined) => {
          if (!id) return <Text className="text-gray-400">-</Text>;
          return (
            <Text copyable={{ text: id }} className="font-mono text-xs">
              {id.substring(0, 8)}...
            </Text>
          );
        },
      },
      {
        title: "Business ID",
        dataIndex: "businessId",
        key: "businessId",
        width: 120,
        render: (businessId: string | null | undefined) =>
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
        render: (id: string | null | undefined) => {
          if (!id) return <Text className="text-gray-400">-</Text>;
          return <Text className="font-mono text-xs">{id}</Text>;
        },
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
        responsive: ["md" as const],
        sorter: (a: GetAllEntitiesForUserType, b: GetAllEntitiesForUserType) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        render: (date: string) => {
          try {
            const formattedDate = new Date(date).toLocaleString();
            return (
              <Text className="whitespace-nowrap text-xs text-gray-500">
                {formattedDate}
              </Text>
            );
          } catch (error) {
            console.error("Error formatting updated date:", error);
            return <Text className="text-gray-400">-</Text>;
          }
        },
      },
      {
        title: "Actions",
        key: "actions",
        width: 100,
        render: (_: any, record: GetAllEntitiesForUserType) => (
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onView(record);
            }}
            style={{
              backgroundColor: token.color.lightViolet[700],
              borderColor: token.color.lightViolet[700],
            }}
          >
            View
          </Button>
        ),
      },
    ],
    [getRelativeTime, onView, token]
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Table
        dataSource={data || []}
        columns={columns}
        rowKey={(record: GetAllEntitiesForUserType) => record.id}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          simple: false,
          position: ["bottomCenter"],
        }}
        loading={loading}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => onView(record),
          style: { cursor: "pointer" },
          role: "button",
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onView(record);
            }
          },
        })}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-500">No entities found</span>
              }
            >
              <Button
                type="primary"
                onClick={onCreateNew}
                style={{
                  backgroundColor: token.color.lightViolet[700],
                  borderColor: token.color.lightViolet[700],
                }}
                aria-label="Create your first entity"
              >
                Create Your First Entity
              </Button>
            </Empty>
          ),
        }}
        size="middle"
      />
    </div>
  );
}
