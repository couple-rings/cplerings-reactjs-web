import { Button, Divider, Grid, Radio } from "@mui/material";
import styles from "./Deposit.module.scss";
import vnpay from "src/assets/vnpay.png";
import momo from "src/assets/momo.png";
import paypal from "src/assets/paypal.png";
import menring from "src/assets/sampledata/menring.png";
import male from "src/assets/male-icon.png";
import womenring from "src/assets/sampledata/womenring.png";
import female from "src/assets/female-icon.png";
import { currencyFormatter } from "src/utils/functions";
import { secondaryBtn } from "src/utils/styles";

function Deposit() {
  return (
    <div className={styles.container}>
      <Grid container item lg={10} justifyContent={"space-between"}>
        <Grid item xs={12} className={styles.title}>
          Thanh Toán Tiền Đặt Cọc
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
            <div className={styles.title}>Thông Tin Nhẫn</div>
            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img src={menring} />
              </Grid>
              <Grid container item sm={8} gap={2}>
                <Grid container>
                  <Grid item xs={4}>
                    Chất liệu:
                  </Grid>
                  <Grid item>Vàng Trắng 18K</Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    Kim cương:
                  </Grid>
                  <Grid item>15PT ,G ,VS1</Grid>
                </Grid>
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
              <Grid container item sm={8} gap={2}>
                <Grid container>
                  <Grid item xs={4}>
                    Chất liệu:
                  </Grid>
                  <Grid item>Vàng Trắng 18K</Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    Kim cương:
                  </Grid>
                  <Grid item>15PT ,G ,VS1</Grid>
                </Grid>
                <div className={styles.gender}>
                  <img src={female} />
                  Nhẫn nam
                </div>
              </Grid>
            </Grid>

            <div className={styles.noteTitle}>Thanh Toán Cho Giai Đoạn 1</div>
            <div className={styles.note}>Hoàn Thành 50% - Đúc Khuôn Nhẫn</div>
          </div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Tỷ Lệ Cọc</Grid>

            <Grid item fontSize={"1.2rem"}>
              50% Giá Trị
            </Grid>
          </Grid>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Thành Tiền</Grid>

            <Grid item fontWeight={600} fontSize={"1.3rem"}>
              {currencyFormatter(5000000)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Deposit;
