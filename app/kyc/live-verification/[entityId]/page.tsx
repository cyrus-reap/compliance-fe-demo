"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { useGetKycHook } from "@/hooks/useGetKycHook";
import { Button } from "antd";

export default function IdentityVerification({
  params,
}: {
  params: Promise<{ entityId: string }>;
}) {
  const { entityId } = use(params);
  const searchParams = useSearchParams();
  const memberId = searchParams.get("memberId");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useGetKycHook({
    entityId,
    memberId: memberId || undefined,
    failureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/kyc/live-verification?status=failed`,
    successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/kyc/live-verification?status=success`,
  });

  useEffect(() => {
    if (!entityId) {
      setErrorMessage("Entity ID is required");
    }
  }, [entityId]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message || "Failed to generate KYC link");
    }
  }, [error]);

  useEffect(() => {
    console.log("Data:", data);
    if (data?.web_href) {
      window.location.href = data.web_href;
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">KYC Verification</h1>

      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : isLoading ? (
        <p className="text-primary">Generating KYC link...</p>
      ) : (
        <p className="text-green-500">
          Attempting to generate KYC link for Entity ID: <b>{entityId}</b>
          {memberId && (
            <>
              {" "}
              and Member ID: <b>{memberId}</b>
            </>
          )}
        </p>
      )}

      {error && (
        <Button
          type="primary"
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 text-white rounded"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
