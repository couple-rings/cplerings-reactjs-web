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
import CustomOrder from "src/pages/Jeweler/CustomOrder/CustomOrder";
import CustomOrderDetail from "src/pages/Jeweler/CustomOrderDetail/CustomOrderDetail";
import CraftingProcess from "src/pages/Jeweler/CraftingProcess/CraftingProcess";

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
        path: "jewelry/detail",
        element: <JewelryDetail />,
      },
      {
        path: "wedding-rings/detail",
        element: <WeddingRingsDetail />,
      },
      {
        path: "stores",
        element: <StoresBranches />,
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
        path: "support",
        element: <Support />,
        children: [
          {
            index: true,
            element: <SupportDefault />,
          },
        ],
      },
      {
        path: "bag",
        element: <ShoppingBag />,
      },
      {
        path: "checkout",
        element: <Checkout />,
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
        path: "custom-request/design-version",
        element: <DesignVersions />,
      },
      {
        path: "custom-request/custom-design",
        element: <CustomDesign />,
      },
      {
        path: "crafting-request/detail",
        element: <CraftingRequestDetail />,
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
        element: <CustomOrder/>
      },
      {
        path: "custom-order/detail/:id",
        element: <CustomOrderDetail/>
      },
      {
        path: "custom-process",
        element: <CraftingProcess/>
      }
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
