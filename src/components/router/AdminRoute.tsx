import { RouteObject } from "react-router-dom";
import AdminLayout from "src/pages/Admin/Layout";
import AdminHome from "src/pages/Admin/Index";
import AdminRoute from "src/components/protected/AdminRoute";
import ManageAccount from "src/pages/Admin/ManageAccount/ManageAccount";
import ManageJewelryCategory from "src/pages/Admin/ManageJewelryCategory/ManageJewelryCategory";
import ManageDiamondSpecification from "src/pages/Admin/ManageDiamondSpecification/ManageDiamondSpecification";
import ManageMetalSpec from "src/pages/Admin/ManageMetalSpec/ManageMetalSpec";
import ManageFingerSize from "src/pages/Admin/ManageFingerSize/ManageFingerSize";

const AdminRouteObject: RouteObject = {
  path: "/admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    {
      index: true,
      element: <AdminHome />,
    },
    {
      path: "account",
      element: <ManageAccount />,
    },
    {
      path: "jewelry-category",
      element: <ManageJewelryCategory />,
    },
    {
      path: "diamond-spec",
      element: <ManageDiamondSpecification />,
    },
    {
      path: "metal-spec",
      element: <ManageMetalSpec />,
    },
    {
      path: "finger-size",
      element: <ManageFingerSize />,
    },
  ],
};

export default AdminRouteObject;
