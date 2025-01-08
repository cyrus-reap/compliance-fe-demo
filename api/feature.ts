import axios from "axios";
import { GetAllFeaturesForUserType, PaginationType } from "@/types";

/**
 * Fetches all features with pagination.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of features per page.
 * @returns {Promise<{ items: GetAllFeaturesForUserType[]; meta: PaginationType }>} - The list of features and pagination metadata.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchFeatures = async (
  page: number,
  limit: number
): Promise<{ items: GetAllFeaturesForUserType[]; meta: PaginationType }> => {
  try {
    const response = await axios.get<{
      items: GetAllFeaturesForUserType[];
      meta: PaginationType;
    }>(`${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/features`, {
      headers: {
        accept: "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
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
