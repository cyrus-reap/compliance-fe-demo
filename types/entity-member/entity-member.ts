export interface CreateEntityMemberType {
  externalId: string;
  memberType:
    | "INDIVIDUAL"
    | "BUSINESS"
    | "DIRECTOR"
    | "OWNER"
    | "EXECUTIVE"
    | "REPRESENTATIVE";
  requirements?: {
    requirementSlug: string;
    value: string;
  }[];
}

export type GetAllEntityMembersForUserType = {
  createdAt: Date;
  entityId: string;
  externalId: string;
  id: string;
  memberType:
    | "INDIVIDUAL"
    | "BUSINESS"
    | "DIRECTOR"
    | "OWNER"
    | "EXECUTIVE"
    | "REPRESENTATIVE";
  updatedAt: Date;
  verifiedBy: any;
}[];

export interface GetEntityMemberDetailsType {
  createdAt: Date;
  entityId: string;
  externalId: string;
  id: string;
  memberType:
    | "INDIVIDUAL"
    | "BUSINESS"
    | "DIRECTOR"
    | "OWNER"
    | "EXECUTIVE"
    | "REPRESENTATIVE";
  submittedRequirements?: {
    createdAt: Date;
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
    value?: any;
  }[];
  updatedAt: Date;
  verifiedBy: any;
}

export interface SubmittedRequirementForMemberType {
  createdAt: Date;
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
  value?: any;
}
