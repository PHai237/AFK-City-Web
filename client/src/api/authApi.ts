import api from "./client";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string | null;
  level: number;
  exp: number;
  gold: number;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export async function registerApi(input: {
  email: string;
  username: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/register", input);
  return res.data;
}

export async function loginApi(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", input);
  return res.data;
}
