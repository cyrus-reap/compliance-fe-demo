import Link from "next/link";
import { Card, Typography, Row, Col } from "antd";
import { FileTextOutlined, ApiOutlined, TeamOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

const { Title, Paragraph } = Typography;

interface QuickLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  bgColorClass: string;
  borderColor: string;
}

function QuickLink({
  title,
  description,
  icon,
  href,
  bgColorClass,
  borderColor,
}: QuickLinkProps) {
  return (
    <Link href={href}>
      <Card
        hoverable
        className="h-full shadow-md transition-all hover:shadow-lg border-t-4"
        style={{ borderTopColor: borderColor }}
      >
        <div className="text-center mb-4">
          <div
            className="inline-flex p-4 rounded-full mb-4"
            style={{ backgroundColor: bgColorClass }}
          >
            {icon}
          </div>
          <Title level={3}>{title}</Title>
        </div>
        <Paragraph style={{ color: token.color.grey[600] }}>
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
        "Begin the KYC process by creating a new entity and submitting required documentation",
      icon: (
        <FileTextOutlined
          className="text-3xl"
          style={{ color: token.color.darkViolet }}
        />
      ),
      href: "/kyc/entity",
      bgColorClass: token.color.lightViolet[200],
      borderColor: token.color.darkViolet,
    },
    {
      title: "View Features",
      description:
        "Explore available API features and understand requirements for different verification types",
      icon: (
        <ApiOutlined
          className="text-3xl"
          style={{ color: token.color.lightBlue[700] }}
        />
      ),
      href: "/kyc/features",
      bgColorClass: token.color.lightBlue[200],
      borderColor: token.color.lightBlue[700],
    },
    {
      title: "View Entities",
      description:
        "Browse and manage all entities that have been created through the verification process",
      icon: (
        <TeamOutlined
          className="text-3xl"
          style={{ color: token.color.green[700] }}
        />
      ),
      href: "/kyc/entities",
      bgColorClass: token.color.green[200],
      borderColor: token.color.green[600],
    },
  ];

  return (
    <div className="py-16 container mx-auto px-6 max-w-6xl">
      <Title level={2} className="text-center mb-12">
        Quick Links
      </Title>

      <Row gutter={[24, 24]} className="mb-12">
        {links.map((link, index) => (
          <Col xs={24} md={8} key={index}>
            <QuickLink {...link} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
