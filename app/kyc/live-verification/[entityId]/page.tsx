"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { useGetKycHook } from "@/hooks/useGetKycHook";

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
        <p className="text-blue-500">Generating KYC link...</p>
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
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}
