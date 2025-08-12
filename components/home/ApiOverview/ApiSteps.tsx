import React from "react";
import { Typography, Badge, Steps } from "antd";
import {
  ApiOutlined,
  FileSearchOutlined,
  LinkOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

interface CarouselItem {
  title: string;
  description: string;
}

interface ApiStepsProps {
  carouselContent: CarouselItem[];
}

const integrationSteps = [
  {
    title: "Integrate Sumsub SDK",
    description: "Add Sumsub's verification SDK to your application frontend.",
    icon: <ApiOutlined />,
  },
  {
    title: "Create Entity",
    description:
      "Call the Create Entity API to register a user/entity in Reap.",
    icon: <FileSearchOutlined />,
  },
  {
    title: "Generate SDK Token",
    description:
      "Use the Generate SDK Token API to obtain a Sumsub token for the entity.",
    icon: <LinkOutlined />,
  },
  {
    title: "Launch Verification Flow",
    description:
      "Pass the token to Sumsub SDK and start the verification process in your app.",
    icon: <SafetyOutlined />,
  },
  {
    title: "Integrate Compliance Webhook",
    description:
      "Set up Reap's webhook to receive verification status updates and check if the user has passed.",
    icon: <CheckCircleOutlined />,
  },
];

export default function ApiSteps({ carouselContent }: ApiStepsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full">
        <Title
          level={3}
          className="mb-6"
          style={{
            fontSize: token.font.size.xl,
            color: token.color.grey[800],
            fontWeight: 600,
          }}
        >
          Integration Steps
        </Title>
        <div className="space-y-4">
          {integrationSteps.map((step, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start">
                <div
                  className="mr-3 mt-1 flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: token.color.lightViolet[100] }}
                >
                  <span
                    style={{
                      color: token.color.lightViolet[700],
                      fontSize: 16,
                    }}
                  >
                    {step.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <Text
                    strong
                    className="block mb-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ color: token.color.grey[600], fontSize: "0.8rem" }}
                  >
                    {step.description}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
