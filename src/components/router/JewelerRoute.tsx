import { RouteObject } from "react-router-dom";
import JewelerLayout from "src/pages/Jeweler/Layout";
// import JewelerHome from "src/pages/Jeweler/Index";
import JewelerRoute from "src/components/protected/JewelerRoute";
import CraftingProcess from "src/pages/Jeweler/CraftingProcess/CraftingProcess";
import CustomOrder from "src/pages/Jeweler/CustomOrder/CustomOrder";
import CustomOrderDetail from "src/pages/Jeweler/CustomOrderDetail/CustomOrderDetail";
import MaintenanceList from "src/pages/Jeweler/MaintenanceOrder/MaintenanceList";
import MaintenanceOrderDetail from "src/pages/Jeweler/MaintenanceOrderDetail/MaintenanceOrderDetail";

const JewelerRouteObject: RouteObject = {
  path: "/jeweler",
  element: (
    <JewelerRoute>
      <JewelerLayout />
    </JewelerRoute>
  ),
  children: [
    {
      index: true,
      // element: <JewelerHome />,
      element: <CustomOrder />,
    },
    {
      path: "custom-order",
      element: <CustomOrder />,
    },
    {
      path: "custom-order/detail/:id",
      element: <CustomOrderDetail />,
    },
    {
      path: "custom-order/:orderId/crafting-process",
      element: <CraftingProcess />,
    },
    {
      path: "maintenance-order",
      element: <MaintenanceList />,
    },
    {
      path: "maintenance-order/detail/:id",
      element: <MaintenanceOrderDetail />,
    },
  ],
};

export default JewelerRouteObject;
