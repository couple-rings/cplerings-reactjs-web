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

const sidebarList = [
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
