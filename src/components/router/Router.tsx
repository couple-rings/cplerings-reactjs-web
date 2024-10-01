import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "src/pages/Common/Index";
import Common from "src/pages/Common/Layout";
import ForgetPassword from "src/pages/Common/ForgetPassword/ForgetPassword";
import ResetPassword from "src/pages/Common/ResetPassword/ResetPassword";
import VerifyAccount from "src/pages/Common/VerifyAccount/VerifyAccount";
import Login from "src/pages/Common/Login/Login";
import Register from "src/pages/Common/Register/Register";

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
        element: <Register/>
      }
    ],
  },
  
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;