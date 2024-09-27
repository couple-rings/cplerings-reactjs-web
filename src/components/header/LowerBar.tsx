import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styles from "./Header.module.scss";
import { Drawer } from "@mui/material";
import { ReactElement, useState } from "react";

const tabs = [
  {
    text: "Nhẫn Cưới",
    content: <div>a</div>,
  },
  {
    text: "Trang Sức",
    content: <div>b</div>,
  },
  {
    text: "Về CR",
    content: <div>c</div>,
  },
  {
    text: "Chứng Nhận",
    content: <div>d</div>,
  },
  {
    text: "Blog",
  },
];

const LowerBar = () => {
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<ReactElement | null>(null);

  return (
    <AppBar position="static" className={styles.tabBar}>
      <Container>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 8,
            }}
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={styles.tab}
                onClick={() => {
                  if (tab.content) {
                    setOpen(true);
                    setDrawerContent(tab.content);
                  }
                }}
              >
                {tab.text}
              </div>
            ))}

            <Drawer anchor={"top"} open={open} onClose={() => setOpen(false)}>
              {drawerContent}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LowerBar;
