import { Button } from "antd";
import { token } from "@/app/theme";
import { motion } from "framer-motion";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  showLabel?: boolean;
}

export default function NavItem({
  icon,
  label,
  isActive,
  onClick,
  showLabel = true,
}: NavItemProps) {
  return (
    <div className="relative mx-1">
      <Button
        type="text"
        onClick={onClick}
        icon={icon}
        style={{
          color: isActive ? token.color.green[200] : token.color.white,
        }}
        className="hover:opacity-80 transition-opacity px-3"
      >
        {showLabel ? label : ""}
      </Button>

      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[3px] rounded-t"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          style={{ backgroundColor: token.color.green[200] }}
        />
      )}
    </div>
  );
}
