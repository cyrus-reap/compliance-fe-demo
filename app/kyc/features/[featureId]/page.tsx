"use client";

import { useState, useEffect } from "react";
import { useGetFeatureRequirementsHook } from "@/hooks/useGetFeatureRequirementsHook";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import RequirementTable from "@/components/features/RequirementTable";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorCard from "@/components/shared/ErrorCard";

export default function FeatureRequirements({
  params,
}: {
  params: Promise<{ featureId: string }>;
}) {
  const [featureId, setFeatureId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(({ featureId }) => setFeatureId(featureId));
  }, [params]);

  const { data, isLoading, error, refetch } = useGetFeatureRequirementsHook(
    featureId ?? ""
  );

  if (isLoading) {
    return <LoadingSpinner tip="Loading requirements..." fullHeight />;
  }

  if (error) {
    return (
      <ErrorCard
        title="Failed to fetch requirements"
        description="There was an error retrieving the requirement data. Please try again."
        onRetry={() => refetch()}
        onBack={() => router.push("/kyc/features")}
        backText="Back to Features"
      />
    );
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Feature Requirements"
        onBack={() => router.push("/kyc/features")}
        backText="Back to Features"
        onRefresh={() => refetch()}
        tooltip="Requirements needed for this feature to be enabled"
      />

      <RequirementTable data={data?.items} loading={isLoading} />
    </div>
  );
}
