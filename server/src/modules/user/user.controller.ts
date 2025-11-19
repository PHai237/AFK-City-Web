import { Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { getMeService } from "./user.service";

export async function getMeHandler(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getMeService(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err: any) {
    return res.status(500).json({ message: "Failed to fetch user" });
  }
}
