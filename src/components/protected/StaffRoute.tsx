import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { saveProfile } from "src/redux/slice/auth.slice";
import { saveRoute } from "src/redux/slice/route.slice";
import { getAccountProfile } from "src/services/account.service";
import { UserRole } from "src/utils/enums";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

function StaffRoute(props: IProtectedRouteProps) {
  const { children } = props;

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userInfo, isAuthenticated } = useAppSelector((state) => state.auth);
  const { role, username } = userInfo;

  const { data: response } = useQuery({
    queryKey: ["fetchAccountProfile"],
    queryFn: () => {
      return getAccountProfile();
    },

    enabled: isAuthenticated && !username,
  });

  useEffect(() => {
    if (response && response.data) {
      dispatch(saveProfile(response.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (!isAuthenticated) return <Navigate to={"/login"} replace={true} />;
  if (role !== UserRole.Staff)
    return <Navigate to={"/not-found"} replace={true} />;
  else dispatch(saveRoute(location.pathname));

  return <>{children}</>;
}

export default StaffRoute;
