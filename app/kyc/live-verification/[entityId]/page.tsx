"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { useGetKycLinkHook } from "@/hooks/useGetKycLinkHook";
import { Button, Spin, Typography } from "antd";

const { Title, Text } = Typography;

export default function IdentityVerification({
  params,
}: {
  params: Promise<{ entityId: string }>;
}) {
  const { entityId } = use(params);
  const searchParams = useSearchParams();
  const memberId = searchParams.get("memberId");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending, data, error } = useGetKycLinkHook();

  useEffect(() => {
    if (!entityId) {
      setErrorMessage("Entity ID is required");
      return;
    }

    mutate({
      entityId,
      memberId: memberId || undefined,
      failureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/kyc/live-verification?status=failed`,
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/kyc/live-verification?status=success`,
    });
  }, [entityId, memberId, mutate]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message || "Failed to generate KYC link");
    }
  }, [error]);

  useEffect(() => {
    if (data?.web_href) {
      window.location.href = data.web_href;
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
      <Title level={2}>KYC Verification</Title>

      {errorMessage ? (
        <Text type="danger" className="text-center">
          {errorMessage}
        </Text>
      ) : isPending ? (
        <div className="flex items-center gap-4">
          <Spin size="large" />
          <Text type="secondary">Generating KYC link...</Text>
        </div>
      ) : (
        <Text type="success" className="text-center">
          Attempting to generate KYC link for Entity ID: <b>{entityId}</b>
          {memberId && (
            <>
              {" "}
              and Member ID: <b>{memberId}</b>
            </>
          )}
        </Text>
      )}

      {error && (
        <Button
          type="primary"
          onClick={() =>
            mutate({
              entityId,
              memberId: memberId || undefined,
              failureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/kyc/live-verification?status=failed`,
              successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/kyc/live-verification?status=success`,
            })
          }
        >
          Retry
        </Button>
      )}
    </div>
  );
}
