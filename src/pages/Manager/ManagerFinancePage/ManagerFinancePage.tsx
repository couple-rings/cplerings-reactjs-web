import { Grid } from "@mui/material";
import moneyBag from "src/assets/moneyBag.png";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import styles from "./ManagerFinancePage.module.scss";

function ManagerFiancePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        Hello mother fucker
        <div>
          <Grid container>
            <Grid lg={12} item>
              <div className={styles.revenueContainer}>
                <div className={styles.boxTitle}>
                  <div className={styles.boxIcon}>
                    <img src={moneyBag} alt="" />
                  </div>
                  <div className={styles.title}>
                    <p>Tổng doanh thu</p>
                  </div>
                </div>
                <div style={{display:"flex", alignItems:"center", gap:"20px"}}>
                  <div className={styles.numberContainer}>
                    <p>280,012,003</p>₫
                  </div>
                  <div className={styles.trendContainer}>
                    <div className={styles.numberTrendUp}>
                      <img src={chartArrowRise} alt="" />
                      28%
                    </div>
                    <div className={styles.timeTrend}>so với 7 ngày</div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ManagerFiancePage;
