import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "src/components/layout/SideBar";
import DrawerHeader from "src/components/layout/DrawerHeader";
import Main from "src/components/layout/Main";
import Header from "src/components/layout/Header";
import { Outlet } from "react-router-dom";
import StoreMallDirectorySharpIcon from "@mui/icons-material/StoreMallDirectorySharp";
import DiamondSharpIcon from "@mui/icons-material/DiamondSharp";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
// import PersonIcon from '@mui/icons-material/Person';
import necklace from "src/assets/necklace.png";

const sidebarList = [
  {
    text: "Thống Kê",
    icon: <DashboardRoundedIcon />,
    path: "/manager",
  },
  // {
  //   text: "Tài Khoản",
  //   icon: <PersonIcon/>,
  //   path: "/manager/account",
  // },
  {
    text: "Thông Tin Cửa Hàng",
    icon: <StoreMallDirectorySharpIcon />,
    path: "/manager/branch",
  },
  {
    text: "Quản Lý Kim Cương",
    icon: <DiamondSharpIcon />,
    path: "/manager/diamond",
  },
  {
    text: "Quản Lý Bộ Sưu Tập",
    icon: <CollectionsBookmarkRoundedIcon />,
    path: "/manager/collection",
  },
  {
    text: "Quản Lý Thiết Kế",
    icon: <DesignServicesRoundedIcon />,
    path: "/manager/design",
  },
  {
    text: "Quản Lý Trang Sức",
    icon: <img src={necklace} width={25} />,
    path: "/manager/jewelry",
  },
  {
    text: "Chủ Đề & Tag",
    icon: <TopicRoundedIcon />,
    path: "/manager/topic&tag",
  },
  {
    text: "Chính Sách Giảm Giá",
    icon: <LocalOfferRoundedIcon />,
    path: "/manager/campaign",
  },
];

function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header open={open} setOpen={setOpen} />

      <SideBar open={open} setOpen={setOpen} itemsList={sidebarList} />

      <Main open={open}>
        <DrawerHeader />

        <Outlet />
      </Main>
    </Box>
  );
}

export default Layout;
