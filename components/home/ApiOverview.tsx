import { Card, Typography, Divider, Row, Col, Badge, Carousel } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

interface CarouselItem {
  title: string;
  description: string;
}

interface ApiOverviewProps {
  carouselContent: CarouselItem[];
}

export default function ApiOverview({ carouselContent }: ApiOverviewProps) {
  const requiredItems = [
    "Photo ID",
    "PEP / Sanction Screening",
    "Proof of Residential Address",
    "Phone Number (Optional)",
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <Card
          className="shadow-lg"
          bordered={false}
          style={{ borderRadius: "12px" }}
        >
          <Title level={2} className="mb-6 pb-4 border-b">
            Reap Requirements API Overview
          </Title>
          <Paragraph className="text-lg mb-6">
            The Reap Compliance API streamlines Know Your Customer (KYC)
            verification, offering a seamless way for card issuers to conduct
            compliance checks on retail users.
          </Paragraph>

          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="mb-8">
                <Title level={3} className="text-lg flex items-center">
                  <Badge color="red" />
                  <span className="ml-2">
                    Required Information for Retail Card Issuance:
                  </span>
                </Title>
                <ul className="mt-4">
                  {requiredItems.map((item, i) => (
                    <li key={i} className="mb-3 flex items-start">
                      <CheckCircleFilled className="mr-2 mt-1 text-green-500" />
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="mb-8">
                <Title level={3} className="text-lg flex items-center">
                  <Badge color="blue" />
                  <span className="ml-2">Steps to Complete KYC:</span>
                </Title>
                <Carousel
                  autoplay
                  arrows
                  draggable
                  className="rounded-lg overflow-hidden shadow-md mt-4 bg-white"
                >
                  {carouselContent.map((step, index) => (
                    <div key={index} className="p-6">
                      <Title level={4} className="mb-2">
                        {`${index + 1}. ${step.title}`}
                      </Title>
                      <Paragraph>{step.description}</Paragraph>
                    </div>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>

          <Divider />
          <Paragraph className="text-gray-600 text-center">
            For detailed documentation and API integration guides, visit{" "}
            <a
              href="https://reap-ra.readme.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline transition-all"
            >
              reap-ra.readme.io
            </a>
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}
