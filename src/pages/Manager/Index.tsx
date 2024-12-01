import { Grid } from "@mui/material";
import styles from "./Index.module.scss";
import moneyBag from "src/assets/moneyBag.png";
import transactionIcon from "src/assets/TransactionIcon.png";
import customerIcon from "src/assets/CustomerIcon.png";
import productIcon from "src/assets/ProductIcon.png";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import chartArrowDescent from "src/assets/ChartArrowDescent.png";
import ManagerTopProductTable from "./ManagerTopProductTable/ManagerTopProductTable";
import ManagerChartFinace from "src/components/chart/ManagerChartFinance/ManagerChartFinance";
import ManagerPieChartCategory from "src/components/chart/ManagerPieChartCategory/ManagerPieChartCategory";

function Index() {


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>Dashboard</div>

        <div>
          <Grid container justifyContent={"space-between"}>
            <Grid item lg={2.8}>
              <div className={styles.revenueContainer}>
                <div className={styles.boxTitle}>
                  <div className={styles.boxIcon}>
                    <img src={moneyBag} alt="" />
                  </div>
                  <div className={styles.title}>
                    <p>Tổng doanh thu</p>
                  </div>
                </div>

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
            </Grid>

            <Grid item lg={2.8}>
              <div className={styles.transactionContainer}>
                <div className={styles.boxTitle}>
                  <div className={styles.boxIcon}>
                    <img src={transactionIcon} alt="" />
                  </div>
                  <div className={styles.title}>
                    <p>Tổng số giao dịch</p>
                  </div>
                </div>

                <div className={styles.numberContainer}>
                  <p>281</p>giao dịch
                </div>
                <div className={styles.trendContainer}>
                  <div className={styles.numberTrendDown}>
                    <img src={chartArrowDescent} alt="" />
                    28%
                  </div>
                  <div className={styles.timeTrend}>so với 7 ngày</div>
                </div>
              </div>
            </Grid>

            <Grid item lg={2.8}>
              <div className={styles.customerContainer}>
                <div className={styles.boxTitle}>
                  <div className={styles.boxIcon}>
                    <img src={customerIcon} alt="" />
                  </div>
                  <div className={styles.title}>
                    <p>Tổng khách hàng</p>
                  </div>
                </div>

                <div className={styles.numberContainer}>
                  <p>2,813</p>khách hàng
                </div>
                <div className={styles.trendContainer}>
                  <div className={styles.numberTrendUp}>
                    <img src={chartArrowRise} alt="" />
                    28%
                  </div>
                  <div className={styles.timeTrend}>so với 7 ngày</div>
                </div>
              </div>
            </Grid>

            <Grid item lg={2.8}>
              <div className={styles.productContainer}>
                <div className={styles.boxTitle}>
                  <div className={styles.boxIcon}>
                    <img src={productIcon} alt="" />
                  </div>
                  <div className={styles.title}>
                    <p>Tổng sản phẩm</p>
                  </div>
                </div>

                <div className={styles.numberContainer}>
                  <p>28,000</p>sản phẩm
                </div>
                <div className={styles.trendContainer}>
                  <div className={styles.numberTrendUp}>
                    <img src={chartArrowRise} alt="" />
                    28%
                  </div>
                  <div className={styles.timeTrend}>so với 7 ngày</div>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} className={styles.section} >
              <ManagerChartFinace />
            </Grid>

            <Grid item xs={7} className={styles.section} mt={3} p={3}>
              <ManagerTopProductTable />
            </Grid>
            <Grid item xs={4.8} className={styles.section} mt={3} p={3}>
              <ManagerPieChartCategory />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Index;
