import { useQuery } from "@tanstack/react-query";
import { fetchEntities } from "@/api/entity";
import { QUERY_KEYS } from "@/constants/query-keys";

interface UseEntitiesHookParams {
  page: number;
  limit: number;
}

/**
 * Custom hook to fetch entities with pagination support.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {object} - The query data, loading state, error state, and refetch function.
 */
export const useGetEntitiesHook = ({ page, limit }: UseEntitiesHookParams) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.ENTITIES(page, limit),
    queryFn: () => fetchEntities(page, limit),
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
