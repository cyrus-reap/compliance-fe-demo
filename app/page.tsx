"use client";

import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";
import ApiOverview from "@/components/home/ApiOverview";
import PageFooter from "@/components/home/PageFooter";

export default function Home() {
  const carouselContent = [
    {
      title: "API Key Generation",
      description: "Obtain an API key to access Reap's KYC service.",
    },
    {
      title: "Access Requirements",
      description: `Use the "Get Feature Requirements API" to fetch requirements for retail users.`,
    },
    {
      title: "Create Entity",
      description: `Create an entity of type "INDIVIDUAL" representing the user.`,
    },
    {
      title: "Submit Information",
      description:
        "Submit user details like Photo ID, PEP/Sanction Screening, and Proof of Residential Address.",
    },
    {
      title: "Review",
      description:
        'Verify submitted information and ensure all fields are marked as "APPROVED".',
    },
    {
      title: "Qualification",
      description:
        'Once all checks are completed, the individual is considered "qualified."',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Hero />
      <QuickLinks />
      <ApiOverview carouselContent={carouselContent} />
      <PageFooter />
    </div>
  );
}
