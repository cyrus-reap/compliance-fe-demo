import { useQuery } from "@tanstack/react-query";
import { fetchEntities } from "@/api/entity";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useApiKey } from "@/contexts/ApiKeyContext";

interface UseEntitiesHookParams {
  page: number;
  limit: number;
}

/**
 * Custom hook to fetch entities with pagination support and custom API key.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {object} - The query data, loading state, error state, and refetch function.
 */
export const useGetEntitiesHook = ({ page, limit }: UseEntitiesHookParams) => {
  const { getApiKey } = useApiKey();

  const query = useQuery({
    queryKey: QUERY_KEYS.ENTITIES(page, limit),
    queryFn: () => {
      const apiKey = getApiKey();
      return fetchEntities(page, limit, apiKey);
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
