"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetEntityDetailsHook } from "@/hooks/useGetEntityDetailsHook";
import { Alert, Spin, Typography, Button, Divider } from "antd";
import RequirementCard from "@/components/RequirementCard";
import { GetEntityDetailsType } from "@/types";
import _ from "lodash";

const { Title, Text } = Typography;

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
  } = useGetEntityDetailsHook(entityId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">Loading entity details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Alert
          message="Error"
          description="Failed to fetch entity details. Please try again later."
          type="error"
          showIcon
          className="max-w-md"
        />
        <Button
          type="primary"
          className="mt-4"
          onClick={() => router.push("/entities")}
        >
          Go Back
        </Button>
      </div>
    );
  }

  const submittedRequirements = _.compact(
    _.get(entityDetails, "submittedRequirements", [])
  ) as NonNullable<GetEntityDetailsType["submittedRequirements"]>;

  const renderRequirements = () => {
    return submittedRequirements.map((req) => {
      if (!req) return null;

      return (
        <RequirementCard
          key={req.submissionId}
          name={req.requirement?.name || "Unknown Requirement"}
          status={req.status || "Unknown Status"}
          valueType={req.requirement?.valueType || "Unknown"}
          value={req.value}
        />
      );
    });
  };

  if (!entityDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Alert
          message="Error"
          description="Entity not found. Please try again later."
          type="error"
          showIcon
          className="max-w-md"
        />
        <Button
          type="primary"
          className="mt-4"
          onClick={() => router.push("/kyc/entities")}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <Title level={2} className="mb-4 text-center">
          Entity Details
        </Title>
        <Divider />
        <div className="mb-6">
          <Text strong>ID: </Text>
          <Text>{entityDetails.id}</Text>
        </div>
        <div className="mb-6">
          <Text strong>Business ID: </Text>
          <Text>{entityDetails.businessId || "Not Assigned"}</Text>
        </div>
        <div className="mb-6">
          <Text strong>External ID: </Text>
          <Text>{entityDetails.externalId}</Text>
        </div>
        <div className="mb-6">
          <Text strong>Created At: </Text>
          <Text>{new Date(entityDetails.createdAt).toLocaleString()}</Text>
        </div>
        <div className="mb-6">
          <Text strong>Updated At: </Text>
          <Text>{new Date(entityDetails.updatedAt).toLocaleString()}</Text>
        </div>
        <Divider />
        <Title level={4} className="mt-4 mb-4">
          Submitted Requirements
        </Title>
        <div>{renderRequirements()}</div>
        <div className="mt-6">
          <Button
            type="primary"
            onClick={() => router.push("/kyc/entities")}
            className="block mx-auto"
          >
            Back to Entities
          </Button>
        </div>
      </div>
    </div>
  );
}
