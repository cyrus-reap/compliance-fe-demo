import { Card, Typography, Row, Col, Badge, Carousel, Tabs, Steps } from "antd";
import {
  CheckCircleFilled,
  ApiOutlined,
  SafetyOutlined,
  FileSearchOutlined,
  SolutionOutlined,
  AuditOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

interface CarouselItem {
  title: string;
  description: string;
}

interface ApiOverviewProps {
  carouselContent: CarouselItem[];
}

export default function ApiOverview({ carouselContent }: ApiOverviewProps) {
  const requiredItems = [
    {
      title: "Photo ID",
      description: "Government-issued identification for primary verification",
    },
    {
      title: "PEP / Sanction Screening",
      description:
        "Checks against politically exposed persons and sanction lists",
    },
    {
      title: "Proof of Residential Address",
      description:
        "Recent utility bill or bank statement as address confirmation",
    },
    {
      title: "Phone Number (Optional)",
      description: "For multi-factor authentication and communication",
    },
  ];

  const apiFeatures = [
    {
      title: "Document Verification",
      description:
        "Verify government IDs, passports, and other identity documents",
      icon: (
        <FileSearchOutlined
          style={{ fontSize: 24, color: token.color.lightBlue[700] }}
        />
      ),
    },
    {
      title: "Sanction Screening",
      description: "Check against global watchlists and sanction databases",
      icon: (
        <SafetyOutlined
          style={{ fontSize: 24, color: token.color.green[700] }}
        />
      ),
    },
    {
      title: "Address Verification",
      description:
        "Confirm residential address through submitted documentation",
      icon: (
        <SolutionOutlined
          style={{ fontSize: 24, color: token.color.orange[600] }}
        />
      ),
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-400 filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-300 filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge count={<ApiOutlined style={{ color: "#1890ff" }} />}>
            <Title level={2} className="inline-block">
              Reap Requirements API
            </Title>
          </Badge>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Our comprehensive KYC API streamlines identity verification,
            offering a seamless way for businesses to conduct compliance checks
            quickly and accurately.
          </Paragraph>
        </motion.div>

        <Card
          className="shadow-xl rounded-2xl overflow-hidden border-0"
          bordered={false}
        >
          <Tabs
            defaultActiveKey="1"
            type="card"
            className="api-overview-tabs"
            tabBarStyle={{ marginBottom: 24 }}
          >
            <TabPane
              tab={
                <span className="px-2 py-1">
                  <SafetyOutlined className="mr-2" />
                  Requirements
                </span>
              }
              key="1"
            >
              <Row gutter={[32, 32]} className="items-stretch">
                <Col xs={24} lg={10}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-blue-50 p-6 rounded-xl h-full border border-blue-100">
                      <Title
                        level={3}
                        className="text-xl flex items-center mb-6"
                      >
                        <Badge color={token.color.lightBlue[700]} />
                        <span className="ml-2">
                          Required Information for Retail Card Issuance
                        </span>
                      </Title>

                      <div className="space-y-4">
                        {requiredItems.map((item, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={fadeInUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-4 rounded-lg shadow-sm flex items-start"
                          >
                            <div className="mr-3 mt-1">
                              <CheckCircleFilled className="text-green-500 text-lg" />
                            </div>
                            <div>
                              <Text strong className="block mb-1">
                                {item.title}
                              </Text>
                              <Text type="secondary" className="text-sm">
                                {item.description}
                              </Text>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Col>

                <Col xs={24} lg={14}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-indigo-50 p-6 rounded-xl h-full border border-indigo-100">
                      <Title
                        level={3}
                        className="text-xl flex items-center mb-6"
                      >
                        <Badge color={token.color.darkViolet} />
                        <span className="ml-2">Steps to Complete KYC</span>
                      </Title>

                      <Steps
                        direction="vertical"
                        current={-1}
                        className="custom-steps-vertical"
                      >
                        {carouselContent.map((step, index) => (
                          <Step
                            key={index}
                            title={
                              <Text strong className="text-base">
                                {step.title}
                              </Text>
                            }
                            description={
                              <Paragraph className="text-gray-600 ml-0">
                                {step.description}
                              </Paragraph>
                            }
                            icon={
                              index === 0 ? (
                                <ApiOutlined />
                              ) : index === 1 ? (
                                <FileSearchOutlined />
                              ) : index === 2 ? (
                                <SolutionOutlined />
                              ) : index === 3 ? (
                                <SafetyOutlined />
                              ) : index === 4 ? (
                                <AuditOutlined />
                              ) : (
                                <FileDoneOutlined />
                              )
                            }
                          />
                        ))}
                      </Steps>
                    </div>
                  </motion.div>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span className="px-2 py-1">
                  <ApiOutlined className="mr-2" />
                  API Features
                </span>
              }
              key="2"
            >
              <Row gutter={[24, 24]}>
                {apiFeatures.map((feature, index) => (
                  <Col xs={24} md={8} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="h-full" bordered hoverable>
                        <div className="text-center mb-4">
                          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-blue-50 mb-3">
                            {feature.icon}
                          </div>
                          <Title level={4} className="text-lg">
                            {feature.title}
                          </Title>
                        </div>
                        <Paragraph className="text-gray-600 text-center">
                          {feature.description}
                        </Paragraph>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap">
                  <Text className="text-gray-600">
                    <strong>Data Protection:</strong> All data transmitted
                    through our API is encrypted using industry-standard TLS
                  </Text>
                  <a
                    href="https://reap-ra.readme.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 sm:mt-0 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View API Documentation →
                  </a>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Card>

        <div className="mt-10 text-center">
          <Paragraph className="text-gray-600">
            For detailed documentation and integration guides, visit{" "}
            <a
              href="https://reap-ra.readme.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline transition-all"
            >
              reap-ra.readme.io
            </a>
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
