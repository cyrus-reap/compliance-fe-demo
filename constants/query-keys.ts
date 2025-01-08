export const QUERY_KEYS = {
  FETCH_KYC_LINK: (entityId: string, memberId?: string) => [
    "fetchKycLink",
    { entityId, memberId },
  ],
  FEATURE_REQUIREMENTS: (featureId?: string) => [
    "featureRequirements",
    featureId,
  ],
  ENTITIES: (page: number, limit: number) => ["entities", { page, limit }],
  FEATURES: (page: number, limit: number) => ["features", { page, limit }],
};
