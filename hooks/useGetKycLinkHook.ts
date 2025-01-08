import { useMutation } from "@tanstack/react-query";
import { KycParams, KycResponse } from "@/types";
import { fetchKycLink } from "@/api/kyc";

/**
 * Custom hook to fetch the KYC link for an entity or member.
 *
 * @returns {object} - The mutation object for fetching the KYC link.
 */
export const useGetKycLinkHook = () => {
  const mutation = useMutation<KycResponse, Error, KycParams>({
    mutationFn: (params: KycParams) => fetchKycLink(params),
    onError: (error: Error) => {
      console.error("Failed to fetch KYC link:", error.message);
    },
  });

  const { mutate, isPending, isError, isSuccess, data, error } = mutation;

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
    data,
    error,
  };
};
