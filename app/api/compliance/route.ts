import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

/**
 * Secure API proxy to prevent client-side API key exposure
 * All compliance API calls should go through this endpoint
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");
    const apiKey = searchParams.get("apiKey"); // User's optional API key

    if (!endpoint) {
      return NextResponse.json(
        { error: "Missing endpoint parameter" },
        { status: 400 }
      );
    }

    // Validate endpoint is from allowed domains
    const allowedDomains = [process.env.NEXT_PUBLIC_COMPLIANCE_API_URL];

    const isValidEndpoint = allowedDomains.some((domain) =>
      endpoint.startsWith(domain || "")
    );

    if (!isValidEndpoint) {
      return NextResponse.json({ error: "Invalid endpoint" }, { status: 403 });
    }

    const response = await axios.get(endpoint, {
      headers: {
        accept: "application/json",
        "x-reap-api-key": apiKey || (process.env.COMPLIANCE_API_KEY as string),
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.message || "API request failed" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, data, apiKey } = body;

    if (!endpoint || !data) {
      return NextResponse.json(
        { error: "Missing endpoint or data" },
        { status: 400 }
      );
    }

    // Validate endpoint is from allowed domains
    const allowedDomains = [process.env.NEXT_PUBLIC_COMPLIANCE_API_URL];

    const isValidEndpoint = allowedDomains.some((domain) =>
      endpoint.startsWith(domain || "")
    );

    if (!isValidEndpoint) {
      return NextResponse.json({ error: "Invalid endpoint" }, { status: 403 });
    }

    const response = await axios.post(endpoint, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-reap-api-key": apiKey || (process.env.COMPLIANCE_API_KEY as string),
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.message || "API request failed" },
      { status: error.response?.status || 500 }
    );
  }
}
