import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">KYC Verification</h1>
      <p>Follow the steps to complete your KYC verification.</p>
      <Link
        className="px-4 py-2 bg-blue-500 text-white rounded"
        href="/identity"
      >
        Start KYC
      </Link>
    </div>
  );
}
