"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, Button } from "antd";
import { useLayout } from "@/app/layoutContext";
import { motion } from "framer-motion";
import { useEntityVerification } from "@/hooks/useEntityVerification";
import { VerificationStep } from "@/components/kyc/VerificationStatusSteps";
import { token } from "@/app/theme";

import VerificationStatusSteps from "@/components/kyc/VerificationStatusSteps";
import EntityCreationStep from "@/components/kyc/EntityCreationStep";
import TokenPreparationStep from "@/components/kyc/TokenPreparationStep";
import SumsubVerificationStep from "@/components/kyc/SumsubVerificationStep";
import SecurityInfoCard from "@/components/kyc/SecurityInfoCard";

export default function CreateEntityPage() {
  const { setOptions } = useLayout();
  const searchParams = useSearchParams();
  const entityIdFromQuery = searchParams?.get("entityId");
  const [started, setStarted] = useState(!!entityIdFromQuery);

  const {
    currentStep,
    entityId,
    sdkToken,
    error,
    isCreatingEntity,
    isGettingToken,
    handleCreateEntity,
    handleGetToken,
    handleSubmitted,
    handleComplete,
    handleError,
  } = useEntityVerification({
    autoStart: started,
    entityId: entityIdFromQuery,
  });

  // If entityIdFromQuery is present, always set started to true
  useEffect(() => {
    if (entityIdFromQuery) setStarted(true);
  }, [entityIdFromQuery]);

  // Set page layout options
  useEffect(() => {
    setOptions({
      title: "",
      showBackButton: true,
      featuredTag: "Secure KYC Flow",
    });

    return () =>
      setOptions({
        title: "",
        showBackButton: true,
        featuredTag: undefined,
      });
  }, [setOptions]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          {/* Show start button if not started and not continuing */}
          {!started && (
            <div className="flex flex-col items-center justify-center py-20 px-8">
              <h2 className="text-2xl font-medium mb-3 text-gray-900">
                Begin Identity Verification
              </h2>
              <p className="mb-8 text-gray-600 text-center max-w-md leading-relaxed">
                Complete the verification process to access all platform
                features.
              </p>
              <Button
                type="primary"
                size="large"
                onClick={() => setStarted(true)}
                data-testid="start-verification-btn"
                style={{
                  backgroundColor: token.color.lightViolet[700],
                  borderColor: token.color.lightViolet[700],
                  height: "48px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  fontWeight: 500,
                }}
                aria-label="Start the identity verification process"
              >
                Start Verification
              </Button>
            </div>
          )}

          {/* Only show steps and forms after user has started */}
          {started && (
            <div className="p-0">
              <VerificationStatusSteps
                currentStep={currentStep}
                isCreatingEntity={isCreatingEntity}
                isGettingToken={isGettingToken}
              />

              {/* Error display */}
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

              <div className="relative bg-white">
                {/* Step 1: Create the entity */}
                {currentStep === VerificationStep.ENTITY_CREATION &&
                  !entityIdFromQuery && (
                    <EntityCreationStep
                      isCreating={isCreatingEntity}
                      onCreateEntity={handleCreateEntity}
                      error={error}
                    />
                  )}

                {/* Step 2: Get the verification token */}
                {currentStep === VerificationStep.TOKEN_PREPARATION && (
                  <TokenPreparationStep
                    entityId={entityId}
                    isGettingToken={isGettingToken}
                    onGetToken={handleGetToken}
                    error={error}
                  />
                )}

                {/* Step 3: Show the verification SDK */}
                {currentStep >= VerificationStep.DOCUMENT_VERIFICATION &&
                  sdkToken && (
                    <SumsubVerificationStep
                      sdkToken={sdkToken}
                      entityId={entityId}
                      onComplete={handleComplete}
                      onSubmitted={handleSubmitted}
                      onError={handleError}
                    />
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Security information */}
        <SecurityInfoCard />
      </motion.div>
    </div>
  );
}
