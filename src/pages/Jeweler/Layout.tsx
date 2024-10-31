import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DrawerHeader from "src/components/layout/DrawerHeader";
import Header from "src/components/layout/Header";
import Main from "src/components/layout/Main";
import SideBar from "src/components/layout/SideBar";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PaletteIcon from "@mui/icons-material/Palette";


const sidebarList = [
  {
    text: "Chat",
    icon: <QuestionAnswerIcon />,
    path: "/staff",
  },
  {
    text: "Yêu Cầu Gia Công",
    icon: <PaletteIcon />,
    path: "/jeweler/crafting-request",
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
