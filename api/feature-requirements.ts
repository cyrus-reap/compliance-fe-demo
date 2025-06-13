"use server";

import axios from "axios";
import { RequirementsListType } from "@/types";

/**
 * Fetches the requirements for a specific feature.
 *
 * @param {string} featureId - The ID of the feature to fetch requirements for.
 * @param {string} [apiKey] - Optional API key. Falls back to system key if not provided.
 * @returns {Promise<{ items: RequirementsListType }>} - The feature requirements data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchFeatureRequirements = async (
  featureId?: string,
  apiKey?: string
): Promise<{ items: RequirementsListType }> => {
  if (!featureId) throw new Error("Feature ID is required");

  try {
    const response = await axios.get<{ items: RequirementsListType }>(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/feature/${featureId}/requirement`,
      {
        headers: {
          accept: "application/json",
          "x-reap-api-key":
            apiKey || (process.env.COMPLIANCE_API_KEY as string),
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch feature requirements"
    );
  }
};
