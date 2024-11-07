import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "src/components/layout/SideBar";
import DrawerHeader from "src/components/layout/DrawerHeader";
import Main from "src/components/layout/Main";
import Header from "src/components/layout/Header";
import { Outlet } from "react-router-dom";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CategoryIcon from "@mui/icons-material/Category";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import HexagonRoundedIcon from "@mui/icons-material/HexagonRounded";
import PanToolAltSharpIcon from "@mui/icons-material/PanToolAltSharp";

const sidebarList = [
  {
    text: "Dashboard",
    icon: <GridViewRoundedIcon />,
    path: "/admin",
  },
  {
    text: "Manage Account",
    icon: <ManageAccountsRoundedIcon />,
    path: "/admin/account",
  },
  {
    text: "Jewelry Category",
    icon: <CategoryIcon />,
    path: "/admin/jewelry-category",
  },
  {
    text: "Diamond Specification",
    icon: <DiamondRoundedIcon />,
    path: "/admin/diamond-spec",
  },
  {
    text: "Metal Specification",
    icon: <HexagonRoundedIcon />,
    path: "/admin/metal-spec",
  },
  {
    text: "Finger Size",
    icon: <PanToolAltSharpIcon />,
    path: "/admin/finger-size",
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
