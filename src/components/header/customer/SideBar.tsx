import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { useState } from "react";
import logo from "src/assets/logowhite.png";
import { useNavigate } from "react-router-dom";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

const bottomMobileMenu = [
  {
    icon: <ChatBubbleRoundedIcon />,
    text: "Chat Với Nhân Viên",
    path: "/customer/support",
  },
  {
    icon: <ColorLensRoundedIcon />,
    text: "Yêu Cầu Thiết Kế",
    path: "/customer/support/custom-request",
  },
  {
    icon: <HandymanRoundedIcon />,
    text: "Yêu Cầu Gia Công",
    path: "/customer/support/crafting-request",
  },
  {
    icon: <ArticleRoundedIcon />,
    text: "Đơn Hàng Gia Công",
    path: "/customer/support/custom-order",
  },
];

const logoStyle: SxProps = {
  p: 2,
  backgroundColor: "#b43620",
  gap: 3,
  "&:hover": { backgroundColor: "#b43620" },
};

function SideBar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
      >
        <WidgetsOutlinedIcon fontSize="large" />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <ListItem disablePadding>
          <ListItemButton
            sx={logoStyle}
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
          >
            <img src={logo} style={{ width: "18%" }} />

            <Box
              sx={{
                fontSize: "1.3rem",
                color: "white",
              }}
            >
              Couple Rings
            </Box>
          </ListItemButton>
        </ListItem>

        <List>
          {bottomMobileMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default SideBar;
