import { Button, Menu, SxProps } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import styles from "./DiamondMenu.module.scss";

const diamonds = ["5PT ,F ,SI1", "10PT ,F ,VS2", "15PT ,G ,SI1"];

const paperStyle: SxProps = {
  borderRadius: 0,
  boxShadow: "none",
  px: 3,
  pt: 2,
  backgroundColor: "#f5f5f5",
};

function DiamondMenu(props: IDiamondMenuProps) {
  const { sx, diamond, setDiamond } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        fullWidth
        sx={sx}
      >
        <div>{diamond}</div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: paperStyle } }}
      >
        <div className={styles.container}>
          {diamonds.map((item, index) => {
            const selected = diamond === item ? styles.selected : "";
            return (
              <div
                className={`${styles.spec} ${selected}`}
                key={index}
                onClick={() => {
                  setDiamond(item);
                  handleClose();
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </Menu>
    </>
  );
}

export default DiamondMenu;
