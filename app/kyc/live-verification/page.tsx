"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Spin } from "antd";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-2xl font-bold text-green-600">
          KYC Verification Successful
        </h1>
        <p>Your identity verification has been successfully completed.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-2xl font-bold text-red-600">
          KYC Verification Failed
        </h1>
        <p>
          Unfortunately, we could not verify your identity. Please try again or
          contact support for assistance.
        </p>
        <a
          href="/identity"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry Verification
        </a>
      </div>
    );
  }

  return (
    <Suspense fallback={<Spin size="large" />}>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-2xl font-bold text-gray-600">Status Unknown</h1>
        <p>The status of your KYC verification could not be determined.</p>
        <a
          href="/identity"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Verification
        </a>
      </div>
    </Suspense>
  );
}
