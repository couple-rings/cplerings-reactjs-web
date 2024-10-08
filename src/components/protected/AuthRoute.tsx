import { Navigate } from "react-router-dom";
import { UserRole } from "src/utils/enums";
import { useAppSelector } from "src/utils/hooks";

const paths = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
  "/verify-account",
];

function AuthRoute(props: IProtectedRouteProps) {
  const { children } = props;

  const { isAuthenticated, userInfo } = useAppSelector((state) => state.auth);
  const { role } = userInfo;

  if (isAuthenticated && paths.includes(location.pathname)) {
    switch (role) {
      case UserRole.Customer:
        return <Navigate to="/" replace={true} />;

      case UserRole.Staff:
        return <Navigate to="/staff" replace={true} />;

      case UserRole.Manager:
        return <Navigate to="/manager" replace={true} />;

      case UserRole.Jeweler:
        return <Navigate to="/jeweler" replace={true} />;

      case UserRole.Admin:
        return <Navigate to="/admin" replace={true} />;

      default:
        break;
    }
  }

  return <>{children}</>;
}

export default AuthRoute;
