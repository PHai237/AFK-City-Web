import express from "express";
import cors from "cors";
import morgan from "morgan";
import { json } from "body-parser";
import { env } from "./config/env";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "AFK City API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
