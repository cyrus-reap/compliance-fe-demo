"use server";

import axios from "axios";
import { GetAllFeaturesForUserType, PaginationType } from "@/types";

/**
 * Fetches all features with pagination.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of features per page.
 * @param {string} [apiKey] - Optional API key. Falls back to system key if not provided.
 * @returns {Promise<{ items: GetAllFeaturesForUserType[]; meta: PaginationType }>} - The list of features and pagination metadata.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchFeatures = async (
  page: number,
  limit: number,
  apiKey?: string
): Promise<{ items: GetAllFeaturesForUserType[]; meta: PaginationType }> => {
  try {
    const response = await axios.get<{
      items: GetAllFeaturesForUserType[];
      meta: PaginationType;
    }>(`${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/features`, {
      headers: {
        accept: "application/json",
        "x-reap-api-key": apiKey || (process.env.COMPLIANCE_API_KEY as string),
      },
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch features"
    );
  }
};
