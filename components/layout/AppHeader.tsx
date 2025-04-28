import { useRouter, usePathname } from "next/navigation";
import { token } from "@/app/theme";
import { LayoutOptions } from "@/app/layoutContext";
import { useState, useEffect } from "react";
import Logo from "./header/Logo";
import BackButton from "./header/BackButton";
import DesktopNav from "./header/DesktopNav";
import MobileNav from "./header/MobileNav";
import FeatureTag from "./header/FeatureTag";
import { notification, App as AntdApp } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Amplify } from "aws-amplify";
import { events } from "aws-amplify/data";

interface AppHeaderProps {
  options: LayoutOptions;
  navigationItems: {
    key: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];
}

Amplify.configure({
  API: {
    Events: {
      endpoint: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string,
      region: "ap-southeast-1",
      defaultAuthMode: "apiKey",
      apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY, // For the sake of demo only
    },
  },
});

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
    // Subscribe to AppSync events using the correct connect/subscribe API
    let channel: any;
    let subscription: { unsubscribe: () => void } | undefined;

    (async () => {
      channel = await events.connect("/default/notifications");
      subscription = channel.subscribe({
        next: (data: any) => {
          // data.value should contain your notification payload
          const payload = data.event;

          if (payload && payload.message && payload.createdAt) {
            setNotifications((prev) =>
              [
                { message: payload.message, createdAt: payload.createdAt },
                ...prev,
              ].slice(0, 20)
            );
            api.open({
              message: "Notification",
              description: payload.message,
              icon: <BellOutlined style={{ color: "#faad14", fontSize: 18 }} />,
              duration: null, // Don't auto close
              placement: "topRight",
            });
          }
        },
        error: (err: any) => {
          // console.error("AppSync subscription error", err);
        },
      });
    })();

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [api, navigationItems, pathname]);

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

export async function getServerSideProps() {
  // Fetch data from an external API
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
