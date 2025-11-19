import { Router } from "express";
import { getMeHandler } from "./user.controller";
import { requireAuth } from "../../middlewares/authMiddleware";

const router = Router();

// GET /api/users/me
router.get("/me", requireAuth, getMeHandler);

export default router;
