"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "antd";
import DirectFileUploadComponent from "@/components/DirectFileUploadComponent";

const { Title } = Typography;

export default function ProofOfAddressPage({
  params,
}: {
  params: Promise<{ entityId: string }>;
}) {
  const router = useRouter();
  const { entityId } = use(params);

  const handleUploadSuccess = () => {
    router.push(`/kyc/live-verification/${entityId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Title level={2}>Upload Proof of Address</Title>
      <DirectFileUploadComponent
        entityId={entityId}
        requirementSlug="proof-of-address"
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}
