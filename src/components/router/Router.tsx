import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "src/pages/Common/Index";
import Common from "src/pages/Common/Layout";
import ForgetPassword from "src/pages/Common/ForgetPassword/ForgetPassword";
import ResetPassword from "src/pages/Common/ResetPassword/ResetPassword";
import VerifyAccount from "src/pages/Common/VerifyAccount/VerifyAccount";
import Login from "src/pages/Common/Login/Login";
import Register from "src/pages/Common/Register/Register";
import CustomerDefault from "src/pages/Customer/Index";
import Address from "src/pages/Customer/Address/Address";
import VerifyID from "src/pages/Customer/VerifyID/VerifyID";
import WeddingRings from "src/pages/Common/WeddingRings/WeddingRings";
import ChangePassword from "src/pages/Customer/ChangePassword/ChangePassword";
import NotFound from "src/pages/Error/NotFound/NotFound";
import AuthRoute from "src/components/protected/AuthRoute";
import CommonRoute from "src/components/protected/CommonRoute";
import CustomerRoute from "src/components/protected/CustomerRoute";
import EditProfile from "src/pages/Customer/EditProfile/EditProfile";
import Jewelry from "src/pages/Common/Jewelry/Jewelry";
import JewelryDetail from "src/pages/Common/JewelryDetail/JewelryDetail";
import StoresBranches from "src/pages/Common/StoresBranches/StoresBranches";
import StaffLayout from "src/pages/Staff/Layout";
import StaffHome from "src/pages/Staff/Index";
import JewelerLayout from "src/pages/Jeweler/Layout";
import JewelerHome from "src/pages/Jeweler/Index";
import ManagerLayout from "src/pages/Manager/Layout";
import ManagerHome from "src/pages/Manager/Index";
import AdminLayout from "src/pages/Admin/Layout";
import AdminHome from "src/pages/Admin/Index";
import StaffRoute from "src/components/protected/StaffRoute";
import JewelerRoute from "src/components/protected/JewelerRoute";
import ManagerRoute from "src/components/protected/ManagerRoute";
import AdminRoute from "src/components/protected/AdminRoute";
import Orders from "src/pages/Customer/Orders/Orders";
import OrderDetail from "src/pages/Customer/OrderDetail/OrderDetail";
import Support from "src/pages/Customer/Support/Layout";
import SupportDefault from "src/pages/Customer/Support/Index";
import ShoppingBag from "src/pages/Customer/ShoppingBag/ShoppingBag";
import Checkout from "src/pages/Customer/Checkout/Checkout";
import CustomRequest from "src/pages/Staff/CustomRequest/CustomRequest";
import CustomRequestDetail from "src/pages/Staff/CustomRequestDetail/CustomRequestDetail";
import DesignVersions from "src/pages/Staff/DesignVersions/DesignVersions";
import CustomDesign from "src/pages/Staff/CustomDesign/CustomDesign";
import CraftingRequestDetail from "src/pages/Staff/CraftingRequestDetail/CraftingRequestDetail";
import WeddingRingsDetail from "src/pages/Common/WeddingRingsDetail/WeddingRingsDetail";
import CraftingProcess from "src/pages/Jeweler/CraftingProcess/CraftingProcess";
import DesignFee from "src/pages/Customer/DesignFee/DesignFee";
import CustomOrder from "src/pages/Jeweler/CustomOrder/CustomOrder";
import CustomOrderDetail from "src/pages/Jeweler/CustomOrderDetail/CustomOrderDetail";
import Invoice from "src/pages/Customer/Invoice/Invoice";
import Contract from "src/pages/Customer/Contract/Contract";
import ManageAccount from "src/pages/Admin/ManageAccount/ManageAccount";
import ManageJewelryCategory from "src/pages/Admin/ManageJewelryCategory/ManageJewelryCategory";
import ManageDiamondSpecification from "src/pages/Admin/ManageDiamondSpecification/ManageDiamondSpecification";
import ManageMetalSpec from "src/pages/Admin/ManageMetalSpec/ManageMetalSpec";
import ManageFingerSize from "src/pages/Admin/ManageFingerSize/ManageFingerSize";
import MaintenanceOrder from "src/pages/Staff/MaintenanceOrder/MaintenanceOrder";
import MaintenanceCreateForm from "src/pages/Staff/MaintenanceCreateForm/MaintenanceCreateForm";
import ManageDiamond from "src/pages/Manager/ManageDiamond/ManageDiamond";
import ManageBranchInfo from "src/pages/Manager/ManageBranchInfo/ManageBranchInfo";
import ManageCollection from "src/pages/Manager/ManageCollection/ManageCollection";
import ManageTopicAndTag from "src/pages/Manager/ManageTopicAndTag/Index";
import ManageCampaign from "src/pages/Manager/ManageCampaign/ManageCampaign";
import ManageDesign from "src/pages/Manager/ManageDesign/Index";
import CustomRequestCustomer from "src/pages/Customer/Support/CustomRequests/CustomRequest";
import MaintenancePayment from "src/pages/Staff/MaintenancePayment/MaintenancePayment";
import Map from "src/pages/Customer/Map/Map";
import CustomerCustomRequestDetail from "src/pages/Customer/Support/CustomRequestDetail/CustomRequestDetail";
import CraftingRequests from "src/pages/Customer/Support/CraftingRequests/CraftingRequests";
import CreateCraftingRequest from "src/pages/Customer/Support/CreateCraftingRequest/CreateCraftingRequest";
import CustomerCustomOrder from "src/pages/Customer/Support/CustomOrder/CustomOrder";
import CustomerCustomOrderDetail from "src/pages/Customer/Support/CustomOrderDetail/CustomOrderDetail";
import CustomerCraftingProcess from "src/pages/Customer/Support/CraftingProcess/CraftingProcess";
import Deposit from "src/pages/Customer/Support/Deposit/Deposit";
import ManageBlog from "src/pages/Staff/ManageBlog/ManageBlog";
import CraftingRequest from "src/pages/Staff/CraftingRequest/CraftingRequest";
import ArrangeTransport from "src/pages/Staff/ArrangeTransport/ArrangeTransport";
import LoveAgreement from "src/pages/Common/LoveAgreement/LoveAgreement";
import MyLoveAgreement from "src/pages/Customer/LoveAgreement/MyLoveAgreement";
import StaffCustomOrder from "src/pages/Staff/CustomOrder/CustomOrder";
import StaffCustomOrderDetail from "src/pages/Staff/CustomOrderDetail/CustomOrderDetail";
import LoveAgreementDetail from "src/pages/Common/LoveAgreementDetail/LoveAgreementDetail";
import MaintenanceList from "src/pages/Jeweler/MaintenanceOrder/MaintenanceList";
import MaintenanceOrderDetail from "src/pages/Jeweler/MaintenanceOrderDetail/MaintenanceOrderDetail";
import RefundOrder from "src/pages/Staff/RefundOrder/RefundOrder";
import RefundOrderDetail from "src/pages/Staff/RefundOrderDetail/RefundOrderDetail";
import RefundCreateForm from "src/pages/Staff/RefundCreateForm/RefundCreateForm";
import ManagerFiancePage from "src/pages/Manager/ManagerFinancePage/ManagerFinancePage";
import RequestCrafting from "src/pages/Customer/RequestCrafting/RequestCrafting";
import ManageJewelry from "src/pages/Manager/ManageJewelry/ManageJewelry";
import ManagerProductPage from "src/pages/Manager/ManagerProductPage/ManagerProductPage";
import StandardOrder from "src/pages/Staff/StandardOrder/StandardOrder";
import StandardOrderDetail from "src/pages/Staff/StandardOrderDetail/StandardOrderDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CommonRoute>
        <Common />
      </CommonRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "forget-password",
        element: (
          <AuthRoute>
            <ForgetPassword />
          </AuthRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <AuthRoute>
            <ResetPassword />
          </AuthRoute>
        ),
      },
      {
        path: "verify-account",
        element: (
          <AuthRoute>
            <VerifyAccount />
          </AuthRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthRoute>
            <Register />
          </AuthRoute>
        ),
      },
      {
        path: "wedding-rings",
        element: <WeddingRings />,
      },
      {
        path: "jewelry",
        element: <Jewelry />,
      },
      {
        path: "jewelry/detail/:id",
        element: <JewelryDetail />,
      },
      {
        path: "wedding-rings/detail/:maleId/:femaleId",
        element: <WeddingRingsDetail />,
      },
      {
        path: "stores",
        element: <StoresBranches />,
      },
      {
        path: "love-agreement",
        element: <LoveAgreement />,
      },
      {
        path: "love-agreement/:customerId",
        element: <LoveAgreementDetail />,
      },
    ],
  },
  {
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
            element: <CustomRequestCustomer />,
          },
          {
            path: "custom-request/detail/:id",
            element: <CustomerCustomRequestDetail />,
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
            element: <CustomerCustomOrder />,
          },
          {
            path: "custom-order/detail/:id",
            element: <CustomerCustomOrderDetail />,
          },
          {
            path: "custom-order/:orderId/crafting-process",
            element: <CustomerCraftingProcess />,
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
    ],
  },
  {
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
        element: <StaffCustomOrder />,
      },
      {
        path: "custom-order/detail/:id",
        element: <StaffCustomOrderDetail />,
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
  },
  {
    path: "/jeweler",
    element: (
      <JewelerRoute>
        <JewelerLayout />
      </JewelerRoute>
    ),
    children: [
      {
        index: true,
        element: <JewelerHome />,
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
  },
  {
    path: "/manager",
    element: (
      <ManagerRoute>
        <ManagerLayout />
      </ManagerRoute>
    ),
    children: [
      {
        index: true,
        element: <ManagerHome />,
      },
      {
        path: "branch",
        element: <ManageBranchInfo />,
      },
      {
        path: "diamond",
        element: <ManageDiamond />,
      },
      {
        path: "collection",
        element: <ManageCollection />,
      },
      {
        path: "design",
        element: <ManageDesign />,
      },
      {
        path: "jewelry",
        element: <ManageJewelry />,
      },
      {
        path: "topic&tag",
        element: <ManageTopicAndTag />,
      },
      {
        path: "campaign",
        element: <ManageCampaign />,
      },
      {
        path: "financial",
        element: <ManagerFiancePage />,
      },
      {
        path: "product",
        element: <ManagerProductPage />,
      },
    ],
  },
  {
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
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
