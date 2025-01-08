"use server";

import axios from "axios";
import { CreateEntityMemberType } from "@/types";

/**
 * Creates a new member for a specific entity.
 *
 * @param {Object} params - The parameters for creating the entity member.
 * @param {string} params.entityId - The ID of the entity to which the member belongs.
 * @param {CreateEntityMemberType} params.data - The data for creating the entity member.
 * @returns {Promise<any>} - The created entity member's response.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const createEntityMember = async ({
  entityId,
  data,
}: {
  entityId: string;
  data: CreateEntityMemberType;
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}/member`,
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
      error.response?.data?.message || "Failed to create entity member"
    );
  }
};

/**
 * Deletes a member from a specific entity.
 *
 * @param {Object} params - The parameters for deleting the entity member.
 * @param {string} params.entityId - The ID of the entity to which the member belongs.
 * @param {string} params.memberId - The ID of the member to be deleted.
 * @returns {Promise<any>} - The response after deleting the entity member.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const deleteEntityMember = async ({
  entityId,
  memberId,
}: {
  entityId: string;
  memberId: string;
}): Promise<any> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/entity/${entityId}/member/${memberId}`,
      {
        headers: {
          "x-reap-api-key": process.env.COMPLIANCE_API_KEY as string,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete entity member"
    );
  }
};
