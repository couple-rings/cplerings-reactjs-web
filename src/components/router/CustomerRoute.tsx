import { RouteObject } from "react-router-dom";
import Common from "src/pages/Common/Layout";
import CustomerDefault from "src/pages/Customer/Index";
import Address from "src/pages/Customer/Address/Address";
import VerifyID from "src/pages/Customer/VerifyID/VerifyID";
import ChangePassword from "src/pages/Customer/ChangePassword/ChangePassword";
import CustomerRoute from "src/components/protected/CustomerRoute";
import EditProfile from "src/pages/Customer/EditProfile/EditProfile";
import Orders from "src/pages/Customer/Orders/Orders";
import OrderDetail from "src/pages/Customer/OrderDetail/OrderDetail";
import Support from "src/pages/Customer/Support/Layout";
import SupportDefault from "src/pages/Customer/Support/Index";
import ShoppingBag from "src/pages/Customer/ShoppingBag/ShoppingBag";
import Checkout from "src/pages/Customer/Checkout/Checkout";
import DesignFee from "src/pages/Customer/DesignFee/DesignFee";
import Invoice from "src/pages/Customer/Invoice/Invoice";
import Contract from "src/pages/Customer/Contract/Contract";
import CustomRequest from "src/pages/Customer/Support/CustomRequests/CustomRequest";
import Map from "src/pages/Customer/Map/Map";
import CustomRequestDetail from "src/pages/Customer/Support/CustomRequestDetail/CustomRequestDetail";
import CraftingRequests from "src/pages/Customer/Support/CraftingRequests/CraftingRequests";
import CreateCraftingRequest from "src/pages/Customer/Support/CreateCraftingRequest/CreateCraftingRequest";
import CustomOrder from "src/pages/Customer/Support/CustomOrder/CustomOrder";
import CustomOrderDetail from "src/pages/Customer/Support/CustomOrderDetail/CustomOrderDetail";
import CraftingProcess from "src/pages/Customer/Support/CraftingProcess/CraftingProcess";
import Deposit from "src/pages/Customer/Support/Deposit/Deposit";
import MyLoveAgreement from "src/pages/Customer/LoveAgreement/MyLoveAgreement";
import RequestCrafting from "src/pages/Customer/RequestCrafting/RequestCrafting";
import ResellOrder from "src/pages/Customer/ResellOrder/ResellOrder";

const CustomerRouteObject: RouteObject = {
  path: "/customer",
  element: (
    <CustomerRoute>
      <Common />
    </CustomerRoute>
  ),
  children: [
    {
      index: true,
      element: <CustomerDefault />,
    },
    {
      path: "profile",
      element: <EditProfile />,
    },
    {
      path: "address",
      element: <Address />,
    },
    {
      path: "love-verification",
      element: <VerifyID />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
    {
      path: "orders",
      element: <Orders />,
    },
    {
      path: "order-detail/:id",
      element: <OrderDetail />,
    },
    {
      path: "transport/:id",
      element: <Map />,
    },
    {
      path: "request-crafting",
      element: <RequestCrafting />,
    },
    {
      path: "support",
      element: <Support />,
      children: [
        {
          index: true,
          element: <SupportDefault />,
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
          path: "crafting-request",
          element: <CraftingRequests />,
        },
        {
          path: "crafting-request/create",
          element: <CreateCraftingRequest />,
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
          path: "custom-order/:orderId/deposit/:stageId",
          element: <Deposit />,
        },
      ],
    },
    {
      path: "bag",
      element: <ShoppingBag />,
    },
    {
      path: "checkout/:id",
      element: <Checkout />,
    },
    {
      path: "design-fee/:maleDesignId/:femaleDesignId",
      element: <DesignFee />,
    },
    {
      path: "payment",
      element: <Invoice />,
    },
    {
      path: "contract/:orderId",
      element: <Contract />,
    },
    {
      path: "love-agreement",
      element: <MyLoveAgreement />,
    },
    {
      path: "resell-order",
      element: <ResellOrder />,
    },
  ],
};

export default CustomerRouteObject;
