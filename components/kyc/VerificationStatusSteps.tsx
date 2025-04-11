import React, { useMemo } from "react";
import { Steps, Typography } from "antd";
import {
  LoadingOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";

const { Title, Text } = Typography;

export enum VerificationStep {
  ENTITY_CREATION = 0,
  TOKEN_PREPARATION = 1,
  DOCUMENT_VERIFICATION = 2,
  COMPLETE = 3,
}

interface VerificationStatusStepsProps {
  currentStep: VerificationStep;
  isCreatingEntity: boolean;
  isGettingToken: boolean;
}

export default function VerificationStatusSteps({
  currentStep,
  isCreatingEntity,
  isGettingToken,
}: VerificationStatusStepsProps) {
  const stepsConfig = useMemo(
    () => [
      {
        title: "Entity Creation",
        description: "Creating your profile",
        status:
          currentStep > 0
            ? "finish"
            : isCreatingEntity
            ? "process"
            : ("wait" as "finish" | "process" | "wait"),
        icon: isCreatingEntity ? <LoadingOutlined /> : <FileAddOutlined />,
      },
      {
        title: "Prepare Verification",
        description: "Setting up verification",
        status:
          currentStep > 1
            ? "finish"
            : currentStep === 1
            ? "process"
            : ("wait" as "finish" | "process" | "wait"),
        icon:
          currentStep === 1 && isGettingToken ? (
            <LoadingOutlined />
          ) : (
            <IdcardOutlined />
          ),
      },
      {
        title: "Document Verification",
        description: "Upload your documents",
        status:
          currentStep > 2
            ? "finish"
            : currentStep === 2
            ? "process"
            : ("wait" as "finish" | "process" | "wait"),
        icon: <IdcardOutlined />,
      },
      {
        title: "Complete",
        description: "Verification submitted",
        status: currentStep === 3 ? "finish" : ("wait" as "finish" | "wait"),
        icon: <CheckCircleOutlined />,
      },
    ],
    [currentStep, isCreatingEntity, isGettingToken]
  );

  return (
    <div className="relative bg-gradient-to-r from-violet-50 to-blue-50 p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div>
          <Title level={2} className="m-0 flex items-center gap-2">
            <IdcardOutlined
              className="text-xl"
              style={{ color: token.color.lightViolet[700] }}
            />
            Identity Verification
          </Title>
          <Text className="text-gray-500">
            Complete verification to access all platform features
          </Text>
        </div>
      </div>

      <Steps
        current={currentStep}
        className="custom-steps"
        items={stepsConfig}
      />
    </div>
  );
}
