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
import { token } from "@/app/theme";

const { Title, Text, Paragraph } = Typography;

export default function ApiKeyDemo() {
  const { config, getApiKey } = useApiKey();
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    keyType: string;
    details?: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Test API call with current configuration
  const testApiCall = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const currentKey = getApiKey();
      const keyType = config.useCustomKey ? "Custom" : "System";

      // Validate configuration before testing
      if (config.useCustomKey && !currentKey) {
        setTestResult({
          success: false,
          message:
            "No custom API key provided. Please configure a custom key first.",
          keyType,
        });
        return;
      }

      if (!config.useCustomKey && !process.env.NEXT_PUBLIC_COMPLIANCE_API_URL) {
        setTestResult({
          success: false,
          message: "API URL not configured. Check environment variables.",
          keyType,
        });
        return;
      }

      // Test with a direct client-side API call
      const apiUrl = process.env.NEXT_PUBLIC_COMPLIANCE_API_URL;
      if (!apiUrl) {
        throw new Error("API URL not configured");
      }

      const response = await fetch(`${apiUrl}/features`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-reap-api-key": currentKey || "",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      setTestResult({
        success: true,
        message: `Successfully fetched ${result.items?.length || 0} features`,
        keyType,
        details: {
          itemCount: result.items?.length || 0,
          hasMetadata: !!result.meta,
          firstFeature: result.items?.[0]?.name || "No features available",
          apiUrl:
            process.env.NEXT_PUBLIC_COMPLIANCE_API_URL || "Not configured",
        },
      });
    } catch (error) {
      console.error("API test failed:", error);
      let errorMessage = "Unknown error";

      if (error instanceof Error) {
        errorMessage = error.message;
        // Provide more specific error messages
        if (errorMessage.includes("401")) {
          errorMessage = "Unauthorized - Invalid API key";
        } else if (errorMessage.includes("403")) {
          errorMessage = "Forbidden - API key lacks required permissions";
        } else if (errorMessage.includes("404")) {
          errorMessage = "Not found - Check API endpoint configuration";
        } else if (errorMessage.includes("Network Error")) {
          errorMessage = "Network error - Check API URL and connectivity";
        }
      }

      setTestResult({
        success: false,
        message: `API call failed: ${errorMessage}`,
        keyType: config.useCustomKey ? "Custom" : "System",
      });
    } finally {
      setIsLoading(false);
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

              <div className="flex justify-between items-center">
                <Text strong>API URL:</Text>
                <Text code className="text-gray-600">
                  {process.env.NEXT_PUBLIC_COMPLIANCE_API_URL ||
                    "Not configured"}
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

              {!config.useCustomKey && (
                <div className="flex justify-between items-center">
                  <Text strong>System Key Available:</Text>
                  <Text
                    className={
                      process.env.COMPLIANCE_API_KEY
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {process.env.COMPLIANCE_API_KEY
                      ? "Yes"
                      : "No (server-side only)"}
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
              loading={isLoading}
              disabled={!config.isValid}
            >
              Test API Call (Fetch Features)
            </Button>

            {testResult && (
              <Alert
                message={`Test Result (${testResult.keyType} Key)`}
                description={
                  <div>
                    <p>{testResult.message}</p>
                    {testResult.success && testResult.details && (
                      <div className="mt-2 text-sm">
                        <p>
                          <strong>Details:</strong>
                        </p>
                        <ul>
                          <li>Items fetched: {testResult.details.itemCount}</li>
                          <li>
                            Has metadata:{" "}
                            {testResult.details.hasMetadata ? "Yes" : "No"}
                          </li>
                          <li>
                            First feature: {testResult.details.firstFeature}
                          </li>
                          <li>API URL: {testResult.details.apiUrl}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                }
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
