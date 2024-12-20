import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DrawerHeader from "src/components/layout/DrawerHeader";
import Header from "src/components/layout/Header";
import Main from "src/components/layout/Main";
import SideBar from "src/components/layout/SideBar";
import HandymanIcon from "@mui/icons-material/Handyman";
// import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded";

const sidebarList = [
  // {
  //   text: "Dashboard",
  //   icon: <DashboardRoundedIcon />,
  //   path: "/jeweler",
  // },
  {
    text: "Đơn Gia Công",
    icon: <HardwareRoundedIcon />,
    path: "/jeweler",
  },
  {
    text: "Đơn Bảo Trì",
    icon: <HandymanIcon />,
    path: "/jeweler/maintenance-order",
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
