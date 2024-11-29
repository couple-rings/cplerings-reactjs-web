import { Grid } from "@mui/material";
import styles from "./Index.module.scss";
import { BarChart } from "@mui/x-charts/BarChart";
import moneyBag from "./../../assets/moneyBag.png";
import transactionIcon from "./../../assets/TransactionIcon.png";
import customerIcon from "./../../assets/CustomerIcon.png";
import productIcon from "./../../assets/ProductIcon.png";
import chartArrowRise from "./../../assets/ChartArrowRise.png";
import chartArrowDescent from "./../../assets/ChartArrowDescent.png";
import { LineChart, lineElementClasses } from "@mui/x-charts";
import ManagerChartFinace from "./ManagerChartFinance/ManagerChartFinance";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>Dashboard</div>

        <div>
          <Grid container justifyContent={"space-between"}>
            <Grid item  lg={2.8}>
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
            <Grid item xs={12} className={styles.section}>
              
              <ManagerChartFinace/>
            </Grid>

            <Grid item  className={styles.section}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["group A", "group B", "group C"],
                  },
                ]}
                series={[
                  { data: [4, 3, 5] },
                  { data: [1, 6, 3] },
                  { data: [2, 5, 6] },
                ]}
                height={300}
              />
            </Grid>

            <Grid item  className={styles.section} mt={3} p={3}>
              <LineChart
                height={300}
                series={[
                  {
                    data: uData,
                    label: "uv",
                    area: true,
                    stack: "total",
                    showMark: false,
                  },
                  {
                    data: pData,
                    label: "pv",
                    area: true,
                    stack: "total",
                    showMark: false,
                  },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
                sx={{
                  [`& .${lineElementClasses.root}`]: {
                    display: "none",
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Index;
