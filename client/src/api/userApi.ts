import api from "./client";
import type { AuthUser } from "./authApi";

export async function getMeApi(token: string): Promise<AuthUser> {
  const res = await api.get<AuthUser>("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
