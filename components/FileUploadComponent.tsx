import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetPresignedPostFileUrlHook } from "@/hooks/useGetPresignedPostFileUrlHook";
import axios from "axios";

const FileUploadComponent = ({
  entityId,
  requirementSlug,
  memberId,
  onSuccess,
}: {
  entityId: string;
  requirementSlug: string;
  memberId?: string;
  onSuccess: (uploadedFileUrl: string) => void;
}) => {
  const { mutate, isPending } = useGetPresignedPostFileUrlHook();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!file) {
      message.error("Please select a file to upload");
      return;
    }

    mutate(
      { entityId, requirementSlug, memberId },
      {
        onSuccess: async (data) => {
          try {
            const formData = new FormData();

            console.log("data", data);

            // Add all fields from the presigned POST response
            for (const [key, value] of Object.entries(data.fields)) {
              formData.append(key, value);
            }

            // Add the actual file
            const filePath = `${data.prefix}${file.name}`;
            formData.set("key", filePath);
            formData.append("file", file);

            // Upload the file to S3
            await axios.post(data.url, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            // Call the onSuccess callback with the uploaded file's URL
            const uploadedFileUrl = `${data.url}/${filePath}`;
            onSuccess(uploadedFileUrl);

            message.success("File uploaded successfully!");
          } catch (error) {
            message.error("File upload failed!");
            console.error("Upload Error:", error);
          }
        },
        onError: (error) => {
          message.error("Failed to fetch presigned POST URL");
          console.error("Fetch Error:", error);
        },
      }
    );
  };

  const beforeUpload = (file: File) => {
    setFile(file);
    return false; // Prevent default upload behavior
  };

  return (
    <div>
      <Upload beforeUpload={beforeUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />} disabled={isPending}>
          Select File
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file || isPending}
        loading={isPending}
        style={{ marginLeft: "10px" }}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUploadComponent;
