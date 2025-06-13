import { useMutation } from "@tanstack/react-query";
import { createEntity } from "@/api/entity";
import { CreateEntityType } from "@/types";
import { useApiKey } from "@/contexts/ApiKeyContext";

/**
 * Custom hook to create a new entity with custom API key support.
 *
 * @returns {object} - The mutation object for creating an entity.
 */
export const usePostEntityHook = () => {
  const { getApiKey } = useApiKey();

  const mutation = useMutation({
    mutationFn: (data: CreateEntityType) => {
      const apiKey = getApiKey();
      return createEntity(data, apiKey);
    },
    onError: (error: Error) => {
      console.error("Failed to create entity:", error.message);
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
