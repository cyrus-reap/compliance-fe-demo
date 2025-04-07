"use client";

import { useState } from "react";
import { useGetFeaturesHook } from "@/hooks/useGetFeaturesHook";
import { Input, Space } from "antd";
import { useRouter } from "next/navigation";
import { SearchOutlined, ApiOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import PageHeader from "@/components/shared/PageHeader";
import FeatureList from "@/components/features/FeatureList";
import ErrorCard from "@/components/shared/ErrorCard";

export default function FeaturesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const { data, isLoading, error, refetch } = useGetFeaturesHook({
    page,
    limit: pageSize,
  });

  if (error) {
    return (
      <ErrorCard
        title="Failed to fetch features"
        description="There was an error retrieving the feature data. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Available Features"
        onRefresh={() => refetch()}
        icon={
          <ApiOutlined
            style={{ color: token.color.lightViolet[700], fontSize: "0.8em" }}
          />
        }
        extra={
          <Input
            placeholder="Search features"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
        }
      />

      <FeatureList
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
        onView={(record) => router.push(`/kyc/features/${record.id}`)}
        searchText={searchText}
      />
    </div>
  );
}
