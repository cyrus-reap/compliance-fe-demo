import axios from "axios";
import {
  CreateEntityType,
  GetAllEntitiesForUserType,
  PaginationType,
} from "@/types";

/**
 * Creates a new entity.
 *
 * @param {CreateEntityType} data - The entity data to be created.
 * @returns {Promise<any>} - The created entity's response.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const createEntity = async (data: CreateEntityType): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-reap-api-key": process.env
            .NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create entity");
  }
};

/**
 * Fetches a paginated list of entities.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {Promise<{ items: GetAllEntitiesForUserType[]; meta: PaginationType }>} - The paginated list of entities and metadata.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchEntities = async (
  page: number,
  limit: number
): Promise<{ items: GetAllEntitiesForUserType[]; meta: PaginationType }> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity`,
      {
        params: { page, limit },
        headers: {
          accept: "application/json",
          "x-reap-api-key": process.env
            .NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch entities"
    );
  }
};

/**
 * Deletes an entity by its ID.
 *
 * @param {string} entityId - The ID of the entity to be deleted.
 * @returns {Promise<any>} - The response after the entity is deleted.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const deleteEntity = async (entityId: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}`,
      {
        headers: {
          "x-reap-api-key": process.env
            .NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete entity");
  }
};
