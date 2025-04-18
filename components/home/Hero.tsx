import Link from "next/link";
import Image from "next/image";
import { Button, Typography, Row, Col, Space, Badge, Card } from "antd";
import {
  RightCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
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
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(90deg, ${token.color.darkViolet} 0%, ${token.color.darkPurple} 100%)`,
        color: token.color.white,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-64 h-64 rounded-full filter blur-3xl"
          style={{ backgroundColor: token.color.purple[200] }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl"
          style={{ backgroundColor: token.color.lightBlue[200] }}
        ></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={14}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge.Ribbon
                text="SumSub Integration"
                color={token.color.green[600]}
                style={{
                  fontSize: token.font.size.sm,
                  fontWeight: 600,
                  background: token.color.green[600],
                }}
              >
                <div className="mb-8">
                  <Text
                    className="font-semibold mb-2 block"
                    style={{
                      color: token.color.lightBlue[200],
                      fontSize: token.font.size.sm,
                      letterSpacing: token.font.tracking.tight,
                    }}
                  >
                    REAP COMPLIANCE API
                  </Text>
                  <h1
                    className="font-bold mb-2 leading-tight"
                    style={{
                      color: token.color.white,
                      fontSize: token.font.size["4xl"],
                      lineHeight: token.font.leading[10],
                    }}
                  >
                    KYC Verification at Reap
                  </h1>
                  <Paragraph
                    className="mb-2 max-w-xl"
                    style={{
                      color: token.color.lightBlue[200],
                      fontSize: token.font.size.lg,
                      fontWeight: 600,
                    }}
                  >
                    Now powered by{" "}
                    <span style={{ color: token.color.green[400] }}>
                      SumSub
                    </span>{" "}
                    for faster, more robust, and scalable compliance.
                  </Paragraph>
                  <Paragraph
                    className="mb-6 max-w-xl"
                    style={{
                      color: token.color.grey[300],
                      fontSize: token.font.size.lg,
                      lineHeight: token.font.leading[7],
                    }}
                  >
                    Experience the next generation of KYC: automated, global,
                    and developer-friendly. Modular architecture, webhook
                    support, and real-time updates for seamless integration.
                  </Paragraph>

                  <Space direction="vertical" className="w-full mb-8">
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
                          className="mr-2"
                          style={{
                            color: token.color.green[400],
                            fontSize: token.font.size.lg,
                          }}
                        />
                        <Text
                          style={{
                            color: token.color.grey[300],
                            fontSize: token.font.size.base,
                          }}
                        >
                          {feature}
                        </Text>
                      </motion.div>
                    ))}
                  </Space>
                </div>
              </Badge.Ribbon>

              <Space size="middle" className="mt-6">
                <Link href="/kyc/entity">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      icon={<RightCircleOutlined />}
                      className="shadow-lg"
                      style={{
                        background: `linear-gradient(90deg, ${token.color.lightViolet[700]}, ${token.color.lightBlue[700]})`,
                        borderColor: token.color.lightViolet[700],
                        height: "48px",
                        padding: "0 28px",
                        fontWeight: 700,
                        fontSize: token.font.size.lg,
                        letterSpacing: token.font.tracking.tight,
                        boxShadow: `0 4px 24px 0 ${token.color.lightViolet[800]}33`,
                      }}
                    >
                      Start KYC Verification
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/kyc/features">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="large"
                      ghost
                      className="border-2 text-white hover:text-white h-[48px] shadow-lg"
                      style={{
                        borderColor: token.color.white,
                        color: token.color.white,
                        fontWeight: 600,
                        fontSize: token.font.size.lg,
                        padding: "0 24px",
                        background: "transparent",
                      }}
                    >
                      Explore Features
                    </Button>
                  </motion.div>
                </Link>
                <a
                  href="https://www.notion.so/KYC-Evolution-at-Reap-New-SumSub-Integration-1d77e193475080b28e3ac04555fd7b2e?pvs=21"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="large"
                    icon={<InfoCircleOutlined />}
                    style={{
                      background: token.color.lightBlue[200],
                      color: token.color.darkViolet,
                      fontWeight: 600,
                      fontSize: token.font.size.lg,
                      padding: "0 24px",
                      border: "none",
                    }}
                  >
                    Learn More
                  </Button>
                </a>
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
