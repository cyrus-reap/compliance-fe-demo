"use client";

import { use } from "react";
import { useFeatureRequirementsHook } from "@/hooks/useFeatureRequirementsHook";
import { AssociatedEntity, RequirementLevel, ValueType } from "@/types";
import {
  Button,
  Card,
  List,
  Spin,
  Typography,
  Space,
  Divider,
  Tag,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function FeatureRequirements({
  params,
}: {
  params: Promise<{ featureId: string }>;
}) {
  const { featureId } = use(params);

  const { data, isLoading, error, refetch } =
    useFeatureRequirementsHook(featureId);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-6 p-6">
      <Card className="w-full max-w-4xl" bordered={false}>
        <div className="mb-6 text-center">
          <Title level={2} className="mb-0">
            Feature Requirements
          </Title>
          <Text type="secondary">
            Below are the compliance requirements for this feature.
          </Text>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="text-center">
            <Text type="danger">Error: {error.message}</Text>
            <div className="mt-4">
              <Button
                icon={<ReloadOutlined />}
                type="primary"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          </div>
        ) : data && data.items.length > 0 ? (
          <List
            dataSource={data.items}
            renderItem={(requirement) => (
              <List.Item>
                <Card className="w-full">
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Text strong>Requirement ID:</Text>{" "}
                      {requirement.requirementId}
                    </div>
                    <div>
                      <Text strong>Requirement Slug:</Text>{" "}
                      {requirement.requirementSlug}
                    </div>
                    <div>
                      <Text strong>Associated Entity:</Text>{" "}
                      <Tag color="blue">
                        {AssociatedEntity[requirement.associatedEntity]}
                      </Tag>
                    </div>
                    <div>
                      <Text strong>Requirement Level:</Text>{" "}
                      <Tag color="green">
                        {RequirementLevel[requirement.requirementLevel]}
                      </Tag>
                    </div>
                    <div>
                      <Text strong>Value Type:</Text>{" "}
                      <Tag color="volcano">
                        {ValueType[requirement.valueType]}
                      </Tag>
                    </div>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <div className="text-center">
            <Text type="secondary">
              No requirements found for this feature.
            </Text>
          </div>
        )}
      </Card>

      <Divider />
      <div className="text-center">
        <Text type="secondary">
          Note: Make sure to fulfill all the listed requirements for this
          feature to proceed further.
        </Text>
      </div>
    </div>
  );
}
