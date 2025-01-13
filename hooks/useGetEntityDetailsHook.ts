import { useQuery } from "@tanstack/react-query";
import { getEntityDetails } from "@/api/entity";
import { QUERY_KEYS } from "@/constants/query-keys";
import { GetEntityDetailsType } from "@/types";

/**
 * Custom hook to fetch entity details.
 *
 * @param entityId - The ID of the entity to fetch details for.
 * @returns QueryResult
 */
export const useGetEntityDetailsHook = (entityId: string | null) => {
  if (!entityId) {
    throw new Error("Entity ID is required");
  }

  return useQuery<GetEntityDetailsType, Error>({
    queryKey: QUERY_KEYS.ENTITY(entityId),
    queryFn: () => getEntityDetails(entityId),
    staleTime: 1000 * 60 * 10,
  });
};
