import { NextRequest, NextResponse } from "next/server";
import { Amplify } from "aws-amplify";
import { events } from "aws-amplify/data";

// Configure Amplify for AppSync (only once)
if (!(global as any)._amplifyConfigured) {
  Amplify.configure({
    API: {
      Events: {
        endpoint:
          "https://l2tjsnx3kjg63euedtbqjj6szm.appsync-api.ap-southeast-1.amazonaws.com/event",
        region: "ap-southeast-1",
        defaultAuthMode: "apiKey",
        apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY,
      },
    },
  });
  (global as any)._amplifyConfigured = true;
}

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

  // Send to AppSync event endpoint
  try {
    await events.post("/default/notifications", {
      message: notification.message,
      createdAt: notification.createdAt,
    });
  } catch (err) {
    // Ignore if AppSync is not available
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(notifications);
}
