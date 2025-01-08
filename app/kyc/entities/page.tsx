"use client";

import { useState } from "react";
import { useEntitiesHook } from "@/hooks/useEntitiesHook";
import { Table, Button, Typography, Spin } from "antd";
import { GetAllEntitiesForUserType } from "@/types";

const { Title } = Typography;

export default function EntitiesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error, refetch } = useEntitiesHook({ page, limit });

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
  };

  // Define columns for the table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center" as const,
    },
    {
      title: "Business ID",
      dataIndex: "businessId",
      key: "businessId",
      align: "center" as const,
    },
    {
      title: "External ID",
      dataIndex: "externalId",
      key: "externalId",
      align: "center" as const,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center" as const,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center" as const,
      render: (date: string) => new Date(date).toLocaleString(),
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
          Failed to fetch entities
        </Title>
        <Button onClick={() => refetch()} type="primary" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Title level={2}>Entities</Title>
      <Table
        dataSource={data?.items || []}
        columns={columns}
        rowKey={(record: GetAllEntitiesForUserType) => record.id}
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
