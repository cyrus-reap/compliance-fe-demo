import { KycParams, KycResponse } from "@/types";

/**
 * Fetches the KYC web_href for a specific entity or entity member.
 *
 * @param {KycParams} params - The parameters for the KYC process.
 * @returns {Promise<KycResponse>} - The response containing the `web_href`.
 */
export const fetchKycLink = async (params: KycParams): Promise<KycResponse> => {
  const { entityId, memberId, successUrl, failureUrl } = params;

  const queryString = new URLSearchParams();
  if (memberId) queryString.append("memberId", memberId);

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_COMPLIANCE_API_URL
    }/entity/${entityId}/kyc?${queryString.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-reap-api-key": process.env.API_KEY as string,
      },
      body: JSON.stringify({ successUrl, failureUrl }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch KYC link");
  }

  const data = await response.json();
  return data;
};
