import { Button, Menu, SxProps } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import styles from "./MetalMenu.module.scss";

const metals = ["Vàng Trắng 18K", "Vàng Thường 18K", "Vàng Hồng 18K"];

const paperStyle: SxProps = {
  borderRadius: 0,
  boxShadow: "none",
  px: 3,
  pt: 2,
  backgroundColor: "#f5f5f5",
};

function MetalMenu(props: IMetalMenuProps) {
  const { sx, metal, setMetal } = props;

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
        <div>{metal}</div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: paperStyle } }}
      >
        <div className={styles.container}>
          {metals.map((item, index) => {
            const selected = metal === item ? styles.selected : "";
            return (
              <div
                className={`${styles.spec} ${selected}`}
                key={index}
                onClick={() => {
                  setMetal(item);
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

export default MetalMenu;
