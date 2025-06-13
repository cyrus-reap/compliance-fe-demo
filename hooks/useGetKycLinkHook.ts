import { useMutation } from "@tanstack/react-query";
import { KycParams, KycResponse } from "@/types";
import { fetchKycLink } from "@/api/kyc";
import { useApiKey } from "@/contexts/ApiKeyContext";

/**
 * Custom hook to fetch the KYC link for an entity or member with custom API key support.
 *
 * @returns {object} - The mutation object for fetching the KYC link.
 */
export const useGetKycLinkHook = () => {
  const { getApiKey } = useApiKey();

  const mutation = useMutation<KycResponse, Error, KycParams>({
    mutationFn: (params: KycParams) => {
      const apiKey = getApiKey();
      return fetchKycLink(params, apiKey);
    },
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
