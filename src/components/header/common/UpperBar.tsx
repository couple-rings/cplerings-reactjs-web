import { useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
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
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import { InputAdornment, OutlinedInput, Grid, Badge } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SideBar from "./SideBar";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { logout } from "src/redux/slice/auth.slice";
import { removeRoute } from "src/redux/slice/route.slice";
import { removeMessages } from "src/redux/slice/message.slice";
import { removeConversations } from "src/redux/slice/conversation.slice";

const fastSearchs = [
  "Nhẫn Cưới",
  "Nhẫn Nam",
  "Tình Yêu Vĩnh Cữu",
  "Hình Trái Tim",
  "Nhẫn Cặp",
];

const leftTabs = [
  {
    icon: <SearchOutlinedIcon className={styles.icon} />,
  },
  {
    icon: <FmdGoodOutlinedIcon className={styles.icon} />,
    path: "/stores",
  },
  {
    icon: (
      <div className={styles.iconContainer}>
        <EmailOutlinedIcon /> <span className={styles.iconText}>Liên Hệ</span>
      </div>
    ),
    path: "/",
  },
];

const settings = [
  {
    text: "Trang Chủ",
    path: "/",
  },
  {
    text: "Đơn Mua",
    path: "/",
  },
  {
    text: "Tài Khoản Của Tôi",
    path: "/customer",
  },
  {
    text: "Thông Tin Cá Nhân",
    path: "/customer/profile",
  },
  {
    text: "Đăng Xuất",
  },
];

const UpperBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [openSearch, setOpenSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthenticated) setAnchorElUser(event.currentTarget);
    else navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeRoute());
    dispatch(removeMessages());
    dispatch(removeConversations());
    navigate("/login");
    handleCloseUserMenu();
  };

  const rightTabs = useMemo(() => {
    return [
      {
        icon: <FavoriteBorderOutlinedIcon className={styles.icon} />,
        path: "/",
      },
      {
        icon: (
          <Badge badgeContent={3} color="error">
            <ShoppingBagOutlinedIcon className={styles.icon} />
          </Badge>
        ),
        path: "/customer/bag",
      },
    ];
  }, []);

  useEffect(() => {
    setAnchorElUser(null);
  }, [location.pathname]);

  return (
    <>
      <AppBar position="static" className={styles.tabBar}>
        <Container>
          <Toolbar disableGutters>
            {/* mobile screen - left part */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <SideBar />

              <IconButton sx={{ my: 2 }} onClick={() => setOpenSearch(true)}>
                <SearchOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>

            {/* desktop screen - left part */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {leftTabs.map((item, index) => (
                <IconButton
                  key={index}
                  sx={{ my: 2, mx: 1 }}
                  onClick={() => {
                    if (item.path !== undefined) navigate(item.path);
                    else setOpenSearch(true);
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>

            {/* logo - center */}
            <Box
              sx={{ flexGrow: 0, display: "flex", justifyContent: "center" }}
            >
              <img
                src={logo}
                className={styles.logo}
                onClick={() => navigate("/")}
              />
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
                      else handleLogout();
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
              <IconButton
                sx={{ my: 2 }}
                onClick={() => navigate("/customer/bag")}
              >
                <Badge badgeContent={3} color="error">
                  <ShoppingBagOutlinedIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor={"top"}
        open={openSearch}
        onClose={() => setOpenSearch(false)}
      >
        <Grid container className={styles.searchDrawerContent}>
          <Grid item xs={11} sm={8} md={5}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                size="small"
                sx={{ borderRadius: 0 }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Divider />

        <Grid container className={styles.searchDrawerContent}>
          <Grid item xs={11} sm={8} md={5} className={styles.listContainer}>
            <div className={styles.title}>Tìm Kiếm Nhanh</div>
            {fastSearchs.map((item, index) => {
              return (
                <div key={index} className={styles.listItem}>
                  {item}
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default UpperBar;
