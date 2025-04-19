import Link from "next/link";
import { Card, Typography, Row, Col } from "antd";
import { FileTextOutlined, ApiOutlined, TeamOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Title, Paragraph, Text } = Typography;

interface QuickLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  bgColor: string;
  borderColor: string;
}

function QuickLink({
  title,
  description,
  icon,
  href,
  bgColor,
  borderColor,
}: QuickLinkProps) {
  return (
    <Link href={href}>
      <Card
        hoverable
        className="h-full transition-all"
        style={{
          borderTop: `4px solid ${borderColor}`,
          borderRadius: token.border.radius.xl,
          boxShadow: `0 4px 24px 0 ${borderColor}22`,
          background: token.color.white,
          minHeight: 320,
        }}
        bodyStyle={{ padding: "32px 24px" }}
      >
        <div className="text-center mb-4">
          <div
            className="inline-flex items-center justify-center mb-4"
            style={{
              backgroundColor: bgColor,
              borderRadius: token.border.radius.full,
              width: 72,
              height: 72,
              boxShadow: `0 2px 8px 0 ${borderColor}22`,
            }}
          >
            {icon}
          </div>
          <Title level={4} style={{ marginBottom: 0, fontWeight: 700 }}>
            {title}
          </Title>
        </div>
        <Paragraph
          style={{
            color: token.color.grey[700],
            fontSize: token.font.size.base,
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          {description}
        </Paragraph>
      </Card>
    </Link>
  );
}

export default function QuickLinks() {
  const links = [
    {
      title: "Start Verification",
      description:
        "Begin the KYC process by creating a new entity and submitting required documentation.",
      icon: (
        <FileTextOutlined
          style={{
            color: token.color.darkViolet,
            fontSize: 36,
          }}
        />
      ),
      href: "/kyc/entity",
      bgColor: token.color.lightViolet[200],
      borderColor: token.color.darkViolet,
    },
    {
      title: "View Features",
      description:
        "Explore API features, modular architecture, and compliance enhancements.",
      icon: (
        <ApiOutlined
          style={{
            color: token.color.lightBlue[700],
            fontSize: 36,
          }}
        />
      ),
      href: "/kyc/features",
      bgColor: token.color.lightBlue[200],
      borderColor: token.color.lightBlue[700],
    },
    {
      title: "View Entities",
      description:
        "Browse and manage all entities created through the verification process.",
      icon: (
        <TeamOutlined
          style={{
            color: token.color.green[700],
            fontSize: 36,
          }}
        />
      ),
      href: "/kyc/entities",
      bgColor: token.color.green[200],
      borderColor: token.color.green[600],
    },
    {
      title: "KYC Architecture",
      description:
        "See the evolution, technical flow, and modular proposal for Reap's KYC service.",
      icon: (
        <ApiOutlined
          style={{
            color: token.color.pink[600],
            fontSize: 36,
          }}
        />
      ),
      href: "https://www.notion.so/KYC-Evolution-at-Reap-New-SumSub-Integration-1d77e193475080b28e3ac04555fd7b2e?pvs=21",
      bgColor: token.color.purple[200],
      borderColor: token.color.pink[600],
    },
  ];

  return (
    <div
      className="py-20"
      style={{
        background: `linear-gradient(90deg, ${token.color.lightViolet[100]} 0%, ${token.color.lightBlue[200]} 100%)`,
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <Title level={2} style={{ fontWeight: 800, marginBottom: 8 }}>
            Quick Links
          </Title>
          <Text
            style={{
              color: token.color.grey[600],
              fontSize: token.font.size.lg,
            }}
          >
            Jump right in to start verification, explore features, or learn
            about our KYC architecture.
          </Text>
        </div>
        <Row gutter={[32, 32]} className="mb-12">
          {links.map((link, index) => (
            <Col xs={24} md={8} lg={6} key={index}>
              <QuickLink {...link} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
