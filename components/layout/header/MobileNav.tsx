import { Button, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";

interface NavigationItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface MobileNavProps {
  items: NavigationItem[];
  activeKey: string;
}

export default function MobileNav({ items, activeKey }: MobileNavProps) {
  const mobileMenuItems = {
    items: items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      onClick: item.onClick,
      style: {
        backgroundColor:
          item.key === activeKey || (item.key === "home" && activeKey === "/")
            ? token.color.lightViolet[200]
            : "transparent",
      },
    })),
  };

  return (
    <div className="md:hidden">
      <Dropdown
        menu={mobileMenuItems}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<MenuOutlined />}
          style={{
            color: token.color.white,
            fontSize: "18px",
          }}
        />
      </Dropdown>
    </div>
  );
}
