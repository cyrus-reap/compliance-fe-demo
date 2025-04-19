import { NextRequest, NextResponse } from "next/server";
import { Amplify } from "aws-amplify";
import { events } from "aws-amplify/data";

Amplify.configure({
  API: {
    Events: {
      endpoint: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string,
      region: "ap-southeast-1",
      defaultAuthMode: "apiKey",
      apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY,
    },
  },
});

let notifications: { id: string; message: string; createdAt: number }[] = [];

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }
  const notification = {
    id: Math.random().toString(36).slice(2),
    message,
    createdAt: Date.now(),
  };
  notifications.unshift(notification);
  notifications = notifications.slice(0, 20);

  try {
    await events.post("/default/notifications", {
      message: notification.message,
      createdAt: notification.createdAt,
    });
  } catch (err) {
    // Ignore if ws-server.js is not available (e.g., in serverless/prod)
    console.error("Error posting notification to AppSync:", err);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(notifications);
}
