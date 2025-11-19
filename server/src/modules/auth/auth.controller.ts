import { Request, Response } from "express";
import { loginService, registerService } from "./auth.service";
import { LoginInput, RegisterInput } from "./auth.types";

export async function registerHandler(req: Request, res: Response) {
  try {
    const body = req.body as RegisterInput;

    if (!body.email || !body.password || !body.username) {
      return res
        .status(400)
        .json({ message: "email, username, password are required" });
    }

    const result = await registerService(body);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || "Register failed" });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const body = req.body as LoginInput;

    if (!body.email || !body.password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const result = await loginService(body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || "Login failed" });
  }
}
