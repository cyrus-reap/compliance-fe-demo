"use server";

import axios from "axios";
import {
  CreateEntityType,
  GetAllEntitiesForUserType,
  PaginationType,
  GetEntityDetailsType,
} from "@/types";

/**
 * Creates a new entity.
 *
 * @param {CreateEntityType} data - The entity data to be created.
 * @returns {Promise<any>} - The created entity's response.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const createEntity = async (
  data: CreateEntityType,
  apiKey?: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-reap-api-key":
            apiKey || (process.env.COMPLIANCE_API_KEY as string),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create entity");
  }
};

/**
 * Fetches a list of entities (with optional pagination parameters).
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @param {string} [apiKey] - Optional API key. Falls back to system key if not provided.
 * @returns {Promise<{ items: GetAllEntitiesForUserType[]; meta: PaginationType }>} - The list of entities and metadata.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchEntities = async (
  page: number,
  limit: number,
  apiKey?: string
): Promise<{ items: GetAllEntitiesForUserType[]; meta: PaginationType }> => {
  try {
    // Try without pagination parameters first, as the API might not support them
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity`,
      {
        // Remove params temporarily to test if API supports pagination
        // params: { page, limit },
        headers: {
          accept: "application/json",
          "x-reap-api-key":
            apiKey || (process.env.COMPLIANCE_API_KEY as string),
        },
      }
    );

    // If the API doesn't support pagination, we'll do client-side pagination
    const allItems = response.data.items || response.data || [];
    const totalItems = allItems.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = allItems.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      meta: {
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    };
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
 * @param {string} [apiKey] - Optional API key. Falls back to system key if not provided.
 * @returns {Promise<any>} - The response after the entity is deleted.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const deleteEntity = async (
  entityId: string,
  apiKey?: string
): Promise<any> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}`,
      {
        headers: {
          "x-reap-api-key":
            apiKey || (process.env.COMPLIANCE_API_KEY as string),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete entity");
  }
};

/**
 * Fetch entity details from the API.
 *
 * @param entityId - ID of the entity.
 * @param {string} [apiKey] - Optional API key. Falls back to system key if not provided.
 * @returns EntityDetails
 */
export const getEntityDetails = async (
  entityId: string,
  apiKey?: string
): Promise<GetEntityDetailsType> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}`,
      {
        headers: {
          "x-reap-api-key":
            apiKey || (process.env.COMPLIANCE_API_KEY as string),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching entity details:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch entity details"
    );
  }
};
