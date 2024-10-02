import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "src/components/footer/Footer";
import Header from "src/components/header/Header";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header />

      <Outlet />

      <Divider sx={{ height: 6, backgroundColor: "#b43620" }} />

      <Footer />
    </Box>
  );
};

export default Layout;
