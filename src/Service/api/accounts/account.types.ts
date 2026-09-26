// src/api/account/account.types.ts

export interface LoginRequest {
    userName: string | null;
    password: string | null;
}

export enum RoleType {
  User =   "User",
  Admin =   "Admin",
}

export interface TokenResult {
  token: string;
  expireDate: string;
}

export interface AuthInfo {
  id: number;
  roles: RoleType[];
}

export interface LoginResponse {
  tokenResult: TokenResult;
  info: AuthInfo;
}

