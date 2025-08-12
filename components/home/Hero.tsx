import Link from "next/link";
import Image from "next/image";
import { Button, Typography, Row, Col, Space, Badge, Card } from "antd";
import {
  RightCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

const { Paragraph, Text } = Typography;

export default function Hero() {
  const keyFeatures = [
    "Fast, automated verification (2-4 min)",
    "SumSub SDK for Web & Mobile",
    "Global compliance & watchlist screening",
    "Modular, scalable architecture",
    "Webhook & SNS for real-time updates",
  ];

  return (
    <div
      className="py-24 relative"
      style={{
        backgroundColor: token.color.darkViolet,
        color: token.color.white,
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl relative">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={14}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <Text
                  className="font-medium mb-3 block tracking-wide"
                  style={{
                    color: token.color.lightBlue[200],
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  REAP COMPLIANCE API
                </Text>
                <h1
                  className="font-bold mb-4 leading-tight"
                  style={{
                    color: token.color.white,
                    fontSize: "48px",
                    lineHeight: "1.1",
                  }}
                >
                  KYC Verification Platform
                </h1>
                <Paragraph
                  className="mb-6 max-w-xl"
                  style={{
                    color: token.color.grey[300],
                    fontSize: "18px",
                    lineHeight: "1.6",
                  }}
                >
                  Automated, global, and developer-friendly KYC solution powered
                  by SumSub. Fast verification with modular architecture and
                  real-time updates.
                </Paragraph>

                <Space
                  direction="vertical"
                  className="w-full mb-8"
                  size="small"
                >
                  {keyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.1,
                      }}
                      className="flex items-center"
                    >
                      <CheckCircleOutlined
                        className="mr-3"
                        style={{
                          color: token.color.green[400],
                          fontSize: "16px",
                        }}
                      />
                      <Text
                        style={{
                          color: token.color.grey[300],
                          fontSize: "16px",
                        }}
                      >
                        {feature}
                      </Text>
                    </motion.div>
                  ))}
                </Space>
              </div>

              <Space size="middle" className="mt-8">
                <Link href="/kyc/entity">
                  <Button
                    type="primary"
                    size="large"
                    icon={<RightCircleOutlined />}
                    style={{
                      backgroundColor: token.color.lightViolet[700],
                      borderColor: token.color.lightViolet[700],
                      height: "48px",
                      padding: "0 28px",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    Start Verification
                  </Button>
                </Link>
                <Link href="/api-key-test">
                  <Button
                    type="default"
                    size="large"
                    icon={<FileTextOutlined />}
                    style={{
                      backgroundColor: "transparent",
                      borderColor: token.color.grey[300],
                      color: token.color.grey[300],
                      height: "48px",
                      padding: "0 28px",
                      fontWeight: 500,
                      fontSize: "16px",
                    }}
                  >
                    Test API
                  </Button>
                </Link>
              </Space>
            </motion.div>
          </Col>

          <Col xs={24} md={10} className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <Card
                className="w-full rounded-xl shadow-2xl overflow-hidden"
                styles={{
                  body: {
                    padding: 20,
                  },
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  backdropFilter: "blur(8px)",
                  border: `2px solid ${token.color.lightViolet[700]}`,
                  borderRadius: token.border.radius.xl,
                  boxShadow: `0 8px 32px 0 ${token.color.lightViolet[900]}33`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(135deg, ${token.color.lightViolet[600]}22 0%, ${token.color.lightBlue[600]}22 100%)`,
                  }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: token.color.red[600] }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: token.color.yellow[600] }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: token.color.green[600] }}
                      ></div>
                    </div>
                    <div
                      className="text-xs text-white px-2 py-1 rounded"
                      style={{
                        backgroundColor: token.color.grey[800],
                        fontWeight: 600,
                        letterSpacing: token.font.tracking.tight,
                      }}
                    >
                      API Demo
                    </div>
                  </div>

                  <div className="relative w-full h-[240px]">
                    <Image
                      src="/logo-words.png"
                      alt="KYC Illustration"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <div
                    className="mt-4 pt-4"
                    style={{
                      borderTop: `1px solid ${token.color.lightViolet[800]}44`,
                    }}
                  >
                    <Text
                      className="text-sm block mb-1"
                      style={{
                        color: token.color.lightBlue[200],
                        fontWeight: 600,
                        fontSize: token.font.size.sm,
                      }}
                    >
                      Ready to implement:
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="text-xs text-white px-2 py-1 rounded"
                        style={{
                          backgroundColor: token.color.lightViolet[800],
                          fontWeight: 600,
                        }}
                      >
                        Document Verification
                      </span>
                      <span
                        className="text-xs text-white px-2 py-1 rounded"
                        style={{
                          backgroundColor: token.color.darkViolet,
                          fontWeight: 600,
                        }}
                      >
                        Biometric Auth
                      </span>
                      <span
                        className="text-xs text-white px-2 py-1 rounded"
                        style={{
                          backgroundColor: token.color.lightBlue[800],
                          fontWeight: 600,
                        }}
                      >
                        AML Screening
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
