import { Badge, Typography } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

export default function ApiOverviewHeader() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4"
      >
        <Badge
          count={
            <ApiOutlined
              style={{
                color: token.color.lightBlue[700],
                fontSize: 32,
                verticalAlign: "middle",
              }}
            />
          }
          style={{
            backgroundColor: "none",
            boxShadow: "none",
            marginRight: 8,
          }}
        >
          <Title
            level={2}
            className="inline-block"
            style={{
              fontWeight: 800,
              color: token.color.darkViolet,
              marginBottom: 0,
            }}
          >
            Reap Requirements API
          </Title>
        </Badge>
        <Paragraph
          className="max-w-2xl mx-auto mt-2"
          style={{
            color: token.color.grey[700],
            fontSize: token.font.size.lg,
          }}
        >
          <span style={{ color: token.color.lightBlue[700], fontWeight: 600 }}>
            Seamless KYC and Compliance
          </span>{" "}
          for modern businesses. Integrate, verify, and stay compliant with
          ease.
        </Paragraph>
      </motion.div>
    </>
  );
}
