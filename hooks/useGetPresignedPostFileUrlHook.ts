import { useMutation } from "@tanstack/react-query";
import {
  getPresignedPostFileUrl,
  PresignedPostParams,
  PresignedPostResponse,
} from "@/api/s3-file-upload";

/**
 * Custom hook to fetch the presigned POST URL for file upload.
 *
 * @returns {object} - The mutation object for fetching the presigned POST URL.
 */
export const useGetPresignedPostFileUrlHook = () => {
  const mutation = useMutation<
    PresignedPostResponse,
    Error,
    PresignedPostParams
  >({
    mutationFn: (params: PresignedPostParams) =>
      getPresignedPostFileUrl(params),
    onError: (error: Error) => {
      console.error("Failed to fetch presigned POST URL:", error.message);
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
