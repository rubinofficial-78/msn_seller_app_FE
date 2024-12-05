import { Navigate } from "react-router-dom";
import { UserRole } from "../types/auth";
import GLOBAL_CONSTANTS from "../GlobalConstants";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const token = localStorage.getItem("token");
  const userRole =
    localStorage.getItem("userRole") || GLOBAL_CONSTANTS.userType;
  const isNewUser = localStorage.getItem("isNewUser") === "true";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isNewUser) {
    return <Navigate to="/onboarding" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole as UserRole)) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case "SELLER":
        return <Navigate to="/dashboard/seller-dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
