import { Button, Menu } from "@mui/material";
import styles from "./SizeMenu.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const sizes = [
  {
    size: 4,
    diameter: 14,
  },
  {
    size: 5,
    diameter: 14.3,
  },
  {
    size: 6,
    diameter: 14.6,
  },
  {
    size: 7,
    diameter: 15,
  },
  {
    size: 8,
    diameter: 15.3,
  },
];

function SizeMenu(props: ISizeMenuProps) {
  const { size, setSize, label, sx, paperStyle } = props;

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
        <div>
          {label && "Chọn kích thước:"} {size !== 0 && size}
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: paperStyle } }}
      >
        <div className={styles.container}>
          <div className={styles.column}>
            <div className={styles.title}>Kích thước</div>
            {sizes.map((item) => {
              const selected = item.size === size ? styles.selected : "";
              return (
                <div
                  key={uuidv4()}
                  className={`${styles.item} ${selected}`}
                  onClick={() => {
                    setSize(item.size);
                    handleClose();
                  }}
                >
                  {item.size}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Đường kính (cm)</div>
            {sizes.map((item) => {
              return (
                <div key={uuidv4()} className={styles.plainItem}>
                  {item.diameter}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Chu vi (cm)</div>
            {sizes.map((item) => {
              return (
                <div key={uuidv4()} className={styles.plainItem}>
                  {(item.diameter * 3.14).toFixed(1)}
                </div>
              );
            })}
          </div>
        </div>
      </Menu>
    </>
  );
}

export default SizeMenu;
