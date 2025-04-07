import { Button, Typography, Dropdown, Menu } from "antd";
import Image from "next/image";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { token } from "@/app/theme";
import { LayoutOptions } from "@/app/layoutContext";

const { Title } = Typography;

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

  const mobileMenu = <Menu items={navigationItems} />;

  return (
    <header
      className="flex items-center px-6 shadow-md sticky top-0 z-10"
      style={{
        background: `linear-gradient(90deg, ${token.color.darkViolet} 0%, ${token.color.darkPurple} 100%)`,
        padding: "0 16px",
      }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {options.showBackButton && (
            <Button
              type="text"
              onClick={() => router.back()}
              icon={<ArrowLeftOutlined />}
              style={{
                color: token.color.white,
                fontSize: "16px",
                margin: "0 16px 0 0",
              }}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              Back
            </Button>
          )}

          <Link href="/" className="hidden md:flex items-center">
            <div className="relative h-8 w-20 mr-3">
              <Image
                src="/logo-words.png"
                alt="Reap Logo"
                fill
                priority
                sizes="80px"
                style={{ objectFit: "contain" }}
                onError={(e) => {
                  const imgElement = e.currentTarget as HTMLImageElement;
                  imgElement.style.display = "none";

                  const parentElement = imgElement.parentElement as HTMLElement;
                  const nextElement =
                    parentElement?.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = "block";
                  }
                }}
              />
            </div>
            <div
              style={{ display: "none" }}
              className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md"
            >
              REAP
            </div>
          </Link>
        </div>

        {options.title && (
          <Title
            level={5}
            className="m-0 hidden md:block"
            style={{
              color: token.color.white,
            }}
          >
            {options.title}
          </Title>
        )}

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {navigationItems.slice(0, 4).map((item) => (
              <Button
                key={item.key}
                type="text"
                onClick={item.onClick}
                icon={item.icon}
                style={{
                  color: pathname.includes(item.key)
                    ? token.color.yellow[600]
                    : token.color.white,
                }}
                className="hover:opacity-80 transition-opacity"
              >
                {item.key === "home" ? "" : item.label}
              </Button>
            ))}
            <Button
              type="text"
              icon={<QuestionCircleOutlined />}
              style={{
                color: token.color.white,
              }}
              className="hover:opacity-80 transition-opacity"
              onClick={() => window.open("https://reap-ra.readme.io", "_blank")}
            />
          </div>

          <div className="md:hidden">
            <Dropdown
              overlay={mobileMenu}
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
        </div>
      </div>
    </header>
  );
}
