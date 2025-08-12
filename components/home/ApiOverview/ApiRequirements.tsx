import { Typography, Badge } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

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

export default function ApiRequirements() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full">
        <Title
          level={3}
          className="mb-6"
          style={{
            fontSize: token.font.size.xl,
            color: token.color.grey[800],
            fontWeight: 600,
          }}
        >
          Required Information
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
              className="border border-gray-200 p-4 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <CheckCircleFilled
                    style={{
                      color: token.color.green[600],
                      fontSize: 16,
                    }}
                  />
                </div>
                <div>
                  <Text
                    strong
                    className="block mb-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    type="secondary"
                    className="text-sm"
                    style={{ color: token.color.grey[600], fontSize: "0.8rem" }}
                  >
                    {item.description}
                  </Text>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
