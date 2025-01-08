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
  const queryString = new URLSearchParams();
  queryString.append("page", page.toString());
  queryString.append("limit", limit.toString());

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_COMPLIANCE_API_URL
    }/features?${queryString.toString()}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch features");
  return response.json();
};
