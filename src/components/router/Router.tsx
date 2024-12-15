import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "src/pages/Error/NotFound/NotFound";
import CustomerRouteObject from "./CustomerRoute";
import AdminRouteObject from "./AdminRoute";
import ManagerRouteObject from "./ManagerRoute";
import JewelerRouteObject from "./JewelerRoute";
import StaffRouteObject from "./StaffRoute";
import CommonRouteObject from "./CommonRoute";

const router = createBrowserRouter([
  CommonRouteObject,
  CustomerRouteObject,
  StaffRouteObject,
  JewelerRouteObject,
  ManagerRouteObject,
  AdminRouteObject,
  {
    path: "*",
    element: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
