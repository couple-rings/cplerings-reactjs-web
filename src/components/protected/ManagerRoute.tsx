import { Navigate, useLocation } from "react-router-dom";
import { saveRoute } from "src/redux/slice/route.slice";
import { UserRole } from "src/utils/enums";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

function ManagerRoute(props: IProtectedRouteProps) {
  const { children } = props;

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userInfo, isAuthenticated } = useAppSelector((state) => state.auth);
  const { role } = userInfo;

  if (!isAuthenticated) return <Navigate to={"/login"} replace={true} />;
  if (role !== UserRole.Manager)
    return <Navigate to={"/not-found"} replace={true} />;
  else dispatch(saveRoute(location.pathname));

  return <>{children}</>;
}

export default ManagerRoute;
