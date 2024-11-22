import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { saveProfile } from "src/redux/slice/auth.slice";
import { getAccountProfile } from "src/services/account.service";
import { UserRole } from "src/utils/enums";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { fetchManagerProfile } from "src/utils/querykey";

function ManagerRoute(props: IProtectedRouteProps) {
  const { children } = props;

  const dispatch = useAppDispatch();
  const { userInfo, isAuthenticated } = useAppSelector((state) => state.auth);
  const { role, username } = userInfo;

  const { data: response } = useQuery({
    queryKey: [fetchManagerProfile],
    queryFn: () => {
      return getAccountProfile();
    },

    enabled: isAuthenticated && !username && role === UserRole.Manager,
  });

  useEffect(() => {
    if (response && response.data) {
      dispatch(saveProfile(response.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (!isAuthenticated) return <Navigate to={"/login"} replace={true} />;
  if (role !== UserRole.Manager)
    return <Navigate to={"/not-found"} replace={true} />;

  return <>{children}</>;
}

export default ManagerRoute;
