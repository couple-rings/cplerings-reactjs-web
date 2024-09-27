import { useState } from "react";
import styles from "./Header.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import logo from "src/assets/logo.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";

const leftTabs = [
  {
    icon: <SearchOutlinedIcon className={styles.icon} />,
    path: "",
  },
  {
    icon: <FmdGoodOutlinedIcon className={styles.icon} />,
    path: "",
  },
  {
    icon: (
      <div className={styles.iconContainer}>
        <EmailOutlinedIcon /> <span className={styles.iconText}>Liên Hệ</span>
      </div>
    ),
    path: "",
  },
];

const rightTabs = [
  {
    icon: <FavoriteBorderOutlinedIcon className={styles.icon} />,
    path: "",
  },
  {
    icon: <ShoppingBagOutlinedIcon className={styles.icon} />,
    path: "",
  },
];

const settings = [
  {
    text: "Trang Chủ",
    path: "",
  },
  {
    text: "Đơn Mua",
    path: "",
  },
  {
    text: "Thông Tin Cá Nhân",
    path: "",
  },
  {
    text: "Đăng Xuất",
  },
];

const bottomMobileMenu = [
  {
    icon: <PermIdentityIcon />,
    text: "Tài Khoản Của Tôi",
    path: "",
  },
  {
    icon: <FavoriteBorderOutlinedIcon />,
    text: "Danh Sách Yêu Thích",
    path: "",
  },
  {
    icon: <ShoppingBagOutlinedIcon />,
    text: "Giỏ Hàng Của Tôi",
    path: "",
  },
  {
    icon: <PhoneOutlinedIcon />,
    text: "Liên Hệ",
    path: "",
  },
  {
    icon: <LogoutOutlinedIcon />,
    text: "Đăng Xuất",
  },
];

const UpperBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className={styles.tabBar}>
      <Container>
        <Toolbar disableGutters>
          {/* mobile screen - left part */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <Drawer open={open} onClose={toggleDrawer(false)}>
              <List sx={{ width: 300 }}>
                {bottomMobileMenu.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {bottomMobileMenu.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>

            <IconButton sx={{ my: 2 }}>
              <SearchOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* desktop screen - left part */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {leftTabs.map((item, index) => (
              <IconButton key={index} sx={{ my: 2, mx: 1 }}>
                {item.icon}
              </IconButton>
            ))}
          </Box>

          {/* logo - center */}
          <Box sx={{ flexGrow: 0, display: "flex", justifyContent: "center" }}>
            <img src={logo} className={styles.logo} />
          </Box>

          {/* desktop screen - right part */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Tài Khoản Của Tôi">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
                <PermIdentityIcon fontSize="large" className={styles.icon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    if (setting.path) navigate(setting.path);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            {rightTabs.map((item, index) => (
              <IconButton
                key={index}
                sx={{ my: 2, mx: 1 }}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>

          {/* mobile screen - right part */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton sx={{ my: 2 }}>
              <ShoppingBagOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UpperBar;
