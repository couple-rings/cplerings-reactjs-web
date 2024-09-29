import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styles from "./Header.module.scss";
import { ReactElement, useState } from "react";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import WeddingRingsTab from "./WeddingRingsTab";
import JewelryTab from "./JewelryTab";
import OtherTab from "./OtherTab";
import { aboutTabData, certificateTabData } from "src/utils/constants";

const tabs = [
  {
    text: "Nhẫn Cưới",
    content: <WeddingRingsTab />,
  },
  {
    text: "Trang Sức",
    content: <JewelryTab />,
  },
  {
    text: "Về CR",
    content: <OtherTab cardsList={aboutTabData} />,
  },
  {
    text: "Chứng Nhận",
    content: <OtherTab cardsList={certificateTabData} />,
  },
  {
    text: "Blog",
  },
];

const LowerBar = () => {
  const [tabContent, setTabContent] = useState<null | ReactElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    tabContent?: ReactElement
  ) => {
    if (tabContent) {
      setTabContent(tabContent);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="static"
        className={styles.tabBar}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Container>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                gap: 8,
              }}
            >
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={styles.tab}
                  onClick={(e) => handleClick(e, tab.content)}
                >
                  {tab.text}
                </div>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        slotProps={{
          paper: {
            style: {
              width: "100%",
              boxShadow: "0 4px 2px -2px #ccc",
              borderTop: "1px solid #ccc",
              borderRadius: 0,
            },
          },
        }}
        sx={{ mt: "15px" }}
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        transitionDuration={200}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {tabContent}
      </Menu>
    </>
  );
};

export default LowerBar;
