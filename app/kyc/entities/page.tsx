"use client";

import { useState } from "react";
import { useGetEntitiesHook } from "@/hooks/useGetEntitiesHook";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { ReloadOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import PageHeader from "@/components/shared/PageHeader";
import EntityList from "@/components/entities/EntityList";
import ErrorCard from "@/components/shared/ErrorCard";

export default function EntitiesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  const { data, isLoading, error, refetch } = useGetEntitiesHook({
    page,
    limit: pageSize,
  });

  const handleView = (record: any) => {
    router.push(`/kyc/entities/${record.id}`);
  };

  const handleCreateNew = () => {
    router.push("/kyc/entity");
  };

  if (error) {
    return (
      <ErrorCard
        title="Failed to fetch entities"
        description="There was an error retrieving the entity data. Please try again or contact support."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Entities"
        onRefresh={() => refetch()}
        extra={
          <Button
            type="primary"
            onClick={handleCreateNew}
            style={{
              backgroundColor: token.color.lightViolet[700],
              borderColor: token.color.lightViolet[700],
            }}
          >
            Create Entity
          </Button>
        }
      />

      <EntityList
        data={data?.items}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.meta.totalItems || 0,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        onView={handleView}
        onCreateNew={handleCreateNew}
      />
    </div>
  );
}
