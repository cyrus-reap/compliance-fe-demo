import { useMutation } from "@tanstack/react-query";
import { uploadFile, FileUploadParams } from "@/api/file";

/**
 * Custom hook to handle file upload to the given endpoint.
 *
 * @returns {object} - The mutation object for the file upload.
 */
export const useUploadFileHook = () => {
  const mutation = useMutation<void, Error, FileUploadParams>({
    mutationFn: (params: FileUploadParams) => uploadFile(params),
    onError: (error: Error) => {
      console.error("Failed to upload file:", error.message);
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
