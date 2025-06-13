import { useQuery } from "@tanstack/react-query";
import { fetchFeatures } from "@/api/feature";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useApiKey } from "@/contexts/ApiKeyContext";

interface UseFeaturesHookParams {
  page: number;
  limit: number;
}

/**
 * Custom hook to fetch features with pagination support and custom API key.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of features per page.
 * @returns {object} - The query data, loading state, error state, and refetch function.
 */
export const useGetFeaturesHook = ({ page, limit }: UseFeaturesHookParams) => {
  const { getApiKey } = useApiKey();

  const query = useQuery({
    queryKey: QUERY_KEYS.FEATURES(page, limit),
    queryFn: () => {
      const apiKey = getApiKey();
      return fetchFeatures(page, limit, apiKey);
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  const { data, isLoading, error, refetch } = query;

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
