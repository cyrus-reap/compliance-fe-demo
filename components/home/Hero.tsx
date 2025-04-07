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
    "Fast verification process",
    "Compliant with regulations",
    "Secure data handling",
  ];

  return (
    <div
      className="text-white py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(to right, ${token.color.darkViolet}, ${token.color.darkPurple})`,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
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
              <Badge.Ribbon text="Demo" color={token.color.red[600]}>
                <div className="mb-8">
                  <Text
                    className="font-semibold mb-2 block"
                    style={{ color: token.color.lightBlue[200] }}
                  >
                    REAP COMPLIANCE API
                  </Text>
                  <h1 className="text-white text-5xl font-bold mb-4 leading-tight">
                    KYC Verification <br />
                    <span style={{ color: token.color.lightBlue[200] }}>
                      Made Simple
                    </span>
                  </h1>
                  <Paragraph
                    className="text-lg mb-6 max-w-xl"
                    style={{ color: token.color.grey[300] }}
                  >
                    Streamline compliance and KYC checks with our seamless API
                    solution. Integrate identity verification workflows in
                    minutes, not days.
                  </Paragraph>

                  <Space direction="vertical" className="w-full mb-8">
                    {keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="flex items-center"
                      >
                        <CheckCircleOutlined
                          className="mr-2"
                          style={{ color: token.color.green[400] }}
                        />
                        <Text style={{ color: token.color.grey[300] }}>
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
                        backgroundColor: token.color.lightViolet[700],
                        borderColor: token.color.lightViolet[700],
                        height: "48px",
                        padding: "0 24px",
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
                      className="border-2 border-white text-white hover:text-white h-[48px] shadow-lg p-[0 24px]"
                    >
                      Explore Features
                    </Button>
                  </motion.div>
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
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(to top right, rgba(${parseInt(
                      token.color.lightViolet[600].slice(1, 3),
                      16
                    )}, ${parseInt(
                      token.color.lightViolet[600].slice(3, 5),
                      16
                    )}, ${parseInt(
                      token.color.lightViolet[600].slice(5, 7),
                      16
                    )}, 0.2), rgba(${parseInt(
                      token.color.lightBlue[600].slice(1, 3),
                      16
                    )}, ${parseInt(
                      token.color.lightBlue[600].slice(3, 5),
                      16
                    )}, ${parseInt(
                      token.color.lightBlue[600].slice(5, 7),
                      16
                    )}, 0.2))`,
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
                      style={{ backgroundColor: token.color.grey[800] }}
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
                    <div
                      style={{ display: "none" }}
                      className="p-12 text-center"
                    >
                      <FileTextOutlined className="text-6xl mb-4" />
                      <Text className="text-white text-lg">
                        Secure Identity Verification
                      </Text>
                    </div>
                  </div>

                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: `1px solid rgba(255, 255, 255, 0.2)` }}
                  >
                    <Text
                      className="text-sm block mb-1"
                      style={{ color: token.color.lightBlue[200] }}
                    >
                      Ready to implement:
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="text-xs text-white px-2 py-1 rounded"
                        style={{
                          backgroundColor: token.color.lightViolet[800],
                        }}
                      >
                        Document Verification
                      </span>
                      <span
                        className="text-xs text-white px-2 py-1 rounded"
                        style={{ backgroundColor: token.color.darkViolet }}
                      >
                        Biometric Auth
                      </span>
                      <span
                        className="text-xs text-white px-2 py-1 rounded"
                        style={{ backgroundColor: token.color.lightBlue[800] }}
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
