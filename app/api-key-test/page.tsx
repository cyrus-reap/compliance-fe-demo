/**
 * API Key Testing Page
 *
 * A dedicated page for testing and demonstrating the custom API key functionality.
 * This page allows users to test different scenarios and see how the system
 * handles API key management.
 */

"use client";

import React from "react";
import { Row, Col, Space, Typography, Divider } from "antd";
import { useLayout } from "@/app/layoutContext";
import { useEffect } from "react";
import PageHeader from "@/components/shared/PageHeader";
import ApiKeyManager from "@/components/shared/ApiKeyManager";
import ApiKeyDemo from "@/components/shared/ApiKeyDemo";
import { KeyOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Title, Paragraph } = Typography;

export default function ApiKeyTestPage() {
  const { setOptions } = useLayout();

  useEffect(() => {
    setOptions({
      title: "API Key Testing",
      showBackButton: true,
      featuredTag: "Custom API Key Feature Demo",
    });
  }, [setOptions]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="API Key Management Testing"
          icon={
            <KeyOutlined
              style={{ color: token.color.lightBlue[700], fontSize: "0.9em" }}
            />
          }
          tooltip="Test and demonstrate the custom API key functionality"
        />

        <Space direction="vertical" size="large" className="w-full">
          {/* Introduction */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Title level={3}>Custom API Key Feature</Title>
            <Paragraph className="text-gray-600 text-lg">
              This page demonstrates the custom API key functionality that
              allows users to optionally override the system default API key
              with their own for testing and development purposes.
            </Paragraph>

            <Paragraph className="text-gray-600">
              <strong>Key Features:</strong>
            </Paragraph>
            <ul className="text-gray-600 mb-4">
              <li>
                <strong>Session-only storage:</strong> API keys are never
                persisted beyond the browser session
              </li>
              <li>
                <strong>Security warnings:</strong> Detects and warns about
                production-grade API keys
              </li>
              <li>
                <strong>Automatic fallback:</strong> Falls back to system API
                key when custom key is disabled
              </li>
              <li>
                <strong>Real-time validation:</strong> Validates API keys and
                provides immediate feedback
              </li>
              <li>
                <strong>Secure handling:</strong> Keys are redacted in logs and
                development tools
              </li>
            </ul>
          </div>

          <Divider />

          {/* API Key Management Demo */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <ApiKeyManager compact={false} />
            </Col>
            <Col xs={24} lg={12}>
              <ApiKeyDemo />
            </Col>
          </Row>

          <Divider />

          {/* Usage Instructions */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <Title level={4} className="text-blue-800">
              How to Test
            </Title>
            <Space direction="vertical" size="small" className="w-full">
              <Paragraph className="text-blue-700 mb-2">
                <strong>1. Toggle Custom API Key:</strong> Use the switch to
                enable custom API key mode
              </Paragraph>
              <Paragraph className="text-blue-700 mb-2">
                <strong>2. Enter Test Key:</strong> Input a development/test API
                key (avoid production keys)
              </Paragraph>
              <Paragraph className="text-blue-700 mb-2">
                <strong>3. Test Functionality:</strong> Use the demo component
                to test API connectivity
              </Paragraph>
              <Paragraph className="text-blue-700 mb-2">
                <strong>4. Check Status:</strong> Monitor the current
                configuration in the security info
              </Paragraph>
              <Paragraph className="text-blue-700 mb-0">
                <strong>5. Clear When Done:</strong> Remove the custom key when
                finished testing
              </Paragraph>
            </Space>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <Title level={4} className="text-yellow-800">
              🔒 Security Notice
            </Title>
            <Space direction="vertical" size="small" className="w-full">
              <Paragraph className="text-yellow-700 mb-2">
                <strong>Never use production API keys</strong> in this testing
                interface. The system includes detection for common production
                key patterns and will warn you if it detects one.
              </Paragraph>
              <Paragraph className="text-yellow-700 mb-2">
                <strong>Session-only storage:</strong> Your custom API key is
                only stored in memory for the current browser session and will
                be cleared when you close the browser or refresh the page.
              </Paragraph>
              <Paragraph className="text-yellow-700 mb-0">
                <strong>Development use only:</strong> This feature is intended
                for development and testing purposes. In production, rely on
                properly configured environment variables.
              </Paragraph>
            </Space>
          </div>
        </Space>
      </div>
    </div>
  );
}
