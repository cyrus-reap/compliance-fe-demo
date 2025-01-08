"use client";

import Link from "next/link";
import { Button, Card, Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-12">
        <Title level={1} className="mb-4">
          KYC Verification System
        </Title>
        <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
          This application is built for the purpose of demoing Reap's Compliance
          API. Simplify compliance and KYC checks with our seamless solution.
          Explore features, manage entities, or start your KYC verification
          journey today.
        </Paragraph>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <Link href="/kyc">
          <Button type="primary" size="large" className="shadow-sm">
            Start KYC Verification
          </Button>
        </Link>
        <Link href="/kyc/features">
          <Button size="large" className="shadow-sm">
            View Features
          </Button>
        </Link>
        <Link href="/kyc/entities">
          <Button size="large" className="shadow-sm">
            View Entities
          </Button>
        </Link>
      </div>

      <Card
        className="mt-16 shadow-lg max-w-5xl w-full"
        bordered={false}
        style={{ background: "#fff", borderRadius: "8px" }}
      >
        <Title level={2}>Reap Requirements API Overview</Title>
        <Paragraph>
          The Reap Compliance API streamlines Know Your Customer (KYC)
          verification, offering a seamless way for card issuers to conduct
          compliance checks on retail users.
        </Paragraph>

        <div className="mb-8">
          <Title level={3} className="text-lg">
            Required Information for Retail Card Issuance:
          </Title>
          <ul className="list-disc list-inside text-gray-700 pl-4">
            <li>Photo ID (Required)</li>
            <li>PEP / Sanction Screening (Required)</li>
            <li>Proof of Residential Address (Required)</li>
            <li>Phone Number (Optional)</li>
          </ul>
        </div>

        <div>
          <Title level={3} className="text-lg">
            Steps to Complete KYC:
          </Title>
          <ol className="list-decimal list-inside text-gray-700 pl-4 space-y-2">
            <li>
              <strong>API Key Generation:</strong> Obtain an API key to access
              Reap's KYC service.
            </li>
            <li>
              <strong>Access Requirements:</strong> Use the{" "}
              <code className="bg-gray-100 px-1 rounded">
                Get Feature Requirements API
              </code>{" "}
              to fetch requirements for retail users.
            </li>
            <li>
              <strong>Create Entity:</strong> Create an entity of type{" "}
              <code className="bg-gray-100 px-1 rounded">INDIVIDUAL</code>{" "}
              representing the user.
            </li>
            <li>
              <strong>Submit Information:</strong> Submit user details like
              Photo ID, PEP/Sanction Screening, and Proof of Residential
              Address.
            </li>
            <li>
              <strong>Review:</strong> Verify submitted information and ensure
              all fields are marked as{" "}
              <code className="bg-gray-100 px-1 rounded">APPROVED</code>.
            </li>
            <li>
              <strong>Qualification:</strong> Once all checks are completed, the
              individual is considered "qualified."
            </li>
          </ol>
        </div>
        <Divider />
        <Paragraph className="text-gray-600 text-center">
          For detailed documentation and API integration guides, visit{" "}
          <a
            href="https://reap-ra.readme.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            reap-ra.readme.io
          </a>
          .
        </Paragraph>
      </Card>

      <footer className="mt-12 text-gray-500 text-sm text-center">
        Reap Compliance API Demo ©2025
      </footer>
    </div>
  );
}
