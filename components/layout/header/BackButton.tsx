import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        type="text"
        onClick={onClick}
        icon={<ArrowLeftOutlined />}
        style={{
          color: token.color.white,
          fontSize: "16px",
        }}
        className="flex items-center hover:opacity-80 transition-opacity"
      >
        Back
      </Button>
    </motion.div>
  );
}
