import { Button, Divider, Grid, Radio } from "@mui/material";
import styles from "./DesignFee.module.scss";
import vnpay from "src/assets/vnpay.png";
import momo from "src/assets/momo.png";
import paypal from "src/assets/paypal.png";
import menring from "src/assets/sampledata/menring.png";
import male from "src/assets/male-icon.png";
import womenring from "src/assets/sampledata/womenring.png";
import female from "src/assets/female-icon.png";
import { currencyFormatter } from "src/utils/functions";
import { secondaryBtn } from "src/utils/styles";

function DesignFee() {
  return (
    <div className={styles.container}>
      <Grid container item lg={10} justifyContent={"space-between"}>
        <Grid item xs={12} className={styles.title}>
          Phí Thiết Kế
        </Grid>

        <Divider sx={{ backgroundColor: "#ccc", width: "100%", my: 4 }} />

        <Grid item md={4} className={styles.paymentMethod}>
          <div className={styles.title}>Phương thức thanh toán</div>
          <div className={styles.radio}>
            <Radio checked />
            <img src={vnpay} />
            <div>VNPAY</div>
          </div>

          <div className={styles.radio}>
            <Radio disabled />
            <img src={momo} />
            <div className={styles.notAvailable}>MoMo (Sắp ra mắt)</div>
          </div>

          <div className={styles.radio}>
            <Radio disabled />
            <img src={paypal} />
            <div className={styles.notAvailable}>Paypal (Sắp ra mắt)</div>
          </div>

          <Button variant="contained" sx={{ ...secondaryBtn, my: 3 }} fullWidth>
            Thanh Toán
          </Button>
        </Grid>

        <Grid item md={7.5} className={styles.summary}>
          <div className={styles.title}>Thông Tin Thanh Toán</div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <div className={styles.body}>
            <div className={styles.title}>Thiết Kế Gốc</div>
            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img src={menring} />
              </Grid>
              <Grid item sm={8}>
                <div className={styles.name}>
                  CR Two-row Diamond Pavé Wedding Rings
                </div>
                <div className={styles.collection}>Bộ sưu tập Forever</div>
                <div className={styles.gender}>
                  <img src={male} />
                  Nhẫn nam
                </div>
              </Grid>
            </Grid>

            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img src={womenring} />
              </Grid>
              <Grid item sm={8}>
                <div className={styles.name}>
                  CR Two-row Diamond Pavé Wedding Rings
                </div>
                <div className={styles.collection}>Bộ sưu tập Forever</div>
                <div className={styles.gender}>
                  <img src={female} />
                  Nhẫn nữ
                </div>
              </Grid>
            </Grid>

            <div className={styles.noteTitle}>Dịch vụ bao gồm khi mua</div>
            <div className={styles.note}>
              3 phiên bản thiết kế cho mỗi bản gốc
            </div>
          </div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Thành Tiền</Grid>

            <Grid item fontWeight={600} fontSize={"1.3rem"}>
              {currencyFormatter(350000)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DesignFee;
