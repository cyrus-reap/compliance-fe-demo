"use server";

import axios from "axios";

export interface PresignedPostParams {
  entityId: string;
  requirementSlug: string;
  memberId?: string;
}

export interface PresignedPostResponse {
  url: string;
  fields: {
    [key: string]: string;
  };
  prefix: string;
}

/**
 * Fetches the presigned POST URL for file upload to S3.
 *
 * @param {PresignedPostParams} params - The parameters for generating the presigned URL.
 * @returns {Promise<PresignedPostResponse>} - The presigned POST URL data.
 */
export const getPresignedPostFileUrl = async (
  params: PresignedPostParams
): Promise<PresignedPostResponse> => {
  const { entityId, requirementSlug, memberId } = params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}/requirement-slug/${requirementSlug}/presigned-upload-url`,
      {
        params: { memberId },
        headers: {
          Accept: "application/json",
          "x-reap-api-key": process.env.COMPLIANCE_API_KEY as string,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch presigned POST URL"
    );
  }
};
