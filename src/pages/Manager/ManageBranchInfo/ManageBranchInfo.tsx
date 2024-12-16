import styles from "./ManageBranchInfo.module.scss";
import { Button, Grid } from "@mui/material";
import image from "src/assets/Image.png";

function ManageBranchInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <div className={styles.title}>Thông Tin Chi Nhánh</div>
          <Grid container justifyContent={"center"}>
            <Grid item lg={8} className={styles.imageBox}>
              <div className={styles.button}>
                <img src={image} alt="" />
                <div className={styles.btnDes}>Thêm hình ảnh</div>
              </div>
            </Grid>

            <Grid item xs={12} md={7} lg={8} className={styles.inputInfoContainer}>
              <Grid item className={styles.inputBoxTitle}>
                Tên Cửa Hàng *
              </Grid>
              <Grid item>
                <input type="text" className={styles.inputBoxField} required />
              </Grid>
            </Grid>

            <Grid item xs={12} md={7} lg={8} className={styles.inputInfoContainer}>
              <Grid item className={styles.inputBoxTitle}>
                Số Điện Thoại *
              </Grid>
              <Grid item>
                <input type="text" className={styles.inputBoxField} required />
              </Grid>
            </Grid>

            <Grid item xs={12} md={7} lg={8} className={styles.inputInfoContainer}>
              <Grid item className={styles.inputBoxTitle}>
                Địa chỉ *
              </Grid>
              <Grid item>
                <input type="text" className={styles.inputBoxField} required />
              </Grid>
            </Grid>

            <Grid item xs={12} md={7} lg={8} className={styles.inputInfoContainer}>
              <Button>
                Lưu Thông Tin
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ManageBranchInfo;
