"use client";

import { useSearchParams } from "next/navigation";
import { useGetEntityDetailsHook } from "@/hooks/useGetEntityDetailsHook";
import { Alert, Spin, Typography, Button } from "antd";
import RequirementCard from "@/components/RequirementCard";
import { GetEntityDetailsType } from "@/types";
import _ from "lodash";

const { Title } = Typography;

export default function StatusPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const entityId = searchParams.get("entityId");

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

  const statusContent = (title: string, description: string, color: string) => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Title level={2} className={`text-${color}-600`}>
        {title}
      </Title>
      <p className="text-primary text-center">{description}</p>
      <div className="w-full max-w-md">
        <Title level={4} className="mb-4">
          Entity Details
        </Title>
        {renderRequirements()}
      </div>
    </div>
  );

  if (status === "success") {
    return (
      <>
        {statusContent(
          "KYC Verification Successful",
          "Your identity verification has been successfully completed.",
          "green"
        )}
      </>
    );
  }

  if (status === "failure") {
    return (
      <>
        {statusContent(
          "KYC Verification Failed",
          "Unfortunately, we could not verify your identity. Please try again or contact support for assistance.",
          "red"
        )}
        <Button
          href="/kyc/entity"
          type="primary"
          className="mt-4 px-6 py-2"
          style={{ backgroundColor: "#ff4d4f" }}
        >
          Retry Verification
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      <Title level={2} className="text-gray-600">
        Status Unknown
      </Title>
      <p className="text-gray-600 text-center">
        The status of your KYC verification could not be determined.
      </p>
      <Button
        href="/identity"
        type="primary"
        className="mt-4 px-6 py-2"
        style={{ backgroundColor: "#1890ff" }}
      >
        Return to Verification
      </Button>
    </div>
  );
}
