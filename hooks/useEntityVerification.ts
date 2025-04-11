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

  // Track state in refs to avoid duplicate operations in dev mode
  const tokenRequestedForEntityRef = useRef<string | null>(null);
  const entityCreationAttemptedRef = useRef(false);

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

  // Create entity with random external ID - with dev mode safeguard
  const handleCreateEntity = useCallback(() => {
    // Skip if we've already attempted to create an entity
    if (entityCreationAttemptedRef.current) {
      console.log("[Dev] Skipping duplicate entity creation attempt");
      return;
    }

    entityCreationAttemptedRef.current = true;

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

  // Get KYC token for the given entity ID - with dev mode safeguard
  const handleGetToken = useCallback(
    (id: string) => {
      // Skip if we've already requested a token for this entity
      if (tokenRequestedForEntityRef.current === id) {
        console.log(`[Dev] Skipping duplicate token request for entity ${id}`);
        return;
      }

      if (!sdkToken && !isGettingToken) {
        tokenRequestedForEntityRef.current = id;
        setError(null);
        getKycSdkToken({ entityId: id });
      }
    },
    [getKycSdkToken, sdkToken, isGettingToken]
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
      entityCreationAttemptedRef.current = false;
    };
  }, []); // Don't include any dependencies here to ensure this runs only once on mount

  // Reset refs when unmounting
  useEffect(() => {
    return () => {
      entityCreationAttemptedRef.current = false;
      tokenRequestedForEntityRef.current = null;
    };
  }, []);

  // Process entity creation result
  useEffect(() => {
    if (entityData?.id && !isGettingToken && !entityId) {
      setEntityId(entityData.id);
      setCurrentStep(VerificationStep.TOKEN_PREPARATION);
    }
  }, [entityData, isGettingToken, entityId]);

  // Process token result - add condition to prevent re-setting if we already have token
  useEffect(() => {
    if (kycTokenData?.sdkToken && !sdkToken) {
      setSdkToken(kycTokenData.sdkToken);
      setCurrentStep(VerificationStep.DOCUMENT_VERIFICATION);
    }
  }, [kycTokenData, sdkToken]);

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
