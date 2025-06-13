/**
 * API Key Manager Component
 *
 * Provides UI controls for users to optionally use their own API key:
 * - Toggle switch to enable/disable custom API key
 * - Secure input field for API key entry
 * - Validation feedback and security warnings
 * - Session-only storage (no persistence)
 */

"use client";

import React, { useState, useCallback } from "react";
import {
  Switch,
  Input,
  Alert,
  Tooltip,
  Space,
  Typography,
  Card,
  Button,
  Modal,
} from "antd";
import {
  KeyOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SettingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { token } from "@/app/theme";

const { Text } = Typography;
const { Password } = Input;

interface ApiKeyManagerProps {
  compact?: boolean; // For header display vs full settings page
  className?: string;
}

export default function ApiKeyManager({
  compact = true,
  className = "",
}: ApiKeyManagerProps) {
  const { config, setUseCustomKey, setCustomKey, clearCustomKey, validateKey } =
    useApiKey();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempKey, setTempKey] = useState(config.customKey || "");
  const [validation, setValidation] = useState<{
    isValid: boolean;
    warning?: string;
  }>({ isValid: config.isValid });

  // Handle toggle switch change
  const handleToggleChange = useCallback(
    (checked: boolean) => {
      if (!checked) {
        // Disabling custom key - clear everything
        clearCustomKey();
        setTempKey("");
        setValidation({ isValid: true });
      } else {
        // Enabling custom key - show modal for input
        setIsModalVisible(true);
      }
    },
    [clearCustomKey]
  );

  // Handle API key input change with validation
  const handleKeyChange = useCallback(
    (value: string) => {
      setTempKey(value);
      if (value.trim()) {
        const result = validateKey(value);
        setValidation(result);
      } else {
        setValidation({ isValid: false });
      }
    },
    [validateKey]
  );

  // Save the API key
  const handleSaveKey = useCallback(() => {
    if (validation.isValid && tempKey.trim()) {
      setCustomKey(tempKey);
      setUseCustomKey(true);
      setIsModalVisible(false);
    }
  }, [tempKey, validation.isValid, setCustomKey, setUseCustomKey]);

  // Cancel modal
  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setTempKey(config.customKey || "");
    setValidation({ isValid: config.isValid });
  }, [config.customKey, config.isValid]);

  // Remove custom key
  const handleRemoveKey = useCallback(() => {
    clearCustomKey();
    setTempKey("");
    setValidation({ isValid: true });
    setIsModalVisible(false);
  }, [clearCustomKey]);

  // Compact view for header
  if (compact) {
    return (
      <div className={className}>
        <Tooltip title="Manage API Key Settings">
          <Button
            type="text"
            shape="circle"
            icon={<SettingOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{
              color: config.useCustomKey
                ? token.color.green[600]
                : token.color.grey[600],
            }}
            className="hover:opacity-80 transition-opacity"
          />
        </Tooltip>

        {/* API Key Configuration Modal */}
        <Modal
          title={
            <Space>
              <KeyOutlined />
              <span>API Key Configuration</span>
            </Space>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            config.useCustomKey && (
              <Button key="remove" danger onClick={handleRemoveKey}>
                Remove Custom Key
              </Button>
            ),
            <Button
              key="save"
              type="primary"
              onClick={handleSaveKey}
              disabled={!validation.isValid || !tempKey.trim()}
            >
              {config.useCustomKey ? "Update Key" : "Set Custom Key"}
            </Button>,
          ]}
          width={600}
        >
          <Space direction="vertical" size="large" className="w-full">
            {/* Toggle Switch */}
            <Card size="small" className="bg-gray-50">
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <Text strong>Use Custom API Key</Text>
                    <br />
                    <Text type="secondary" className="text-sm">
                      Override the default system API key with your own
                    </Text>
                  </div>
                  <Switch
                    checked={config.useCustomKey}
                    onChange={handleToggleChange}
                    checkedChildren="Custom"
                    unCheckedChildren="System"
                  />
                </div>
              </Space>
            </Card>

            {/* API Key Input (shown when toggle is enabled or being configured) */}
            {(config.useCustomKey || isModalVisible) && (
              <Space direction="vertical" size="middle" className="w-full">
                <div>
                  <Text strong>API Key</Text>
                  <Password
                    value={tempKey}
                    onChange={(e) => handleKeyChange(e.target.value)}
                    placeholder="Enter your API key (e.g., sk_test_...)"
                    className="mt-2"
                    status={
                      tempKey && !validation.isValid ? "error" : undefined
                    }
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>

                {/* Validation Messages */}
                {tempKey && !validation.isValid && (
                  <Alert
                    message="Invalid API Key"
                    description="Please enter a valid API key (minimum 10 characters)"
                    type="error"
                    showIcon
                  />
                )}

                {validation.warning && (
                  <Alert
                    message="Security Warning"
                    description={validation.warning}
                    type="warning"
                    showIcon
                    icon={<WarningOutlined />}
                  />
                )}

                {/* Security Notice */}
                <Alert
                  message="Security Notice"
                  description={
                    <ul className="mb-0 pl-4">
                      <li>
                        Your API key is only stored for this browser session
                      </li>
                      <li>The key is never logged or saved permanently</li>
                      <li>
                        Use development/test keys only - never production keys
                      </li>
                      <li>Clear the key when finished testing</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Space>
            )}

            {/* Current Status */}
            <Card size="small" className="border-l-4 border-l-blue-500">
              <Text strong className="text-blue-600">
                Current Status:{" "}
                {config.useCustomKey ? (
                  <span className="text-green-600">Using Custom API Key</span>
                ) : (
                  <span className="text-gray-600">Using System API Key</span>
                )}
              </Text>
            </Card>
          </Space>
        </Modal>
      </div>
    );
  }

  // Full view for settings page (if needed later)
  return (
    <Card title="API Key Configuration" className={className}>
      <Space direction="vertical" size="large" className="w-full">
        {/* Implementation for full settings page would go here */}
        <Text>
          Full API key management interface would be implemented here.
        </Text>
      </Space>
    </Card>
  );
}
