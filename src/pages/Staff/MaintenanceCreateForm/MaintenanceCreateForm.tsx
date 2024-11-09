import { Divider, Grid } from "@mui/material";
import styles from "./MaintenanceCreateForm.module.scss";

function MaintenanceCreateForm() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Đơn Bảo Trì và Bảo Dưỡng Nhẫn</div>

      <Grid container className={styles.infoCustomer}>
        <Grid item className={styles.titleSection}>
          Thông Tin Khách Hàng
        </Grid>
        <Grid
          item
          container
          justifyContent={"space-between"}
          xs={12}
          md={12}
          lg={12}
          className={styles.inputInfoContainer}
        >
          <Grid item xs={12} md={7} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Họ và Tên
            </Grid>
            <Grid item>
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4.5} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Số Điện Thoại
            </Grid>
            <Grid item className="info-box-field">
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={"space-between"}
          md={12}
          lg={12}
          className={styles.inputInfoContainer}
        >
          <Grid item xs={12} md={7} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Địa Chỉ
            </Grid>
            <Grid item>
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4.5} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Mã Sản Phẩm
            </Grid>
            <Grid item className="info-box-field">
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} md={12} pt={5} item>
          <Divider />
        </Grid>
      </Grid>

      <Grid container className="info-order">
        <Grid item className={styles.titleSection}>
          Danh Sách Dịch Vụ Bảo Trì và Bảo Dưỡng Nhẫn
        </Grid>
      </Grid>
    </div>
  );
}

export default MaintenanceCreateForm;
