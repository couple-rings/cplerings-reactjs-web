import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "src/components/header/Header";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
