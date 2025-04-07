"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetEntityDetailsHook } from "@/hooks/useGetEntityDetailsHook";
import { UserOutlined } from "@ant-design/icons";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorCard from "@/components/shared/ErrorCard";
import EntityDetails from "@/components/entities/EntityDetails";

export default function EntityDetailsPage({
  params,
}: {
  params: Promise<{ entityId: string }>;
}) {
  const router = useRouter();
  const { entityId } = use(params);

  const {
    data: entityDetails,
    isLoading,
    isError,
    refetch,
  } = useGetEntityDetailsHook(entityId);

  if (isLoading) {
    return <LoadingSpinner tip="Loading entity details..." />;
  }

  if (isError) {
    return (
      <ErrorCard
        title="Error loading entity"
        description="Failed to fetch entity details. Please try again later."
        onRetry={() => refetch()}
        onBack={() => router.push("/kyc/entities")}
        backText="Back to Entities"
      />
    );
  }

  if (!entityDetails) {
    return (
      <ErrorCard
        title="Entity Not Found"
        description="The entity you are looking for doesn't exist or may have been deleted."
        onBack={() => router.push("/kyc/entities")}
        backText="Back to Entities"
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Entity Details"
        onRefresh={() => refetch()}
        icon={<UserOutlined style={{ fontSize: "0.8em" }} />}
      />

      <EntityDetails
        data={entityDetails}
        onBack={() => router.push("/kyc/entities")}
      />
    </div>
  );
}
