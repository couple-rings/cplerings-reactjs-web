import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "src/components/layout/SideBar";
import DrawerHeader from "src/components/layout/DrawerHeader";
import Main from "src/components/layout/Main";
import Header from "src/components/layout/Header";
import { Outlet } from "react-router-dom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PaletteIcon from "@mui/icons-material/Palette";
import HandymanIcon from "@mui/icons-material/Handyman";
import ArticleIcon from "@mui/icons-material/Article";
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useAppSelector } from "src/utils/hooks";
import { StaffPosition } from "src/utils/enums";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import PointOfSaleSharpIcon from "@mui/icons-material/PointOfSaleSharp";

const saleStaffSidebarList = [
  {
    text: "Chat",
    icon: <QuestionAnswerIcon />,
    path: "/staff",
  },
  {
    text: "Yêu Cầu Thiết Kế",
    icon: <PaletteIcon />,
    path: "/staff/custom-request",
  },
  {
    text: "Yêu Cầu Gia Công",
    icon: <HardwareRoundedIcon />,
    path: "/staff/crafting-request",
  },
  {
    text: "Đơn Gia Công",
    icon: <TaskRoundedIcon />,
    path: "/staff/custom-order",
  },
  {
    text: "Đơn Bán Trang Sức",
    icon: <MonetizationOnSharpIcon />,
    path: "/staff/standard-order",
  },
  {
    text: "Đơn Mua Lại Nhẫn",
    icon: <PointOfSaleSharpIcon />,
    path: "/staff/resell-order",
  },
  {
    text: "Đơn Bảo Trì",
    icon: <HandymanIcon />,
    path: "/staff/maintenance-order",
  },
  {
    text: "Danh Sách Hoàn Tiền",
    icon: <CurrencyExchangeIcon />,
    path: "/staff/refund-order",
  },
  {
    text: "Sắp Xếp Vận Chuyển",
    icon: <LocalShippingRoundedIcon />,
    path: "/staff/arrange-transport",
  },
  {
    text: "Quản Lý Blog",
    icon: <ArticleIcon />,
    path: "/staff/blog",
  },
];

const designStaffSidebarList = [
  {
    text: "Chat",
    icon: <QuestionAnswerIcon />,
    path: "/staff",
  },
  {
    text: "Yêu Cầu Thiết Kế",
    icon: <PaletteIcon />,
    path: "/staff/custom-request",
  },
];

function Layout() {
  const [open, setOpen] = useState(true);

  const { staffPosition } = useAppSelector((state) => state.auth.userInfo);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header open={open} setOpen={setOpen} />

      <SideBar
        open={open}
        setOpen={setOpen}
        itemsList={
          staffPosition === StaffPosition.Sales
            ? saleStaffSidebarList
            : designStaffSidebarList
        }
      />

      <Main open={open}>
        <DrawerHeader />

        <Outlet />
      </Main>
    </Box>
  );
}

export default Layout;
