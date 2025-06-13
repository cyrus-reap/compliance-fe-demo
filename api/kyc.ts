"use server";

import axios from "axios";
import { KycParams, KycResponse } from "@/types";

/**
 * Fetches the KYC web_href for a specific entity or entity member.
 *
 * @param {KycParams} params - The parameters for the KYC process.
 * @param {string} [apiKey] - Optional API key. Falls back to system key if not provided.
 * @returns {Promise<KycResponse>} - The response containing the `web_href`.
 */
export const fetchKycLink = async (
  params: KycParams,
  apiKey?: string
): Promise<KycResponse> => {
  const { entityId, memberId } = params;

  try {
    const response = await axios.post(
      `${
        process.env.NEXT_PUBLIC_COMPLIANCE_API_URL
      }/entity/${entityId}/kyc?memberId=${memberId || ""}`,
      {},
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
    throw new Error(
      error.response?.data?.message || "Failed to fetch KYC link"
    );
  }
};
