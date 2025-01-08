export interface ComplianceRequirementsType {
  status: {
    /**
     * Unknown Property
     */
    [x: string]: unknown;
  };
  submittedRequirements: object[];
}

export interface FeatureStatusType {
  featureEntityUuid?: string;
  featureName: string;
  featureRequirementIds: number[];
  isQualified: boolean;
  missingRequirementIds: number[];
  submittedRequirementIdsForFeature: number[];
}

export interface OverallRequirementsStatusType {
  /**
   * Unknown Property
   */
  [x: string]: unknown;
}

export type RequirementsListType = {
  associatedEntity: string;
  requirementId: string;
  requirementLevel: string;
  requirementSlug: string;
  valueType: "BOOLEAN" | "NUMERIC" | "STRING" | "FILE" | "JSON";
}[];

export type RequirementsNeededType = {
  requirementSlug: string;
  value: string;
}[];

export type SubmitRequirementsType = {
  requirement?: any;
  value: string;
}[];
