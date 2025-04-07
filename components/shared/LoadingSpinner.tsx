import { Spin, Typography } from "antd";

const { Text } = Typography;

interface LoadingSpinnerProps {
  tip?: string;
  fullHeight?: boolean;
}

export default function LoadingSpinner({
  tip = "Loading...",
  fullHeight = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullHeight ? "min-h-[80vh]" : "min-h-[200px]"
      }`}
    >
      <Spin size="large" />
      {tip && <Text className="mt-4 text-gray-500">{tip}</Text>}
    </div>
  );
}
