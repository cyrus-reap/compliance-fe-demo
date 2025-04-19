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

// Store the last 20 notifications
let notifications: {
  id: string;
  message: string;
  createdAt: number;
}[] = [];

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let message: string;
  if (payload && payload.message) {
    message = payload.message;
  } else if (payload && typeof payload === "object") {
    // Try to extract a message from known fields
    message =
      payload.message ||
      payload.eventName ||
      payload.eventType ||
      "Notification received";
  } else {
    return NextResponse.json(
      { error: "Invalid notification payload" },
      { status: 400 }
    );
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
