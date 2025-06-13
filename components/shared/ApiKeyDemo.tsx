/**
 * API Key Demo Component
 *
 * Demonstrates the custom API key functionality for documentation
 * and testing purposes. Shows how the system handles both
 * default and user-provided API keys.
 */

"use client";

import React, { useState } from "react";
import { Card, Button, Space, Typography, Alert, Divider } from "antd";
import {
  ApiOutlined,
  RestOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { useGetFeaturesHook } from "@/hooks/useGetFeaturesHook";
import { token } from "@/app/theme";

const { Title, Text, Paragraph } = Typography;

export default function ApiKeyDemo() {
  const { config, getApiKey } = useApiKey();
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    keyType: string;
  } | null>(null);

  // Test API call with current configuration
  const testApiCall = async () => {
    try {
      const currentKey = getApiKey();
      const keyType = config.useCustomKey ? "Custom" : "System";

      // Make a simple API call to test connectivity
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: currentKey,
          testType: "connectivity",
        }),
      });

      if (response.ok) {
        setTestResult({
          success: true,
          message: "API call successful!",
          keyType,
        });
      } else {
        setTestResult({
          success: false,
          message: "API call failed - check your key configuration",
          keyType,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        keyType: config.useCustomKey ? "Custom" : "System",
      });
    }
  };

  return (
    <Card
      title={
        <Space>
          <ApiOutlined style={{ color: token.color.lightBlue[700] }} />
          <span>API Key Configuration Demo</span>
        </Space>
      }
      className="shadow-lg"
    >
      <Space direction="vertical" size="large" className="w-full">
        {/* Current Configuration Display */}
        <div>
          <Title level={4}>Current Configuration</Title>
          <Card size="small" className="bg-gray-50">
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between items-center">
                <Text strong>API Key Type:</Text>
                <Text
                  className={`font-semibold ${
                    config.useCustomKey ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {config.useCustomKey
                    ? "Custom User Key"
                    : "System Default Key"}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Text strong>Key Status:</Text>
                <Text
                  className={config.isValid ? "text-green-600" : "text-red-600"}
                >
                  {config.isValid ? "Valid" : "Invalid"}
                </Text>
              </div>

              {config.useCustomKey && config.customKey && (
                <div className="flex justify-between items-center">
                  <Text strong>Key Preview:</Text>
                  <Text code className="text-gray-600">
                    {config.customKey.substring(0, 8)}...
                    {config.customKey.slice(-4)}
                  </Text>
                </div>
              )}
            </Space>
          </Card>
        </div>

        <Divider />

        {/* API Test Section */}
        <div>
          <Title level={4}>Test API Connectivity</Title>
          <Paragraph className="text-gray-600">
            Test your current API key configuration by making a sample API call.
            This demonstrates how the system automatically uses either your
            custom key or the system default.
          </Paragraph>

          <Space direction="vertical" className="w-full">
            <Button
              type="primary"
              icon={<RestOutlined />}
              onClick={testApiCall}
              loading={false}
              disabled={!config.isValid}
            >
              Test API Call
            </Button>

            {testResult && (
              <Alert
                message={`Test Result (${testResult.keyType} Key)`}
                description={testResult.message}
                type={testResult.success ? "success" : "error"}
                showIcon
                icon={testResult.success ? <CheckCircleOutlined /> : undefined}
              />
            )}
          </Space>
        </div>

        <Divider />

        {/* Feature Overview */}
        <div>
          <Title level={4}>How It Works</Title>
          <Space direction="vertical" size="small" className="w-full">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Text strong className="text-blue-800">
                System Default Mode
              </Text>
              <Paragraph className="text-blue-700 mb-0 mt-1">
                Uses the API key configured in environment variables. This is
                the default mode for production usage.
              </Paragraph>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <Text strong className="text-green-800">
                Custom Key Mode
              </Text>
              <Paragraph className="text-green-700 mb-0 mt-1">
                Uses your provided API key for testing/development. The key is
                stored only for the current session and never persisted.
              </Paragraph>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <Text strong className="text-yellow-800">
                Security Features
              </Text>
              <ul className="text-yellow-700 mb-0 mt-1 pl-4">
                <li>Session-only storage (never saved to disk)</li>
                <li>Production key detection with warnings</li>
                <li>API key redaction in development logs</li>
                <li>Automatic fallback to system keys</li>
              </ul>
            </div>
          </Space>
        </div>
      </Space>
    </Card>
  );
}
