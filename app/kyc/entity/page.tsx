"use client";

import { useEffect, useRef, useState } from "react";
import { Typography, Spin, Card, Alert, Button, Space, Steps } from "antd";
import { useRouter } from "next/navigation";
import { useLayout } from "@/app/layoutContext";
import { token } from "@/app/theme";
import {
  LoadingOutlined,
  LockOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import snsWebSdk from "@sumsub/websdk";
import { SumSubReviewStatus } from "@/types/sumsub";
import { useGetKycLinkHook } from "@/hooks/useGetKycLinkHook";
import { usePostEntityHook } from "@/hooks/usePostEntityHook";
import { EntityType } from "@/types";

const { Title, Text, Paragraph } = Typography;

export default function CreateEntityPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sdkToken, setSdkToken] = useState<string | null>(null);
  const [entityId, setEntityId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const sdkRef = useRef<any>(null);
  const { setOptions } = useLayout();

  const {
    mutate: createEntity,
    isPending: isCreatingEntity,
    data: entityData,
  } = usePostEntityHook();

  const {
    mutate: getKycSdkToken,
    isPending: isGettingToken,
    data: kycTokenData,
    error: kycTokenError,
  } = useGetKycLinkHook();

  useEffect(() => {
    setOptions({
      title: "Identity Verification",
      showBackButton: true,
      featuredTag: "Secure KYC Flow",
    });
    return () =>
      setOptions({ title: "", showBackButton: true, featuredTag: undefined });
  }, [setOptions]);

  useEffect(() => {
    const initEntity = async () => {
      setIsLoading(true);
      setCurrentStep(0);

      const externalId = `user-${Math.random().toString(36).substring(2, 10)}`;

      createEntity({
        externalId,
        type: EntityType.INDIVIDUAL,
        requirements: [],
      });
    };

    initEntity();
  }, [createEntity]);

  useEffect(() => {
    if (entityData?.id && !entityId) {
      setEntityId(entityData.id);
      setCurrentStep(1);

      // Now get the KYC token using the entity ID
      getKycSdkToken({
        entityId: entityData.id,
      });
    }
  }, [entityData, entityId, getKycSdkToken]);

  useEffect(() => {
    if (kycTokenData?.sdkToken && !sdkToken) {
      setSdkToken(kycTokenData.sdkToken);
      setCurrentStep(2);
      initSumsubSdk(kycTokenData.sdkToken);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kycTokenData]);

  // Initialize Sumsub SDK
  const initSumsubSdk = (token: string) => {
    try {
      setIsLoading(true);

      // Initialize the SDK instance
      const snsWebSdkInstance = snsWebSdk
        .init(token, () => {
          console.log("Token expired, getting a new one");
          // In a real implementation, you would refresh the token here
          return Promise.resolve(token);
        })
        .withConf({
          lang: "en",
          theme: "light",
        })
        .withOptions({
          addViewportTag: false,
          adaptIframeHeight: true,
        })
        // Handle step completion event
        .on("idCheck.onStepCompleted", (payload) => {
          console.log("Step completed:", payload);
        })
        // Listen for applicant status changes
        .on("idCheck.onApplicantStatusChanged", (payload) => {
          console.log("Applicant status changed:", payload);
          if (
            payload &&
            (payload.reviewStatus === SumSubReviewStatus.APPROVED ||
              payload.reviewStatus === SumSubReviewStatus.COMPLETED)
          ) {
            // Navigate to next screen when verification is completed
            if (entityId) {
              router.push(`/kyc/proof-of-address/${entityId}`);
            }
          }
        })
        .on("idCheck.onApplicantSubmitted", () => {
          console.log("Applicant submitted all documents");
          setCurrentStep(3);
          // After submission completes, optionally navigate to the next screen
          // if (entityId) {
          //   router.push(`/kyc/proof-of-address/${entityId}`);
          // }
        })
        .on("idCheck.onApplicantLoaded", (payload) => {
          console.log("Applicant loaded:", payload);
          if (payload.applicantId) {
            localStorage.setItem("sumsubApplicantId", payload.applicantId);
          }
        })
        .on("idCheck.onError", (error) => {
          console.error("Sumsub error:", error);
          setError(`Verification error: ${error.reason || "Unknown error"}`);
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
      setError(`Failed to start verification: ${err}`);
      setIsLoading(false);
    }
  };

  // Improved cleanup for Sumsub SDK to prevent the Node.removeChild error
  useEffect(() => {
    // Track if component is mounted
    let isMounted = true;

    return () => {
      // Signal that component is unmounting
      isMounted = false;

      try {
        // First nullify the SDK reference to prevent further operations
        if (sdkRef.current) {
          sdkRef.current = null;
        }

        // Use a safer DOM cleanup approach with a small timeout to allow React to finish its cleanup
        setTimeout(() => {
          if (!document.getElementById("sumsub-sdk-container")) {
            return; // Container already removed from DOM, nothing to clean up
          }

          try {
            // Replace the container's contents with an empty div to force iframe removal
            const container = document.getElementById("sumsub-sdk-container");
            if (container) {
              // Safer than removing children directly
              container.innerHTML = "";

              // Create a replacement clean div with the same ID to avoid React warnings
              const newDiv = document.createElement("div");
              newDiv.id = "sumsub-sdk-container";
              newDiv.className = container.className;

              // Replace the container with the clean version if parent exists
              if (container.parentNode) {
                container.parentNode.replaceChild(newDiv, container);
              }
            }
          } catch (cleanupErr) {
            console.error("Safe container cleanup error:", cleanupErr);
          }
        }, 0);
      } catch (err) {
        console.error("Error cleaning up Sumsub SDK:", err);
      }
    };
  }, []);

  // Determine the current loading state
  const isInLoadingState =
    isCreatingEntity || isGettingToken || (isLoading && !isInitialized);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card
          className="shadow-lg rounded-xl overflow-hidden border-0 mb-8"
          styles={{ body: { padding: 0 } }} // Fixed: Use styles instead of bodyStyle
        >
          <div className="relative bg-gradient-to-r from-violet-50 to-blue-50 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
              <div>
                <Title level={2} className="m-0 flex items-center gap-2">
                  <IdcardOutlined
                    className="text-xl"
                    style={{ color: token.color.lightViolet[700] }}
                  />
                  Identity Verification
                </Title>
                <Text className="text-gray-500">
                  Complete verification to access all platform features
                </Text>
              </div>
            </div>

            <Steps
              current={currentStep}
              className="custom-steps"
              items={[
                {
                  title: "Entity Creation",
                  description: "Creating your profile",
                  status:
                    currentStep > 0
                      ? "finish"
                      : isCreatingEntity
                      ? "process"
                      : "wait",
                  icon: isCreatingEntity ? (
                    <LoadingOutlined />
                  ) : (
                    <FileAddOutlined />
                  ),
                },
                {
                  title: "Prepare Verification",
                  description: "Setting up verification",
                  status:
                    currentStep > 1
                      ? "finish"
                      : currentStep === 1
                      ? "process"
                      : "wait",
                  icon:
                    currentStep === 1 && isGettingToken ? (
                      <LoadingOutlined />
                    ) : (
                      <IdcardOutlined />
                    ),
                },
                {
                  title: "Document Verification",
                  description: "Upload your documents",
                  status:
                    currentStep > 2
                      ? "finish"
                      : currentStep === 2
                      ? "process"
                      : "wait",
                  icon: <IdcardOutlined />,
                },
                {
                  title: "Complete",
                  description: "Verification submitted",
                  status: currentStep === 3 ? "finish" : "wait",
                  icon: <CheckCircleOutlined />,
                },
              ]}
            />
          </div>

          {error && (
            <Alert
              type="error"
              message="Verification Error"
              description={error}
              className="mx-8 my-6"
              action={
                <Button
                  onClick={() => window.location.reload()}
                  type="primary"
                  danger
                >
                  Retry
                </Button>
              }
            />
          )}

          {kycTokenError && (
            <Alert
              type="error"
              message="Token Error"
              description="Failed to get verification token. Please try again."
              className="mx-8 my-6"
              action={
                <Button
                  onClick={() => window.location.reload()}
                  type="primary"
                  danger
                >
                  Retry
                </Button>
              }
            />
          )}

          <div className="relative bg-white p-0">
            {isInLoadingState && (
              <div className="flex flex-col items-center justify-center py-20">
                <Spin
                  size="large"
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 36,
                        color: token.color.lightViolet[700],
                      }}
                    />
                  }
                />
                <Text className="mt-6 text-gray-500">
                  {isCreatingEntity
                    ? "Creating your profile..."
                    : isGettingToken
                    ? "Preparing verification..."
                    : "Loading verification module..."}
                </Text>
              </div>
            )}

            {/* Use a key to force remount when token changes - helps avoid stale DOM references */}
            <div
              key={sdkToken || "init"}
              className={`w-full min-h-[600px] ${
                isInLoadingState ? "hidden" : "block"
              }`}
              id="sumsub-sdk-container"
            >
              {!isInitialized && !isInLoadingState && !error && (
                <div className="text-center py-16">
                  <Spin size="large" />
                  <Text className="text-gray-500 block mt-4">
                    Initializing verification module...
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Information and help section */}
        <Card className="shadow-md rounded-xl bg-gray-50 border-0">
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <Title level={5} className="flex items-center gap-2">
                <LockOutlined style={{ color: token.color.green[600] }} />
                Security Information
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                This verification is powered by Sumsub, a secure identity
                verification service. Your personal data is encrypted and
                processed in accordance with our privacy policy.
              </Paragraph>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <Title level={5} className="m-0 mb-2">
                Need Help?
              </Title>
              <Paragraph className="text-gray-600 mb-2">
                If you're experiencing any issues with the verification process,
                please try the following:
              </Paragraph>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  Ensure you're using a supported browser (Chrome, Firefox,
                  Safari)
                </li>
                <li>
                  Check that your camera and microphone permissions are enabled
                </li>
                <li>Make sure you have good lighting for document photos</li>
              </ul>
              <div className="mt-3">
                <Button
                  type="link"
                  className="p-0"
                  onClick={() =>
                    window.open("https://support.sumsub.com", "_blank")
                  }
                >
                  Visit Support Center
                </Button>
              </div>
            </div>
          </Space>
        </Card>
      </motion.div>
    </div>
  );
}
