import { CreateEntityType } from "@/types";

/**
 * Creates a new entity.
 *
 * @param {CreateEntityType} data - The entity data to be created.
 * @returns {Promise<any>} - The created entity's response.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const createEntity = async (data: CreateEntityType): Promise<any> => {
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

/**
 * Fetches a paginated list of entities.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {Promise<any>} - The paginated list of entities and metadata.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchEntities = async (
  page: number,
  limit: number
): Promise<any> => {
  const queryString = new URLSearchParams();
  queryString.append("page", page.toString());
  queryString.append("limit", limit.toString());

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_COMPLIANCE_API_URL
    }/entity?${queryString.toString()}`,
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

/**
 * Deletes an entity by its ID.
 *
 * @param {string} entityId - The ID of the entity to be deleted.
 * @returns {Promise<any>} - The response after the entity is deleted.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const deleteEntity = async (entityId: string): Promise<any> => {
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
