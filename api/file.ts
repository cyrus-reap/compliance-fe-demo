"use server";

import axios from "axios";

export interface FileUploadParams {
  entityId: string;
  requirementSlug: string;
  file: File;
}

/**
 * Uploads a file directly to the given endpoint.
 *
 * @param {FileUploadParams} params - The parameters for the file upload.
 * @returns {Promise<FileUploadResponse>} - The response from the upload API.
 */
export const uploadFile = async (params: FileUploadParams): Promise<void> => {
  const { entityId, requirementSlug, file } = params;

  try {
    const formData = new FormData();
    formData.append("files", file);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}/requirement-slug/${requirementSlug}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-reap-api-key": process.env.COMPLIANCE_API_KEY as string,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to upload the file"
    );
  }
};
