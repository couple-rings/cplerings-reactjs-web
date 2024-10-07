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
import Jewelry from "src/pages/Common/Jewelry/Jewelry";
import StoresBranches from "src/pages/Common/StoresBranches/StoresBranches";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Common />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },

      {
        path: "verify-account",
        element: <VerifyAccount />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
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
        path: "stores",
        element: <StoresBranches/>
      }
    ],
  },
  {
    path: "/customer",
    element: <Common />,
    children: [
      {
        index: true,
        element: <CustomerDefault />,
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
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
