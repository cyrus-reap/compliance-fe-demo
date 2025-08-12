import { Card, Typography, Row, Col } from "antd";
import {
  FileSearchOutlined,
  SafetyOutlined,
  SolutionOutlined,
  ApiOutlined,
  LinkOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

const apiFeatures = [
  {
    title: "Integrate Sumsub SDK",
    description:
      "Add Sumsub's verification SDK to your application frontend for a seamless user experience.",
    icon: (
      <ApiOutlined
        style={{ fontSize: 32, color: token.color.lightBlue[700] }}
      />
    ),
  },
  {
    title: "Create Entity",
    description:
      "Register a user/entity in Reap by calling the Create Entity API before verification.",
    icon: (
      <FileSearchOutlined
        style={{ fontSize: 32, color: token.color.darkViolet }}
      />
    ),
  },
  {
    title: "Generate SDK Token",
    description:
      "Use the Generate SDK Token API to obtain a Sumsub token for the entity.",
    icon: (
      <LinkOutlined style={{ fontSize: 32, color: token.color.green[700] }} />
    ),
  },
  {
    title: "Launch Verification Flow",
    description:
      "Pass the token to Sumsub SDK and start the verification process in your app.",
    icon: (
      <SafetyOutlined
        style={{ fontSize: 32, color: token.color.orange[600] }}
      />
    ),
  },
  {
    title: "Compliance Webhook",
    description:
      "Set up Reap's webhook to receive real-time verification status updates and check if the user has passed.",
    icon: (
      <CheckCircleOutlined
        style={{ fontSize: 32, color: token.color.lightBlue[700] }}
      />
    ),
  },
];

const integrationSteps = [
  "Integrate Sumsub SDK into your application.",
  "Create the entity via the Create Entity API.",
  "Generate a Sumsub SDK token using the Generate SDK Token API.",
  "Use the token to launch the Sumsub verification flow.",
  "Integrate Reap's compliance webhook to receive verification status updates.",
];

export default function ApiFeatures() {
  return (
    <>
      <Row gutter={[32, 32]}>
        {apiFeatures.map((feature, index) => (
          <Col xs={24} md={8} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className="h-full"
                bordered
                hoverable
                style={{
                  borderRadius: token.border.radius.xl,
                  boxShadow: `0 2px 12px 0 ${token.color.lightBlue[700]}11`,
                  border: `1px solid ${token.color.lightBlue[700]}22`,
                  background: token.color.white,
                  transition: "box-shadow 0.2s",
                }}
                styles={{ body: { padding: "32px 24px" } }}
              >
                <div className="text-center mb-4">
                  <div
                    className="inline-flex justify-center items-center w-16 h-16 rounded-full mb-3"
                    style={{
                      background: token.color.lightBlue[200],
                    }}
                  >
                    {feature.icon}
                  </div>
                  <Title
                    level={4}
                    className="text-lg"
                    style={{
                      color: token.color.darkViolet,
                      fontWeight: 700,
                    }}
                  >
                    {feature.title}
                  </Title>
                </div>
                <Paragraph
                  className="text-center"
                  style={{
                    color: token.color.grey[700],
                    fontSize: token.font.size.base,
                  }}
                >
                  {feature.description}
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </>
  );
}
