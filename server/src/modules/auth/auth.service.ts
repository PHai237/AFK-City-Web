import { prisma } from "../../config/db";
import { comparePassword, hashPassword } from "../../utils/password";
import { signJwt } from "../../utils/jwt";
import {
  AuthResponse,
  AuthResponseUser,
  LoginInput,
  RegisterInput,
} from "./auth.types";

function toAuthResponseUser(user: any): AuthResponseUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    level: user.level,
    exp: user.exp,
    gold: user.gold,
  };
}

export async function registerService(
  input: RegisterInput
): Promise<AuthResponse> {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      username: input.username,
      password: passwordHash,
    },
  });

  const token = signJwt({ userId: user.id });

  return {
    token,
    user: toAuthResponseUser(user),
  };
}

export async function loginService(input: LoginInput): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const ok = await comparePassword(input.password, user.password);
  if (!ok) {
    throw new Error("Invalid email or password");
  }

  const token = signJwt({ userId: user.id });

  return {
    token,
    user: toAuthResponseUser(user),
  };
}