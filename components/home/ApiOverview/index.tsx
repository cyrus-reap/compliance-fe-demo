import { Card, Tabs, Row, Col, Divider } from "antd";
import { SafetyOutlined, ApiOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import ApiOverviewHeader from "./ApiOverviewHeader";
import ApiRequirements from "./ApiRequirements";
import ApiSteps from "./ApiSteps";
import ApiFeatures from "./ApiFeatures";

const { TabPane } = Tabs;

interface CarouselItem {
  title: string;
  description: string;
}

interface ApiOverviewProps {
  carouselContent: CarouselItem[];
}

export default function ApiOverview({ carouselContent }: ApiOverviewProps) {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full"
          style={{ background: token.color.purple[200], filter: "blur(48px)" }}
        ></div>
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: token.color.lightBlue[200],
            filter: "blur(64px)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <ApiOverviewHeader />
        <Card
          className="shadow-xl rounded-2xl overflow-hidden border-0"
          bordered={false}
          style={{
            background: token.color.white,
            boxShadow: `0 8px 32px 0 ${token.color.lightViolet[900]}11`,
            borderRadius: token.border.radius["2xl"],
          }}
        >
          <Tabs defaultActiveKey="1" type="card" className="api-overview-tabs">
            <TabPane
              tab={
                <span className="px-2 py-1" style={{ fontWeight: 600 }}>
                  <SafetyOutlined className="mr-2" />
                  Requirements
                </span>
              }
              key="1"
            >
              <Row gutter={[48, 48]} className="items-stretch">
                <Col xs={24} lg={11}>
                  <ApiRequirements />
                </Col>
                <Col xs={24} lg={2} className="hidden lg:flex justify-center">
                  <Divider
                    type="vertical"
                    style={{
                      height: "100%",
                      borderColor: token.color.lightViolet[600],
                      opacity: 0.3,
                    }}
                  />
                </Col>
                <Col xs={24} lg={11}>
                  <ApiSteps carouselContent={carouselContent} />
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span className="px-2 py-1" style={{ fontWeight: 600 }}>
                  <ApiOutlined className="mr-2" />
                  API Features
                </span>
              }
              key="2"
            >
              <ApiFeatures />
            </TabPane>
          </Tabs>
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
