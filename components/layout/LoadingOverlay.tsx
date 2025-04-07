import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
      <DotLottieReact
        src="/kyc-loader.lottie"
        loop
        autoplay
        style={{ width: "200px" }}
      />
    </div>
  );
}
