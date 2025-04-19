"use client";

import { useEffect, useState } from "react";
import { Card, Alert, Button } from "antd";
import { useLayout } from "@/app/layoutContext";
import { motion } from "framer-motion";
import { useEntityVerification } from "@/hooks/useEntityVerification";
import { VerificationStep } from "@/components/kyc/VerificationStatusSteps";

import VerificationStatusSteps from "@/components/kyc/VerificationStatusSteps";
import EntityCreationStep from "@/components/kyc/EntityCreationStep";
import TokenPreparationStep from "@/components/kyc/TokenPreparationStep";
import SumsubVerificationStep from "@/components/kyc/SumsubVerificationStep";
import SecurityInfoCard from "@/components/kyc/SecurityInfoCard";

export default function CreateEntityPage() {
  const { setOptions } = useLayout();
  const [started, setStarted] = useState(false);

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
  } = useEntityVerification({ autoStart: started });

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
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card
          className="shadow-lg rounded-xl overflow-hidden border-0 mb-8"
          styles={{ body: { padding: 0 } }}
        >
          {/* Show start button if not started */}
          {!started && (
            <div className="flex flex-col items-center justify-center py-16">
              <h2 className="text-2xl font-semibold mb-4">
                Begin Your Verification
              </h2>
              <p className="mb-6 text-gray-500 text-center max-w-md">
                To access all platform features, please complete the identity
                verification process.
              </p>
              <Button
                type="primary"
                size="large"
                onClick={() => setStarted(true)}
                data-testid="start-verification-btn"
              >
                Start Verification
              </Button>
            </div>
          )}

          {/* Only show steps and forms after user has started */}
          {started && (
            <>
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

              <div className="relative bg-white p-0">
                {/* Step 1: Create the entity */}
                {currentStep === VerificationStep.ENTITY_CREATION && (
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
            </>
          )}
        </Card>

        {/* Security information */}
        <SecurityInfoCard />
      </motion.div>
    </div>
  );
}
