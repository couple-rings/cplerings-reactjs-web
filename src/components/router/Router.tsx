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
import DesignDetail from "src/pages/Common/DesignDetail/DesignDetail";
import StoresBranches from "src/pages/Common/StoresBranches/StoresBranches";

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
        element: (
          <AuthRoute>
            <Home />
          </AuthRoute>
        ),
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
        path: "design-detail/:id",
        element: <DesignDetail />,
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
