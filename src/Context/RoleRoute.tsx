import { Navigate, Outlet } from "react-router-dom";
import type { RoleType } from "../Service/api/accounts/account.types";
import { useAuth } from "../Hooks/useAuth";


interface RoleRouteProps {
  roles: RoleType[];
}

export default function RoleRoute({
  roles,
}: RoleRouteProps) {
  const {
    isAuthenticated,
    loading,
    roles: userRoles,
  } = useAuth();

  if (loading) {
    return (
      <div>
        در حال بررسی دسترسی...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const hasAccess = roles.some(
    (role) =>
      userRoles.includes(role)
  );

  if (!hasAccess) {
    return (
      <Navigate
        to="/403"
        replace
      />
    );
  }

  return <Outlet />;
}