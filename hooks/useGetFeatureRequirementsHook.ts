import { useQuery } from "@tanstack/react-query";
import { fetchFeatureRequirements } from "@/api/feature-requirements";
import { RequirementsListType } from "@/types";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useApiKey } from "@/contexts/ApiKeyContext";

/**
 * Custom hook to fetch feature requirements with custom API key support.
 *
 * @param {string} featureId - The ID of the feature to fetch requirements for.
 * @returns {object} - The query data, loading state, error state, and refetch function.
 */
export const useGetFeatureRequirementsHook = (featureId?: string) => {
  const { getApiKey } = useApiKey();

  const query = useQuery<{ items: RequirementsListType }, Error>({
    queryKey: QUERY_KEYS.FEATURE_REQUIREMENTS(featureId),
    queryFn: () => {
      if (!featureId) {
        throw new Error("Feature ID is required");
      }
      const apiKey = getApiKey();
      return fetchFeatureRequirements(featureId, apiKey);
    },
    enabled: !!featureId,
  });

  const { data, isLoading, error, refetch } = query;

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
