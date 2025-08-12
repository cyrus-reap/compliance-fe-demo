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

  // Input validation and sanitization
  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { error: "Invalid payload format" },
      { status: 400 }
    );
  }

  // Sanitize string inputs to prevent XSS
  const sanitizeString = (str: string): string => {
    if (typeof str !== "string") return "";
    return str.replace(/[<>\"'&]/g, ""); // Basic XSS prevention
  };

  let message: string;
  if (
    payload &&
    payload.eventName &&
    payload.entityUuid &&
    payload.eventType &&
    payload.channel
  ) {
    // Validate UUID format for entityUuid
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(payload.entityUuid)) {
      return NextResponse.json(
        { error: "Invalid entity UUID format" },
        { status: 400 }
      );
    }

    message = `[${sanitizeString(payload.eventType)}] Entity ${sanitizeString(
      payload.entityUuid
    )}: ${sanitizeString(payload.eventName)}${
      payload.details && payload.details.status
        ? ` (Status: ${sanitizeString(payload.details.status)})`
        : ""
    }`;
    if (payload.details && payload.details.slug) {
      message += ` [${sanitizeString(payload.details.slug)}]`;
    }
    if (payload.message) {
      message += ` - ${sanitizeString(payload.message)}`;
    }
  } else if (payload && payload.message) {
    message = sanitizeString(payload.message);
  } else if (payload && typeof payload === "object") {
    message = sanitizeString(
      payload.message ||
        payload.eventName ||
        payload.eventType ||
        "Notification received"
    );
  } else {
    return NextResponse.json(
      { error: "Invalid notification payload" },
      { status: 400 }
    );
  }

  // Validate message length
  if (message.length > 1000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
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
