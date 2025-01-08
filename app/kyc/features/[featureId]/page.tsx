"use client";

import { useState } from "react";
import { useGetFeatureRequirementsHook } from "@/hooks/useGetFeatureRequirementsHook";
import { Table, Button, Typography, Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function FeatureRequirements({
  params,
}: {
  params: Promise<{ featureId: string }>;
}) {
  const [featureId, setFeatureId] = useState<string | null>(null);
  const router = useRouter();

  useState(() => {
    params.then(({ featureId }) => setFeatureId(featureId));
  });

  const { data, isLoading, error, refetch } = useGetFeatureRequirementsHook(
    featureId ?? ""
  );

  const columns = [
    {
      title: "Requirement ID",
      dataIndex: "requirementId",
      key: "requirementId",
      align: "center" as const,
    },
    {
      title: "Requirement Slug",
      dataIndex: "requirementSlug",
      key: "requirementSlug",
      align: "center" as const,
    },
    {
      title: "Associated Entity",
      dataIndex: "associatedEntity",
      key: "associatedEntity",
      align: "center" as const,
    },
    {
      title: "Requirement Level",
      dataIndex: "requirementLevel",
      key: "requirementLevel",
      align: "center" as const,
    },
    {
      title: "Value Type",
      dataIndex: "valueType",
      key: "valueType",
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
          Failed to fetch requirements
        </Title>
        <Button
          onClick={() => refetch()}
          type="primary"
          icon={<ReloadOutlined />}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Title level={2}>Requirements</Title>
      <Table
        dataSource={data?.items || []}
        columns={columns}
        rowKey="requirementId"
        pagination={false}
        bordered
      />
    </div>
  );
}
