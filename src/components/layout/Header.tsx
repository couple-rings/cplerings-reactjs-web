import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "./AppBar";

export default function Header(props: IHeaderProps) {
  const { open, setOpen } = props;

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#b43620" }}>
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
        <Typography variant="h6" noWrap component="div">
          Couple Rings
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
