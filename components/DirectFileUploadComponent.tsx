import React, { useState } from "react";
import { Button, Upload, message, Typography, Image } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useUploadFileHook } from "@/hooks/useUploadFileHook";

const { Text } = Typography;

const DirectFileUploadComponent = ({
  entityId,
  requirementSlug,
  onSuccess,
}: {
  entityId: string;
  requirementSlug: string;
  onSuccess: () => void;
}) => {
  const { mutate, isPending } = useUploadFileHook();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = () => {
    if (!file) {
      message.error("Please select a file to upload");
      return;
    }

    mutate(
      { entityId, requirementSlug, file },
      {
        onSuccess: () => {
          message.success("File uploaded successfully!");
          setFile(null);
          setPreviewUrl(null);
          onSuccess();
        },
        onError: (error) => {
          console.error("Error uploading file:", error);
          message.error("File upload failed!");
        },
      }
    );
  };

  const beforeUpload = (file: File) => {
    setFile(file);

    // Generate a preview URL for image files
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    return false; // Prevent default upload behavior
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);

    // Revoke the object URL to free up memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center w-full mb-6 gap-2">
        <Upload beforeUpload={beforeUpload} showUploadList={false}>
          <Button
            type="default"
            icon={<UploadOutlined />}
            disabled={isPending}
            className="text-sm"
          >
            Choose File
          </Button>
        </Upload>
        {file && (
          <div className="flex items-center space-x-3 w-full overflow-hidden">
            <Text
              ellipsis
              className="text-sm text-gray-600 truncate max-w-[calc(100%-40px)]"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {file.name}
            </Text>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={handleRemove}
              disabled={isPending}
              className="text-red-500"
            />
          </div>
        )}
      </div>

      {file && (
        <div className="flex items-center justify-center mb-6">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="File preview"
              width={100}
              height={100}
              className="rounded-md border"
              preview={false}
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-md border text-gray-500">
              <FileOutlined style={{ fontSize: "24px" }} />
            </div>
          )}
        </div>
      )}

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file || isPending}
        loading={isPending}
        className="w-full text-sm"
      >
        Upload File
      </Button>
    </div>
  );
};

export default DirectFileUploadComponent;
