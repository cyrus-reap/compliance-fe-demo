"use client";

import { useEffect, useRef, useState } from "react";
import { Typography, Spin, Card, Alert, Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { useLayout } from "@/app/layoutContext";
import { token } from "@/app/theme";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import snsWebSdk from "@sumsub/websdk";
import { SumSubReviewStatus } from "@/types/sumsub";

const { Title, Text, Paragraph } = Typography;

export default function CreateEntityPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const sdkRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setOptions } = useLayout();

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
    const initSdk = async () => {
      try {
        setIsLoading(true);

        // In a real implementation, you should fetch this from your backend
        // This is just a placeholder - DO NOT use hardcoded tokens in production
        const accessToken = await fetchAccessTokenFromBackend();

        // Initialize the SDK instance - correct way for WebSDK 2.0
        const snsWebSdkInstance = snsWebSdk
          .init(accessToken, () => {
            console.log("Token expired, getting a new one");
            return fetchAccessTokenFromBackend();
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
              // Navigate to next screen when the entire verification is completed
              router.push("/kyc/proof-of-address/dummy-entity-id");
            }
          })
          .on("idCheck.onApplicantSubmitted", () => {
            console.log("Applicant submitted all documents");
            // Alternatively, you can navigate here if you want to move to the next step
            // after the user has submitted all required documents
            // router.push("/kyc/proof-of-address/dummy-entity-id");
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

    // Mock function to fetch token - replace with actual API call
    async function fetchAccessTokenFromBackend() {
      // In a real implementation, make an API call to your backend
      // Example: const response = await fetch('/api/sumsub/token');
      // return response.json().token;

      // For demo purposes only:
      return "_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC0xY2RlZDY2OC1hOTViLTRkMjMtOTgyYy01NmExMTIzOWQ1NzctdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2";
    }

    initSdk();

    // Cleanup on unmount
    return () => {
      if (sdkRef.current) {
        try {
          // No need to call destroy explicitly in WebSDK 2.0
          sdkRef.current = null;
        } catch (err) {
          console.error("Error cleaning up Sumsub SDK:", err);
        }
      }
    };
  }, [router]);

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
          bodyStyle={{ padding: 0 }}
        >
          {error && (
            <Alert
              type="error"
              message="Verification Error"
              description={error}
              className="mx-8 mb-6"
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

          <div className="relative bg-white">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16">
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
                  Loading verification module...
                </Text>
              </div>
            )}

            <div
              className={`w-full min-h-[600px] ${
                isLoading ? "hidden" : "block"
              }`}
              id="sumsub-sdk-container"
            >
              {!isInitialized && !isLoading && !error && (
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
