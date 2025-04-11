import React, { useEffect } from "react";
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
  // Request the token when we have an entity ID
  useEffect(() => {
    if (entityId && !isGettingToken && !error) {
      onGetToken(entityId);
    }
  }, [entityId, isGettingToken, onGetToken, error]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Text className="text-red-500 mb-4">{error}</Text>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => entityId && onGetToken(entityId)}
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
