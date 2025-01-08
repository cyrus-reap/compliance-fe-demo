import { CreateEntityType } from "@/types";

export const createEntity = async (data: CreateEntityType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("Failed to create entity");
  return response.json();
};

export const fetchEntities = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch entities");
  return response.json();
};

export const deleteEntity = async (entityId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}`,
    {
      method: "DELETE",
      headers: {
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to delete entity");
  return response.json();
};
