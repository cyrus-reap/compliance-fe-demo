export interface CreateFeatureRequirementsType {
  featureName: string;
  featureSlug?: string;
  requirements?: {
    requirementLevel?: "REQUIRED" | "OPTIONAL" | "PREFERED";
    requirementUuid: string;
  }[];
}
