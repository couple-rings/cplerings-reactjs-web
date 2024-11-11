import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "./SideBar";
import { SxProps } from "@mui/material";

const titleStyle: SxProps = {
  color: "#3a3a3a",
  fontSize: "1.8rem",
};

const containerStyle: SxProps = {
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  gap: 3,
};

const appBarStyle: SxProps = {
  boxShadow: "none",
  backgroundColor: "white",
  px: 5,
};

function SupportHeader() {
  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar disableGutters>
        <Box sx={containerStyle}>
          <SideBar />

          <Box sx={titleStyle}>Hỗ Trợ Khách Hàng</Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default SupportHeader;
