import { RouteObject } from "react-router-dom";
import ManagerLayout from "src/pages/Manager/Layout";
import ManagerHome from "src/pages/Manager/Index";
import ManagerRoute from "src/components/protected/ManagerRoute";
import ManageDiamond from "src/pages/Manager/ManageDiamond/ManageDiamond";
import ManageBranchInfo from "src/pages/Manager/ManageBranchInfo/ManageBranchInfo";
import ManageCollection from "src/pages/Manager/ManageCollection/ManageCollection";
import ManageTopicAndTag from "src/pages/Manager/ManageTopicAndTag/Index";
import ManageCampaign from "src/pages/Manager/ManageCampaign/ManageCampaign";
import ManageDesign from "src/pages/Manager/ManageDesign/Index";
import ManagerFiancePage from "src/pages/Manager/ManagerFinancePage/ManagerFinancePage";
import ManageJewelry from "src/pages/Manager/ManageJewelry/ManageJewelry";
import ManagerProductPage from "src/pages/Manager/ManagerProductPage/ManagerProductPage";
import ViewAccountInfo from "src/pages/Manager/ViewAccountInfo/ViewAccountInfo";
import OrderDetail from "src/pages/Manager/OrderDetail/OrderDetail";

const ManagerRouteObject: RouteObject = {
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
    {
      path: "product/detail/:id",
      element: <OrderDetail />,
    },
    {
      path: "account",
      element: <ViewAccountInfo />,
    }
  ],
};

export default ManagerRouteObject;
