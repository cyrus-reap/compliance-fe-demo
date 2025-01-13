"use server";

import axios from "axios";
import { KycParams, KycResponse } from "@/types";

/**
 * Fetches the KYC web_href for a specific entity or entity member.
 *
 * @param {KycParams} params - The parameters for the KYC process.
 * @returns {Promise<KycResponse>} - The response containing the `web_href`.
 */
export const fetchKycLink = async (params: KycParams): Promise<KycResponse> => {
  const { entityId, memberId, successUrl, failureUrl } = params;

  const data = {
    successUrl,
    failureUrl,
  };

  try {
    const response = await axios.post(
      `${
        process.env.NEXT_PUBLIC_COMPLIANCE_API_URL
      }/entity/${entityId}/kyc?memberId=${memberId || ""}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-reap-api-key": process.env.COMPLIANCE_API_KEY as string,
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
