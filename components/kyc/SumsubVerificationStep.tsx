import React, { useEffect, useRef, useState } from "react";
import { Spin, Typography, Button, message } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { SumSubReviewStatus } from "@/types/sumsub";

const { Text } = Typography;

// Import Sumsub SDK from CDN - this is the recommended approach by Sumsub
declare global {
  interface Window {
    snsWebSdk: any;
  }
}

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
  const [initError, setInitError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const sdkRef = useRef<any>(null);

  // Container ID - use a consistent ID as recommended by Sumsub
  const containerId = "sumsub-websdk-container";

  // Load the Sumsub SDK script
  useEffect(() => {
    console.log("[SumSub] Loading SDK script");

    // Check if script is already loaded
    if (window.snsWebSdk) {
      console.log("[SumSub] SDK already available");
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "sumsub-sdk-script";
    script.src =
      "https://static.sumsub.com/idensic/static/sns-websdk-builder.js";
    script.async = true;

    script.onload = () => {
      console.log("[SumSub] SDK script loaded");
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      console.error("[SumSub] Failed to load SDK script");
      setInitError("Failed to load verification module");
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove script as it might be used by other instances
    };
  }, []);

  // Initialize the Sumsub SDK when the script is loaded and we have a token
  useEffect(() => {
    // Don't proceed if we don't have what we need
    if (!sdkToken || !isScriptLoaded || !window.snsWebSdk) {
      return;
    }

    console.log("[SumSub] Initializing SDK with token");

    // Check if container exists
    const containerElement = document.getElementById(containerId);
    if (!containerElement) {
      console.error("[SumSub] Container element not found");
      setInitError("Container element not found");
      setIsLoading(false);
      return;
    }

    // Give the DOM time to render
    const initTimer = setTimeout(() => {
      try {
        setIsLoading(true);
        setInitError(null);

        // Clear any previous content
        containerElement.innerHTML = "";

        // Initialize SDK based on Sumsub's recommended approach
        const snsWebSdkInstance = window.snsWebSdk
          .init(sdkToken, () => {
            console.log("[SumSub] Token expired");
            return Promise.resolve(sdkToken);
          })
          .withConf({
            lang: "en",
          })
          .withOptions({
            addViewportTag: false,
            adaptIframeHeight: true,
          })
          .on("idCheck.onStepCompleted", (payload: any) => {
            console.log("[SumSub] Step completed:", payload);
          })
          .on("idCheck.onApplicantStatusChanged", (payload: any) => {
            console.log("[SumSub] Status changed:", payload);
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
            console.log("[SumSub] Applicant submitted documents");
            message.success("Verification submitted successfully!");
            onSubmitted();
          })
          .on("idCheck.onApplicantLoaded", (payload: any) => {
            console.log("[SumSub] Applicant loaded:", payload);
            setIsLoading(false);
            setIsInitialized(true);
          })
          .on("idCheck.onError", (error: any) => {
            console.error("[SumSub] Error:", error);
            setInitError(
              `Verification error: ${error.reason || "Unknown error"}`
            );
            onError(`Verification error: ${error.reason || "Unknown error"}`);
          })
          .onMessage((type: string, payload: any) => {
            console.log("[SumSub] Message:", type, payload);
          })
          .build();

        // Launch WebSDK using ID selector as recommended by Sumsub
        console.log(`[SumSub] Launching SDK in container: #${containerId}`);
        snsWebSdkInstance.launch(`#${containerId}`);
        sdkRef.current = snsWebSdkInstance;

        // Safety timeout in case onApplicantLoaded doesn't fire
        setTimeout(() => {
          if (isLoading) {
            console.log(
              "[SumSub] Timeout reached, setting as initialized anyway"
            );
            setIsLoading(false);
            setIsInitialized(true);
          }
        }, 8000);
      } catch (err) {
        console.error("[SumSub] Initialization error:", err);
        setInitError(`Failed to initialize verification: ${err}`);
        onError(`Failed to initialize verification: ${err}`);
        setIsLoading(false);
      }
    }, 200); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(initTimer);
      if (sdkRef.current) {
        console.log("[SumSub] Cleaning up SDK instance");
        sdkRef.current = null;
      }
    };
  }, [
    sdkToken,
    isScriptLoaded,
    entityId,
    onComplete,
    onSubmitted,
    onError,
    isLoading,
  ]);

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
          {isScriptLoaded
            ? "Preparing verification..."
            : "Loading verification module..."}
        </Text>
      </div>
    );
  }

  // Return the container div with the exact ID that Sumsub expects
  return <div id={containerId} className="w-full min-h-[600px]" />;
}
