import Link from "next/link";
import Image from "next/image";
import { Button, Typography, Row, Col, Space, Badge } from "antd";
import { RightCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Title, Paragraph, Text } = Typography;

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={14}>
            <Badge.Ribbon text="Demo" color="red">
              <Paragraph className="mb-6 text-white text-5xl">
                KYC Verification System
              </Paragraph>
            </Badge.Ribbon>
            <Paragraph className="text-lg text-gray-100 mb-8">
              Simplify compliance and KYC checks with Reap's seamless API
              solution. This demo showcases how easily you can integrate
              identity verification into your applications.
            </Paragraph>
            <Space size="middle">
              <Link href="/kyc/entity">
                <Button
                  type="primary"
                  size="large"
                  icon={<RightCircleOutlined />}
                  className="shadow-lg"
                  style={{
                    backgroundColor: token.color.darkViolet,
                    borderColor: token.color.darkViolet,
                  }}
                >
                  Start KYC Verification
                </Button>
              </Link>
              <Link href="/kyc/features">
                <Button
                  size="large"
                  ghost
                  className="border-white text-white hover:text-white"
                >
                  Explore Features
                </Button>
              </Link>
            </Space>
          </Col>
          <Col xs={24} md={10} className="flex justify-center">
            <div className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-xl border border-white border-opacity-20">
              <div className="relative w-full h-[240px]">
                <Image
                  src="/kyc-illustration.svg"
                  alt="KYC Illustration"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "contain" }}
                  onError={(e) => {
                    const imgElement = e.currentTarget as HTMLImageElement;
                    imgElement.style.display = "none";

                    const nextElement =
                      imgElement.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = "block";
                    }
                  }}
                />
                <div style={{ display: "none" }} className="p-12 text-center">
                  <FileTextOutlined className="text-6xl mb-4" />
                  <Text className="text-white text-lg">
                    Secure Identity Verification
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
