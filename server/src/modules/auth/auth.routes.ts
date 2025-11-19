import { Router } from "express";
import { loginHandler, registerHandler } from "./auth.controller";

const router = Router();

// POST /api/auth/register
router.post("/register", registerHandler);

// POST /api/auth/login
router.post("/login", loginHandler);

export default router;
