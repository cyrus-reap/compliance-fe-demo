import { useRouter, usePathname } from "next/navigation";
import { token } from "@/app/theme";
import { LayoutOptions } from "@/app/layoutContext";
import { useState, useEffect, useRef } from "react";
import Logo from "./header/Logo";
import BackButton from "./header/BackButton";
import DesktopNav from "./header/DesktopNav";
import MobileNav from "./header/MobileNav";
import FeatureTag from "./header/FeatureTag";
import { io, Socket } from "socket.io-client";
import { notification, App as AntdApp } from "antd";
import { BellOutlined } from "@ant-design/icons";

interface AppHeaderProps {
  options: LayoutOptions;
  navigationItems: {
    key: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];
}

export default function AppHeader({
  options,
  navigationItems,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState("");
  const [notifications, setNotifications] = useState<
    { message: string; createdAt: number }[]
  >([]);
  const socketRef = useRef<Socket | null>(null);

  // Use AntdApp's notification context holder
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const matchedItem = navigationItems.find(
      (item: any) =>
        (pathname && pathname.includes(item.key)) ||
        (item.key === "home" && pathname === "/")
    );
    if (matchedItem) {
      setActiveKey(matchedItem.key);
    } else if (typeof pathname === "string") {
      setActiveKey(pathname);
    } else {
      setActiveKey("");
    }
  }, [pathname, navigationItems]);

  useEffect(() => {
    fetch("/api/socket").then(() => {
      // Connect to the default socket.io endpoint ("/socket.io")
      const socket = io(); // No path option needed unless you customized it
      socketRef.current = socket;

      socket.on(
        "notification",
        (data: { message: string; createdAt: number }) => {
          setNotifications((prev) =>
            [
              { message: data.message, createdAt: data.createdAt },
              ...prev,
            ].slice(0, 20)
          );

          api.open({
            message: "Notification",
            description: data.message,
            icon: <BellOutlined style={{ color: "#faad14", fontSize: 18 }} />,
            duration: 3,
            placement: "topRight",
          });
        }
      );

      return () => {
        socket.disconnect();
      };
    });
  }, [api]);

  return (
    <AntdApp>
      {contextHolder}
      <header
        className="sticky top-0 z-20"
        style={{
          background: `linear-gradient(90deg, ${token.color.darkViolet} 0%, ${token.color.darkPurple} 100%)`,
          boxShadow: "0 2px 8px 0 rgba(60,42,89,0.06)",
          borderBottom: `1px solid ${token.color.lightViolet[200]}`,
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {options.showBackButton && (
              <BackButton onClick={() => router.back()} />
            )}
            <Logo title={options.title} />
          </div>
          <nav className="flex items-center gap-2">
            <DesktopNav
              items={navigationItems}
              activeKey={activeKey}
              notificationCount={notifications.length}
            />
            <MobileNav items={navigationItems} activeKey={activeKey} />
          </nav>
        </div>
        {options.featuredTag && (
          <div
            className="w-full text-center py-1"
            style={{
              background: token.color.lightViolet[100],
              color: token.color.darkViolet,
              fontWeight: 600,
              fontSize: token.font.size.sm,
              letterSpacing: 0.2,
            }}
          >
            <FeatureTag text={options.featuredTag} />
          </div>
        )}
      </header>
    </AntdApp>
  );
}
