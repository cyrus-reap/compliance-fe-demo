import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePostEntityHook } from "./usePostEntityHook";
import { useGetKycLinkHook } from "./useGetKycLinkHook";
import { EntityType } from "@/types";
import { VerificationStep } from "@/components/kyc/VerificationStatusSteps";

export const useEntityVerification = (options?: {
  autoStart?: boolean;
  entityId?: string | null;
}) => {
  const autoStart = options?.autoStart ?? true;
  const initialEntityId = options?.entityId ?? null;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<VerificationStep>(
    initialEntityId
      ? VerificationStep.TOKEN_PREPARATION
      : VerificationStep.ENTITY_CREATION
  );
  const [entityId, setEntityId] = useState<string | null>(initialEntityId);
  const [sdkToken, setSdkToken] = useState<string | null>(null);

  const isInitializedRef = useRef(false);
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

  const handleCreateEntity = useCallback(() => {
    if (!autoStart) return;
    if (entityCreationAttemptedRef.current) {
      console.log("[Dev] Skipping duplicate entity creation attempt");
      return;
    }
    entityCreationAttemptedRef.current = true;
    setError(null);
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substring(2, 10);
    const externalId = `user-${timestamp}-${randomPart}`;
    createEntity({
      externalId,
      type: EntityType.INDIVIDUAL,
      requirements: [],
    });
  }, [createEntity, autoStart]);

  const handleGetToken = useCallback(
    (id: string) => {
      if (!autoStart) return;
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
    [getKycSdkToken, sdkToken, isGettingToken, autoStart]
  );

  const handleSubmitted = useCallback(() => {
    setCurrentStep(VerificationStep.COMPLETE);
  }, []);

  const handleComplete = useCallback(
    (id: string) => {
      router.push(`/kyc/entities/${id}`);
    },
    [router]
  );

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const prevAutoStartRef = useRef(autoStart);

  // If entityId is provided via options, set it and skip entity creation
  useEffect(() => {
    if (initialEntityId) {
      setEntityId(initialEntityId);
      setCurrentStep(VerificationStep.TOKEN_PREPARATION);
    }
  }, [initialEntityId]);

  useEffect(() => {
    if (!prevAutoStartRef.current && autoStart) {
      setEntityId(initialEntityId);
      setSdkToken(null);
      setCurrentStep(
        initialEntityId
          ? VerificationStep.TOKEN_PREPARATION
          : VerificationStep.ENTITY_CREATION
      );
      setError(null);
      isInitializedRef.current = true;
      tokenRequestedForEntityRef.current = null;
    }
    prevAutoStartRef.current = autoStart;
  }, [autoStart, initialEntityId]);

  useEffect(() => {
    if (!autoStart) return;
    if (entityData?.id && !isGettingToken && !entityId && !initialEntityId) {
      setEntityId(entityData.id);
      setCurrentStep(VerificationStep.TOKEN_PREPARATION);
    }
  }, [entityData, isGettingToken, entityId, autoStart, initialEntityId]);

  useEffect(() => {
    if (!autoStart) return;
    if (kycTokenData?.sdkToken && !sdkToken) {
      setSdkToken(kycTokenData.sdkToken);
      setCurrentStep(VerificationStep.DOCUMENT_VERIFICATION);
    }
  }, [kycTokenData, sdkToken, autoStart]);

  useEffect(() => {
    if (!autoStart) return;
    if (createEntityError) {
      setError("Failed to create entity. Please try again.");
    }
  }, [createEntityError, autoStart]);

  useEffect(() => {
    if (!autoStart) return;
    if (kycTokenError) {
      setError("Failed to get verification token. Please try again.");
    }
  }, [kycTokenError, autoStart]);

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
