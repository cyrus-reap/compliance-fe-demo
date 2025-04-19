import { Space, Badge, Button, Avatar } from "antd";
import {
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { token } from "@/app/theme";
import NavItem from "./NavItem";

interface NavigationItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface DesktopNavProps {
  items: NavigationItem[];
  activeKey: string;
  notificationCount?: number;
}

export default function DesktopNav({
  items,
  activeKey,
  notificationCount = 0,
}: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center">
      <nav className="flex mr-3">
        {items.slice(0, 4).map((item) => {
          const isActive =
            item.key === activeKey ||
            (item.key === "home" && activeKey === "/");

          return (
            <NavItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              onClick={item.onClick}
              showLabel={item.key !== "home"}
            />
          );
        })}
      </nav>

      <Space size="small">
        <Badge count={notificationCount} size="small">
          <Button
            type="text"
            shape="circle"
            icon={<BellOutlined />}
            style={{
              color: token.color.white,
            }}
            className="hover:opacity-80 transition-opacity"
          />
        </Badge>

        <Button
          type="text"
          shape="circle"
          icon={<QuestionCircleOutlined />}
          style={{
            color: token.color.white,
          }}
          className="hover:opacity-80 transition-opacity"
          onClick={() => window.open("https://reap-ra.readme.io", "_blank")}
        />
      </Space>
    </div>
  );
}
