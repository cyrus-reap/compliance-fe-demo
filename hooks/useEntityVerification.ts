import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePostEntityHook } from "./usePostEntityHook";
import { useGetKycLinkHook } from "./useGetKycLinkHook";
import { EntityType } from "@/types";
import { VerificationStep } from "@/components/kyc/VerificationStatusSteps";

export const useEntityVerification = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<VerificationStep>(
    VerificationStep.ENTITY_CREATION
  );
  const [entityId, setEntityId] = useState<string | null>(null);
  const [sdkToken, setSdkToken] = useState<string | null>(null);

  // Initialize flag for auto-start
  const isInitializedRef = useRef(false);

  const {
    mutate: createEntity,
    isPending: isCreatingEntity,
    data: entityData,
    error: createEntityError,
  } = usePostEntityHook();

  const {
    mutate: getKycSdkToken,
    isPending: isGettingToken,
    data: kycTokenData,
    error: kycTokenError,
  } = useGetKycLinkHook();

  // Create entity with random external ID
  const handleCreateEntity = useCallback(() => {
    // Reset any previous errors
    setError(null);

    // Generate a unique external ID with timestamp to prevent collisions
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substring(2, 10);
    const externalId = `user-${timestamp}-${randomPart}`;

    createEntity({
      externalId,
      type: EntityType.INDIVIDUAL,
      requirements: [],
    });
  }, [createEntity]);

  // Get KYC token for the given entity ID
  const handleGetToken = useCallback(
    (id: string) => {
      setError(null);
      getKycSdkToken({ entityId: id });
    },
    [getKycSdkToken]
  );

  // Handle document submission completed
  const handleSubmitted = useCallback(() => {
    setCurrentStep(VerificationStep.COMPLETE);
  }, []);

  // Navigate to a specific route after verification is complete
  const handleComplete = useCallback(
    (id: string) => {
      router.push(`/entities/${id}`);
    },
    [router]
  );

  // Externally set error
  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  // Auto-initialize the entity creation on component mount
  useEffect(() => {
    // Clear any stored state on mount to ensure a fresh flow
    if (!isInitializedRef.current) {
      setEntityId(null);
      setSdkToken(null);
      setCurrentStep(VerificationStep.ENTITY_CREATION);
      setError(null);

      // Only create an entity once when the component mounts
      isInitializedRef.current = true;
    }

    // Reset the initialization flag when component unmounts
    return () => {
      isInitializedRef.current = false;
    };
  }, []); // Don't include any dependencies here to ensure this runs only once on mount

  // Remove the auto-creation from the initialization effect
  // and let EntityCreationStep handle it

  // Process entity creation result
  useEffect(() => {
    if (entityData?.id && !isGettingToken) {
      setEntityId(entityData.id);
      setCurrentStep(VerificationStep.TOKEN_PREPARATION);
    }
  }, [entityData, isGettingToken]);

  // Process token result
  useEffect(() => {
    if (kycTokenData?.sdkToken) {
      setSdkToken(kycTokenData.sdkToken);
      setCurrentStep(VerificationStep.DOCUMENT_VERIFICATION);
    }
  }, [kycTokenData]);

  // Handle errors
  useEffect(() => {
    if (createEntityError) {
      setError("Failed to create entity. Please try again.");
    }
  }, [createEntityError]);

  useEffect(() => {
    if (kycTokenError) {
      setError("Failed to get verification token. Please try again.");
    }
  }, [kycTokenError]);

  return {
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
  };
};
