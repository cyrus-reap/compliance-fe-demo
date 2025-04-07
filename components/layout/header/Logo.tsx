import Image from "next/image";
import Link from "next/link";
import { Typography } from "antd";
import { token } from "@/app/theme";

const { Title } = Typography;

interface LogoProps {
  title?: string;
}

export default function Logo({ title }: LogoProps) {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative h-9 w-24 mr-1">
        <Image
          src="/logo-words.png"
          alt="Reap Logo"
          fill
          priority
          sizes="96px"
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

      {title && (
        <>
          <div className="hidden md:block h-6 w-[1px] bg-white/20 mx-3"></div>
          <Title
            level={5}
            className="m-0 hidden md:block"
            style={{
              color: token.color.white,
            }}
          >
            {title}
          </Title>
        </>
      )}
    </Link>
  );
}
