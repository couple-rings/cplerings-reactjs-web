import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import DrawerHeader from "./DrawerHeader";
import { drawerWidth } from "src/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/utils/hooks";
import { capitalizeFirstLetter } from "src/utils/functions";
import { Box } from "@mui/material";

function SideBar(props: ISideBarProps) {
  const { open, setOpen, itemsList } = props;

  const theme = useTheme();
  const navigate = useNavigate();

  const { role, staffPosition } = useAppSelector(
    (state) => state.auth.userInfo
  );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {staffPosition !== null &&
            capitalizeFirstLetter((staffPosition as string).toLowerCase())}{" "}
          {capitalizeFirstLetter((role as string).toLowerCase())}
        </Box>
        <IconButton onClick={() => setOpen(false)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {itemsList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
