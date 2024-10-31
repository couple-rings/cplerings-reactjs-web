import { Navigate, useLocation } from "react-router-dom";
import { saveRoute } from "src/redux/slice/route.slice";
import { UserRole } from "src/utils/enums";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

function CustomerRoute(props: IProtectedRouteProps) {
  const { children } = props;

  const location = useLocation();
  const dispatch = useAppDispatch();

  const { currentRoute } = useAppSelector((state) => state.route);
  const { userInfo, isAuthenticated } = useAppSelector((state) => state.auth);
  const { role, hasSpouse } = userInfo;

  if (!isAuthenticated) return <Navigate to={"/login"} replace={true} />;

  if (role !== UserRole.Customer)
    return <Navigate to={"/not-found"} replace={true} />;
  else dispatch(saveRoute(location.pathname));

  if (hasSpouse && location.pathname === "/customer/love-verification")
    return <Navigate to={currentRoute} replace={true} />;

  return <>{children}</>;
}

export default CustomerRoute;
