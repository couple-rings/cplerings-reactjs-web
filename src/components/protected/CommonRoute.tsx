import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { saveRoute } from "src/redux/slice/route.slice";
import { UserRole } from "src/utils/enums";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

const paths = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
  "/verify-account",
];

function CommonRoute(props: IProtectedRouteProps) {
  const { children } = props;

  const [redirectPath, setRedirectPath] = useState("");

  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isAuthenticated, userInfo } = useAppSelector((state) => state.auth);
  const { role } = userInfo;

  useEffect(() => {
    if (!isAuthenticated && !paths.includes(location.pathname)) {
      dispatch(saveRoute(location.pathname));
    }

    if (isAuthenticated) {
      switch (role) {
        case UserRole.Customer:
          dispatch(saveRoute(location.pathname));
          break;

        case UserRole.Staff:
          setRedirectPath("/staff");
          break;

        case UserRole.Manager:
          setRedirectPath("/manager");
          break;

        case UserRole.Jeweler:
          setRedirectPath("/jeweler");
          break;

        case UserRole.Admin:
          setRedirectPath("/admin");
          break;

        default:
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, location.pathname, role]);

  if (redirectPath) return <Navigate to={redirectPath} replace={true} />;
  return <>{children}</>;
}

export default CommonRoute;