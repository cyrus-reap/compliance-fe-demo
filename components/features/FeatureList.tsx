import { Table, Button, Typography, Tag, Empty, Card } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { GetAllFeaturesForUserType } from "@/types";

const { Text } = Typography;

interface FeatureListProps {
  data: GetAllFeaturesForUserType[] | undefined;
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  onView: (record: GetAllFeaturesForUserType) => void;
  searchText: string;
}

export default function FeatureList({
  data,
  loading,
  pagination,
  onView,
  searchText,
}: FeatureListProps) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      ellipsis: true,
      render: (id: string) => (
        <Text copyable={{ text: id }} className="font-mono text-xs">
          {id.substring(0, 8)}...
        </Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (name: string) => (
        <Text strong className="text-base">
          {name}
        </Text>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (
        value: string | number | boolean,
        record: GetAllFeaturesForUserType
      ) => {
        const val = String(value).toLowerCase();
        return (
          record.name.toLowerCase().includes(val) ||
          record.slug.toLowerCase().includes(val)
        );
      },
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: 200,
      render: (slug: string) => (
        <Tag color={token.color.lightViolet[700]} className="text-sm px-2 py-1">
          {slug}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right" as const,
      render: (_: any, record: GetAllFeaturesForUserType) => (
        <Button
          type="primary"
          size="small"
          icon={<RightOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onView(record);
          }}
          style={{
            backgroundColor: token.color.lightBlue[700],
            borderColor: token.color.lightBlue[700],
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <Table
        dataSource={data || []}
        columns={columns as any}
        rowKey={(record: GetAllFeaturesForUserType) => record.id}
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
              description={
                searchText
                  ? "No matching features found"
                  : "No features available"
              }
            />
          ),
        }}
      />
    </Card>
  );
}
