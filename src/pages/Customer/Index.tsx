import styles from "./Index.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import orders from "src/assets/orders.png";
import wishlist from "src/assets/wish_list.png";
import profile from "src/assets/profile.png";
import verification from "src/assets/verification.png";
import agreement from "src/assets/agreement.png";
import medals from "src/assets/medals.png";
import { Grid, ListItemText, Menu, MenuItem, Switch } from "@mui/material";
import { useState } from "react";

const imgLists = [orders, wishlist, profile, verification, agreement, medals];

function CustomerDefault() {
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
      <Grid container className={styles.container}>
        <Grid item xs={10} lg={6} className={styles.content}>
          <div className={styles.title}>Tài Khoản</div>
          <div className={styles.subtitle}>
            Cảm ơn bạn vì đã lựa chọn Couple Rings®.
          </div>

          <span className={styles.setting} onClick={handleClick}>
            <SettingsIcon />
            <span>Cài Đặt</span>
          </span>

          <Grid container className={styles.body}>
            {imgLists.map((img, index) => {
              return (
                <Grid item sm={5.8} key={index}>
                  <img src={img} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Menu
        id="basic-menu"
        sx={{ marginTop: 2 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemText primary="Bảo Mật" secondary={"Cập nhật mật khẩu"} />
        </MenuItem>

        <MenuItem>
          <ListItemText
            primary="Riêng Tư"
            secondary={"Hiện thỏa thuận tình yêu"}
            sx={{ mr: 4 }}
          />
          <Switch />
        </MenuItem>
      </Menu>
    </>
  );
}

export default CustomerDefault;