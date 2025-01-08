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
}) => {
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

export const deleteEntityMember = async ({
  entityId,
  memberId,
}: {
  entityId: string;
  memberId: string;
}) => {
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
