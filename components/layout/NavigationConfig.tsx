import { useRouter } from "next/navigation";
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ApiOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export function useNavigationItems() {
  const router = useRouter();

  return [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => router.push("/"),
    },
    {
      key: "entity",
      icon: <UserOutlined />,
      label: "New Verification",
      onClick: () => router.push("/kyc/entity"),
    },
    {
      key: "entities",
      icon: <TeamOutlined />,
      label: "View Entities",
      onClick: () => router.push("/kyc/entities"),
    },
    {
      key: "features",
      icon: <ApiOutlined />,
      label: "Features",
      onClick: () => router.push("/kyc/features"),
    },
    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: "Documentation",
      onClick: () => window.open("https://reap-ra.readme.io", "_blank"),
    },
  ];
}
