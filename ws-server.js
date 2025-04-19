const { Server } = require("socket.io");

const io = new Server(3002, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Optionally handle incoming messages from clients
  socket.on("disconnect", () => {
    // Handle disconnect if needed
  });
  socket.on("error", (err) => {
    console.error("Socket.IO client error:", err);
  });
});

function broadcast(data) {
  io.emit("notification", data);
}

io.on("listening", () => {
  console.log("Socket.IO server running on ws://localhost:3000");
});

io.engine.on("connection_error", (err) => {
  console.error("Socket.IO server error:", err);
});

module.exports = { broadcast };
