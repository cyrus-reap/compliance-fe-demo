import { Card, Tabs, Row, Col, Divider } from "antd";
import { SafetyOutlined, ApiOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import ApiOverviewHeader from "./ApiOverviewHeader";
import ApiRequirements from "./ApiRequirements";
import ApiSteps from "./ApiSteps";
import ApiFeatures from "./ApiFeatures";

interface CarouselItem {
  title: string;
  description: string;
}

interface ApiOverviewProps {
  carouselContent: CarouselItem[];
}

export default function ApiOverview({ carouselContent }: ApiOverviewProps) {
  const tabItems = [
    {
      key: "1",
      label: (
        <span
          className="px-2 py-1"
          style={{ fontWeight: 500, color: token.color.grey[700] }}
        >
          <SafetyOutlined className="mr-2" />
          Requirements
        </span>
      ),
      children: (
        <div className="py-6">
          <Row gutter={[48, 48]} className="items-stretch">
            <Col xs={24} lg={11}>
              <ApiRequirements />
            </Col>
            <Col xs={24} lg={2} className="hidden lg:flex justify-center">
              <Divider
                type="vertical"
                style={{
                  height: "100%",
                  borderColor: token.color.grey[300],
                }}
              />
            </Col>
            <Col xs={24} lg={11}>
              <ApiSteps carouselContent={carouselContent} />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span
          className="px-2 py-1"
          style={{ fontWeight: 500, color: token.color.grey[700] }}
        >
          <ApiOutlined className="mr-2" />
          API Features
        </span>
      ),
      children: (
        <div className="py-6">
          <ApiFeatures />
        </div>
      ),
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <ApiOverviewHeader />
        <Card
          className="shadow-sm rounded-lg border border-gray-200"
          bordered={false}
          style={{
            background: token.color.white,
          }}
        >
          <Tabs
            defaultActiveKey="1"
            type="line"
            className="api-overview-tabs"
            items={tabItems}
          />
        </Card>
        <div className="mt-12 text-center">
          <p
            style={{
              color: token.color.grey[700],
              fontSize: token.font.size.base,
            }}
          >
            For detailed documentation and integration guides, visit{" "}
            <a
              href="https://reap-ra.readme.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline transition-all"
            >
              reap-ra.readme.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
