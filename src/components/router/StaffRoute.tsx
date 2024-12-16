import { RouteObject } from "react-router-dom";
import StaffLayout from "src/pages/Staff/Layout";
import StaffHome from "src/pages/Staff/Index";
import StaffRoute from "src/components/protected/StaffRoute";
import CustomRequest from "src/pages/Staff/CustomRequest/CustomRequest";
import CustomRequestDetail from "src/pages/Staff/CustomRequestDetail/CustomRequestDetail";
import DesignVersions from "src/pages/Staff/DesignVersions/DesignVersions";
import CustomDesign from "src/pages/Staff/CustomDesign/CustomDesign";
import CraftingRequestDetail from "src/pages/Staff/CraftingRequestDetail/CraftingRequestDetail";
import MaintenanceOrder from "src/pages/Staff/MaintenanceOrder/MaintenanceOrder";
import MaintenanceCreateForm from "src/pages/Staff/MaintenanceCreateForm/MaintenanceCreateForm";
import MaintenancePayment from "src/pages/Staff/MaintenancePayment/MaintenancePayment";
import ManageBlog from "src/pages/Staff/ManageBlog/ManageBlog";
import CraftingRequest from "src/pages/Staff/CraftingRequest/CraftingRequest";
import ArrangeTransport from "src/pages/Staff/ArrangeTransport/ArrangeTransport";
import CustomOrder from "src/pages/Staff/CustomOrder/CustomOrder";
import CustomOrderDetail from "src/pages/Staff/CustomOrderDetail/CustomOrderDetail";
import RefundOrder from "src/pages/Staff/RefundOrder/RefundOrder";
import RefundOrderDetail from "src/pages/Staff/RefundOrderDetail/RefundOrderDetail";
import RefundCreateForm from "src/pages/Staff/RefundCreateForm/RefundCreateForm";
import StandardOrder from "src/pages/Staff/StandardOrder/StandardOrder";
import StandardOrderDetail from "src/pages/Staff/StandardOrderDetail/StandardOrderDetail";
import ResellOrders from "src/pages/Staff/ResellOrders/ResellOrders";
import CreateResellOrder from "src/pages/Staff/CreateResellOrder/CreateResellOrder";

const StaffRouteObject: RouteObject = {
  path: "/staff",
  element: (
    <StaffRoute>
      <StaffLayout />
    </StaffRoute>
  ),
  children: [
    {
      index: true,
      element: <StaffHome />,
    },
    {
      path: "custom-request",
      element: <CustomRequest />,
    },
    {
      path: "custom-request/detail/:id",
      element: <CustomRequestDetail />,
    },
    {
      path: "custom-request/:id/design-version",
      element: <DesignVersions />,
    },
    {
      path: "custom-request/:id/custom-design/:maleDesignId/:femaleDesignId",
      element: <CustomDesign />,
    },
    {
      path: "crafting-request",
      element: <CraftingRequest />,
    },
    {
      path: "crafting-request/detail/:customerId",
      element: <CraftingRequestDetail />,
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
      path: "standard-order",
      element: <StandardOrder />,
    },
    {
      path: "standard-order/detail/:id",
      element: <StandardOrderDetail />,
    },
    {
      path: "resell-order",
      element: <ResellOrders />,
    },
    {
      path: "resell-order/create",
      element: <CreateResellOrder />,
    },
    {
      path: "maintenance-order",
      element: <MaintenanceOrder />,
    },
    {
      path: "maintenance-create-form",
      element: <MaintenanceCreateForm />,
    },
    {
      path: "maintenance-payment",
      element: <MaintenancePayment />,
    },
    {
      path: "arrange-transport",
      element: <ArrangeTransport />,
    },
    {
      path: "blog",
      element: <ManageBlog />,
    },
    {
      path: "refund-order",
      element: <RefundOrder />,
    },
    {
      path: "refund-order/detail/:id",
      element: <RefundOrderDetail />,
    },
    {
      path: "refund-create-form",
      element: <RefundCreateForm />,
    },
  ],
};

export default StaffRouteObject;
