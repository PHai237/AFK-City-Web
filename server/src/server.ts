import http from "http";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";

// Load biến môi trường từ .env
dotenv.config();

const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Tạo HTTP server từ Express app
const server = http.createServer(app);

// Khởi tạo Socket.IO (để sau này dùng cho chat, watch-together, v.v.)
const io = new SocketIOServer(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  },
});

// Tạm thời chỉ log connect/disconnect để test
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// Lắng nghe port
server.listen(PORT, () => {
  console.log(`🚀 AFK City backend listening on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
