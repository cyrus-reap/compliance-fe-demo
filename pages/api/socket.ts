import { Server as IOServer } from "socket.io";
import type { NextApiRequest } from "next";

// Add type definition for globalThis.io
declare global {
  // eslint-disable-next-line no-var
  var io: IOServer | undefined;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// Extend NextApiResponse to include Socket.IO server
export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    const io = new IOServer(res.socket.server, {
      path: "/api/socket_io",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;
    globalThis.io = io;

    io.on("connection", (socket) => {
      // Listen for custom events if needed
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
    });
  } else {
    console.log("Socket is already running");
    if (!globalThis.io) {
      globalThis.io = res.socket.server.io; // Ensure globalThis.io is set
    }
  }
  res.end();
}
