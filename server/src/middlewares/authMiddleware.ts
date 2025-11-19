import { NextFunction, Response } from "express";
import { verifyJwt } from "../utils/jwt";
import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyJwt(token);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}