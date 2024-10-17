import { Grid } from "@mui/material";
import styles from "./Card.module.scss";
import sample from "src/assets/sampledata/ringdesign.png";
import { currencyFormatter } from "src/utils/functions";

function Card() {
  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={3.5}>
          <img src={sample} />
        </Grid>

        <Grid item xs={7}>
          <div className={styles.name}>
            DR FOREVER Simple Wedding Ring For Man (Nam Giới)
          </div>
          <div className={styles.spec}>
            <Grid container marginBottom={3}>
              <Grid item xs={6}>
                <div className={styles.label}>Chất Liệu</div>
                <div>Vàng Trắng 18K</div>
              </Grid>

              <Grid item xs={6}>
                <div className={styles.label}>Kim Cương</div>
                <div>5PT ,F , SI1</div>
              </Grid>
            </Grid>

            <div>
              <div className={styles.label}>Kích Thước</div>
              <div>5</div>
            </div>
          </div>
        </Grid>
      </Grid>

      <div className={styles.price}>
        <div>Thành Tiền</div>
        <div>{currencyFormatter(12000000)}</div>
      </div>
    </div>
  );
}

export default Card;
