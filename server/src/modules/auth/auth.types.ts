export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponseUser {
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
  user: AuthResponseUser;
}