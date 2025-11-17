import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware cơ bản
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // frontend dev URL
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Health check route để test server
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "AFK City backend",
    message: "AFK City API is running",
    timestamp: new Date().toISOString(),
  });
});

export default app;
