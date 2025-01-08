/**
 * Creates a new member for a specific entity.
 *
 * @param {Object} params - The parameters for creating the entity member.
 * @param {string} params.entityId - The ID of the entity to which the member belongs.
 * @param {Object} params.data - The data for the new member.
 * @param {string} params.data.externalId - The external ID of the member.
 * @param {string} params.data.memberType - The type of the member.
 * @param {Array<Object>} [params.data.requirements] - An optional array of requirements for the member.
 * @param {string} params.data.requirements[].requirementSlug - The slug of the requirement.
 * @param {string} params.data.requirements[].value - The value of the requirement.
 * @returns {Promise<any>} - The created entity member's response.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const createEntityMember = async ({
  entityId,
  data,
}: {
  entityId: string;
  data: {
    externalId: string;
    memberType: string;
    requirements?: { requirementSlug: string; value: string }[];
  };
}): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}/member`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("Failed to create entity member");
  return response.json();
};

/**
 * Deletes a member from a specific entity.
 *
 * @param {Object} params - The parameters for deleting the entity member.
 * @param {string} params.entityId - The ID of the entity to which the member belongs.
 * @param {string} params.memberId - The ID of the member to be deleted.
 * @returns {Promise<any>} - The response after deleting the entity member.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const deleteEntityMember = async ({
  entityId,
  memberId,
}: {
  entityId: string;
  memberId: string;
}): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}/member/${memberId}`,
    {
      method: "DELETE",
      headers: {
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to delete entity member");
  return response.json();
};
