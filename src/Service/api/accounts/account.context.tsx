import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  RoleType,
  type LoginRequest,
  type LoginResponse,
} from "./account.types";

import { AuthService } from "./account.service";

interface AuthContextType {
  userId: number | null;
  roles: RoleType[];
  token: string | null;
  expireDate: string | null;

  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: boolean;

  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userId, setUserId] =
    useState<number | null>(null);

  const [roles, setRoles] =
    useState<RoleType[]>([]);

  const [token, setToken] =
    useState<string | null>(null);

  const [expireDate, setExpireDate] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const login = async (
    request: LoginRequest
  ) => {
    const authService = new AuthService();

    const response =
      await authService.login(request);

    if (!response?.data) {
      throw new Error(
        "اطلاعات ورود دریافت نشد"
      );
    }

    const result: LoginResponse =
      response.data;

    setUserId(result.info.id);
    setRoles(result.info.roles);
    setToken(result.tokenResult.token);
    setExpireDate(
      result.tokenResult.expireDate
    );

    localStorage.setItem(
      "token",
      result.tokenResult.token
    );

    localStorage.setItem(
      "expireDate",
      result.tokenResult.expireDate
    );

    localStorage.setItem(
      "userId",
      result.info.id.toString()
    );

    localStorage.setItem(
      "roles",
      JSON.stringify(result.info.roles)
    );
  };

  const logout = () => {
    setUserId(null);
    setRoles([]);
    setToken(null);
    setExpireDate(null);

    localStorage.removeItem("token");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
  };

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token");

    const storedExpireDate =
      localStorage.getItem("expireDate");

    const storedUserId =
      localStorage.getItem("userId");

    const storedRoles =
      localStorage.getItem("roles");

    if (
      storedToken &&
      storedExpireDate &&
      storedUserId
    ) {
      const expiration =
        new Date(
          storedExpireDate
        ).getTime();

      if (expiration > Date.now()) {
        setToken(storedToken);

        setExpireDate(
          storedExpireDate
        );

        setUserId(
          Number(storedUserId)
        );

        setRoles(
          storedRoles
            ? JSON.parse(storedRoles)
            : []
        );
      } else {
        logout();
      }
    }

    setLoading(false);
  }, []);
const isAdmin :boolean= roles.includes(RoleType.Admin);
  return (
    <AuthContext.Provider
      value={{
        userId,
        roles,
        token,
        expireDate,
        isAuthenticated: !!token,
        loading,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}