import { RequirementsListType } from "@/types";

/**
 * Fetches the requirements for a specific feature.
 *
 * @param {string} featureId - The ID of the feature to fetch requirements for.
 * @returns {Promise<RequirementsListType>} - The feature requirements data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchFeatureRequirements = async (
  featureId?: string
): Promise<{ items: RequirementsListType }> => {
  if (!featureId) throw new Error("Feature ID is required");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/feature/${featureId}/requirement`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch feature requirements");
  return response.json();
};
