import { useQuery } from "@tanstack/react-query";
import { KycParams, KycResponse } from "@/types";
import { fetchKycLink } from "@/api/kyc";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useGetKycHook = (params: KycParams) => {
  const query = useQuery<KycResponse, Error>({
    queryKey: QUERY_KEYS.FETCH_KYC_LINK(params.entityId, params.memberId),
    queryFn: () => fetchKycLink(params),
    enabled: !!params.entityId && !!params.memberId,
  });

  const { isLoading, data, error, refetch } = query;

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
