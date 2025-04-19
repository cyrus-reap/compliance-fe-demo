import { NextRequest, NextResponse } from "next/server";

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

  // Emit to all connected clients via Socket.IO if available
  // @ts-ignore
  if (globalThis.io) {
    // @ts-ignore
    globalThis.io.emit("notification", {
      message: notification.message,
      createdAt: notification.createdAt,
    });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(notifications);
}
