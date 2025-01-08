"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useLayout } from "@/app/layoutContext";

export default function StartKYCPage() {
  const router = useRouter();
  const { setOptions } = useLayout();

  useEffect(() => {
    setOptions({
      title: "Start KYC",
      showBackButton: true,
    });

    return () => {
      setOptions({
        title: "",
        showBackButton: true,
      });
    };
  }, [setOptions]);

  const handleSelection = (type: "entity" | "entity-member") => {
    router.push(`/kyc/${type}`);
  };

  return (
    <div className="flex flex-row gap-5 items-center justify-center min-h-screen">
      <Button
        type="primary"
        size="large"
        onClick={() => handleSelection("entity")}
      >
        Entity
      </Button>
      <Button
        type="default"
        size="large"
        onClick={() => handleSelection("entity-member")}
      >
        Entity Member
      </Button>
    </div>
  );
}
