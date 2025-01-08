export const QUERY_KEYS = {
  FETCH_KYC_LINK: (entityId: string, memberId?: string) => [
    "fetchKycLink",
    { entityId, memberId },
  ],
  FEATURE_REQUIREMENTS: (featureId: string) => [
    "featureRequirements",
    featureId,
  ],
};
