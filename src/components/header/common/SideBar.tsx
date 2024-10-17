import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { WeddingRingsTabMobile } from "./WeddingRingsTab";
import { JewelryTabMobile } from "./JewelryTab";
import { OtherTabMobile } from "./OtherTab";
import { aboutTabData, certificateTabData } from "src/utils/constants";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { logout } from "src/redux/slice/auth.slice";
import { removeRoute } from "src/redux/slice/route.slice";
import { removeMessages } from "src/redux/slice/message.slice";
import { removeConversations } from "src/redux/slice/conversation.slice";
import { useLocation, useNavigate } from "react-router-dom";

const bottomMobileMenu = [
  {
    icon: <PermIdentityIcon />,
    text: "Tài Khoản Của Tôi",
    path: "/customer",
  },
  {
    icon: <FavoriteBorderOutlinedIcon />,
    text: "Danh Sách Yêu Thích",
    path: "/",
  },
  {
    icon: <ShoppingBagOutlinedIcon />,
    text: "Giỏ Hàng Của Tôi",
    path: "/customer/bag",
  },
  {
    icon: <PhoneOutlinedIcon />,
    text: "Liên Hệ",
    path: "/",
  },
  {
    icon: <LogoutOutlinedIcon />,
    text: "Đăng Xuất",
  },
];

const topMobileMenu = [
  {
    text: "Nhẫn Cưới",
    content: <WeddingRingsTabMobile />,
  },
  {
    text: "Trang Sức",
    content: <JewelryTabMobile />,
  },
  {
    text: "Về CR",
    content: <OtherTabMobile cardsList={aboutTabData} />,
  },
  {
    text: "Chứng Nhận",
    content: <OtherTabMobile cardsList={certificateTabData} />,
  },
  {
    text: "Blog",
  },
];

function SideBar() {
  const [open, setOpen] = useState(false);
  const [openTabs, setOpenTabs] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleExpand = (index: number) => {
    if (openTabs.includes(index))
      setOpenTabs((currentArr) => currentArr.filter((item) => item !== index));
    else setOpenTabs([...openTabs, index]);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeRoute());
    dispatch(removeMessages());
    dispatch(removeConversations());
    setOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 300, mt: 5 }}>
          {topMobileMenu.map((item, index) => {
            if (index !== topMobileMenu.length - 1)
              return (
                <div key={index} style={{ padding: "0 1rem" }}>
                  <ListItemButton onClick={() => handleExpand(index)}>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 600,
                      }}
                    />
                    {openTabs.includes(index) ? <RemoveIcon /> : <AddIcon />}
                  </ListItemButton>

                  <Collapse
                    in={openTabs.includes(index)}
                    timeout="auto"
                    unmountOnExit
                  >
                    {item.content}
                  </Collapse>
                </div>
              );
            else
              return (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemButton>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 600,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
          })}
        </List>

        <Divider />

        <List sx={{ mt: 3 }}>
          {bottomMobileMenu.map((item, index) => {
            if (item.path || (!item.path && isAuthenticated))
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (item.path) navigate(item.path);
                      else handleLogout();
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              );
          })}
        </List>
      </Drawer>
    </>
  );
}

export default SideBar;
