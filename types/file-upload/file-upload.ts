export interface FileRequirementsType {
  filesSubmitted?: {
    fileId?: string | null;
    fileName?: string | null;
    memberId?: string;
    submissionId: string;
    uploadedAt?: string;
  }[];
  requirementId: string;
  requirementSlug: string;
}

export interface GetFileUploadRequirementsParamsType {
  entityMemberUuid?: string;
  entityUuid: string;
  featureUuid: string;
  visibility: "PUBLIC" | "INTERNAL";
}

export interface GetPresignedPostUrlParamsType {
  entityMemberUuid?: string;
  entityUuid: string;
  requirementSlug: string;
}

export interface HandlerEntityMemberFileUploadParamsType {
  entityUuid: string;
  filesToUpload: {
    content: Buffer;
    encoding: string;
    filename: string;
    mimetype: string;
    truncated: boolean;
  }[];
  memberUuid?: string;
  requirementSlug: string;
}

export interface ParsedFileType {
  content: Buffer;
  encoding: string;
  filename: string;
  mimetype: string;
  truncated: boolean;
}
