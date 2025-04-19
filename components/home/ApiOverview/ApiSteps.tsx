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
      <div
        className="p-8 rounded-2xl h-full"
        style={{
          background: token.color.lightViolet[100],
          border: `1px solid ${token.color.lightViolet[600]}22`,
          minHeight: 380,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title
          level={3}
          className="flex items-center mb-6"
          style={{
            fontSize: token.font.size.xl,
            color: token.color.darkViolet,
          }}
        >
          <Badge color={token.color.darkViolet} />
          <span className="ml-2">Integration Steps</span>
        </Title>
        <Steps
          direction="vertical"
          current={-1}
          className="custom-steps-vertical"
          style={{
            color: token.color.darkViolet,
          }}
        >
          {integrationSteps.map((step, index) => (
            <Step
              key={index}
              title={
                <Text strong className="text-base">
                  {step.title}
                </Text>
              }
              description={
                <Paragraph
                  className="ml-0"
                  style={{
                    color: token.color.grey[700],
                    fontSize: token.font.size.base,
                  }}
                >
                  {step.description}
                </Paragraph>
              }
              icon={step.icon}
            />
          ))}
        </Steps>
      </div>
    </motion.div>
  );
}
