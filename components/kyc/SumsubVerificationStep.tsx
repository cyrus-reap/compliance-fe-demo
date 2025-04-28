import React, { useState, useCallback } from "react";
import { Spin, Typography, Button, message } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { SumSubReviewStatus } from "@/types/sumsub";
import SumsubWebSdk from "@sumsub/websdk-react";

const { Text } = Typography;

interface SumsubVerificationStepProps {
  sdkToken: string;
  entityId: string | null;
  onComplete: (entityId: string) => void;
  onSubmitted: () => void;
  onError: (error: string) => void;
}

export default function SumsubVerificationStep({
  sdkToken,
  entityId,
  onComplete,
  onSubmitted,
  onError,
}: SumsubVerificationStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Token expiration handler - in production, this should refresh the token
  const accessTokenExpirationHandler = useCallback(() => {
    console.log("[SumSub] Token expired");
    return Promise.resolve(sdkToken);
  }, [sdkToken]);

  // Message handler for all Sumsub events
  const messageHandler = useCallback(
    (type: string, payload: any) => {
      switch (type) {
        case "idCheck.onApplicantStatusChanged":
          if (
            payload &&
            entityId &&
            payload.reviewStatus === SumSubReviewStatus.COMPLETED
          ) {
            onComplete(entityId);
          }
          break;

        case "idCheck.onApplicantSubmitted":
          console.log("[SumSub] Applicant submitted documents");
          message.success("Verification submitted successfully!");
          onSubmitted();
          break;

        case "idCheck.onApplicantLoaded":
          console.log("[SumSub] Applicant loaded:", payload);
          if (payload.applicantId) {
            localStorage.setItem("sumsubApplicantId", payload.applicantId);
          }
          setIsLoading(false);
          break;

        case "idCheck.onStepCompleted":
          console.log("[SumSub] Step completed:", payload);
          break;
      }
    },
    [entityId, onComplete, onSubmitted]
  );

  // Error handler
  const errorHandler = useCallback(
    (error: any) => {
      console.error("[SumSub] Error:", error);
      setInitError(`Verification error: ${error.reason || "Unknown error"}`);
      onError(`Verification error: ${error.reason || "Unknown error"}`);
    },
    [onError]
  );

  // SDK configuration
  const config = {
    lang: "en",
  };

  // SDK options
  const options = {
    addViewportTag: false,
    adaptIframeHeight: true,
  };

  // Retry handler
  const handleRetry = () => {
    window.location.reload();
  };

  if (initError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Text className="text-red-500 mb-4">{initError}</Text>
        <Button type="primary" icon={<ReloadOutlined />} onClick={handleRetry}>
          Retry Verification
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spin
          size="large"
          indicator={
            <LoadingOutlined
              style={{ fontSize: 36, color: token.color.lightViolet[700] }}
            />
          }
        />
        <Text className="mt-6 text-gray-500">
          Loading verification module...
        </Text>
      </div>
    );
  }

  // Use Sumsub's official React component
  return (
    <div className="w-full h-full">
      <SumsubWebSdk
        accessToken={sdkToken}
        expirationHandler={accessTokenExpirationHandler}
        config={config}
        options={options}
        onMessage={messageHandler}
        onError={errorHandler}
      />
    </div>
  );
}
