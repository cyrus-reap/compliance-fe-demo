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
  if (
    payload &&
    payload.eventName &&
    payload.entityUuid &&
    payload.eventType &&
    payload.channel
  ) {
    message = `[${payload.eventType}] Entity ${payload.entityUuid}: ${
      payload.eventName
    }${
      payload.details && payload.details.status
        ? ` (Status: ${payload.details.status})`
        : ""
    }`;
    if (payload.details && payload.details.slug) {
      message += ` [${payload.details.slug}]`;
    }
    if (payload.message) {
      message += ` - ${payload.message}`;
    }
  } else if (payload && payload.message) {
    message = payload.message;
  } else if (payload && typeof payload === "object") {
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
