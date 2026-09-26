import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Service/api/accounts/useAuth";



export default function ProtectedAdminRoute() {
  const {
    isAuthenticated,
    loading,
    isAdmin,
  } = useAuth();

  if (loading) {
    return (
      <div>
        در حال بررسی احراز هویت...
      </div>
    );
  }

  if (!isAuthenticated||!isAdmin) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}