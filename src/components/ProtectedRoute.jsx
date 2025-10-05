import { Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = useSelector((state) => state.userInfoSlie);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/physical-product" replace />;
  }

  return children;
}
