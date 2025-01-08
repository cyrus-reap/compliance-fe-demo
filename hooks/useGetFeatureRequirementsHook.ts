import { useQuery } from "@tanstack/react-query";
import { fetchFeatureRequirements } from "@/api/feature-requirements";
import { RequirementsListType } from "@/types";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Custom hook to fetch feature requirements.
 *
 * @param {string} featureId - The ID of the feature to fetch requirements for.
 * @returns {object} - The query data, loading state, error state, and refetch function.
 */
export const useGetFeatureRequirementsHook = (featureId?: string) => {
  const query = useQuery<{ items: RequirementsListType }, Error>({
    queryKey: QUERY_KEYS.FEATURE_REQUIREMENTS(featureId),
    queryFn: () => fetchFeatureRequirements(featureId),
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
