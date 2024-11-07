import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "./AppBar";
import { Box, Menu, MenuItem, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { logout } from "src/redux/slice/auth.slice";
import { removeRoute } from "src/redux/slice/route.slice";
import { removeMessages } from "src/redux/slice/message.slice";
import { removeConversations } from "src/redux/slice/conversation.slice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const settings = [
  {
    text: "Trang Chủ",
    path: "/",
  },
  {
    text: "Thông Tin Cá Nhân",
    path: "/profile",
  },
  {
    text: "Đăng Xuất",
  },
];

export default function Header(props: IHeaderProps) {
  const { open, setOpen } = props;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { username, role } = useAppSelector((state) => state.auth.userInfo);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
  };

  useEffect(() => {
    setAnchorElUser(null);
  }, [location.pathname]);

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ backgroundColor: "#313131", boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flex: 5 }}>
          Couple Rings
        </Typography>

        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Tooltip title="Tài Khoản Của Tôi">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
              <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "40px" }}
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
                  if (setting.path)
                    navigate(
                      `/${(role as string).toLowerCase()}${setting.path}`
                    );
                  else handleLogout();
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {setting.text}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          <div>{username}</div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
