import { Button, Dropdown, Space } from "antd";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { token } from "@/app/theme";
import ApiKeyManager from "@/components/shared/ApiKeyManager";
import { useApiKey } from "@/contexts/ApiKeyContext";

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
  const { config } = useApiKey();

  const mobileMenuItems = {
    items: [
      ...items.map((item) => ({
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
      {
        type: "divider" as const,
      },
      {
        key: "api-key-manager",
        icon: <SettingOutlined />,
        label: (
          <span>
            API Settings{" "}
            <span
              className={`text-xs font-semibold ${
                config.useCustomKey ? "text-green-600" : "text-gray-500"
              }`}
            >
              ({config.useCustomKey ? "Custom" : "System"})
            </span>
          </span>
        ),
        onClick: () => {
          // Dispatch event to open API key manager
          window.dispatchEvent(new CustomEvent("openApiKeyManager"));
        },
      },
    ],
  };

  return (
    <div className="md:hidden">
      <Space size="small">
        {/* API Key Manager for mobile - hidden but provides modal functionality */}
        <div style={{ display: "none" }}>
          <ApiKeyManager compact />
        </div>

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
      </Space>
    </div>
  );
}
