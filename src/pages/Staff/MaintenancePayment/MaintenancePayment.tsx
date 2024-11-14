import { Button, Divider, Grid } from "@mui/material";
import styles  from "./MaintenancePayment.module.scss";

function MaintenancePayment() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Thanh Toán</div>

            <Grid container xs={12} md={12} lg={12} justifyContent={"center"}  className={styles.box}>
                <Grid item  xs={12} md={12} lg={12} className={styles.titlePrice}>Chi Phí</Grid>
                <Grid item  xs={12} md={12} lg={12} className={styles.price}>4,000,000 VND</Grid>

                <Grid item xs={8} md={8} lg={8}>
                    <Divider/>
                </Grid>
                
            </Grid>

            <Grid container item xs={12} md={12} lg={12} mt={5} justifyContent={"center"} className="input-info-box">
            <Grid xs={9} md={9} lg={9} item className={styles.inputBoxTitle}>
              Hình Ảnh Chuyển Khoản
            </Grid>
            <Grid xs={9} md={9} lg={9} item>
                {/* <label htmlFor="uploadFile">Upload</label> */}
              <input type="file" id="uploadFile" className={styles.inputBoxField} required />
            </Grid>
          </Grid>


          <Grid container justifyContent={"center"}>
        <Button className={styles.btnPay}>Hoàn Thành Thanh Toán</Button>
      </Grid>
        </div>
    )
}

export default MaintenancePayment;