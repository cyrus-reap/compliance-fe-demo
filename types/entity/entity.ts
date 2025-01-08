export enum EntityType {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
}

export interface CreateEntityResponseType {
  businessId: string;
  externalId: string;
  id: string;
  type: string;
}

export interface CreateEntityType {
  externalId: string;
  requirements?: {
    requirementSlug: string;
    value: string;
  }[];
  type: EntityType;
}

export interface EnabledFeatureForEntityType {
  featureId: string;
}

export interface GetAllEntitiesForUserType {
  businessId: string;
  createdAt: Date;
  externalId: string;
  id: string;
  updatedAt: Date;
}
[];

export interface GetEntityDetailsType {
  businessId: string;
  createdAt: Date;
  enabledFeatures?: {
    featureId: string;
  }[];
  externalId: string;
  id: string;
  submittedRequirements?: {
    createdAt: Date;
    memberId?: string;
    requirement: {
      id: string;
      jsonSchema?: {
        data?: object;
        ui?: object;
      } | null;
      name: string;
      valueType: "BOOLEAN" | "NUMERIC" | "STRING" | "FILE" | "JSON";
    };
    status: string;
    submissionId?: string;
    updatedAt: Date;
    value?: any;
  }[];
  type: EntityType;
  updatedAt: Date;
  verifiedBy?: string;
}

export interface SubmittedRequirementType {
  createdAt: Date;
  memberId?: string;
  requirement: {
    id: string;
    jsonSchema?: {
      data?: object;
      ui?: object;
    } | null;
    name: string;
    valueType: "BOOLEAN" | "NUMERIC" | "STRING" | "FILE" | "JSON";
  };
  status: string;
  submissionId?: string;
  updatedAt: Date;
  value?: any;
}
