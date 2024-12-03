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
import necklace from "src/assets/necklace.png";

const sidebarList = [
  {
    text: "Dashboard",
    icon: <DashboardRoundedIcon />,
    path: "/manager",
  },
  {
    text: "Manage Branch",
    icon: <StoreMallDirectorySharpIcon />,
    path: "/manager/branch",
  },
  {
    text: "Manage Diamond",
    icon: <DiamondSharpIcon />,
    path: "/manager/diamond",
  },
  {
    text: "Manage Collection",
    icon: <CollectionsBookmarkRoundedIcon />,
    path: "/manager/collection",
  },
  {
    text: "Manage Design",
    icon: <DesignServicesRoundedIcon />,
    path: "/manager/design",
  },
  {
    text: "Manage Jewelry",
    icon: <img src={necklace} width={25} />,
    path: "/manager/jewelry",
  },
  {
    text: "Topic & Tag",
    icon: <TopicRoundedIcon />,
    path: "/manager/topic&tag",
  },
  {
    text: "Discount Campaign",
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
