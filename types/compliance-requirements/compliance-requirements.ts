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

export enum AssociatedEntity {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
  DIRECTOR = "DIRECTOR",
  OWNER = "OWNER",
  EXECUTIVE = "EXECUTIVE",
  REPRESENTATIVE = "REPRESENTATIVE",
}

export enum RequirementLevel {
  REQUIRED = "REQUIRED",
  OPTIONAL = "OPTIONAL",
  PREFERED = "PREFERED",
}

export enum ValueType {
  BOOLEAN = "BOOLEAN",
  NUMERIC = "NUMERIC",
  STRING = "STRING",
  FILE = "FILE",
  JSON = "JSON",
}

export type RequirementsListType = {
  associatedEntity: AssociatedEntity;
  requirementId: string;
  requirementLevel: RequirementLevel;
  requirementSlug: string;
  valueType: ValueType;
}[];

export type RequirementsNeededType = {
  requirementSlug: string;
  value: string;
}[];

export type SubmitRequirementsType = {
  requirement?: any;
  value: string;
}[];
