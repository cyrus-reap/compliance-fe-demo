import React, { useEffect, useRef, useState } from "react";
import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { SumSubReviewStatus } from "@/types/sumsub";
import snsWebSdk from "@sumsub/websdk";

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sdkRef = useRef<any>(null);

  // Initialize the Sumsub SDK when we have a token
  useEffect(() => {
    if (!sdkToken) return;

    try {
      setIsLoading(true);

      const snsWebSdkInstance = snsWebSdk
        .init(sdkToken, () => {
          console.log("Token expired, getting a new one");
          // In a real implementation, you would refresh the token here
          return Promise.resolve(sdkToken);
        })
        .withConf({
          lang: "en",
          theme: "light",
        })
        .withOptions({
          addViewportTag: false,
          adaptIframeHeight: true,
        })
        .on("idCheck.onStepCompleted", (payload) => {
          console.log("Step completed:", payload);
        })
        .on("idCheck.onApplicantStatusChanged", (payload) => {
          console.log("Applicant status changed:", payload);
          if (
            payload &&
            entityId &&
            (payload.reviewStatus === SumSubReviewStatus.APPROVED ||
              payload.reviewStatus === SumSubReviewStatus.COMPLETED)
          ) {
            onComplete(entityId);
          }
        })
        .on("idCheck.onApplicantSubmitted", () => {
          console.log("Applicant submitted all documents");
          onSubmitted();
        })
        .on("idCheck.onApplicantLoaded", (payload) => {
          console.log("Applicant loaded:", payload);
          if (payload.applicantId) {
            localStorage.setItem("sumsubApplicantId", payload.applicantId);
          }
        })
        .on("idCheck.onError", (error) => {
          console.error("Sumsub error:", error);
          onError(`Verification error: ${error.reason || "Unknown error"}`);
        })
        .onMessage((type, payload) => {
          console.log("Sumsub message:", type, payload);
        })
        .build();

      // Launch the verification flow
      snsWebSdkInstance.launch("#sumsub-sdk-container");
      sdkRef.current = snsWebSdkInstance;
      setIsInitialized(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Error launching Sumsub SDK:", err);
      onError(`Failed to start verification: ${err}`);
      setIsLoading(false);
    }

    // Clean up on unmount
    return () => {
      if (sdkRef.current) {
        sdkRef.current = null;
      }
      // Handle DOM cleanup to prevent Node errors
      setTimeout(() => {
        const container = document.getElementById("sumsub-sdk-container");
        if (container) {
          container.innerHTML = "";
        }
      }, 0);
    };
  }, [sdkToken, entityId, onComplete, onSubmitted, onError]);

  if (isLoading && !isInitialized) {
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

  if (!isInitialized && !isLoading) {
    return (
      <div className="text-center py-16">
        <Spin size="large" />
        <Text className="text-gray-500 block mt-4">
          Initializing verification module...
        </Text>
      </div>
    );
  }

  return (
    <div
      key={sdkToken || "init"}
      className="w-full min-h-[600px]"
      id="sumsub-sdk-container"
    />
  );
}
