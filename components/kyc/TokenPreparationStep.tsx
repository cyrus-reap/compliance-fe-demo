import React, { useEffect, useRef } from "react";
import { Spin, Typography, Button } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Text } = Typography;

interface TokenPreparationStepProps {
  entityId: string | null;
  isGettingToken: boolean;
  onGetToken: (entityId: string) => void;
  error?: string | null;
}

export default function TokenPreparationStep({
  entityId,
  isGettingToken,
  onGetToken,
  error = null,
}: TokenPreparationStepProps) {
  // Add a ref to track if we've already requested the token
  const hasRequestedTokenRef = useRef(false);

  // Request the token when we have an entity ID
  useEffect(() => {
    if (
      entityId &&
      !isGettingToken &&
      !error &&
      !hasRequestedTokenRef.current
    ) {
      // Mark that we've requested the token to prevent duplicate requests
      hasRequestedTokenRef.current = true;
      onGetToken(entityId);
    }
  }, [entityId, isGettingToken, onGetToken, error]);

  // Reset the ref when component unmounts
  useEffect(() => {
    return () => {
      hasRequestedTokenRef.current = false;
    };
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Text className="text-red-500 mb-4">{error}</Text>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => {
            if (entityId) {
              // Allow retry when there's an error
              hasRequestedTokenRef.current = false;
              onGetToken(entityId);
            }
          }}
          loading={isGettingToken}
          disabled={!entityId}
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
      <Text className="mt-6 text-gray-500">Preparing verification...</Text>
    </div>
  );
}
