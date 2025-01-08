export interface CreateEntityRequirementType {
  entityUuid: string;
  fileIds?: number[];
  requirementSlug?: string;
  requirementUuid?: string;
  targetEntityMemberUuid?: string;
  updatedBy?: number;
  uploadedBy?: string;
  value?: string;
}
