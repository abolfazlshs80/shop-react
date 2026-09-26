import { useContext } from "react";
import { AuthContext } from "./account.context";


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth باید داخل AuthProvider استفاده شود"
    );
  }

  return context;
}