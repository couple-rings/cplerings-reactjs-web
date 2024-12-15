import { RouteObject } from "react-router-dom";
import Home from "src/pages/Common/Index";
import Common from "src/pages/Common/Layout";
import ForgetPassword from "src/pages/Common/ForgetPassword/ForgetPassword";
import ResetPassword from "src/pages/Common/ResetPassword/ResetPassword";
import VerifyAccount from "src/pages/Common/VerifyAccount/VerifyAccount";
import Login from "src/pages/Common/Login/Login";
import Register from "src/pages/Common/Register/Register";
import WeddingRings from "src/pages/Common/WeddingRings/WeddingRings";
import AuthRoute from "src/components/protected/AuthRoute";
import CommonRoute from "src/components/protected/CommonRoute";
import Jewelry from "src/pages/Common/Jewelry/Jewelry";
import JewelryDetail from "src/pages/Common/JewelryDetail/JewelryDetail";
import StoresBranches from "src/pages/Common/StoresBranches/StoresBranches";
import WeddingRingsDetail from "src/pages/Common/WeddingRingsDetail/WeddingRingsDetail";
import LoveAgreement from "src/pages/Common/LoveAgreement/LoveAgreement";
import LoveAgreementDetail from "src/pages/Common/LoveAgreementDetail/LoveAgreementDetail";

const CommonRouteObject: RouteObject = {
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
};

export default CommonRouteObject;
