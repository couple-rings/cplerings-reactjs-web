import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveRoute } from "src/redux/slice/route.slice";
import { UserRole } from "src/utils/enums";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

function CustomerRoute(props: IProtectedRouteProps) {
  const { children } = props;

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentRoute } = useAppSelector((state) => state.route);
  const { userInfo, isAuthenticated } = useAppSelector((state) => state.auth);
  const { role, hasSpouse } = userInfo;

  // if (!isAuthenticated) return <Navigate to={"/login"} replace={true} />;

  // if (role !== UserRole.Customer)
  //   return <Navigate to={"/not-found"} replace={true} />;
  // else dispatch(saveRoute(location.pathname));

  // if (hasSpouse && location.pathname === "/customer/love-verification")
  //   return <Navigate to={currentRoute} replace={true} />;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (hasSpouse && location.pathname === "/customer/love-verification") {
      navigate(currentRoute);
      return;
    }

    if (role !== UserRole.Customer) {
      navigate("/not-found");
    } else {
      dispatch(saveRoute(location.pathname));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute, hasSpouse, isAuthenticated, location.pathname, role]);

  return <>{children}</>;
}

export default CustomerRoute;
