"use client";

import { useState } from "react";
import { useGetFeaturesHook } from "@/hooks/useGetFeatureHook";
import { Table, Button, Typography, Spin } from "antd";

const { Title } = Typography;

export default function FeaturesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error, refetch } = useGetFeaturesHook({ page, limit });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center" as const,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center" as const,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      align: "center" as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <Title level={4} type="danger">
          Failed to fetch features
        </Title>
        <Button onClick={() => refetch()} type="primary" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Title level={2}>Features</Title>
      <Table
        dataSource={data?.items || []}
        columns={columns}
        rowKey={(record: ) => record.id}
        pagination={{
          current: data?.meta.currentPage || 1,
          pageSize: data?.meta.itemsPerPage || 10,
          total: data?.meta.totalItems || 0,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
        bordered
      />
    </div>
  );
}
