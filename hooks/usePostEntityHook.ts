import { useMutation } from "@tanstack/react-query";
import { createEntity } from "@/api/entity";
import { CreateEntityType } from "@/types";

/**
 * Custom hook to create a new entity.
 *
 * @returns {object} - The mutation object for creating an entity.
 */
export const usePostEntityHook = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateEntityType) => createEntity(data),
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
