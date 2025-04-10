import { useRouter, usePathname } from "next/navigation";
import { token } from "@/app/theme";
import { LayoutOptions } from "@/app/layoutContext";
import { useState, useEffect } from "react";

// Import our new components
import Logo from "./header/Logo";
import BackButton from "./header/BackButton";
import DesktopNav from "./header/DesktopNav";
import MobileNav from "./header/MobileNav";
import FeatureTag from "./header/FeatureTag";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState("");

  // Handle scroll effect with proper cleanup to prevent memory leaks
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Call once to set initial state
    handleScroll();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Set active navigation key based on pathname
  useEffect(() => {
    const matchedItem = navigationItems.find(
      (item) =>
        pathname.includes(item.key) || (item.key === "home" && pathname === "/")
    );
    if (matchedItem) {
      setActiveKey(matchedItem.key);
    } else {
      setActiveKey(pathname);
    }
  }, [pathname, navigationItems]);

  return (
    <header
      className={`flex items-center sticky top-0 z-10 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-3"
      }`}
      style={{
        background: `linear-gradient(90deg, ${token.color.darkViolet} 0%, ${token.color.darkPurple} 100%)`,
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          {options.showBackButton && (
            <BackButton onClick={() => router.back()} />
          )}
          <Logo title={options.title} />
        </div>

        <div className="flex items-center gap-3">
          <DesktopNav items={navigationItems} activeKey={activeKey} />
          <MobileNav items={navigationItems} activeKey={activeKey} />
        </div>
      </div>

      <FeatureTag text={options.featuredTag || ""} />
    </header>
  );
}
