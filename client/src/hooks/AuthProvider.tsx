// client/src/hooks/AuthProvider.tsx
import React, { useEffect, useState, ReactNode } from "react";
import type { AuthUser } from "../api/authApi";
import { getMeApi } from "../api/userApi";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("afk_city_token");
  });

  const [user, setUser] = useState<AuthUser | null>(null);

  const [loading, setLoading] = useState<boolean>(() => {
    return !!localStorage.getItem("afk_city_token");
  });

  useEffect(() => {
    const currentToken = token;

    if (!currentToken) {
      return;
    }

    let cancelled = false;

    async function fetchMe() {
      try {
        const u = await getMeApi(currentToken as string);
        if (!cancelled) {
          setUser(u);
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem("afk_city_token");
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMe();

    return () => {
      cancelled = true;
    };
  }, [token]);

  function login(newToken: string, newUser: AuthUser) {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("afk_city_token", newToken);
    setLoading(false);
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("afk_city_token");
    setLoading(false);
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
