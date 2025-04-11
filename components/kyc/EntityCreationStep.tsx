import React, { useEffect, useRef } from "react";
import { Spin, Typography, Button } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { EntityType } from "@/types";

const { Text } = Typography;

interface EntityCreationStepProps {
  isCreating: boolean;
  onCreateEntity: () => void;
  error?: string | null;
}

export default function EntityCreationStep({
  isCreating,
  onCreateEntity,
  error = null,
}: EntityCreationStepProps) {
  // Use a ref to track if we've already initiated entity creation
  const hasTriggeredRef = useRef(false);

  // Trigger entity creation once when component mounts
  useEffect(() => {
    if (!isCreating && !error && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      onCreateEntity();
    }
  }, [onCreateEntity, isCreating, error]);

  // Reset ref when unmounting to ensure it works if component remounts
  useEffect(() => {
    return () => {
      hasTriggeredRef.current = false;
    };
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Text className="text-red-500 mb-4">{error}</Text>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={onCreateEntity}
          loading={isCreating}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Spin
        size="large"
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 36,
              color: token.color.lightViolet[700],
            }}
          />
        }
      />
      <Text className="mt-6 text-gray-500">Creating your profile...</Text>
    </div>
  );
}
